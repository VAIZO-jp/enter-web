# 03 — Claude Code × Codex CLI 運用ガイド

> Drive 版正本: Doc ID `1qWTpds1dU3CKTpmQYhXpxl6yNJO9RfVjNX6leYKxvas`（2026-05-07初版）
> 本ファイルが GitHub 正本。Drive 側は Phase 1 完了後 `MOVED_TO_GITHUB.md` リダイレクト化。

---

## 1. 役割分担（固定）

| 役割 | 担当 | 責任範囲 |
|------|------|---------|
| **司令塔** | Claude Code（Opus 4.7） | 仕様整理・計画・レビュー・統合・最終採否 |
| **実装ドラフト** | Codex CLI（GPT-5.4 medium） | 仕様に基づく初版コード生成のみ |

**異系統モデル分担の理由**: Anthropic と OpenAI の異系統に分けることで、単独LLMの偏り・見落としを相互補完できる。実装はCodex、設計判断と統合はClaude、と責任を分けることでレビュー観点が明確になる。

## 2. 前提セットアップ（VAIZER全員1回だけ）

```bash
npm install -g @openai/codex
codex login              # ChatGPT Plus以上のアカウントでブラウザログイン
codex --version          # 動作確認
```

## 3. 標準ワークフロー（Claude → Codex → Claude 直列厳守）

### ステップ1：仕様確定（Claude Code）

案件ディレクトリ直下の `brief.md` に以下を書き出す：

- 対象ファイル / コンポーネント
- 入出力仕様
- 制約（パフォーマンス・セキュリティ・ブランド規定）
- 完了条件 (DoD)

### ステップ2：Codex プロンプト組み立て（Claude Code）

[`templates/codex-prompts/`](../templates/codex-prompts/) から業態別雛形を選んでコピーし、`codex_prompt.md` として案件ディレクトリに保存。

### ステップ3：Codex 実行（PowerShell / bash）

```powershell
codex exec `
  --skip-git-repo-check `
  --cd "$PWD" `
  --output-last-message ".\codex_out.md" `
  (Get-Content .\codex_prompt.md -Raw)
```

bash 版:

```bash
codex exec \
  --skip-git-repo-check \
  --cd "$PWD" \
  --output-last-message "./codex_out.md" \
  "$(cat ./codex_prompt.md)"
```

**事前条件**:
- `codex --version` が動作
- `codex login` 済み
- セッション切れ時は **無音で失敗する** ため必ず疎通確認する（[`troubleshooting/codex-cli-issues.md`](../troubleshooting/codex-cli-issues.md)）

### ステップ4：差分レビュー（Claude Code）

- `codex_out.md` を Claude Code が読み込み、仕様充足性を判定
- 必要な修正は **Claude Code が直接 Edit で適用**（Codex に再投げしない、直列を崩さない）
- 採否理由はコミットメッセージまたはPR本文に明記

### ステップ5：自己検収

- Playwright MCP でローカル起動 → スクショ（375 / 768 / 1280）+ コンソールエラー確認
- VAIZO Design Policy 準拠の最終チェック（[`02-design-policy.md`](./02-design-policy.md)）
- web-cloner MCP の `audit_site` / `design_review` を通すと A11y / SEO / セキュリティも一括確認可能

## 4. 品質チェックリスト（採用前必須）

- [ ] 本文17px / テーブル15px / 行間1.9
- [ ] 飲食・店舗案件：電話 + LINE CTA を全ページ常設（追従バー含む）
- [ ] 否定列挙なし、「僕が改善したい」フレームで記述
- [ ] 軍事比喩・採用語・階層用語なし
- [ ] V/ブランド表記は半角スラッシュ「/」のみ
- [ ] メールは `info@vaizo.jp`、`.co.jp` 不使用
- [ ] アイキャッチ + 本文画像が完全に揃っている
- [ ] コンソールエラーゼロ
- [ ] LCP / CLS の悪化なし

## 5. 案件ファイルの保存先

- 案件作業ディレクトリ: `02_事業部別_EnterWebAI_AIWebサイト制作/{案件正式名称}/` 配下
- `brief.md` `codex_prompt.md` `codex_out.md` は案件直下に保管
- 完成成果物（Vercel Preview URL、最終ZIP、納品物）も案件直下
- ナレッジ・テンプレ更新は本リポジトリへPR（複製を作らない）

## 6. ローカル一時生成の扱い

やむを得ずローカルで実行する場合（codex CLI実行など）、作業完了後にDriveまたはGitHubへアップして必ずローカル削除する。
実行スクリプト本体は `mcp_*` 配下例外を活用してよいが、**案件成果物・テンプレ・指示書は GitHub または Drive が正本**。

## 7. 落とし穴と対策

| 落とし穴 | 対策 |
|---------|------|
| Codex 対話モードはClaude Codeから制御不能 | 必ず `codex exec`（非対話） |
| ChatGPTセッション切れ時は無音失敗 | 起動前に `codex --version` で疎通確認、[`troubleshooting/codex-cli-issues.md`](../troubleshooting/codex-cli-issues.md) |
| Claude と Codex の並行編集はファイル競合 | **Claude → Codex → Claude の直列**を厳守 |
| `--cd` 未指定だと意図しない場所を編集される | 案件ディレクトリ固定を徹底 |
| Playwright モジュール未読込（codex環境） | 別環境で実行、もしくは Playwright MCP を Claude側から起動 |

## 8. モデル選択ガイド

| タスク | 推奨モデル |
|-------|----------|
| FV1画面・小規模実装 | `gpt-5.4-mini`（コスト効率） |
| LP全セクション・複雑な構造 | `gpt-5.4`（デフォルト） |
| 最高品質が必要 | `gpt-5.4-pro` |
| エージェントコーディング統合 | `gpt-5.3-codex` |
| リアルタイム高速 | `gpt-5.3-codex-spark`（Pro限定） |

Codex セッション内で `/model` で切替可能。

## 9. 容量枯渇時のフォールバック

ChatGPT Plus の Codex 容量が枯渇したら：

1. **Claude Opus 4.7 で直接実装**（VAIZER 1名 月 $20 で利用可能）
2. それも不可なら **Gemini 3.1 Pro Preview** をフォールバック

容量管理: 各個人 ChatGPT 設定画面で残量確認。

## 10. 関連ドキュメント

- [`templates/codex-prompts/TEMPLATE.md`](../templates/codex-prompts/TEMPLATE.md)
- [`troubleshooting/codex-cli-issues.md`](../troubleshooting/codex-cli-issues.md)
- [`04-wp-publish-guide.md`](./04-wp-publish-guide.md) Step 4-0 で Codex を使う場面

---

**v1.0 — 2026-05-07初版（Drive版）**
**v1.1 — 2026-05-09 GitHub正本移管**
