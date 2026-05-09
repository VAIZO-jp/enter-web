# コントリビュートガイド

> V/ENTER WEB ハンドブックの改善方法。VAIZER 全員と業務委託パートナーが対象。

## はじめに

このリポジトリは V/ENTER WEB事業部の **生きた運用文書** です。
案件で詰まった点・改善した点・新しい知見を、すぐに反映していくことが価値の源泉。

「これってどこに書いておけばいいんだっけ？」と思ったら、まず本ガイドを開いてください。

---

## どんな貢献を歓迎するか

### ✅ 大歓迎

- 案件で詰まった点を [`troubleshooting/`](./troubleshooting/) に追記
- AIに使ってみて良かったプロンプトを [`templates/codex-prompts/`](./templates/codex-prompts/) に追加
- 手順書の不足・分かりにくい箇所への改善提案
- 新規業態の Codex プロンプト雛形（飲食以外で需要があれば）
- 公開後の振り返りで得られた学び（[`runbooks/post-launch-30days.md`](./runbooks/post-launch-30days.md) のフォーマット）

### ⚠️ 慎重に

- VAIZO Design Policy ([`handbook/02-design-policy.md`](./handbook/02-design-policy.md)) の改訂 → CTO レビュー必須
- 営業ガイドライン ([`handbook/05-vulnerability-scan.md`](./handbook/05-vulnerability-scan.md)) の改訂 → CEO + 顧問弁護士レビュー必須
- 業務委託契約・タイムシート関連 → 顧問社労士レビュー後

### ❌ NG

- 機密情報（パスワード・APIキー・個人特定情報）の追加
- 軍事比喩・否定列挙・採用語・階層用語の使用（[`handbook/02-design-policy.md`](./handbook/02-design-policy.md) 参照）
- 既存のリンク構造を破壊する大規模リネーム（事前相談必須）

---

## 標準ワークフロー

### 1. Issue を起票

- バグ・誤字 → `.github/ISSUE_TEMPLATE/regression.md`
- 改善提案 → `.github/ISSUE_TEMPLATE/doc-improvement.md`
- 新規案件起票（運用） → `.github/ISSUE_TEMPLATE/new-client.md`

VAIZO worklog ([`reference_vaizo_worklog.md` メモリ参照](https://github.com/VAIZO-jp/VAIZO)) と地続きで、`personal/<issue>-<slug>` または `feature/<issue>-<slug>` 命名でブランチ作成。

### 2. ローカルでビルド

```bash
git clone https://github.com/VAIZO-jp/enter-web.git
cd enter-web
npm ci
npx playwright install chromium
npm run build
npm run preview      # ブラウザで dist を確認
```

### 3. PR を作成

`.github/pull_request_template.md` のチェックリストを埋める。

CODEOWNERS で自動レビュアーがアサインされる。

### 4. レビュー → マージ

- `type:personal` ラベル: 自己マージOK（リスクの低い変更）
- `type:team` ラベル: レビュアー承認必須

---

## 命名規則

### Markdown ファイル

- ハンドブック: `handbook/{NN}-{kebab-case}.md`（NNは2桁番号）
- テンプレ: `templates/{category}/{kebab-case}.md`
- ランブック: `runbooks/{kebab-case}.md`
- 判断ツリー: `decision-trees/{kebab-case}.md`
- トラブル: `troubleshooting/{kebab-case}.md`

### ブランチ

- `personal/{issue}-{slug}` — 個人タスク
- `feature/{issue}-{slug}` — チームタスク
- `fix/{issue}-{slug}` — バグ修正

### コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org/) に準拠：

```
<type>(<scope>): <subject>

<body>

<footer>
```

`type` の例:
- `feat:` 新機能追加
- `fix:` バグ修正
- `docs:` ドキュメント変更
- `style:` フォーマット
- `refactor:` リファクタリング
- `test:` テスト追加
- `chore:` ビルド・補助ツール
- `ci:` CI 設定

`scope` の例:
- `handbook` `templates` `runbooks` `troubleshooting` `decision-trees` `pages` `build`

例:
```
docs(handbook): 04-wp-publish-guide に SSL 確認手順を追加

公開前のSSL強制設定の確認手順がなかったため追加。
仙台レトロでhttps強制が漏れた事例の再発防止。

closes #42
```

---

## 文体ルール（VAIZO Design Policy）

詳細: [`handbook/02-design-policy.md`](./handbook/02-design-policy.md)

- 軍事比喩・否定列挙・採用語・階層用語は使わない
- 「〜していただきます」より「します」を優先
- V/ブランド表記は半角スラッシュ「/」のみ
- メール: `info@vaizo.jp`（`.co.jp` 不使用）

---

## ローカル開発の落とし穴

| 症状 | 対処 |
|------|------|
| `npm run build` が遅い（60秒+） | Playwright のフォントロード待ち。正常 |
| `playwright` モジュールが見つからない | `npx playwright install chromium` を実行 |
| HTML が docs/ に反映されない | キャッシュ。`rm -rf dist docs && npm run build` |
| CSS が効いていない | `assets/css/vaizo-editorial.css` 編集後に `npm run build` 必須 |

---

## 質問・相談

- Slack: `#事業部別_enter-ai`（C0ARXUP0L21）
- DM: 案件CTO 櫻井理也（@SakuraiRiya）
- 緊急: 橋本CEO（[`MAP.md`](./MAP.md) §担当者連絡先）
