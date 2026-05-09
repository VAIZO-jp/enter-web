# 07 — ナレッジ管理・更新運用

> 本リポジトリを「生きた運用文書」として保つための更新ルール。

---

## 1. 基本原則

V/ENTER WEB ハンドブックは **読むためでなく、書き換えるため** にある。

- 案件で詰まった → `troubleshooting/` に追記
- 判断に迷った → `decision-trees/` に追加
- 公開後の学び → `runbooks/post-launch-30days.md` で振り返り → 各所に反映

**「読んだらそのままにしない、必ず1行は変える」** が VAIZER 文化。

## 2. 更新タイミング

| タイミング | 更新する場所 |
|----------|------------|
| 案件着手時 | `runbooks/new-client-kickoff.md` のチェックリスト確認、不足項目あれば追記PR |
| 案件中（詰まった時） | `troubleshooting/` に「何が起きた・どう解決した」を追記 |
| 案件公開直後 | `runbooks/deploy-day.md` の改善ポイント、`templates/delivery-reports.md` で振り返り |
| 公開後30日 | `runbooks/post-launch-30days.md` のフィードバック収集 → 各文書反映 |
| 月次 | 全 VAIZER で15分の振り返りMTG、改善PR を1人1本 |
| 四半期 | 顧問社労士・弁護士・税理士のレビュー反映 |

## 3. 更新ワークフロー

### 軽微な修正（誤字、リンク切れ、追記）

```bash
git checkout -b personal/typo-N-handbook-XX
# 編集
git add ...
git commit -m "docs(handbook): 04-wp-publish-guide の typo 修正"
git push -u origin HEAD
gh pr create --fill
gh pr merge --squash --auto  # 自己マージOK
```

### 構造変更（新規章追加、章間の関係性変更）

1. Issue 起票（`.github/ISSUE_TEMPLATE/doc-improvement.md`）
2. CTO とSlackで方針確認
3. ブランチ作成 `feature/<issue>-<slug>`
4. 修正 + ローカルビルド確認（`npm run build`）
5. PR 作成、CODEOWNERS の自動レビュアーが承認
6. マージ

### 新規業態の Codex プロンプト雛形

1. 1〜2件の実案件で実証（雛形を案件直下で書く）
3. PR で追加、CTO レビュー

## 4. リンク整合性の維持

- 他ドキュメント参照は相対リンクで書く（書き方は既存ファイルを参照）
- 絶対URL（`https://github.com/...`）は外部サービスのみ
- 月1回 `npm run lint:links` でリンク切れ検出
- リンク先のファイル名・パスを変更する場合は、参照側もまとめて修正

## 5. 公開と機密の境界

詳細は [`MAP.md`](../MAP.md) §0 鉄則 参照。

GitHub Pages で公開しているため、以下は **絶対に書かない**:

- パスワード・APIキー・OAuth トークン
- 顧客のメールアドレス（`info@example.com` 等の汎用は除く）
- 業務委託パートナーの個人情報（実名以外の連絡先）
- 案件単価の具体額（範囲表記は可）
- 競合他社への評価コメント

書いていいもの（公開前提）:

- 営業手法のフレームワーク
- AI活用ノウハウ
- VAIZO Design Policy
- 公開済みクライアント事例（公開URLが既に出ているもの）

## 6. 文書のバージョニング

- ハンドブック全体: `CHANGELOG.md` に記録
- 主要文書（`02-design-policy.md` 等）: 末尾に `## 改訂履歴` セクション
- セマンティックバージョン: `vMAJOR.MINOR.PATCH`
  - MAJOR: 構造変更・破壊的変更
  - MINOR: 新規章・機能追加
  - PATCH: 軽微な修正

## 7. オーナーシップ（CODEOWNERS）

- 営業・事業全体: 橋本CEO + 櫻井CTO
- 技術・実装: 櫻井CTO
- 経理: 経理部（全社）
- 詳細: [`.github/CODEOWNERS`](../.github/CODEOWNERS)

## 8. 月次レビューチェックリスト

毎月第1月曜の振り返りMTGで以下を確認：

- [ ] 先月のPR数（目標: VAIZER 1人 1PR/月）
- [ ] リンク切れ件数（目標: 0件）
- [ ] `troubleshooting/` 追記件数
- [ ] `templates/` 追加件数
- [ ] 月次 KPI（脆弱性レポート送付件数、反応率、成約件数）
- [ ] 次月の改善目標

## 9. 関連

- [`CONTRIBUTING.md`](../CONTRIBUTING.md) — コントリビュート手順
- [`CHANGELOG.md`](../CHANGELOG.md) — 変更履歴
- [`runbooks/post-launch-30days.md`](../runbooks/post-launch-30days.md) — 案件後の振り返り
