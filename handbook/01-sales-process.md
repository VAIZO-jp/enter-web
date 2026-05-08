# 01 — 営業プロセス

V/ENTER WEB の営業は **「カスタマイズデモ + 脆弱性レポート + デザインアイデンティティ」三点セット送付** が中軸。
本ファイルは骨格のみ。詳細は別途 Phase 2 で充実予定。

---

## 1. ターゲット選定

| ランク | 業態 | 単価帯 | 例 |
|-------|------|-------|------|
| S | 銀座系高級バー、隠れ家業態、地方の伝説的店舗 | 80万〜200万 | BAR NOIR（デモ） |
| A | 飲食、ライブハウス、地方の老舗 | 30万〜80万 | 仙台レトロバックページ（実績） |
| B | ホームページ業者制作の店舗サイト、リニューアル放置型 | 10万〜30万 | （継続発掘） |

ターゲティング基準の詳細はメモリ `project_venter_targeting.md` 参照。

## 2. アプローチ手順

1. 公開情報のみで脆弱性スキャン（必ず [`05-vulnerability-scan.md`](./05-vulnerability-scan.md) の2ライン遵守）
2. デザインアイデンティティ提案（既存サイトの「らしさ」を抽出して再構築案）
3. カスタムデモトップ（FV）を Codex で生成（[`templates/codex-prompts/`](../templates/codex-prompts/)）
4. 脆弱性レポート + デモURLをセットで送付（メール雛形 [`templates/client-emails/`](../templates/client-emails/)）
5. 反応があったら商談、契約、本制作

## 3. 月次目標（300件スケール）

| 指標 | 目標 |
|------|------|
| 送付 | 300件/月 |
| 返信率 | 5%以上 |
| 商談化 | 3%以上 |
| 成約 | 1%以上（≒3件/月） |

## 4. クレーム発生時の対応

詳細は [`05-vulnerability-scan.md`](./05-vulnerability-scan.md) クレーム対応SOP参照。

- 1次対応: 受信30分以内（小野寺・櫻井みどり）
- 2次対応: 2時間以内（橋本CEO主導）
- 削除依頼は24時間以内対応、ブラックリスト永久登録

## 5. 関連ドキュメント

- [`handbook/05-vulnerability-scan.md`](./05-vulnerability-scan.md)
- [`templates/client-emails/`](../templates/client-emails/)
- [`decision-trees/vulnerability-target.md`](../decision-trees/vulnerability-target.md)
- メモリ `project_sales_process_v1.md`

---

**Phase 2 で本文充実予定**: ターゲット発掘の具体手法、メール文面の精緻化、KPIダッシュボード設計、Slack/CRM運用フロー
