# 02 — VAIZO Design Policy v1

> Drive 版正本: Doc ID `1KB5KDcZGU_ukdsSilP_5h3FcFGcRXZLa4O0MlwiA-B0`
> 本ファイルは GitHub への正本移管中。Phase 1 完了後、Drive 側は `MOVED_TO_GITHUB.md` リダイレクトに切り替える。

---

## 1. 基本原則

VAIZO エディトリアル: **白黒のみ、ヘアライン罫線、大きな余白、微細グレイン**。

- 派手な色を使わない。アクセントが必要な業態（高級バー等）は **控えめなゴールド `#b89b6a`** のみ可
- グラデーション・ドロップシャドウは原則使わない
- アイコンは線画（ヘアライン）またはシンプルな塗り

## 2. 配色

| トークン | カラーコード | 用途 |
|---------|------------|------|
| `--ink-black` | `#0a0a0a` | 主要テキスト・ヘッダ・罫線 |
| `--ink-charcoal` | `#1c1c1c` | サブテキスト |
| `--ink-graphite` | `#3a3a3a` | キャプション・補助 |
| `--paper-off-white` | `#f5f3ee` | 背景（オフホワイト） |
| `--paper-cream` | `#faf7f2` | 表のゼブラ・引用背景 |
| `--paper-pure` | `#ffffff` | 強調背景 |
| `--rule-hairline` | `rgba(10,10,10,0.12)` | ヘアライン罫線 |
| `--accent-gold` | `#b89b6a` | アクセント（高級業態のみ） |

業態別に高級バー等で `--accent-gold` を使ってよい。それ以外の業態は白黒厳守。

## 3. 書体

### 見出し（英字）
- **Inter 900**（最も推す） / Cormorant Garamond / Playfair Display（高級業態）

### 見出し（日本語）
- **Noto Sans JP 700**（標準） / Noto Serif JP 700（高級業態）

### 本文
- **Noto Sans JP 400** または **Noto Serif JP 400**（業態次第）
- フォントサイズ: **本文17px**、**テーブル15px**、**行間1.9**

### 数字・データ
- Inter（Tabular Nums有効）

```css
font-feature-settings: "tnum" 1, "lnum" 1;
```

## 4. レイアウト

- **大きな余白**: セクション間 `clamp(80px, 12vw, 160px)`
- **コンテンツ最大幅**: 1280px（編集系は 960px、長文は 760px）
- **グリッド**: 12カラム、ガター 32px
- **ヘアライン罫線**: 1px、`var(--rule-hairline)` 色

## 5. ロゴ

- ファイル: `vaizo_logo_{black/white}.svg`
- 改変禁止
- 最小幅 120px
- 周囲のクリアスペース: ロゴ高さの1/3以上

## 6. ブランド表記

| 項目 | OK | NG |
|------|-----|-----|
| ブランド名 | `V/ENTER WEB` | `V|ENTER`, `V・ENTER`, `V ENTER` |
| メールアドレス | `info@vaizo.jp` | `info@vaizo.co.jp` |
| 会社表記 | `株式会社VAIZO` | `(株)VAIZO`, `vaizo Inc.` |

## 7. NG表現

以下は社内・対外問わず使用禁止：

- **軍事比喩**: 「弾を撃つ」「攻める」「制圧する」「敵」「最前線」等
- **否定列挙**: 「〜ではない」「〜できない」を3つ以上連ねた文
- **採用語**: 「カルチャーフィット」「リファラル採用」等の業界臭い語
- **階層用語**: 「下層」「上位」「下流」「下請け」等の上下関係を強調する語

代替表現の例:
| NG | OK |
|----|----|
| 「敵を制圧する」 | 「課題を解決する」 |
| 「下請け」 | 「アライアンスパートナー」 |
| 「炎上を防ぐ」 | 「誠実な運用を保つ」 |

## 8. ホバー・モーション

- ホバーは **控えめに**（線が引かれる程度）
- モーションは0.2-0.4秒、easing は `cubic-bezier(0.4, 0, 0.2, 1)` 程度
- `prefers-reduced-motion: reduce` 対応必須

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 9. アクセシビリティ

- コントラスト比: WCAG **AA以上**（本文 4.5:1、見出し 3:1）
- 全ての画像に `alt` 属性
- フォーカスリング表示（`outline: 2px solid var(--ink-black)` 程度）
- セマンティックHTML（`<header>`, `<main>`, `<nav>`, `<footer>`）
- スキップリンク（「本文へ」）

## 10. Codex/Claude が遵守すべき制約（再掲）

- 仕様外の機能を勝手に追加しない
- TODO で埋めず完成させる
- 軍事比喩・否定列挙・採用語・階層用語は使わない
- 飲食/店舗案件は **電話・LINE のCTAを必ず常設**（追従バー含む）
- V/ブランド表記は半角スラッシュ「/」のみ
- メールは `info@vaizo.jp`、`.co.jp` 不使用
- アイキャッチ + 本文画像が完全に揃っている
- コンソールエラーゼロ
- LCP / CLS の悪化なし

## 11. 関連ドキュメント

- [`troubleshooting/wp-publish-issues.md`](../troubleshooting/wp-publish-issues.md) — CSS衝突時の対処
- メモリ `feedback_figma_implementation.md` — Figma実装の11鉄則

---

**v1.0 — 2026-05-09**
