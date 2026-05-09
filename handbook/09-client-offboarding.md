# 09 — クライアントオフボーディング

> 案件終了・運用契約終了時の標準フロー。属人化を防ぎ、スムーズな引き渡しを実現する。

---

## 1. オフボーディングが必要なケース

| ケース | 主な原因 | 緊急度 |
|-------|---------|-------|
| **正常終了** | 制作完了 + 公開後30日のフォロー終了 | 低 |
| **運用契約解約** | クライアント側の意思決定 | 中 |
| **トラブル終了** | クレーム発展、関係悪化 | 高 |
| **VAIZO 側都合の終了** | 業務領域外、リソース不足 | 中 |
| **クライアント側の事業終了・倒産** | 不可抗力 | 中 |

## 2. オフボーディング標準フロー

### Day 0: 終了通知

- クライアント or VAIZO が解約・終了を通知
- 文書（メール）で記録
- 案件CTO + 橋本CEO + 経理部に共有

### Day 1-3: 引き渡し計画

#### クライアント側に渡すもの

- [ ] WordPress管理画面ログイン情報（既に渡している場合は再確認）
- [ ] サーバー管理画面ログイン情報
- [ ] ドメイン管理画面の権限移譲（VAIZO が代理取得していた場合）
- [ ] Google Analytics 4 / Search Console / Tag Manager の権限移譲
- [ ] サイトコード一式（GitHub repo の export または ZIP）
- [ ] 画像素材一式（圧縮前の元データ含む）
- [ ] 制作中のドキュメント（議事録 / デザイン提案 / 修正対応表）

#### VAIZO 側に残すもの・破棄するもの

- [ ] バックアップ `.wpress` ファイル（30日後に破棄）
- [ ] クライアント情報（個人情報保護法に従い削除 or 匿名化）
- [ ] 1Password Vault `Client-{slug}` のアクセス権削除（VAIZER 全員）

### Day 4-7: 公式引き渡し

- [ ] クライアントとの最終MTG（30分）
- [ ] 引き渡し物リストの確認 → クライアントから「受領確認」のメール
- [ ] 残金請求書発行（[`handbook/08-finance-billing.md`](./08-finance-billing.md) §6）
- [ ] 公開URLの権限移譲確認（DNS / SSL 等）

### Day 8-30: アフターケア

- [ ] 軽微な質問対応（無償、契約上の瑕疵担保期間内）
- [ ] 引き渡し後の不具合は追加見積で対応
- [ ] 入金確認

### Day 30: 完全クローズ

- [ ] 全データ・権限の VAIZO 側から削除（バックアップ含む）
- [ ] 1Password Vault 完全削除
- [ ] Drive 案件フォルダを「アーカイブ」に移動
- [ ] GitHub Issue を `status:closed` ラベルでクローズ
- [ ] CHANGELOG / Slack `#事業部別_enter-ai` で完了報告

## 3. ケース別の追加対応

### A. 正常終了（推奨パス）

- クライアントから「ありがとう」の温かい引き渡し
- 月次運用契約への移行を提案（[`decision-trees/contract-type.md`](../decision-trees/contract-type.md)）
- 公開後3ヶ月・6ヶ月の振り返りMTG提案（次案件・口コミ獲得）

### B. 運用契約解約

- 解約理由をヒアリング（次案件への学び）
- 「VAIZO サービス改善のため、率直な意見を聞かせてほしい」とアンケート（任意）
- 解約後の運用引き継ぎ先（次の業者）への協力姿勢

### C. トラブル終了（クレーム発展）

詳細は [`runbooks/incident-response.md`](../runbooks/incident-response.md) を必ず参照。

- 橋本CEO主導、顧問弁護士相談
- 文書での記録を徹底
- 「VAIZO 側の責任」「クライアント側の責任」を明確化
- 損害賠償・返金の交渉
- 守秘義務の確認・延長
- 再連絡禁止リスト追加（[`handbook/05-vulnerability-scan.md`](./05-vulnerability-scan.md) ブラックリスト運用）

### D. VAIZO 側都合の終了

- 30日以上前にクライアントに通知（業界慣習）
- 後継業者の紹介（VAIZO のアライアンスパートナー）
- 引き渡し作業を VAIZO 側が責任を持って完了
- 該当VAIZER のキャリアプランへの影響を内部でケア

### E. クライアント側の事業終了・倒産

- サイト・ドメインの存続意思を確認
- 売上回収困難なら早期に経理判断（債権放棄 vs 法的回収）
- 顧問税理士・弁護士相談
- VAIZO 側のデータ保管期間: 法定 5年または契約に従う

## 4. 引き渡しドキュメント・テンプレ

### `templates/handover-checklist.md`（Phase 2 で追加予定）

引き渡し時のチェックリスト雛形。

### メール雛形

- 引き渡し完了報告: [`templates/client-emails/handover-completion.md`](../templates/client-emails/handover-completion.md)（Phase 2 で追加予定）
- 解約受領確認: [`templates/client-emails/cancellation-acknowledgement.md`](../templates/client-emails/cancellation-acknowledgement.md)（Phase 2 で追加予定）

## 5. 個人情報の取り扱い

- 個人情報保護法に従い、必要のない個人データは削除
- ただし、契約書・請求書は法定保管期間（5年〜7年）保管
- 完全削除前に「保管対象」「破棄対象」を経理 + CTO で確認

## 6. アフターセールス（次の案件への布石）

- 公開3ヶ月後の自動メール（[`templates/client-emails/follow-up-3m.md`](../templates/client-emails/follow-up-3m.md) Phase 2 予定）
- VAIZO のニュースレター登録案内
- アライアンスパートナーとしての継続関係（クライアント側で別案件発生時の優先紹介）

## 7. 関連ドキュメント

- [`handbook/08-finance-billing.md`](./08-finance-billing.md) — 経理・請求フロー
- [`runbooks/incident-response.md`](../runbooks/incident-response.md) — トラブル対応
- [`runbooks/post-launch-30days.md`](../runbooks/post-launch-30days.md) — 公開後30日のフォロー
- [`decision-trees/contract-type.md`](../decision-trees/contract-type.md) — 契約形態の選択
- [`templates/client-emails/`](../templates/client-emails/) — メール雛形集
