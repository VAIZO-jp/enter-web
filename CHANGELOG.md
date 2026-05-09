# 変更履歴

[Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) 準拠。

## [Unreleased]

### Phase 2 で対応予定
- decision-trees のコンテンツ充実（A〜Dフロー詳細図）
- runbooks/new-client-kickoff.md の30項目精緻化
- KPIダッシュボード設計ドキュメント

### Phase 3 で対応予定
- GitHub Actions による Playwright 自動テスト CI
- 月次300件規模のKPIダッシュボード自動集計
- 新規案件 Issue 起票時に Drive / 1Password Vault 自動作成

---

## [0.2.0] — 2026-05-09（夜・追加分）

### Added
- `LICENSE`（All Rights Reserved with VAIZO Inc.）
- `SECURITY.md`（脆弱性報告先）
- `CONTRIBUTING.md`（コントリビュート手順）
- `CHANGELOG.md`（本ファイル）
- `.editorconfig`（エディタ統一）
- `handbook/07-knowledge-management.md`（ナレッジ更新運用）
- `handbook/08-finance-billing.md`（経理・請求フロー）
- `handbook/09-client-offboarding.md`（クライアントオフボーディング）
- `templates/client-emails/estimate.md`（見積送付メール）
- `templates/client-emails/invoice.md`（請求書送付メール）
- `templates/client-emails/contract.md`（契約書送付メール）
- `templates/client-emails/kickoff.md`（キックオフ案内メール）
- `runbooks/incident-response.md`（クレーム・障害発生時の対応）
- `decision-trees/contract-type.md`（契約形態の選択）
- `scripts/check-links.mjs`（Markdown内リンク切れ検出）
- `scripts/serve.mjs`（ローカルプレビューサーバー）
- `assets/icons/favicon.svg`（VAIZO Editorial favicon）
- `docs/404.html`（カスタム404ページ・自動生成）

### Changed
- `handbook/01-sales-process.md` 本文を骨格→詳細に拡張
- `templates/client-emails/proposal.md` 本文を骨格→詳細に拡張
- `scripts/build.mjs` 改善：個別ページにOGP/title/description埋め込み、404 と favicon の自動配置
- `README.md` に GitHub Pages バッジ・公開URL明記
- `package.json` に `lint:links` `serve` `dev` スクリプト追加

---

## [0.1.0] — 2026-05-09（初日）

### Added
- リポジトリ立ち上げ `VAIZO-jp/enter-web`（Public化）
- `README.md` `MAP.md`（最重要：データ保存場所・アクセス地図）
- `templates/wp-prompts/` 3本（04-pre-audit + 04-0-optimize + 05-ai-test）
- `templates/client-emails/` 3本（vulnerability-report-cover + proposal + delivery-completion）+ delivery-reports.md
- `decision-trees/` 4本（wp-integration-method + vulnerability-target + ai-vs-human + escalation）
- `runbooks/` 4本（new-client-kickoff + deploy-day + post-launch-30days + 1password-teams-setup）
- `.github/`（Issue 3テンプレ + PR + CODEOWNERS）
- `assets/css/vaizo-editorial.css`（白黒・Inter900+NotoSansJP700・17px本文・@page A4）
- `scripts/build.mjs`（Markdown→HTML→PDFビルダー）+ `package.json`
- GitHub Pages 公開（https://vaizo-jp.github.io/enter-web/）
