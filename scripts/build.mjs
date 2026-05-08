#!/usr/bin/env node
/**
 * V/ENTER WEB Handbook Builder
 *
 * Markdown → HTML → PDF を一気通貫でビルドする。
 * VAIZO Editorial CSS (`dist/css/vaizo-editorial.css`) を使い、
 * 全章を1冊のPDF (`dist/pdf/V_ENTER_WEB_Handbook.pdf`) に統合する。
 *
 * Usage:
 *   node scripts/build.mjs               # HTML + PDF を両方ビルド
 *   node scripts/build.mjs --html-only   # HTMLのみ
 *   node scripts/build.mjs --pdf-only    # PDFのみ（HTMLは既存を使用）
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DIST_HTML = path.join(ROOT, "dist", "html");
const DIST_PDF = path.join(ROOT, "dist", "pdf");
const CSS_PATH = path.join(ROOT, "dist", "css", "vaizo-editorial.css");

// ============================================================
// 1. ハンドブック構造の定義（順序が PDF の章立てになる）
// ============================================================

const STRUCTURE = [
  {
    chapter: "00",
    titleEn: "GENESIS",
    titleJp: "はじめに",
    files: [
      { src: "README.md", title: "Introduction — このリポジトリの読み方" },
      { src: "MAP.md", title: "MAP — データ保存場所・アクセス地図" },
    ],
  },
  {
    chapter: "01",
    titleEn: "HANDBOOK",
    titleJp: "事業部ハンドブック",
    files: [
      { src: "handbook/00-overview.md", title: "事業部概要" },
      { src: "handbook/01-sales-process.md", title: "営業プロセス" },
      { src: "handbook/02-design-policy.md", title: "VAIZO Design Policy v1" },
      { src: "handbook/03-codex-claude-workflow.md", title: "Claude × Codex 運用ガイド" },
      { src: "handbook/04-wp-publish-guide.md", title: "WordPress 公開手順書（汎用版）" },
      { src: "handbook/05-vulnerability-scan.md", title: "脆弱性レポート営業の2つのライン" },
      { src: "handbook/06-onboarding.md", title: "Day1 オンボーディング" },
    ],
  },
  {
    chapter: "02",
    titleEn: "TEMPLATES",
    titleJp: "テンプレート集",
    files: [
      { src: "templates/codex-prompts/TEMPLATE.md", title: "Codex プロンプト共通テンプレート" },
      { src: "templates/codex-prompts/bar-or-restaurant-fv.md", title: "飲食・バー業態 FV" },
      { src: "templates/codex-prompts/live-house.md", title: "ライブハウス業態" },
      { src: "templates/codex-prompts/corporate.md", title: "コーポレートサイト業態（骨格）" },
      { src: "templates/codex-prompts/extension-sections.md", title: "FV後の6セクション拡張" },
      { src: "templates/wp-prompts/04-pre-audit.md", title: "WP移行前監査プロンプト（4-pre）" },
      { src: "templates/wp-prompts/04-0-optimize.md", title: "WP最適化版作成プロンプト（4-0）" },
      { src: "templates/wp-prompts/05-ai-test.md", title: "公開後 AI 自動テスト（5-AI）" },
      { src: "templates/client-emails/vulnerability-report-cover.md", title: "メール: 脆弱性レポート添付" },
      { src: "templates/client-emails/proposal.md", title: "メール: 提案" },
      { src: "templates/client-emails/delivery-completion.md", title: "メール: 公開完了報告" },
      { src: "templates/delivery-reports.md", title: "公開完了報告テンプレート" },
    ],
  },
  {
    chapter: "03",
    titleEn: "DECISION TREES",
    titleJp: "判断フロー",
    files: [
      { src: "decision-trees/wp-integration-method.md", title: "WP統合方式の選択" },
      { src: "decision-trees/vulnerability-target.md", title: "脆弱性レポート送付対象の判定" },
      { src: "decision-trees/ai-vs-human.md", title: "AI vs 人間の境界" },
      { src: "decision-trees/escalation.md", title: "エスカレーション順" },
    ],
  },
  {
    chapter: "04",
    titleEn: "TROUBLESHOOTING",
    titleJp: "トラブルシューティング",
    files: [
      { src: "troubleshooting/mailto-regression.md", title: "mailto: リグレッション事故" },
      { src: "troubleshooting/wp-publish-issues.md", title: "WP公開作業のトラブル" },
      { src: "troubleshooting/codex-cli-issues.md", title: "Codex CLI のトラブル" },
      { src: "troubleshooting/playwright-failures.md", title: "Playwright のトラブル" },
    ],
  },
  {
    chapter: "05",
    titleEn: "RUNBOOKS",
    titleJp: "ランブック",
    files: [
      { src: "runbooks/new-client-kickoff.md", title: "新規案件キックオフ" },
      { src: "runbooks/deploy-day.md", title: "公開当日の段取り" },
      { src: "runbooks/post-launch-30days.md", title: "公開後30日のフォロー" },
      { src: "runbooks/1password-teams-setup.md", title: "1Password Teams セットアップ" },
    ],
  },
];

// ============================================================
// 2. ユーティリティ
// ============================================================

const args = process.argv.slice(2);
const HTML_ONLY = args.includes("--html-only");
const PDF_ONLY = args.includes("--pdf-only");

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function readFile(p) {
  return await fs.readFile(p, "utf8");
}

async function writeFile(p, content) {
  await ensureDir(path.dirname(p));
  await fs.writeFile(p, content, "utf8");
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ============================================================
// 3. Markdown を HTML に変換
// ============================================================

marked.setOptions({
  gfm: true,
  breaks: false,
  headerIds: true,
  mangle: false,
});

async function renderMarkdownFile(srcRelative) {
  const srcPath = path.join(ROOT, srcRelative);
  let md;
  try {
    md = await readFile(srcPath);
  } catch (e) {
    console.warn(`⚠️  Skipping (not found): ${srcRelative}`);
    return null;
  }

  // Convert relative .md links to .html links inside doc
  md = md.replace(/\]\(([^)]+)\.md(#[^)]+)?\)/g, (_, p1, p2) => {
    const anchor = p2 || "";
    return `](${p1}.html${anchor})`;
  });

  const html = marked.parse(md);
  return html;
}

// ============================================================
// 4. HTML テンプレート
// ============================================================

const HEAD_BASE = `
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{title}} — V/ENTER WEB Handbook</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Cormorant+Garamond:wght@400;700&family=Playfair+Display:wght@400;700;900&family=Noto+Sans+JP:wght@400;700;900&family=Noto+Serif+JP:wght@400;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{{cssPath}}">
</head>
<body>
`;

const FOOT_BASE = `
</body>
</html>
`;

function chapterDivider(chapter) {
  return `
<section class="chapter-divider">
  <div class="chapter-num">CH ${chapter.chapter}</div>
  <div class="chapter-title-en">${escapeHtml(chapter.titleEn)}</div>
  <div class="chapter-title-jp">${escapeHtml(chapter.titleJp)}</div>
</section>
`;
}

function renderHeader() {
  return `
<header class="handbook-header">
  <div class="handbook-brand">V<span class="slash">/</span>ENTER WEB · HANDBOOK</div>
  <div class="handbook-meta">v0.1 · 2026-05-09</div>
</header>
`;
}

function renderFooter() {
  return `
<footer class="handbook-footer">
  <div>VAIZO INC. · V/ENTER WEB DEPT.</div>
  <div>info@vaizo.jp · vaizo.jp</div>
</footer>
`;
}

function renderCover() {
  return `
<section class="cover">
  <div class="cover-top">VAIZO INC. · V<span class="slash">/</span>ENTER WEB DEPT.</div>
  <div class="cover-title">
    <h1>V<span class="slash">/</span>ENTER<br>WEB</h1>
    <div class="subtitle">事業部ハンドブック<br>HANDBOOK FOR AI-DRIVEN WEB OPERATIONS</div>
  </div>
  <div class="cover-bottom">
    <div>v0.1 · 2026-05-09</div>
    <div>FOR INTERNAL USE ONLY</div>
  </div>
</section>
`;
}

function renderTOC(structure) {
  let html = `<section class="chapter toc"><h2>Table of Contents — 目次</h2><ol>`;
  for (const ch of structure) {
    html += `<li><a href="#chapter-${ch.chapter}"><strong>${escapeHtml(ch.titleEn)}</strong> · ${escapeHtml(ch.titleJp)}</a></li>`;
    for (const f of ch.files) {
      html += `<li style="margin-left:32px;"><a href="#${slugify(f.title)}">${escapeHtml(f.title)}</a></li>`;
    }
  }
  html += `</ol></section>`;
  return html;
}

// ============================================================
// 5. 個別 HTML ページ生成
// ============================================================

async function buildIndividualHtmlPages() {
  console.log("📄 Building individual HTML pages...");
  await ensureDir(DIST_HTML);

  for (const ch of STRUCTURE) {
    for (const f of ch.files) {
      const html = await renderMarkdownFile(f.src);
      if (!html) continue;

      const outPath = path.join(DIST_HTML, f.src.replace(/\.md$/, ".html"));
      const cssRel = path.relative(path.dirname(outPath), CSS_PATH).replace(/\\/g, "/");
      const fullHtml =
        HEAD_BASE.replace("{{title}}", escapeHtml(f.title)).replace("{{cssPath}}", cssRel) +
        `<main class="handbook-shell">` +
        renderHeader() +
        html +
        renderFooter() +
        `</main>` +
        FOOT_BASE;

      await writeFile(outPath, fullHtml);
      console.log(`  ✓ ${f.src} → ${path.relative(ROOT, outPath)}`);
    }
  }
}

// ============================================================
// 6. 統合 HTML（PDF用、1ファイル）
// ============================================================

async function buildBookHtml() {
  console.log("📕 Building combined book HTML...");
  await ensureDir(DIST_HTML);

  const cssRel = path.relative(DIST_HTML, CSS_PATH).replace(/\\/g, "/");
  let body = renderCover() + renderTOC(STRUCTURE);

  for (const ch of STRUCTURE) {
    body += chapterDivider(ch);
    for (const f of ch.files) {
      const html = await renderMarkdownFile(f.src);
      if (!html) continue;

      body += `<section id="${slugify(f.title)}" class="chapter handbook-shell">`;
      body += renderHeader();
      body += html;
      body += renderFooter();
      body += `</section>`;
    }
  }

  const fullHtml =
    HEAD_BASE.replace("{{title}}", "V/ENTER WEB Handbook").replace("{{cssPath}}", cssRel) +
    body +
    FOOT_BASE;

  const outPath = path.join(DIST_HTML, "index.html");
  await writeFile(outPath, fullHtml);
  console.log(`  ✓ Combined → ${path.relative(ROOT, outPath)}`);
  return outPath;
}

// ============================================================
// 7. PDF 生成（Playwright）
// ============================================================

async function buildPdf(htmlPath) {
  console.log("📕 Building PDF via Playwright...");
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.error("❌ Playwright がインストールされていません。`npm install` を先に実行してください。");
    return;
  }

  await ensureDir(DIST_PDF);
  const pdfPath = path.join(DIST_PDF, "V_ENTER_WEB_Handbook.pdf");

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const fileUrl = "file:///" + htmlPath.replace(/\\/g, "/");
  await page.goto(fileUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500); // フォントロードを待つ

  await page.pdf({
    path: pdfPath,
    format: "A4",
    margin: { top: "18mm", bottom: "18mm", left: "16mm", right: "16mm" },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-family:'Inter',sans-serif;font-size:8pt;color:#8a8a8a;width:100%;padding:0 16mm;display:flex;justify-content:space-between;letter-spacing:0.08em;text-transform:uppercase;"><span>V/ENTER WEB · HANDBOOK</span><span>VAIZO INC.</span></div>`,
    footerTemplate: `<div style="font-family:'Inter',sans-serif;font-size:8pt;color:#8a8a8a;width:100%;padding:0 16mm;display:flex;justify-content:space-between;letter-spacing:0.08em;"><span>info@vaizo.jp</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
  });

  await browser.close();
  console.log(`  ✓ PDF → ${path.relative(ROOT, pdfPath)}`);
}

// ============================================================
// 8. メイン
// ============================================================

async function main() {
  const start = Date.now();
  console.log("🛠  V/ENTER WEB Handbook Builder");
  console.log(`   ROOT: ${ROOT}`);

  let combinedHtmlPath = path.join(DIST_HTML, "index.html");

  if (!PDF_ONLY) {
    await buildIndividualHtmlPages();
    combinedHtmlPath = await buildBookHtml();
  }

  if (!HTML_ONLY) {
    await buildPdf(combinedHtmlPath);
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`✅ Done in ${elapsed}s`);
}

main().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
