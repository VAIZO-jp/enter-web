# 06 — Day1 オンボーディングチェックリスト

> 新規メンバーが V/ENTER WEB 事業部に参加した最初の日に、上から順に進めれば1日で稼働可能になる。

---

## ⚠️ Phase 0 完了前の制約

業務委託・外部協力者向けの一部項目は、以下の Phase 0 タスク完了後に解禁される：

- [ ] 顧問社労士レビュー（タイムシート方針）
- [ ] 顧問弁護士レビュー（業務委託契約書・瑕疵担保条項）

詳細: [`handbook/00-overview.md`](./00-overview.md) §6 および メモリ `project_vaizo_web_ops.md`

---

## Day 1: アカウント・ツール準備（午前）

### 必須アカウント

- [ ] **GitHub** アカウント作成 → `VAIZO-jp` org への招待を受領
- [ ] **Slack** ワークスペース `vaizo-one-team.slack.com` への招待を受領
- [ ] **Google Workspace**（@vaizo.jp ドメイン）アカウント受領
- [ ] **1Password Teams** Vault招待を受領（Phase 1 完了後）
- [ ] **Plaud** 個別アカウント作成
- [ ] **Tactiq** 個別アカウント作成

### 開発環境（実装担当者のみ）

- [ ] Node.js 20以上 + npm
- [ ] OpenAI Codex CLI: `npm install -g @openai/codex` → `codex login`（ChatGPT Plus以上必要）
- [ ] Claude Code CLI: 公式手順に従いインストール → ログイン（Claude Pro以上）
- [ ] Git 設定（`user.name`, `user.email`）
- [ ] エディタ（VS Code推奨、Cursor可）
- [ ] 1Password CLI（任意、シークレット参照を効率化）

### 本リポジトリのクローン

```bash
gh repo clone VAIZO-jp/enter-web
cd enter-web
```

または

```bash
git clone https://github.com/VAIZO-jp/enter-web.git
cd enter-web
```

---

## Day 1: ドキュメント確認（午後）

### 30分で読むべき5本

- [ ] [`README.md`](../README.md)（このリポジトリの入口）
- [ ] [`MAP.md`](../MAP.md)（データ保存場所・アクセス地図）★最重要
- [ ] [`handbook/00-overview.md`](./00-overview.md)（事業全体像）
- [ ] [`handbook/02-design-policy.md`](./02-design-policy.md)（VAIZO Design Policy）
- [ ] [`handbook/03-codex-claude-workflow.md`](./03-codex-claude-workflow.md)（実装ワークフロー）

### 役割別の追加読書（1〜2時間）

#### 営業担当の場合

- [ ] [`handbook/01-sales-process.md`](./01-sales-process.md)
- [ ] [`handbook/05-vulnerability-scan.md`](./05-vulnerability-scan.md)（**最重要**：法的・道義的ライン）
- [ ] [`decision-trees/vulnerability-target.md`](../decision-trees/vulnerability-target.md)
- [ ] [`templates/client-emails/`](../templates/client-emails/) 全雛形

#### 制作担当の場合

- [ ] [`handbook/04-wp-publish-guide.md`](./04-wp-publish-guide.md)（**最重要**：5ステップ公開手順）
- [ ] [`templates/codex-prompts/TEMPLATE.md`](../templates/codex-prompts/TEMPLATE.md)
- [ ] [`templates/codex-prompts/`](../templates/codex-prompts/) 業態別雛形を全て眺める
- [ ] [`decision-trees/wp-integration-method.md`](../decision-trees/wp-integration-method.md)
- [ ] [`runbooks/deploy-day.md`](../runbooks/deploy-day.md)

#### CTO/技術リード補佐の場合

- 上記すべて + 全 [`troubleshooting/`](../troubleshooting/) ファイル

---

## Day 1: 実機検証（夕方）

### 営業担当

- [ ] [`handbook/05-vulnerability-scan.md`](./05-vulnerability-scan.md) のパッシブスキャンツール3つを自分のサイト（`vaizo.jp` 等の許可サイト）で試す
  - securityheaders.com
  - Mozilla Observatory
  - SSL Labs
- [ ] スコア確認、レポートのスクショを取る
- [ ] [`templates/client-emails/`](../templates/client-emails/) の脆弱性レポート添付メール雛形を読み、文体に違和感がないか確認

### 制作担当

- [ ] Codex CLI で「Hello World HTML」を生成してみる
  ```bash
  mkdir codex-hello && cd codex-hello
  echo "シンプルなHTMLでHello Worldと表示するindex.htmlを作って" > codex_prompt.md
  codex exec --skip-git-repo-check --cd "$PWD" --output-last-message "./codex_out.md" "$(cat ./codex_prompt.md)"
  cat codex_out.md
  ```
- [ ] 生成された `index.html` をブラウザで開いて確認
- [ ] Claude Code に「このHTMLをVAIZO Design Policyに沿って修正して」と依頼してみる
- [ ] [`troubleshooting/codex-cli-issues.md`](../troubleshooting/codex-cli-issues.md) を読み、無音失敗のパターンを把握

---

## Day 1: Slack 挨拶投稿

- [ ] `#事業部別_enter-ai`（C0ARXUP0L21）に挨拶投稿
  - 自己紹介（役割、得意領域、これまでの経験）
  - Day1で気になった点・質問
  - 困ったときの連絡方法
- [ ] `#all-株式会社vaizo`（C0AP8VAUYSE）にも自己紹介投稿（任意）

---

## Day 2 以降: 段階的アサイン

### Day 2-3: 既存案件の観察

- [ ] 仙台レトロバックページ（[retro-backpage.com](https://retro-backpage.com/)）の Drive フォルダ（`1c8VIDSkvo6jI1ahjuE3tWdS0qYN2fQcx`）を読む
- [ ] BAR NOIR デモ（Drive `1GAvzoiZejlZIUKd0bY0rPhIdRZhM_9Jb`）の `codex_prompt.md` `codex_out.md` `index.html` を読む
- [ ] 公開済サイトで [`troubleshooting/mailto-regression.md`](../troubleshooting/mailto-regression.md) の事故再発防止策を読む

### Day 4-5: 練習案件

- [ ] 自分の知人・家族のサイトで（許可を得て）脆弱性スキャン → デモ作成 → レビュー（実際のクライアントには送らない）
- [ ] CTOにレビュー依頼

### Week 2: 最初の本番案件アサイン

- [ ] [`runbooks/new-client-kickoff.md`](../runbooks/new-client-kickoff.md) に従って案件キックオフ
- [ ] CTOがメンターとして付き、各ステップで都度チェック

---

## 困ったとき

| 何に困った | どうする |
|----------|---------|
| 操作で詰まった | まずAIに聞く（[`handbook/04-wp-publish-guide.md`](./04-wp-publish-guide.md) 大前提） |
| 判断に迷う | [`decision-trees/`](../decision-trees/) を見る |
| エラー・故障 | [`troubleshooting/`](../troubleshooting/) を見る |
| 上記でも解決しない | 案件CTO（櫻井理也）にSlack DM、もしくは `#事業部別_enter-ai` でメンション |
| 緊急 | 橋本CEO（電話番号は1Password共有）|

---

## 30日後の振り返り

- [ ] 最初に詰まったポイントを整理して [`troubleshooting/`](../troubleshooting/) に追記PR
- [ ] このオンボーディング手順で「分かりにくかった」点を本ファイルへの改善PR
- [ ] CTOと1on1（30分）

新規メンバーがこの手順を完了したら、本ファイル末尾に名前と日付をチェックインします（PRで本人が記入）：

```markdown
## オンボーディング完了者

- 2026-05-XX: 〇〇〇〇（役割）
```
