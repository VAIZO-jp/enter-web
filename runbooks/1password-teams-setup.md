# Runbook：1Password Teams 契約・セットアップ・100社想定の運用設計

> 2026-05-09 v1.0 初版（Phase 1セットアップ）
> 2026-05-09 v1.1 更新（100社想定の運用設計を反映）

---

## なぜ 1Password Teams か

現状、WP管理画面ログイン情報・サーバー認証情報・SaaSログインが各個人PCのローカル（`C:\Users\hashi\.vaizo\secrets\`等）に分散して保管されている。

これは以下のリスクをはらむ：

1. **アクセス不能リスク**: 担当者の個人PCに障害が起きたら他のメンバーが対応できない
2. **二重管理リスク**: 複数人で同じ案件を扱う際、最新パスワードがどこにあるか分からない
3. **退職時リスク**: メンバーが退職した際、当人が握っていた認証情報の引継ぎが煩雑
4. **監査ログ不在**: 誰がいつどのパスワードを参照したかの記録がない

1Password Teams を導入することで上記すべてに対応できる。

---

## 1. プラン選定の経緯（議論サマリ）

検討した選択肢（2026-05-09 議論）:

| サービス | 月額(10名) | 100社規模適性 | 採用判断 |
|---------|----------|------------|----------|
| **1Password Teams** | $80/月 | △〜30社まで | **Phase 1で採用** |
| 1Password Business | $200/月 | ◎ | Phase 3で移行検討 |
| Bitwarden Teams/Enterprise | $30〜50/月 | ◎ | Phase 3対抗候補 |
| Vaultwarden 自社ホスト | サーバー代のみ | ◎ | Phase 5で評価 |

→ Phase 1 では学習コスト・UI洗練度を重視して **Teams プラン** で開始。

詳細議論: メモリ `project_venter_web_handbook.md` および本リポジトリの議論履歴を参照。

---

## 2. コスト試算

- プラン: 1Password Teams Business
- 料金: 月額 $7.99/ユーザー（年契約）または $9.99/ユーザー（月契約）
- VAIZER 5名 + OneBe 1名: 月額 $48 〜 $60（年間 $575 〜 $720）

橋本CEO予算承認後にトライアル契約 → 14日後に本契約判断。

---

## 3. Vault設計（案B: 機密度別 5Vault）★確定

### 3.1 Vault 構成

| Vault名 | 内容 | アクセス権 |
|---------|------|----------|
| **VAIZO-Internal** | 社内ツール（GitHub・Slack・Drive・経費精算等）の管理者権限・APIキー | 経営陣のみ（橋本CEO・櫻井CTO） |
| **Enter-Web-VIP** | Sランク高機密案件（年間契約100万円以上、政府関連、上場企業の関連子会社等） | 経営陣 + 案件アサイン者のみ |
| **Enter-Web-Standard** | 通常案件（A/Bランク、年間契約100万円未満） | VAIZER全員 + 案件アサイン業務委託 |
| **Enter-Web-Archived** | 終了案件（オフボーディング後 + 5年保管中） | CTOのみ（参照用） |
| **Onboarding-Inbox** | クライアント受領直後の一時保管（24時間以内に適切なVaultへ移動） | 案件アサイン者のみ |

### 3.2 Vault数の選定理由

- Teams プランの Vault 数制限を意識（プランにより5〜25まで変動）
- 案B（5Vault）なら Teams 制約クリア、機密度差も表現可能
- Vault単位でのアクセス権設計が明確

### 3.3 検討して却下した案

- **案A: 1社1Vault** — Teams 制約超過、メンテナンス工数過大
- **案C: 状態別3Vault のみ** — S/A/B 機密度差を表現できず、リスク管理が粗雑

---

## 4. アクセス権設計

### 4.1 メンバー区分

| 区分 | アクセス可能Vault | コスト |
|------|----------------|------|
| **経営陣（橋本CEO・櫻井CTO）** | 全Vault Admin | $7.99×2 |
| **VAIZER（櫻井みどり・小野寺陸斗）** | Standard + Onboarding-Inbox | $7.99×2 |
| **業務委託（OneBe）** | Standard のみ | $7.99×1 |
| **顧問弁護士・税理士・社労士（必要時）** | 個別Item Sharing 時限式 | $0（メンバー化しない） |

### 4.2 業務委託（OneBe）のアクセス設計 ★Recommended

**選定: A. Standard Vault のみフルメンバー招待**

- OneBe 代表者を 1Password Teams メンバーとして追加（月$7.99追加）
- アクセス可能 Vault は **Standard のみ**
- VIP / Internal / Archived には招待しない
- アサイン外の案件アイテムも見えてしまうが、Vault単位以上の制限は Teams にはない
- 退職・契約終了時はアカウントを即削除

### 4.3 理由

- Item Sharing で都度共有は100社規模で破綻
- VIP案件は経営陣 + 必要VAIZER のみで完結させ、業務委託パートナーは Standard 案件で運用

---

## 5. アイテム命名規則・タグ運用 ★必須

### 5.1 命名規則

```
[案件略号] アイテム種別

例:
[RBP] WP管理画面
[RBP] Xserverサーバー
[RBP] お名前.comドメイン
[RBP] GA4管理権限
[BNR] WP管理画面
[BNR] Stripe Live Key
```

### 5.2 タグ運用

各アイテムに以下のタグを付ける：

| タグ種別 | 例 | 用途 |
|---------|-----|------|
| `client:{案件略号}` | `client:RBP`, `client:BNR` | 案件で絞り込み |
| `type:{種別}` | `type:wp`, `type:server`, `type:domain`, `type:saas`, `type:analytics`, `type:payment`, `type:sns` | 種別で絞り込み |
| `status:{状態}` | `status:active`, `status:archived` | 進行中/終了 |
| `priority:{優先度}` | `priority:high`, `priority:medium`, `priority:low` | 機密度・重要度 |
| `rotation:{頻度}` | `rotation:90d`, `rotation:180d`, `rotation:none` | ローテーション対象識別 |

### 5.3 検索効率

`client:RBP type:wp` で「仙台レトロのWP管理画面」を1秒で発見。
`priority:high rotation:90d` で「90日ローテーション対象」を一覧。

---

## 6. セットアップ手順

### Step 1: トライアル契約（櫻井CTO）

1. https://1password.com/teams/ にアクセス
2. 「Try free for 14 days」をクリック
3. 必要情報を入力:
   - チーム名: `VAIZO`
   - 管理者メール: `info@vaizo.jp` 配下の管理者専用アドレス（例: `admin@vaizo.jp`）
   - 言語: 日本語
4. クレジットカード登録（トライアル中は課金されない）
5. 「Secret Key」を安全な場所に保管（重要）

### Step 2: Vault 構築（櫻井CTO）

§3.1 の構成で5Vault を作成。

### Step 3: VAIZER 招待（櫻井CTO）

§4.1 のメンバー区分に従って招待。

VAIZER 招待リスト（Phase 1 時点）:
- [ ] 橋本友太郎（CEO）→ 全Vault Admin
- [ ] 櫻井理也（CTO）→ 全Vault Admin
- [ ] 櫻井みどり（制作）→ Standard + Onboarding-Inbox
- [ ] 小野寺陸斗（制作）→ Standard + Onboarding-Inbox
- [ ] OneBe 代表（業務委託）→ Standard のみ

### Step 4: 既存 secrets の移管（櫻井CTO + 橋本CEO）

1. `C:\Users\hashi\.vaizo\secrets\` にある全認証情報をリストアップ
2. 各ファイルを 1Password の対応 Vault に新規アイテムとして登録
3. アイテム種別:
   - WP管理画面: `Login` カテゴリ（URL + ユーザー名 + パスワード）
   - サーバー: `Server` カテゴリ
   - APIキー: `API Credential` カテゴリ
4. §5.1 命名規則 + §5.2 タグを必ず適用
5. 移管確認後、ローカルファイルは **暗号化バックアップ → 削除**

### Step 5: 1Password CLI 導入（任意・実装担当者）

```bash
# Windows (winget)
winget install AgileBits.1Password.CLI

# 動作確認
op --version

# サインイン
op signin
```

スクリプトでの使用例:

```bash
# WP管理画面パスワードを環境変数にセット
export WP_PASSWORD=$(op read "op://Enter-Web-Standard/[RBP] WP管理画面/password")
```

### Step 6: 運用ルール周知（櫻井CTO）

- 全VAIZER に [`handbook/06-onboarding.md`](../handbook/06-onboarding.md) の更新版を周知
- 30分の Zoom セッションで全員の初期セットアップを支援
- §3〜§9 の運用ルールを事前資料として配布

---

## 7. Business プランへの移行トリガー ★明確化

以下のいずれかが満たされたら **検討開始**、2つ以上満たされたら **即移行**：

| トリガー | 理由 |
|---------|------|
| **案件数 30社超** | Vault数・タグ管理が破綻し始める。詳細監査ログが必要 |
| **業務委託パートナー 3名超** | Outside Collaborator機能必須（Teams にはない） |
| **VAIZER 8名超** | カスタムロール・Vault管理者権限分離が必要 |
| **インシデント発生** | 漏洩・誤操作後の調査で詳細ログ・SIEM連携が必要 |
| **法令対応** | 個人情報保護法2027年改正対応・SCIM/SSO要件・規制業界顧客対応 |

### 移行先候補

| 候補 | 月額(10名) | 採用判断基準 |
|------|----------|------------|
| **1Password Business** | $200/月 | 学習コスト最小、現状からの自然な移行 |
| Bitwarden Enterprise | $50/月 | コスト最重視、自社ホスト検討時 |

通常は **1Password Business** がデフォルト選択。コスト最重視の場合のみ Bitwarden Enterprise 評価。

---

## 8. 90日ローテーション運用 ★Recommended

### 8.1 対象選定

「全クライアント全アイテム90日更新」は工数で破綻するため、以下に限定：

| アイテム種別 | ローテーション頻度 | タグ |
|-----------|----------------|------|
| **VIP Vault のWPログイン・サーバー** | 90日 | `rotation:90d`, `priority:high` |
| **Standard Vault のWPログイン** | 180日 | `rotation:180d`, `priority:medium` |
| **Standard Vault の その他SaaS** | 契約終了時のみ | `rotation:none`（自動ローテのあるサービスは設定） |
| **Master Password / Recovery Code** | 1年に1回 | （個人で管理） |
| **クライアントのSaaS APIキー** | サービス側設定に従う | `rotation:auto` |
| **一般情報（メール・電話・住所）** | ローテ不要 | `rotation:none` |

### 8.2 月次運用フロー

毎月第1月曜のVAIZE全社振り返りMTG後に：

1. 月初に 1Password で `rotation:90d` で `expires <= 来月末` のアイテムを抽出
2. 該当クライアントに「セキュリティ強化のためパスワード更新のご案内」を送付（雛形は Phase 2 で `templates/client-emails/password-rotation.md` を追加予定）
3. 1Password で新パスワード生成（32文字以上、すべて記号・英数字）
4. クライアントに 1Password Item Sharing 時限式リンクで新パスワードを共有
5. クライアントが受領確認後、1Password の旧アイテムを更新（履歴に旧パスワード保持）
6. 次回更新日タグ `expires:YYYY-MM-DD` を更新

### 8.3 反対意見の検討

- **クライアント側の負担**: 「変えなくていい」と言うクライアントもいる → 契約書の「セキュリティ条項」で年1〜2回のパスワード見直しを VAIZO 側義務として明記
- **VAIZO 側の工数**: 案件数 × 90日サイクル → priority:high のみに限定することで現実的
- **漏洩時のダメージ**: ローテーションなしだと漏洩発覚時の被害範囲が拡大 → priority:high のみでも十分な対策

---

## 9. クライアント受領ルートの徹底 ★Recommended

### 9.1 標準受領ルート

1. **キックオフメールで明示**（[`templates/client-emails/kickoff.md`](../templates/client-emails/kickoff.md) §セキュアな共有方法）
2. **VAIZO 側からの「事前共有リンク」を返送ルートにする**:
   - キックオフ後、VAIZO が 1Password Item Sharing で「クライアント情報入力枠」を発行
   - クライアントがそのリンクで WP管理画面ログイン情報を入力
   - VAIZO が受領通知を確認 → Onboarding-Inbox Vault に自動保管 → 24時間以内に適切なVaultに移動
3. **Slack 直貼り検知の運用**:
   - もし Slack #事業部別_enter-ai に平文パスワードが投稿されたら、5分以内にメッセージ削除依頼 + 担当者に直接連絡
   - その後 1Password に登録 → クライアントへの再周知

### 9.2 平文受領時のSOP

| 受領形式 | 対応 |
|---------|------|
| Slack DM 平文 | 即削除依頼 → 1Pw登録 → クライアントに再送依頼（次回からはリンクで） |
| メール本文に平文 | 即削除（メール完全削除）→ 1Pw登録 → クライアントに再送依頼 |
| Excel/PDF添付 | 受領後即1Pw登録 → 添付暗号化（Drive `_archive_encrypted/`）→ 元メール削除 → クライアントに再送依頼 |
| 電話で口頭 | リアルタイムで 1Pw登録 → クライアントに「次回からはこのリンクで」と案内 |
| 紙のメモ | スキャン後即1Pw登録 → 紙シュレッダー処理 |

### 9.3 クライアント側のITレベル別対応

| ITレベル | 推奨 | 説明 |
|---------|------|------|
| **高（IT企業・SaaS事業者等）** | 1Pw Item Sharing リンク方式 | クライアント側も1Password 利用が普通 |
| **中（中小企業・士業等）** | VAIZO発行リンク方式 | リンクの使い方を10分の電話レクチャー |
| **低（個店・高齢オーナー等）** | 電話で口頭 + VAIZO 代筆登録 | 紙にメモ → 即シュレッダー |

### 9.4 Phase 3で自動化

Phase 3（30社超）で、新規案件Issue 起票 → 1Password Item Sharing リンク自動発行 → メール自動送信のフローを GitHub Actions で構築。

---

## 10. 監査・レビュー（運用継続性）

### 10.1 月次レビュー（毎月第1月曜・15分）

- 1Password 監査ログを CTO がレビュー（異常アクセス検知）
- 90日ローテーション対象の進捗確認
- 退職・契約終了したメンバーのアカウント完全削除確認
- 月次振り返りで運用ルール改善提案を集める

### 10.2 四半期レビュー（CTO + 橋本CEO）

- Business プラン移行トリガーの再評価
- ライセンス数の最適化（過剰な場合は減らす）
- 顧問弁護士・税理士からのフィードバック反映

### 10.3 インシデント発生時

- 詳細は [`runbooks/incident-response.md`](./incident-response.md) を参照
- 1Password 監査ログを取得して証跡保存
- 必要に応じて顧問弁護士相談・警察相談

---

## 11. 災害対策・相続

### 11.1 Master Password / Recovery Code

- Master Password: 各個人が記憶（紙・PCに書かない）
- Recovery Code: 各個人が紙印刷 → 自宅金庫保管
- Emergency Kit（Recovery Code含む）も同様

### 11.2 経営陣の Emergency Access

- 橋本CEO・櫻井CTO 双方が相互の Emergency Access 設定
- 数日以内に応答なしの場合、もう一方が Vault アクセス可能に

### 11.3 退職・契約終了時

- 即時アカウント削除（Admin 操作）
- 当人が個人で持ち出した可能性のあるアイテムは即パスワード変更（VIP案件は最優先）

---

## 12. 関連ドキュメント

- [`MAP.md`](../MAP.md) §3 機密情報
- [`handbook/06-onboarding.md`](../handbook/06-onboarding.md) Day1 セットアップ
- [`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) §1-B WPログイン情報
- [`handbook/09-client-offboarding.md`](../handbook/09-client-offboarding.md) §2 引き渡し計画
- [`runbooks/incident-response.md`](./incident-response.md) — 漏洩・誤操作時の対応
- [`templates/client-emails/kickoff.md`](../templates/client-emails/kickoff.md) §セキュアな共有方法
- [`SECURITY.md`](../SECURITY.md) — 脆弱性報告先

---

## 改訂履歴

- 2026-05-09 v1.0 初版（基本セットアップ手順）
- 2026-05-09 v1.1 100社想定の運用設計反映:
  - §3 案B 5Vault設計確定
  - §4 業務委託OneBeアクセス設計（Standard Vault のみ招待）
  - §5 命名規則・タグ運用標準化
  - §7 Business プラン移行トリガー5基準明文化
  - §8 90日ローテーション運用（priority:high のみ）
  - §9 クライアント受領ルート徹底SOP（段階的運用 + ITレベル別対応）
  - §10-§11 監査・災害対策追加
