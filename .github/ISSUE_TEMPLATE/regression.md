---
name: リグレッション報告
about: 既存案件で発生したリグレッション・不具合の報告
title: '[REGRESSION] {{案件略号}} {{症状サマリ}}'
labels: 'type:team, regression, enter-web, status:in-progress'
assignees: ''
---

## 案件情報

- **案件略号**: `XXX`
- **公開URL**: https://...
- **発生日時**: YYYY-MM-DD HH:MM
- **発見者**: @{{氏名}}
- **報告者**: @{{氏名}}

## 症状

{{何が起きているか、ユーザー視点で}}

## 再現手順

1. {{ステップ1}}
2. {{ステップ2}}
3. {{ステップ3}}

## 期待動作

{{本来どうあるべきか}}

## 実際の動作

{{現在何が起きているか}}

## スクリーンショット・ログ

{{スクショ、エラーメッセージ、コンソールログ等を添付}}

## 影響範囲

- **影響度**: 高 / 中 / 低
- **影響ユーザー**: 全ユーザー / モバイルのみ / 特定ブラウザのみ / その他（{{具体）}}）
- **ビジネス影響**: リード喪失 / 表示崩れ / 機能停止 / その他

## 修正ID（あれば）

`F-{{案件略号}}-{{YYYYMM}}-{{連番:03桁}}`

## 関連 Issue / PR

- 関連: #
- 親Issue: #

## 暫定対応

- [ ] 該当機能を一時停止
- [ ] バックアップから復元（[`troubleshooting/wp-publish-issues.md`](../../troubleshooting/wp-publish-issues.md)）
- [ ] クライアント連絡

## 根本原因（調査後に記入）

{{Why × 5 で書く}}

## 再発防止策

- [ ] [`troubleshooting/`](../../troubleshooting/) に追記
- [ ] [`templates/`](../../templates/) のプロンプト・テンプレを修正
- [ ] [`handbook/`](../../handbook/) の手順を更新
- [ ] [`runbooks/`](../../runbooks/) のチェックリストに項目追加

## 過去の類似事例

- [`troubleshooting/mailto-regression.md`](../../troubleshooting/mailto-regression.md)
