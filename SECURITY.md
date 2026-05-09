# セキュリティポリシー

## サポート対象

本リポジトリの最新 `main` ブランチが常にサポート対象。過去のタグは原則サポートしない。

## 脆弱性報告

本リポジトリの内容、もしくは本ハンドブックを利用した運用に関する **セキュリティ脆弱性** を発見した場合：

### 報告先

- メール: `info@vaizo.jp`（件名に `[SECURITY]` を必ず含める）
- 24時間以内に1次返信
- 重大な脆弱性は橋本CEO・櫻井CTOに即エスカレーション

### 公開リポジトリでGitHub Issueは使わない

公開Issueに脆弱性詳細を書かないでください。悪意ある第三者に悪用されるリスクがあります。

### 報告内容に含めてほしい情報

- 脆弱性の概要
- 影響範囲（特定ファイル・特定ページ・運用全体）
- 再現手順
- 想定される影響度
- 報告者の連絡先（任意。匿名報告も可）

## 本ハンドブックの取り扱う「セキュリティ」の範囲

V/ENTER WEB事業部の運用は、顧客サイトの脆弱性スキャン（パッシブ）を扱うため、以下の点で他のリポジトリと異なる注意が必要：

1. **不正アクセス禁止法の遵守**: [`handbook/05-vulnerability-scan.md`](./handbook/05-vulnerability-scan.md) のライン1（法的ライン）を全 VAIZER が必ず守る
2. **顧客データの取り扱い**: [`MAP.md`](./MAP.md) §3 機密情報の保管ルールを遵守
3. **WP管理画面ログイン情報**: 1Password Teams（導入予定）または `C:\Users\hashi\.vaizo\secrets\` のローカル保管。GitHub・Slack・Drive 直貼り禁止

## 違反した場合

[`handbook/05-vulnerability-scan.md`](./handbook/05-vulnerability-scan.md) §違反した場合の対処 を参照。

ライン1違反 → 即時運用停止 → 顧問弁護士相談
ライン2違反 → クレーム対応最優先 → 文面・ルール修正

## 関連

- [`MAP.md`](./MAP.md) §3 機密情報
- [`handbook/05-vulnerability-scan.md`](./handbook/05-vulnerability-scan.md)
- [`runbooks/1password-teams-setup.md`](./runbooks/1password-teams-setup.md)
- [`runbooks/incident-response.md`](./runbooks/incident-response.md)
