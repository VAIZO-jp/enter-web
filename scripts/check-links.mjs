#!/usr/bin/env node
/**
 * Markdown 内の相対リンク切れを検出する。
 *
 * Usage:
 *   node scripts/check-links.mjs
 *
 * 出力:
 *   - リンク切れがあれば一覧 + exit code 1
 *   - なければ "All links OK" + exit code 0
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const SKIP_DIRS = ["node_modules", ".git", "dist", "docs"];
const TARGET_EXT = [".md"];

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.includes(entry.name)) continue;
      await walk(full, files);
    } else if (TARGET_EXT.includes(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function extractLinks(md) {
  // [text](path) または [text](path#anchor)
  const links = [];
  const re = /\]\(([^)\s]+)\)/g;
  let m;
  while ((m = re.exec(md)) !== null) {
    let link = m[1];
    // strip <> if present
    link = link.replace(/^<|>$/g, "");
    // skip absolute URLs, mail, anchors, and template placeholders
    if (
      link.startsWith("http://") ||
      link.startsWith("https://") ||
      link.startsWith("mailto:") ||
      link.startsWith("tel:") ||
      link.startsWith("#") ||
      link.includes("{{") ||
      link.includes("}}")
    ) {
      continue;
    }
    links.push(link);
  }
  return links;
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function checkFile(filePath) {
  const md = await fs.readFile(filePath, "utf8");
  const links = extractLinks(md);
  const broken = [];

  for (const link of links) {
    // anchor を除去
    const clean = link.split("#")[0];
    if (!clean) continue; // pure anchor

    // 相対パスを絶対パスに
    const target = path.resolve(path.dirname(filePath), clean);
    if (!(await exists(target))) {
      broken.push({ link, target });
    }
  }

  return broken;
}

async function main() {
  const start = Date.now();
  console.log("🔗 Checking Markdown links...");
  console.log(`   ROOT: ${ROOT}`);

  const files = await walk(ROOT);
  console.log(`   Found ${files.length} Markdown files`);

  let totalBroken = 0;
  const brokenByFile = {};

  for (const file of files) {
    const broken = await checkFile(file);
    if (broken.length > 0) {
      brokenByFile[path.relative(ROOT, file)] = broken;
      totalBroken += broken.length;
    }
  }

  if (totalBroken === 0) {
    console.log(`✅ All links OK (${files.length} files checked) in ${((Date.now() - start) / 1000).toFixed(1)}s`);
    process.exit(0);
  }

  console.log(`\n❌ Found ${totalBroken} broken links:\n`);
  for (const [file, broken] of Object.entries(brokenByFile)) {
    console.log(`  ${file}`);
    for (const { link, target } of broken) {
      console.log(`    ✗ ${link}`);
      console.log(`      → ${path.relative(ROOT, target)} (not found)`);
    }
  }

  console.log(`\n${((Date.now() - start) / 1000).toFixed(1)}s elapsed`);
  process.exit(1);
}

main().catch((err) => {
  console.error("❌ Link check failed:", err);
  process.exit(1);
});
