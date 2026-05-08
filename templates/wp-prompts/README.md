# WP プロンプト集

[`handbook/04-wp-publish-guide.md`](../../handbook/04-wp-publish-guide.md) の各ステップから呼び出される AI 指示文を独立化したファイル群。

| ファイル | 呼び出し元ステップ | 用途 |
|---------|-----------------|------|
| [`04-pre-audit.md`](./04-pre-audit.md) | Step 4-pre | 移行前の事前監査（A〜J項） |
| [`04-0-optimize.md`](./04-0-optimize.md) | Step 4-0 | WP最適化版作成・デモ環境構築 |
| [`05-ai-test.md`](./05-ai-test.md) | Step 5-AI | 公開後のPlaywright全自動テスト |

各ファイルは「そのままコピーして {{プレースホルダ}} を埋めれば AIに投げられる」状態を保つこと。
