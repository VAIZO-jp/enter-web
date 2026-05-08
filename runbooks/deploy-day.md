# Runbook：公開当日の段取り

> [`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) の5ステップを実行する当日のタイムライン版。

---

## 公開当日の標準スケジュール（半日想定）

### 09:00 — 朝の確認

- [ ] [`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) Step 1 の事前準備チェックリストを再確認
- [ ] クライアントとの「最終確認OK」が記録に残っているか確認
- [ ] WP管理画面に正常ログインできるか確認
- [ ] 必要な情報・素材が全て揃っているか確認

### 09:30 — バックアップ取得（最重要）

- [ ] All-in-One WP Migration エクスポート（`.wpress`）
- [ ] WordPress 標準XMLエクスポート
- [ ] 編集対象ページの本文テキスト保存
- [ ] 3ファイルすべてを Drive `公開作業/バックアップ_{{YYYYMMDD}}/` に保存
- [ ] **3つ揃ってから次に進む**（鉄則）

詳細: [`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) Step 2

### 10:00 — 画像アップロード

- [ ] 圧縮・リネーム済みの最終版画像を Drive からダウンロード
- [ ] WordPress メディアライブラリに10〜15枚ずつ分けてアップロード
- [ ] アップロード完了確認（緑のチェックマーク）

詳細: [`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) Step 3

### 11:00 — WP最適化版作成 + デモ確認

- [ ] [`templates/wp-prompts/04-pre-audit.md`](../templates/wp-prompts/04-pre-audit.md) で事前監査実行
- [ ] 統合方式を確定（[`decision-trees/wp-integration-method.md`](../decision-trees/wp-integration-method.md)）
- [ ] [`templates/wp-prompts/04-0-optimize.md`](../templates/wp-prompts/04-0-optimize.md) で最適化版作成
- [ ] GitHub プライベートリポジトリ + staticrypt でデモ環境構築
- [ ] クライアント確認用デモを共有
- [ ] 開発確認用デモ（ローカルWP or ステージング）でテーマ統合確認

詳細: [`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) Step 4-pre, 4-0

### 13:00 — 本番反映（昼食後）

- [ ] WP最適化版HTMLをダウンロード（GitHub から Raw コピー）
- [ ] 編集対象ページの編集画面を開く
- [ ] 本文枠を Ctrl+A → Delete でクリア
- [ ] Ctrl+V で貼り付け
- [ ] プレビューで見た目確認（PCとスマホ）
- [ ] 「更新」ボタンクリック → 本番反映完了

詳細: [`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) Step 4-1〜4-7

### 13:30 — 公開直後の確認

- [ ] 公開URL を別タブで開く
- [ ] Ctrl+F5 でスーパーリロード
- [ ] PCとスマホ両方で表示確認

### 14:00 — Playwright 全自動テスト

- [ ] [`templates/wp-prompts/05-ai-test.md`](../templates/wp-prompts/05-ai-test.md) のプロンプトを Claude Code に投げる
- [ ] 全リンク・全CTA・レスポンシブ・Lighthouse・コンソールエラーを自動チェック
- [ ] レポートを Drive `公開作業/AIテストレポート_{{YYYYMMDD}}.md` に保存
- [ ] **全項目OKを確認してから次へ**

詳細: [`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) Step 5-AI

### 14:30 — メール宛先テスト送信（リード喪失防止）

- [ ] 本番ページの問い合わせフォームでテスト送信
- [ ] クライアントに「いまテストメールを送ったので受信を確認してください」と Slack/電話
- [ ] クライアントから「届いた」の返信を待つ
- [ ] 届かない場合はフォーム設定確認 → 修正 → 再送信
- [ ] 受信スクショを案件フォルダに保存

詳細: [`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) Step 5-メール

### 15:00 — 公開完了報告

- [ ] [`templates/client-emails/delivery-completion.md`](../templates/client-emails/delivery-completion.md) で完了報告メール作成
- [ ] 添付：公開後スクショ（PC/スマホ）、AIテストレポートサマリ
- [ ] クライアントに送信
- [ ] [`templates/delivery-reports.md`](../templates/delivery-reports.md) で社内記録を Drive に保存
- [ ] Slack `#事業部別_enter-ai` で完了アナウンス
- [ ] GitHub Issue を `status:completed` に更新、PR をマージ

### 15:30 — 振り返り

- [ ] 当日詰まった点を [`troubleshooting/`](../troubleshooting/) に追記候補としてメモ
- [ ] プロンプトの改善点を [`templates/codex-prompts/`](../templates/codex-prompts/) への追記候補としてメモ
- [ ] 後日 PR 起票

---

## 緊急時の対応

### 公開後にサイトが真っ白／500エラー

```
1. 慌てない。深呼吸。
2. All-in-One WP Migration の「インポート」を開く
3. 朝に取った .wpress バックアップをドラッグ＆ドロップ
4. 復元完了を待つ
5. 公開URLで表示確認
6. クライアントに即報告（「一時的に表示が乱れたが復旧した」）
7. 櫻井CTO + 橋本CEO に Slack DM
```

詳細: [`troubleshooting/wp-publish-issues.md`](../troubleshooting/wp-publish-issues.md)

### mailto: が動かない

```
1. 修正方法を確認 (troubleshooting/mailto-regression.md)
2. 修正後、Outlook / Gmail / Apple Mail で起動確認
3. スマホ実機（iOS Mail / Android Gmail）で起動確認
4. クライアントに修正完了報告
```

詳細: [`troubleshooting/mailto-regression.md`](../troubleshooting/mailto-regression.md)

---

## 関連ドキュメント

- [`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) — 5ステップ詳細
- [`runbooks/new-client-kickoff.md`](./new-client-kickoff.md) — キックオフ
- [`runbooks/post-launch-30days.md`](./post-launch-30days.md) — 公開後フォロー
