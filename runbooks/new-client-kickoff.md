# Runbook：新規案件キックオフ（30項目チェックリスト）

> 新規クライアントの案件アサイン直後、本リストを上から順に進める。
> 各項目に責任者・所要時間・成果物を明示。

---

## 1. 案件番号・命名（5分）

- [ ] 案件略号（3〜4文字）を決める（例: 仙台レトロ→`RBP`、BAR NOIR→`BNR`）
- [ ] 正式名称をクライアントから受領（株式会社○○、有限会社○○ 等）
- [ ] Slack `#事業部別_enter-ai` で案件発生を共有

担当: 案件CTO（櫻井理也）

## 2. Drive フォルダ作成（10分）

- [ ] `02_事業部別_EnterWebAI_AIWebサイト制作/` 配下に `{{正式名称}}/` フォルダ作成
- [ ] 子フォルダ作成:
  - `01_WEBサイト刷新サービス/`（成果物・最新版）
  - `01_WEBサイト刷新サービス/最新版/images/`
  - `01_WEBサイト刷新サービス/WP最適化版/`
  - `01_WEBサイト刷新サービス/docs/`（議事録・契約・監査レポート）
  - `公開作業/`
  - `公開作業/バックアップ_YYYYMMDD/`（公開当日に作成）
  - `議事録/`
- [ ] フォルダID（最上位）を本ファイル末尾の「案件メタ情報」に記録

担当: 案件アサイン者

## 3. GitHub Issue 起票（10分）

- [ ] `VAIZO-jp/VAIZO` リポジトリで `.github/ISSUE_TEMPLATE/team.md` でIssue作成
- [ ] ラベル: `type:team`, `enter-web`, `status:in-progress`
- [ ] タイトル: `[{{案件略号}}] {{正式名称}} Webサイトリニューアル`
- [ ] Issue 番号を控える
- [ ] ブランチ作成: `feature/{{issue-num}}-{{案件略号}}-kickoff`

担当: 案件アサイン者

## 4. 1Password Vault 作成（5分・Phase 1完了後）

- [ ] 1Password で Vault `Client-{{案件略号}}` 作成
- [ ] WP管理画面・サーバー・ドメイン・SaaS等のログインを格納予定の領域として準備
- [ ] アサインメンバーをメンバー追加

担当: 櫻井CTO（Vault管理者）

## 5. 契約・見積書（30分）

- [ ] 見積書を Drive `006_経理部_事務系・経費精算等/01_帳票テンプレート/` の見積テンプレで作成
- [ ] 業務委託契約書テンプレを準備（社労士・弁護士レビュー済の最新版）
- [ ] クライアントに送付、捺印・返送を待つ
- [ ] 返送された契約書を Drive 案件フォルダ `01_WEBサイト刷新サービス/docs/契約/` に保管

担当: 橋本CEO

## 6. キックオフMTG設定（15分）

- [ ] Google Calendar で 60分のMTGをクライアントと設定
- [ ] Plaud + Tactiq 起動準備（録音・文字起こし）
- [ ] アジェンダ:
  - 案件目的・KPI
  - スケジュール
  - 体制（担当者）
  - 必要な情報・素材の受領計画
  - 決定権者の確認
  - 公開希望日

担当: 案件CTO

## 7. 必要情報の受領計画（MTG中に確定）

WP公開作業に必要な情報・アカウント（[`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) Step 1 参照）：

### 必須3点

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

担当: 案件アサイン者

## 8. デザイン提案（3〜5営業日）

- [ ] Claude Code でレビュー → 修正
- [ ] GitHub プライベートリポジトリ `VAIZO-jp/{{案件略号}}-site` 作成、staticrypt保護でデプロイ
- [ ] 提案メール送付（[`templates/client-emails/proposal.md`](../templates/client-emails/proposal.md)）

担当: 制作担当 + 案件CTO

## 9. 採用案決定〜本制作開始

- [ ] クライアントから採用案決定の返信受領
- [ ] 修正対応表の運用開始（修正ID `F-{{案件略号}}-{{YYYYMM}}-{{連番:03桁}}`）

担当: 制作担当

## 10. 公開作業

- [ ] [`runbooks/deploy-day.md`](./deploy-day.md) に従って公開当日の段取り

担当: 案件アサイン者 + 案件CTO

---

## 案件メタ情報（記入欄）

```yaml
---
案件略号: {{}}
正式名称: {{}}
業態: {{}}
公開URL予定: {{}}
ドメイン: {{}}
契約日: {{}}
公開希望日: {{}}
担当開発者: {{}}
案件CTO: {{}}
クライアント担当者: {{}}
クライアント決定権者: {{}}
予算: {{}}
スケジュール:
  - キックオフ: {{}}
  - 提案: {{}}
  - 採用案決定: {{}}
  - 本制作: {{}}
  - デモ確認: {{}}
  - 公開: {{}}
Drive案件フォルダID: {{}}
GitHub案件Issue: {{}}
GitHub案件Repo: {{}}
1Password Vault: Client-{{案件略号}}
---
```

---

## 関連ドキュメント

- [`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md)
- [`runbooks/deploy-day.md`](./deploy-day.md)
- [`runbooks/post-launch-30days.md`](./post-launch-30days.md)
