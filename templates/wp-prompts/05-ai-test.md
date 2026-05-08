# 公開後 AI 自動テストプロンプト（5-AI）

> [`handbook/04-wp-publish-guide.md`](../../handbook/04-wp-publish-guide.md) Step 5-AI から呼び出される AI 指示文。
> このテンプレートをそのままコピーして {{プレースホルダ}} を埋め、Claude Code に貼り付ける。

---

公開URL `{{公開URL}}` を Playwright で全自動テストしてください。

## チェック項目

1. 全リンクをクリック → 404・遷移先のズレを検出
2. 全ボタン（CTA・予約・問い合わせ・印刷）の動作確認
3. 電話（`tel:`）／メール（`mailto:`）リンクの起動確認
4. ギャラリー: フィルター切替・ライトボックス開閉
5. 見積シミュレーター: プラン × 人数 × 設備 で金額が正しく変わるか
6. レスポンシブ: 320 / 375 / 414 / 768 / 1024 / 1280 / 1920 px の各幅でレイアウト崩れチェック（各幅でフルページスクショ取得）
7. Lighthouse スコア（モバイル＋デスクトップ）
8. ブラウザコンソールエラーの有無

## 合格基準

- すべてのリンク 200 OK／想定先に遷移
- すべてのCTA・ボタンが動作OK
- レスポンシブ 全幅でレイアウト崩れなし
- Lighthouse モバイル パフォーマンス 70以上 ／ LCP 2.5秒以内
- コンソールエラー 0件

## レポート出力先

`{{案件フォルダ}}/公開作業/AIテストレポート_{{YYYYMMDD}}.md`
（V/ENTER WEB事業部の場合: `02_事業部別_EnterWebAI_AIWebサイト制作` 配下のクライアント別フォルダ）

NG項目があれば、該当箇所のスクリーンショットも添付してレポートに記載してください。

---

## AIテスト後の動き方

1. AIテストレポート_YYYYMMDD.md をDriveで開く
2. 全項目「OK」なら → [`handbook/04-wp-publish-guide.md`](../../handbook/04-wp-publish-guide.md) Step 5-8 へ進む
3. 「NG」項目があれば、原因と該当箇所をレポートで確認
   - **軽微な崩れ** → Step 4-4「編集欄をクリア」 → Step 2-3 の本文バックアップを貼り戻す → 「更新」
   - **致命的不具合** → Step 2-1 の `.wpress` バックアップから All-in-One WP Migration で復元
4. 修正後、もう一度 5-AI のAIテストを実行。すべてOKになるまで繰り返す

## トラブルシューティング

- Playwright モジュールが Codex 環境で読み込めない場合: [`troubleshooting/playwright-failures.md`](../../troubleshooting/playwright-failures.md)
- Lighthouse が遅い・タイムアウトする場合: 画像最適化が不十分な可能性。再圧縮（TinyPNG / Squoosh）→ WebP変換
