# Codex CLI トラブルシューティング

> [`handbook/03-codex-claude-workflow.md`](../handbook/03-codex-claude-workflow.md) の補足。

---

## 1. 無音失敗（最も多い）

### 症状

`codex exec` を実行しても、出力ファイル（`codex_out.md`）が空・もしくは作られない。エラーメッセージも出ない。

### 原因

ChatGPT セッションが切れている。

### 対処

```bash
# 1. バージョン確認（疎通確認）
codex --version

# 2. 再ログイン
codex login
# → ブラウザが開く → ChatGPT アカウントでログイン

# 3. もう一度 exec
codex exec --skip-git-repo-check --cd "$PWD" --output-last-message "./codex_out.md" "$(cat ./codex_prompt.md)"
```

### 予防策

各案件の起動前に毎回 `codex --version` を打つ。

---

## 2. `--cd` 未指定で意図しないディレクトリが編集される

### 症状

Codex が案件と無関係の場所（ホームディレクトリ等）にファイルを作成する。

### 原因

`--cd` オプションを付け忘れ、Codex の現在ディレクトリが意図しない場所だった。

### 対処

```bash
# 必ず --cd "$PWD" を付ける
codex exec --skip-git-repo-check --cd "$PWD" --output-last-message "./codex_out.md" "$(cat ./codex_prompt.md)"
```

PowerShell の場合:

```powershell
codex exec `
  --skip-git-repo-check `
  --cd "$PWD" `
  --output-last-message ".\codex_out.md" `
  (Get-Content .\codex_prompt.md -Raw)
```

---

## 3. 対話モードに入って制御不能

### 症状

`codex` を引数なしで起動するとREPL（対話モード）に入り、Claude Code から制御できない。

### 対処

必ず `codex exec`（非対話モード）を使う。`exec` を忘れない。

```bash
# NG: 対話モードに入る
codex "..."

# OK: 非対話モード
codex exec --skip-git-repo-check --cd "$PWD" --output-last-message "./codex_out.md" "..."
```

---

## 4. Playwright モジュールが読み込めない

### 症状

Codex が出力したコード末尾に「Playwright確認は環境で `playwright` モジュールを読み込めず未実施です」と書かれる。

### 原因

Codex CLI のサンドボックス環境内に Playwright がインストールされていない。

### 対処

Playwright によるブラウザ確認は **Claude Code 側 + Playwright MCP** で実行する。Codex 側ではドラフト生成のみに留める。

```
1. Codex は HTML/CSS/JS を生成するのみ
2. Claude Code が Playwright MCP を使ってブラウザで確認
3. スクショ・コンソールエラー検出は Claude 側で
```

詳細: [`troubleshooting/playwright-failures.md`](./playwright-failures.md)

---

## 5. ChatGPT Plus 容量枯渇

### 症状

`codex exec` を打つと「Rate limit exceeded」「Quota exceeded」のようなエラー。

### 対処

[`handbook/03-codex-claude-workflow.md`](../handbook/03-codex-claude-workflow.md) §9 のフォールバック順:

1. **Claude Opus 4.7 で直接実装**（VAIZER 1名 月 $20 で利用可能）
2. それも不可なら **Gemini 3.1 Pro Preview** をフォールバック

容量回復は通常 24時間後。緊急ならClaude/Geminiに切替。

---

## 6. モデル切替

### 操作

Codex セッション内で `/model` コマンド：

```
/model gpt-5.4-mini    # 軽量・高速
/model gpt-5.4         # デフォルト
/model gpt-5.4-pro     # 最高品質
/model gpt-5.3-codex   # コーディング特化
```

### 推奨

| タスク | 推奨モデル |
|-------|----------|
| FV1画面・小規模実装 | `gpt-5.4-mini` |
| LP全セクション・複雑な構造 | `gpt-5.4` |
| 最高品質が必要 | `gpt-5.4-pro` |

詳細: [`handbook/03-codex-claude-workflow.md`](../handbook/03-codex-claude-workflow.md) §8

---

## 7. プロンプトが守られない（仕様外の機能を勝手に追加する）

### 症状

「フォームを追加しないで」と書いたのに追加された。

### 対処

プロンプト末尾に **明示的に再強調** する：

```
## 厳守事項（最優先）

- 仕様外の機能を勝手に追加しない
- 特に: フォーム、モーダル、SNSアイコン羅列、お問い合わせウィジェットは追加しない
- 追加が必要と思っても、まず判断を Claude（司令塔）に戻す
```

そもそも [`templates/codex-prompts/TEMPLATE.md`](../templates/codex-prompts/TEMPLATE.md) に「守ってほしいこと」セクションがあるので、これをコピペして使うこと。

---

## 8. 出力が長すぎてコピペできない

### 対処

`--output-last-message` オプションでファイル出力させる：

```bash
codex exec --skip-git-repo-check --cd "$PWD" --output-last-message "./codex_out.md" "..."
cat codex_out.md
```

---

## 関連ドキュメント

- [`handbook/03-codex-claude-workflow.md`](../handbook/03-codex-claude-workflow.md)
- [`templates/codex-prompts/TEMPLATE.md`](../templates/codex-prompts/TEMPLATE.md)
- [`troubleshooting/playwright-failures.md`](./playwright-failures.md)
