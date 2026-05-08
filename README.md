# V/ENTER WEB 事業部ハンドブック

> AI（Claude Code + Codex CLI）でWebサイトを高速・高品質に作るための、実務用一元ドキュメント。

このリポジトリは **「未経験者 + AIエージェント」が見れば即動ける** ことを目標に作られています。
迷ったら [`MAP.md`](./MAP.md) と [`handbook/`](./handbook/) を最初に開いてください。

---

## 30秒で分かる V/ENTER WEB

- **株式会社VAIZO の事業部** の一つ。Webサイト制作を中心事業とする
- 主軸は **AI活用Web制作**：Claude Code（司令塔）× Codex CLI（実装ドラフト）の分業
- 営業手法は **カスタマイズデモ + 脆弱性レポート + デザインアイデンティティ** の三点セット送付（月次300件規模）
- ターゲット業態：**飲食店・バー・ライブハウス・ホームページ業者制作の店舗サイト**
- 公開実例：[retro-backpage.com](https://retro-backpage.com/)（仙台レトロバックページ様、2026-04-30公開）

公式サイト [vaizo.jp](https://vaizo.jp) には現時点で Enter Web の記載がないため、対外的な事業概要も社内向けには [`handbook/00-overview.md`](./handbook/00-overview.md) で補完しています。

---

## Day1 セットアップ（5分）

1. **このREADMEを読み終える**（今ここ）
2. **[`MAP.md`](./MAP.md) を開く** — Drive/Slack/1Password など、全ての情報の在処が1枚にまとまっています
3. **[`handbook/06-onboarding.md`](./handbook/06-onboarding.md) を開く** — Day1チェックリストに沿ってアカウント・ツール準備
4. **Slack `事業部別_enter-ai`（C0ARXUP0L21）に挨拶投稿**
5. **最初の案件にアサインされたら [`runbooks/new-client-kickoff.md`](./runbooks/new-client-kickoff.md) に従う**

---

## ナビゲーション

| 何をしたい | どこを開く |
|-----------|----------|
| 何がどこにあるか知りたい | [`MAP.md`](./MAP.md) |
| 事業の全体像を知りたい | [`handbook/00-overview.md`](./handbook/00-overview.md) |
| 営業プロセスを知りたい | [`handbook/01-sales-process.md`](./handbook/01-sales-process.md) |
| デザインルールを知りたい | [`handbook/02-design-policy.md`](./handbook/02-design-policy.md) |
| Claude × Codex の使い分け | [`handbook/03-codex-claude-workflow.md`](./handbook/03-codex-claude-workflow.md) |
| WordPressに公開する手順 | [`handbook/04-wp-publish-guide.md`](./handbook/04-wp-publish-guide.md) |
| 脆弱性レポートの送付ルール | [`handbook/05-vulnerability-scan.md`](./handbook/05-vulnerability-scan.md) |
| 新規メンバーのDay1 | [`handbook/06-onboarding.md`](./handbook/06-onboarding.md) |
| 新規案件の立ち上げ | [`runbooks/new-client-kickoff.md`](./runbooks/new-client-kickoff.md) |
| 公開当日の段取り | [`runbooks/deploy-day.md`](./runbooks/deploy-day.md) |
| 公開後30日のフォロー | [`runbooks/post-launch-30days.md`](./runbooks/post-launch-30days.md) |
| Codex に渡すプロンプト | [`templates/codex-prompts/`](./templates/codex-prompts/) |
| クライアント宛メール雛形 | [`templates/client-emails/`](./templates/client-emails/) |
| 何かに迷った（判断基準） | [`decision-trees/`](./decision-trees/) |
| 何か壊れた・詰まった | [`troubleshooting/`](./troubleshooting/) |

---

## AIエージェント向けの読み方

このリポジトリはAIエージェント（Claude Code、Codex CLI）が読み込んで作業の参照元として使うことを想定しています。

**推奨読み込み順（コンテキスト効率重視）:**
1. `README.md`（このファイル）
2. `MAP.md`（全体像）
3. 当該タスクに関係する `handbook/` の該当章
4. 当該タスクのテンプレ（`templates/`）
5. 詰まったら `troubleshooting/` と `decision-trees/`

**AIエージェントが守ること:**
- 仕様外の機能を勝手に追加しない
- TODOで埋めず、その場で完成させる
- **軍事比喩・否定列挙・採用語・階層用語は使わない**（[`handbook/02-design-policy.md`](./handbook/02-design-policy.md) 参照）
- V/ブランド表記は **半角スラッシュ「/」のみ**
- メールアドレスは `info@vaizo.jp` を使用（`.co.jp` は使わない）
- 飲食/店舗案件は **電話・LINE のCTAを必ず常設**
- 本文 17px / テーブル 15px / 行間 1.9 厳守

---

## コントリビュート

このリポジトリは **VAIZO worklog 運用と地続き** です。

- Issue: 新規案件は `.github/ISSUE_TEMPLATE/new-client.md` で起票
- Branch命名: `feature/<issue-num>-<slug>` または `personal/<issue-num>-<slug>`
- PR: `pull_request_template.md` に従う
- レビュー: CODEOWNERS で自動アサインされる人がレビュー
- 文書改善は `.github/ISSUE_TEMPLATE/doc-improvement.md` で歓迎

slash command は VAIZO repo 側の `/worklog-start` `/worklog` を併用可。

---

## ライセンス・公開ポリシー

本リポジトリは **Private**。VAIZO-jp organization のメンバーのみアクセス可能。
業務委託メンバー（OneBe等）への共有は橋本CEO承認後、必要なディレクトリのみ Outside Collaborator として招待する運用。

## 連絡先

- 事業部全体・営業: 橋本友太郎（CEO）
- 技術・手順書・本リポジトリ: 櫻井理也（CTO）
- 制作担当: 櫻井みどり、小野寺陸斗
- 業務委託パートナー: OneBe（[`handbook/00-overview.md`](./handbook/00-overview.md) 参照）

詳細は [`MAP.md`](./MAP.md) の「担当者連絡先」セクション。
