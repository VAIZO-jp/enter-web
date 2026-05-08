# 公開完了報告テンプレート

> [`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) Step 5-8 で作成する社内記録。
> Driveの【案件フォルダ】／公開作業／公開記録_YYYYMMDD.md として保存する。

---

## ヘッダ

```yaml
---
案件名: {{クライアント正式名称}}
公開日時: {{YYYY-MM-DD HH:MM}}
担当開発者: {{氏名}}
案件CTO: {{氏名}}
公開URL: {{https://...}}
---
```

## 1. 公開作業概要

- **対象ページ**: {{固定ページ名 / LP / フルサイト}}
- **統合方式**: {{方式A / B / C / D}}（[`decision-trees/wp-integration-method.md`](../decision-trees/wp-integration-method.md) で選択した方式）
- **公開所要時間**: {{XX分}}
- **特記事項**: {{ある場合}}

## 2. バックアップ取得記録（Step 2）

| 種別 | ファイル名 | 取得時刻 | Drive保管URL |
|------|----------|---------|------------|
| 2-1 All-in-One WP Migration（.wpress） | `{{ファイル名}}.wpress` | {{HH:MM}} | {{URL}} |
| 2-2 標準XMLエクスポート | `{{ファイル名}}.xml` | {{HH:MM}} | {{URL}} |
| 2-3 本文テキスト | `{{slug}}_backup_{{YYYYMMDD}}.html` | {{HH:MM}} | {{URL}} |

リビジョン番号: `{{NN}}`（戻すとき使う）

## 3. AIテストレポート（Step 5-AI）

- レポート保管: `{{案件フォルダ}}/公開作業/AIテストレポート_{{YYYYMMDD}}.md`
- 結果サマリ:

| 項目 | 結果 | 備考 |
|------|------|------|
| 全リンク 404チェック | OK / NG | |
| 全ボタン動作 | OK / NG | |
| 電話・メールリンク起動 | OK / NG | |
| ギャラリー機能 | OK / NG / 該当なし | |
| レスポンシブ（320〜1920） | OK / NG | |
| Lighthouse モバイル パフォーマンス | {{スコア}} | 目標 70+ |
| Lighthouse LCP | {{秒}} | 目標 2.5秒以内 |
| コンソールエラー | {{件}} | 目標 0件 |

## 4. メール宛先テスト送信（Step 5-メール）

- [ ] テスト送信実施: {{HH:MM}}
- [ ] クライアント受信確認: {{HH:MM}}
- 受信スクショ: `{{案件フォルダ}}/公開作業/email_test_{{YYYYMMDD}}.png`

## 5. 手動チェック結果（Step 5-2 〜 5-7）

5-AI で全項目OKなら省略可。NG項目があれば手動で再確認した結果を記載。

| ステップ | 結果 |
|---------|------|
| 5-2 PCブラウザ見た目 | OK / NG |
| 5-3 スマホ表示 | OK / NG |
| 5-4 クリック・タップ | OK / NG |
| 5-5 独自機能 | OK / NG / 該当なし |
| 5-6 SEO・SNS表示 | OK / NG |
| 5-7 表示速度 | OK / NG |

## 6. 公開直後スクリーンショット

- PC表示: `{{案件フォルダ}}/公開作業/screenshot_pc_{{YYYYMMDD}}.png`
- スマホ表示: `{{案件フォルダ}}/公開作業/screenshot_mobile_{{YYYYMMDD}}.png`

## 7. クライアント連絡

- [ ] 公開完了報告メール送信: {{HH:MM}}（雛形: [`templates/client-emails/delivery-completion.md`](./client-emails/delivery-completion.md)）
- [ ] クライアント返信受領: {{YYYY-MM-DD HH:MM}}
- 返信内容サマリ: {{...}}

## 8. 公開後30日以内のフォロー予定

- [ ] 1週間後: パフォーマンス再測定（Lighthouse）
- [ ] 2週間後: GA4 / GSC でアクセス推移確認
- [ ] 30日後: クライアントとの振り返りMTG設定

詳細: [`runbooks/post-launch-30days.md`](../runbooks/post-launch-30days.md)

## 9. 学び・改善メモ

今回の案件で気づいた、次回以降に活かせる点：

- {{...}}

トラブルシューティングへの追記候補があれば [`troubleshooting/`](../troubleshooting/) へPR。
プロンプト改善があれば [`templates/codex-prompts/`](./codex-prompts/) へPR。

## 10. 関連ファイル

- 案件Drive: `{{案件フォルダ Drive ID}}`
- GitHub PR: `{{PR URL}}`
- VAIZO worklog Issue: `{{Issue URL}}`
