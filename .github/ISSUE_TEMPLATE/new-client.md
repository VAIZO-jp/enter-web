---
name: 新規案件
about: 新規クライアントの案件起票
title: '[XXX] {{案件正式名称}} Webサイトリニューアル'
labels: 'type:team, enter-web, status:in-progress'
assignees: ''
---

## 案件概要

- **案件略号**: `XXX`（3〜4文字、例: `RBP`、`BNR`）
- **正式名称**: 株式会社XXX
- **業態**: バー / 飲食 / ライブハウス / コーポレート / 店舗 / その他
- **業種ランク**: S / A / B
- **公開URL予定**: https://example.com/...
- **公開希望日**: YYYY-MM-DD
- **予算**: ¥XXX,XXX
- **クライアント担当者**: 氏名
- **クライアント決定権者**: 氏名

## チーム

- **案件CTO**: @SakuraiRiya
- **担当開発者**: @{{担当者}}

## 関連リンク

- **Drive 案件フォルダ**: `02_事業部別_EnterWebAI_AIWebサイト制作/{{正式名称}}/`（フォルダID: `{{ID}}`）
- **GitHub 成果物 Repo**: `VAIZO-jp/{{案件略号}}-site`（必要時に作成）
- **1Password Vault**: `Client-{{案件略号}}`（Phase 1完了後）

## キックオフチェックリスト

[`runbooks/new-client-kickoff.md`](../../runbooks/new-client-kickoff.md) に従って進める。

- [ ] 案件番号・命名
- [ ] Drive フォルダ作成
- [ ] GitHub Issue 起票（このIssue）
- [ ] 1Password Vault 作成
- [ ] 契約・見積書送付
- [ ] キックオフMTG設定
- [ ] 必要情報・素材の受領計画
- [ ] デザイン提案
- [ ] 採用案決定〜本制作開始
- [ ] 公開作業

## 受領待ち（クライアントから）

### 必須3点（WP管理）
- [ ] WordPress管理画面ログインURL
- [ ] 管理者ID
- [ ] 管理者パスワード

### 周辺アカウント（優先度A）
- [ ] ドメイン管理画面の権限
- [ ] レンタルサーバー管理画面
- [ ] Google Analytics 4 管理者権限
- [ ] Google Search Console 権限
- [ ] Google Tag Manager 管理者権限
- [ ] Google広告アカウント管理者権限（運用案件のみ）
- [ ] Google ビジネスプロフィール管理者権限（MEO案件のみ）

### 素材
- [ ] ロゴデータ（AI / SVG / 高解像度PNG）
- [ ] 写真・画像（圧縮前の元データ）
- [ ] 文章原稿
- [ ] 既存サイトの構造資料

## スケジュール

| マイルストーン | 予定日 |
|------------|------|
| キックオフ | YYYY-MM-DD |
| 提案 | YYYY-MM-DD |
| 採用案決定 | YYYY-MM-DD |
| 本制作 | YYYY-MM-DD |
| デモ確認 | YYYY-MM-DD |
| 公開 | YYYY-MM-DD |
| 公開後30日レポート | YYYY-MM-DD |

## 関連メモ

- 公開手順: [`handbook/04-wp-publish-guide.md`](../../handbook/04-wp-publish-guide.md)
- 公開当日 runbook: [`runbooks/deploy-day.md`](../../runbooks/deploy-day.md)
