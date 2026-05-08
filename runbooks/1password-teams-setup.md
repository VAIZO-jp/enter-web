# Runbook：1Password Teams 契約・セットアップ手順書

> Phase 1 で実行する。櫻井CTOが主導、橋本CEOが予算承認。

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

## コスト試算

- プラン: 1Password Teams Business
- 料金: 月額 $7.99/ユーザー（年契約）または $9.99/ユーザー（月契約）
- VAIZER 5名: 月額 $40 〜 $50（年間 $480 〜 $600）

橋本CEO予算承認後に契約。

---

## セットアップ手順

### Step 1: トライアル契約（櫻井CTO）

1. https://1password.com/teams/ にアクセス
2. 「Try free for 14 days」をクリック
3. 必要情報を入力:
   - チーム名: `VAIZO`
   - 管理者メール: `info@vaizo.jp` 配下の管理者専用アドレス（例: `admin@vaizo.jp`）
   - 言語: 日本語
4. クレジットカード登録（トライアル中は課金されない）
5. 「Secret Key」を安全な場所に保管（重要）

### Step 2: Vault 設計（櫻井CTO）

トライアル開始後、Vault 構造を以下のように作成：

| Vault名 | 内容 | アクセス権 |
|---------|------|----------|
| `Personal` | 個人用（既定） | 各個人 |
| `Shared` | 全員アクセス可（既定） | 全VAIZER |
| `VAIZO-Internal` | 社内ツール管理者権限（GitHub・Slack・Drive 等） | 経営陣（橋本CEO・櫻井CTO） |
| `Enter-Web-Operations` | 共通の運用認証（VAIZO自体のサーバー・ドメイン） | VAIZER 5名 |
| `Client-{slug}` | 案件ごとの認証情報 | 案件アサイン者のみ（必要時招待） |

### Step 3: VAIZER 招待（櫻井CTO）

1. 1Password Web画面 → 「Admin Console」→「People」→「Invite Member」
2. 各VAIZER のメールアドレスを入力
3. デフォルト Vault は `Personal` + `Shared`
4. 個別案件の Vault は案件アサイン時に追加

VAIZER 招待リスト（Phase 1 時点）:
- [ ] 橋本友太郎（CEO）
- [ ] 櫻井理也（CTO）
- [ ] 櫻井みどり（制作）
- [ ] 小野寺陸斗（制作）
- [ ] OneBe代表（必要時のみ案件単位で）

### Step 4: 既存 secrets の移管（櫻井CTO + 橋本CEO）

1. `C:\Users\hashi\.vaizo\secrets\` にある全認証情報をリストアップ
2. 各ファイルを 1Password の対応 Vault に新規アイテムとして登録
3. アイテム種別:
   - WP管理画面: `Login` カテゴリ（URL + ユーザー名 + パスワード）
   - サーバー: `Server` カテゴリ
   - APIキー: `API Credential` カテゴリ
4. 移管確認後、ローカルファイルは **暗号化バックアップ → 削除**
   - ローカルバックアップ先: `C:\Users\hashi\.vaizo\secrets-archived\encrypted.zip`（パスフレーズ保護）
   - その後、`secrets\` フォルダの中身を削除（フォルダは残す）

### Step 5: 1Password CLI 導入（任意・実装担当者）

スクリプトから認証情報を呼び出せるようにする：

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
export WP_PASSWORD=$(op read "op://Client-RBP/wp-admin/password")

# Codex CLI で参照
codex exec ... --env "WP_PASSWORD=$WP_PASSWORD" ...
```

### Step 6: 運用ルール周知（櫻井CTO）

#### 鉄則

1. **本番認証情報は Slack/メール/Drive/GitHub に直接貼らない**
2. **認証情報を渡したい時は 1Password の「Share」機能で時限式リンクを生成**
3. **退職・契約終了時は該当 Vault からの権限削除を即実行**
4. **2要素認証（2FA）必須**: 全ユーザーに対して強制設定
5. **Master Password は Slack/メール/Drive に書かない**

#### 教育

- 全VAIZER に [`handbook/06-onboarding.md`](./06-onboarding.md) の更新版を周知
- 30分の Zoom セッションで全員の初期セットアップを支援

### Step 7: 14日トライアル後の本契約判断（橋本CEO）

トライアル14日後に：

- [ ] 利用率（誰が何を保管したか）を確認
- [ ] コスト・運用負荷とリスク低減のバランスを評価
- [ ] 本契約 or 別ソリューション（Bitwarden Teams、社内自前 等）を判断

本契約推奨: 月額 $40-50 で得られるリスク低減は十分に見合う。

---

## 関連ドキュメント

- [`MAP.md`](../MAP.md) §3 機密情報（1Password Teams - 導入予定）
- [`handbook/06-onboarding.md`](../handbook/06-onboarding.md) Day1 セットアップ
- [`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) Step 1-B WPログイン情報
