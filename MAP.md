# MAP — V/ENTER WEB 事業部 データ保存場所・アクセス地図

> 「何が、どこに、どうアクセスすれば手に入るか」を1枚で示すリポジトリの中で最も重要なファイル。
> 新規メンバー・AIエージェントは **必ず最初にここを開く**。

最終更新: 2026-05-09

---

## 0. 鉄則

| 鉄則 | 理由 |
|------|------|
| **機密はGitHubに置かない** | パスワード・APIキー・顧客個人情報は 1Password Teams または Drive シークレットフォルダ |
| **議事録の録音・文字起こし全文はGitHubに置かない** | 個人言及多量。GitHubには要点サマリのみ |
| **「とりあえずローカル」は避ける** | 案件成果物は最終的に Drive または GitHub のどちらかに必ず正本を置く |
| **正本がどちらか曖昧な状態を作らない** | 各資源の「正本（Source of Truth）」は本ファイルで明示 |

---

## 1. リポジトリ・ソースコード

| 内容 | 場所 | 正本 | アクセス権 |
|------|------|------|----------|
| **本リポジトリ（V/ENTER WEB ハンドブック）** | `VAIZO-jp/enter-web` (Private) | GitHub | VAIZO-jp organization メンバー |
| **VAIZO worklog（業務記録Issue/PR）** | `VAIZO-jp/VAIZO` (Private) | GitHub | 同上 |
| **案件成果物（WP最適化版HTML、デモコード）** | `VAIZO-jp/{client-slug}-site` (Private、案件ごと) | GitHub | 案件ごとに招待 |
| ローカルワーク領域（一時的） | `C:\Users\nnkre\enter-web\` 等 | ローカル | 個人PC |

---

## 2. ドキュメント・ナレッジ（Google Drive）

### 共有ドライブB（メイン、ID: `0AKd10MEp7QHUUk9PVA`）

| パス | フォルダID | 用途 |
|------|----------|------|
| `02_事業部別_EnterWebAI_AIWebサイト制作/` | `1I6ERLluC2LR4i6kpYgp8qTJYzQDITzV7` | **V/ENTER WEB事業部のメインフォルダ**。案件ごとのサブフォルダ + マニュアル |
| 上記配下 `📚マニュアル/` | `1bY70XbFtuwkNJ5ajHibE8-PsuT7KUHCH` | 営業ガイドライン・WP公開手順書の正本（GitHub移管中） |
| 上記配下 `00_アライアンス_パートナー/` | `1gFarVAjbm4u1c2trSjVVsKwMA8wgHivD` | OneBe等の業務委託パートナー資料 |
| `006_経理部_事務系・経費精算等/` | `1Ht8Eyfl1Y61aOp-wNFvy0evqhXA-73iK` | 経費精算（Enter Web案件の発注書・請求書もここ） |
| `006_経理部.../01_帳票テンプレート/` | `1Bv8-l2_Z6CldW8w716AU0EZ4I5wUdOI9` | 請求書/領収書/支払通知書/納品書/見積書/発注書 |
| `VAIZO_ブランドアセット/` | `11KI_j_jqYTq8lApqWT4s90pViPQJZ40a` | ロゴ・キービジュアル・SNSテンプレ |

### 重要ドキュメントID（直接アクセス用）

| 文書名 | Doc ID | 状態 |
|--------|--------|------|
| LP制作7ステップ | `1W3yK-bH3KLN1k6pGk3PDzWMA94AlncfczO8EtdxS6w4` | 現役 |
| WP公開汎用版手順書（Drive版） | `1XK4epQJSMDqlXkXMx9bhlFgi1wkhundnJBlAK8bIyW4` | **GitHub `handbook/04-wp-publish-guide.md` に正本移管予定** |
| V/ENTER 営業ガイドライン（脆弱性レポート） | `1VgoW0gmPaZVkZs1GSLvzYEDCBXPO0Dtt3nV_E2tM1Sw` | **GitHub `handbook/05-vulnerability-scan.md` に正本移管予定** |
| WordPressへ下書き保存する手順 | `1AnEhStpeb5xIC8gQI9TUHYIZS0HHZWI8wOW4fqS2RWE` | 現役（v1.0、2026-04-22） |
| 仙台レトロバックページ修正ログ | `1KqjiYq5fP9-qYPgYJLTjDwpIi6_fEDWpPWsocJpcQK4` | 案件記録（保存） |
| VAIZO Design Policy v1 | `1KB5KDcZGU_ukdsSilP_5h3FcFGcRXZLa4O0MlwiA-B0` | **GitHub `handbook/02-design-policy.md` に正本移管予定** |

### Drive 書き込み用 OAuth トークン

- 場所: `C:\Users\nnkre\drive_upload\token.json`
- スコープ: `drive.file`（自アプリ作成ファイルのみ書き込み）
- 用途: 自動化スクリプトでDriveに新規ファイルアップロード
- 詳細: メモリ `reference_drive_upload_token.md` 参照

---

## 3. 機密情報（1Password Teams - 導入予定）

> Phase 1 で 1Password Teams をトライアル契約する。それまでは下記「暫定保管場所」を使用。

### 1Password Vault 設計（予定）

| Vault名 | 内容 | アクセス権 |
|---------|------|----------|
| `VAIZO-Internal` | 社内ツール（GitHub、Slack、Drive等）の管理者権限 | 経営陣（橋本・櫻井CTO） |
| `Enter-Web-Operations` | WP管理画面・サーバー・ドメインの共有用 | VAIZER 5名 + 必要時のみOneBe |
| `Client-{client-slug}` | 案件ごとのWP/サーバー/SaaSログイン | 案件アサイン者のみ |

### 暫定保管場所（1Password導入まで）

| 内容 | 暫定保管場所 |
|------|------------|
| WP管理画面ログイン情報 | `C:\Users\hashi\.vaizo\secrets\` または各個人PCのシークレットフォルダ |
| サーバー・ドメインログイン | 同上 |
| Google系（GA4、GSC、GTM、広告） | 各VAIZER の Google アカウント上で権限付与 |

### 絶対NG

- Slack DM/Channel への直接貼付
- GitHub Issue/PR への直接貼付（プライベートでも避ける）
- Drive 共有可リンク化されたドキュメントへの直接貼付

---

## 4. Slack（VAIZO ワークスペース）

ワークスペースID: `T0APCH74JJY`

### V/ENTER WEB 関連チャンネル

| チャンネル名 | ID | 用途 |
|------------|-----|------|
| `事業部別_enter-ai` | `C0ARXUP0L21` | **V/ENTER WEB の主チャンネル**（旧名「事業部別_webのやつ」）|
| `all-onebe-vaizoアライアンスチーム` | `C0B1C3ZKR4L` | OneBeパートナーシップ |
| `vaiso-onebe-ナレッジの種` | `C0B12R4AQ67` | OneBe との知見共有 |
| `claudeworks` | `C0AQSNX4YLW` | Claude/AI実装作業 |
| `事業別_v-aivou-ai導入支援` | `C0AQDNXERKR` | 関連事業（V/AIBOU） |
| `all-株式会社vaizo` | `C0AP8VAUYSE` | 全社一般 |
| `情報システム部` | `C0AQWRMB46R` | IT・アカウント発行 |
| `経理部_経費精算-仕訳` | `C0AVBV8AJ4W` | 経費精算 |

---

## 5. 議事録・録音（Plaud + Drive）

| 種別 | 場所 | 注意 |
|------|------|------|
| 録音生データ | Plaud（外部サービス） | Plaud アカウントで管理 |
| 文字起こし共有リンク | Plaud 公開リンク（Slackに投下） | リンクは社内限定運用 |
| 議事録要点サマリ | **GitHub Issue または `worklog/YYYY-MM/`** | 要点のみ転載、生データは置かない |
| Tactiq 文字起こし | 案件ごとの Drive `議事録/` フォルダ | クライアント関連は個人言及あり、外部送信禁止 |

直近の議事録例（2026-05-07 V/ENTER WEB会議）:
- Plaud共有リンク: `https://web.plaud.ai/s/pub_ec652187-...`（Slack #事業部別_enter-ai に投下済）
- テーマ: 手順書レビュー・デモサイト運用・脆弱性レポートとGit移行方針

---

## 6. 案件管理

| 項目 | 場所 |
|------|------|
| 案件作業フォルダ（Drive） | `02_事業部別_EnterWebAI_AIWebサイト制作/{案件正式名称}/` |
| 案件Issue（GitHub） | `VAIZO-jp/VAIZO` の `type:team` ラベル + `enter-web` ラベル |
| 案件成果物コード | `VAIZO-jp/{client-slug}-site`（必要時に作成） |
| 案件タイムシート | `vaizo-web-ops/` 配下 Excel（Phase 0 で社労士レビュー後に正式運用） |
| 修正ログ | 案件Drive直下の Excel（修正ID `F-{案件略号}-{YYYYMM}-{連番:03桁}`） |

### 公開済・進行中案件（2026-05-09時点）

| 案件名 | クライアント | 公開URL | フォルダID |
|-------|-----------|--------|----------|
| 仙台レトロバックページ | 有限会社シティアミューズプランニング | https://retro-backpage.com/ | `1c8VIDSkvo6jI1ahjuE3tWdS0qYN2fQcx` |
| デモ_高級バー_TopView | デモ案件（BAR NOIR） | （未公開・デモ） | `1GAvzoiZejlZIUKd0bY0rPhIdRZhM_9Jb` |
| サンプル株式会社 | デモ案件 | （未公開・デモ） | `1k3Fq8DzLVH26OleyxaQSjtGcPMGMtLye` |

---

## 7. 外部サービス・SaaS

| サービス | 用途 | 管理者 |
|---------|------|-------|
| GitHub (`VAIZO-jp` org) | コード・ドキュメント | 櫻井理也CTO |
| Google Workspace | Drive・Gmail・Calendar | 橋本CEO |
| Slack | チームコミュニケーション | 橋本CEO |
| Plaud | 録音・文字起こし | 個別アカウント |
| Tactiq | Meet/Zoom議事録 | 個別アカウント |
| Vercel | デモサイトホスト | 櫻井理也CTO |
| Cloudflare | DNS・Workers（一部案件） | 櫻井理也CTO |
| 1Password Teams（導入予定） | 機密管理 | 橋本CEO（予算）/ 櫻井CTO（運用） |
| OpenAI（Codex CLI 経由） | 実装ドラフト | 各個人 ChatGPT Plus 以上 |
| Anthropic（Claude Code） | 司令塔・レビュー | 各個人 Claude Pro 以上 |

### 外部スキャン・診断ツール（脆弱性レポート用）

詳細は [`handbook/05-vulnerability-scan.md`](./handbook/05-vulnerability-scan.md) を必ず確認してから使用すること。

| ツール | 用途 | 制約 |
|-------|------|------|
| securityheaders.com | HTTPセキュリティヘッダ | パッシブ・OK |
| Mozilla Observatory | 公開情報スコアリング | パッシブ・OK |
| SSL Labs | SSL/TLS設定診断 | パッシブ・OK |
| Lighthouse | パフォーマンス・SEO | パッシブ・OK |
| Wappalyzer / WhatRuns | CMS・プラグイン検出 | パッシブ・OK |
| WPScan (`--no-banner`) | WordPress公開情報 | パッシブ限定 |
| OWASP ZAP (Passive Scan のみ) | 公開情報の観察 | Active Scanは禁止 |

---

## 8. 担当者連絡先

| 役割 | 名前 | Slack User ID | 主管 |
|------|------|--------------|------|
| CEO・営業全体 | 橋本友太郎 | `U0ANTGMDFPZ` | 営業・予算・経営判断 |
| CTO・技術全体 | 櫻井理也 | `U0AP5H2KM1B` | 本リポジトリ・手順書・技術判断 |
| 制作担当 | 櫻井みどり | （Slackで確認） | 案件制作・QC |
| 制作担当 | 小野寺陸斗 | `U0AS4UWBP6G` | 案件制作・公開作業 |
| 業務委託 | OneBe | （アライアンスチーム） | 案件支援 |

### エスカレーション順

1. 案件CTO（櫻井理也）にSlack DM
2. 反応がなければ Slack `#事業部別_enter-ai` でメンション
3. 緊急時は橋本CEOに連絡（番号は1Password共有 Vault に格納予定）

---

## 9. 会社情報（公式）

- **株式会社VAIZO** ([vaizo.jp](https://vaizo.jp))
- 本店: 宮城県仙台市青葉区中央四丁目1番26号
- 設立: 2026年4月、資本金: 625万円
- 代表取締役: 橋本友太郎(CEO)、櫻井理也(CTO)
- メール: `info@vaizo.jp`（`.co.jp` は使わない）

> **注**: vaizo.jp に V/ENTER WEB の事業説明はまだ未掲載（2026-05-09時点）。社内向け事業説明は [`handbook/00-overview.md`](./handbook/00-overview.md) を参照。

---

## 10. このMAP.md自体のメンテナンス

- 月1回（毎月第1月曜）レビュー、更新
- 新規SaaS導入・新規案件発生時は即追記
- リンク切れ・フォルダID変更は気づいた時点でPR
- Phase 3 で「リンク切れ自動検出 + Issue起票」のGitHub Actionsを導入予定
