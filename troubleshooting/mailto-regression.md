# mailto: リグレッション事故の事例と再発防止

> 仙台レトロバックページ案件（2026-04月、修正ID `F-RBP-202605-001/025/026`）で発生した実事故の記録。
> このページの存在自体が「VAIZO V/ENTER WEB 統合運用フレーム v0.2」の策定動機となった。

---

## 事故の概要

### 何が起きたか

仙台レトロバックページの本番公開後、`mailto:` リンクから問い合わせメーラーを起動しようとすると **全てのメーラー（Outlook、Gmail、Apple Mail）でメーラーが起動しなくなった**。

### 原因

修正対応 #25 → #26 で、複数宛先の指定方法を以下のように変更した：

```html
<!-- 修正前（動作していた） -->
<a href="mailto:to@example.com,cc1@example.com,cc2@example.com">

<!-- 修正後（動作しない） -->
<a href="mailto:to@example.com?cc=cc1@example.com,cc2@example.com">
```

カンマ区切りcc → `?cc=` 形式 への変更自体は仕様上正しいが、**対象環境（Outlook 365 + Apple Mail + Gmail Web）の一部で `mailto:` URL のエンコードが正しく解釈されない** 結果、リンクが無効化された。

### 影響

- 公開後 約24時間、お問い合わせフォームが実質機能しないままだった
- リード喪失の可能性（実害は確認できなかったが、影響度「高」）
- クライアント・関係者に修正対応で工数発生

### なぜ気付くのが遅れたか

1. 修正対応表（修正ログ）にステータス・優先度・担当・工数の管理がなかった
2. リグレッションテスト（公開前の `mailto:` 起動確認）が手順に組み込まれていなかった
3. Step 5-メール（実機テスト送信）の運用が始まる前の事故だった

---

## 教訓

### Lesson 1: `mailto:` の修正は必ず実機で起動確認

- 修正後、Outlook / Gmail / Apple Mail の少なくとも2環境で起動テスト
- スマホ実機（iOS Mail、Android Gmail）でも確認

### Lesson 2: リグレッションテストを手順に組み込む

[`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) Step 5-メール として正式手順化済み。

### Lesson 3: 修正ログの運用標準化

修正ID `F-{案件略号}-{YYYYMM}-{連番:03桁}` で管理。
ステータス・優先度・担当・工数・スクショを必須項目化。

詳細: メモリ `project_vaizo_web_ops.md` § C3

### Lesson 4: 「公開2週間以内の瑕疵担保」の契約明記

公開後の不具合を「サービス範囲」として無償対応するか、「契約外」として有償対応するかの線引き。
顧問弁護士確認後に契約書に明記。

詳細: メモリ `project_vaizo_web_ops.md` § W7

---

## 再発防止チェックリスト

公開前に以下を必ず実施：

- [ ] `mailto:` リンクを Outlook / Gmail / Apple Mail で起動確認
- [ ] スマホ実機（iOS Mail、Android Gmail）で起動確認
- [ ] 複数宛先がある場合、`mailto:to@...?cc=cc1@...,cc2@...` 形式が正しく動くか確認
- [ ] 件名・本文プリセットが文字化けしないか確認（URLエンコードに注意）
- [ ] [`templates/wp-prompts/05-ai-test.md`](../templates/wp-prompts/05-ai-test.md) のチェック項目③で AI が `tel:` `mailto:` を検証

公開後：

- [ ] [`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) Step 5-メール 実機テスト送信を必ず実施
- [ ] クライアント側で受信確認まで完了

---

## `mailto:` の正しい記述例

### 単一宛先

```html
<a href="mailto:info@example.com">お問い合わせ</a>
```

### 件名・本文プリセット

```html
<a href="mailto:info@example.com?subject=お問い合わせ&body=お世話になります。">
  お問い合わせ
</a>
```

URLエンコード推奨（特に日本語）：

```html
<a href="mailto:info@example.com?subject=%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B&body=%E3%81%8A%E4%B8%96%E8%A9%B1%E3%81%AB%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82">
  お問い合わせ
</a>
```

### 複数宛先（cc）

```html
<a href="mailto:to@example.com?cc=cc1@example.com,cc2@example.com">
  お問い合わせ
</a>
```

### 複数宛先（to のカンマ区切り、推奨されない）

```html
<!-- 古い書き方。互換性のため動くが推奨しない -->
<a href="mailto:to1@example.com,to2@example.com">
```

---

## 関連ドキュメント

- [`handbook/04-wp-publish-guide.md`](../handbook/04-wp-publish-guide.md) Step 5-メール
- [`templates/wp-prompts/05-ai-test.md`](../templates/wp-prompts/05-ai-test.md)
- [`templates/codex-prompts/live-house.md`](../templates/codex-prompts/live-house.md) — 仙台レトロを基にした雛形（事故注意書き含む）
- メモリ `project_vaizo_web_ops.md` — 統合運用フレーム v0.2 の策定動機
