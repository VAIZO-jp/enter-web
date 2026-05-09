# 01 — 営業プロセス

V/ENTER WEB の営業は **「カスタマイズデモ + 脆弱性レポート + デザインアイデンティティ」三点セット送付** が中軸。
月次300件規模で運用し、返信率5%・成約率1%を目標とする。

---

## 1. ターゲット選定

### 1.1 ランク基準

| ランク | 業態 | 単価帯 | 例 |
|-------|------|-------|------|
| S | 銀座系高級バー、隠れ家業態、地方の伝説的店舗 | 80万〜200万 | BAR NOIR（デモ） |
| A | 飲食、ライブハウス、地方の老舗、美容室、整体・治療院 | 30万〜80万 | 仙台レトロバックページ（実績） |
| B | ホームページ業者制作の店舗サイト、リニューアル放置型、不動産仲介、スクール | 10万〜30万 | （継続発掘） |

ランクは「予算 × 意思決定スピード × ブランド適合度」で決まる。

### 1.2 発掘ソース

- Google Maps / 食べログ / ぐるなび / RETRIP の業態別検索
- ホットペッパービューティー（美容室）
- Suumo / Homes（不動産仲介）
- 業界誌・ローカル雑誌の特集記事
- VAIZER の知人・紹介ネットワーク
- 既存クライアントからの紹介（最強ルート）

### 1.3 ターゲット除外条件

- すでに直近半年でリニューアル済（業者ロゴが新しい）
- 法人ではなく個人ブログ・個人サイト
- 政府機関・医療機関・教育機関（[`05-vulnerability-scan.md`](./05-vulnerability-scan.md) の慎重対応）
- ブラックリスト登録済（過去に削除依頼あり）

詳細は [`decision-trees/vulnerability-target.md`](../decision-trees/vulnerability-target.md) 参照。

---

## 2. アプローチ手順（月次300件運用）

### 2.1 Week 1: ターゲットリスト作成（毎月初）

- [ ] 各VAIZERが週75件 = 月300件のターゲット候補を発掘
- [ ] スプレッドシート `OPS_Sheet TASKS` の `VENTER_Targets` タブに登録
- [ ] 重複チェック・ブラックリスト照合
- [ ] ランク（S/A/B）と推定単価を記入

### 2.2 Week 2-4: 三点セット作成・送付

各ターゲットに対して：

1. **公開情報のみで脆弱性スキャン**（[`handbook/05-vulnerability-scan.md`](./05-vulnerability-scan.md) のパッシブツールのみ）
2. **デザインアイデンティティ提案**（既存サイトの「らしさ」を抽出して再構築案）
4. **櫻井みどりが QC**（誤検知の二重チェック、3-5分/件）
5. **三点セットをメール送付**（雛形: [`templates/client-emails/vulnerability-report-cover.md`](../templates/client-emails/vulnerability-report-cover.md)）
6. **送付ログを記録**（送信日時・担当者・添付パスワード）

### 2.3 反応待ち + 追加送付

- 反応がない場合は3ヶ月以上空けて再送付（[`handbook/05-vulnerability-scan.md`](./05-vulnerability-scan.md) §再送付ルール）
- 削除依頼は24時間以内に返信、ブラックリスト永久登録

---

## 3. 商談フェーズ

### 3.1 1次商談（オンライン or 訪問）

- 60分のMTG設定
- アジェンダ:
  - VAIZOの紹介（5分）
  - 課題ヒアリング（20分）
  - 提案概要（15分）
  - 質疑応答（15分）
  - 次のステップ（5分）
- Plaud + Tactiq で議事録録取

### 3.2 2次商談（提案）

- 提案書 + デザイン3案 + 見積を送付（雛形: [`templates/client-emails/proposal.md`](../templates/client-emails/proposal.md)）
- クライアントが採用案決定後、契約書・着手金請求

### 3.3 契約・着手金

- 契約書送付（雛形: [`templates/client-emails/contract.md`](../templates/client-emails/contract.md)）
- 着手金30%請求（雛形: [`templates/client-emails/invoice.md`](../templates/client-emails/invoice.md)）
- 入金確認後に [`runbooks/new-client-kickoff.md`](../runbooks/new-client-kickoff.md) の30項目を実行

詳細は [`handbook/08-finance-billing.md`](./08-finance-billing.md) §3-5 参照。

---

## 4. 月次KPI

| 指標 | 目標 | 計測方法 |
|------|------|--------|
| 送付件数 | 300件/月 | OPS_Sheet `VENTER_Targets` の送付済件数 |
| 返信率 | 5%以上（15件/月） | 送付後30日の返信件数 |
| 商談化率 | 3%以上（9件/月） | MTG実施件数 |
| 成約率 | 1%以上（3件/月） | 契約締結件数 |
| 平均単価（成約案件） | 50万円以上 | 受注金額平均 |
| 案件公開期間 | 14日以内 | 契約から公開までの日数 |
| クレーム件数 | 月3件以下 | OPS_Sheet `VENTER_クレーム対応` |
| 削除依頼件数 | 月10件以下 | OPS_Sheet `VENTER_BlackList` 増加数 |

KPIダッシュボードは Phase 3 で GitHub Actions + Google Sheets 連携で自動集計予定。

---

## 5. クレーム・問題発生時の対応

詳細は [`runbooks/incident-response.md`](../runbooks/incident-response.md) と [`handbook/05-vulnerability-scan.md`](./05-vulnerability-scan.md) §クレーム対応SOP 参照。

### 即時対応（30分以内）

- 小野寺陸斗 or 櫻井みどり が即返信
- 文面例: 「ご連絡ありがとうございます。担当責任者へエスカレーションします」
- 橋本CEO・櫻井理也CTOへSlack DMで即時通知

### 2次対応（2時間以内）

- 橋本CEO主導で個別対応
- 必要に応じて謝罪・削除・関係先への連絡停止
- 内容によっては顧問弁護士・顧問税理士へ相談

### 記録

- クレーム発生案件は `OPS_Sheet TASKS` に「VENTER_クレーム対応」として記録
- 月次振り返りで件数・原因を集計、ガイドラインへ反映

---

## 6. 営業ツール・スプレッドシート

### OPS_Sheet TASKS の主要タブ

- `VENTER_Targets` — ターゲットリスト・送付ログ
- `VENTER_BlackList` — 削除依頼受領先
- `VENTER_クレーム対応` — クレーム発生記録
- `VENTER_反応ログ` — 反応・商談化・成約の記録
- `VENTER_KPI月次` — 月次KPI集計

スプレッドシートID は [`MAP.md`](../MAP.md) §6 案件管理 の Drive 案件管理セクションに記載予定（Phase 2）。

---

## 7. 文体・トーンの統一

すべてのアウトバウンド文書（メール・提案書・電話スクリプト）で以下を遵守：

- ❌ 「あなたのサイトは危険です」（恐怖訴求）
- ❌ 「すぐに対応が必要」（煽り）
- ❌ 「うちで全部対応できます」（直結セールス）
- ❌ 「ご返答お願いします」（催促）
- ❌ 軍事比喩・否定列挙・採用語・階層用語
- ✅ 「公開情報の範囲で確認したところ、◯◯の改善余地が見受けられました」
- ✅ 「ご参考までにお送りします」
- ✅ 「ご不要の場合はお手数ですが破棄してください」

詳細は [`handbook/02-design-policy.md`](./02-design-policy.md) §7 NG表現 と [`handbook/05-vulnerability-scan.md`](./05-vulnerability-scan.md) §ライン2 参照。

---

## 8. 関連ドキュメント

- [`handbook/02-design-policy.md`](./02-design-policy.md) — 文体ルール
- [`handbook/05-vulnerability-scan.md`](./05-vulnerability-scan.md) — 脆弱性レポート営業の2ライン
- [`handbook/08-finance-billing.md`](./08-finance-billing.md) — 経理・請求フロー
- [`templates/client-emails/`](../templates/client-emails/) — メール雛形集
- [`decision-trees/vulnerability-target.md`](../decision-trees/vulnerability-target.md) — 送付対象判定
- [`decision-trees/contract-type.md`](../decision-trees/contract-type.md) — 契約形態の選択
- [`runbooks/incident-response.md`](../runbooks/incident-response.md) — クレーム発生時
- [`runbooks/new-client-kickoff.md`](../runbooks/new-client-kickoff.md) — 新規案件キックオフ
- メモリ `project_sales_process_v1.md`
- メモリ `project_venter_targeting.md`
