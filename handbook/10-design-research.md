# 10 — デザインリサーチ：参考と「らしさ」の見つけ方

> 制作着手前のデザインリサーチで「ゼロから考える」を避ける。VAIZO Editorial を軸にしつつ、業態・店舗の固有性を抽出して提案3案に落とす標準フロー。

---

## 1. リサーチの目的

V/ENTER WEB の制作で **「センスで選ぶ」を排除する**。3キーワードと3案のテンプレで、誰がやっても同等品質の提案を出せるようにする。

リサーチのアウトプット:

1. **3キーワード**（クライアントの「らしさ」を3語で言語化）
2. **ムードボード**（参考画像 6〜12枚）
3. **提案3案の方向性**（例: ELEGANT_WHITE / HERITAGE_DARK / URBAN_MUSIC）
4. **配色・書体・装飾の決定**

所要時間: 1案件あたり 60〜90分（AIを活用すれば 30〜45分）。

---

## 2. 参考サイトの探し方

### 2.1 デザインギャラリー（推奨）

| サービス | 特徴 | 用途 |
|---------|------|------|
| [Awwwards](https://www.awwwards.com/) | 受賞サイト中心、最高峰のクオリティ | S/A ランク向け |
| [SiteInspire](https://www.siteinspire.com/) | カテゴリ・色・スタイルでフィルタ可 | 業態別検索 |
| [Land-book](https://land-book.com/) | LP特化、コンバージョン重視 | 店舗系LP |
| [One Page Love](https://onepagelove.com/) | 1ページLP特化 | 飲食・バー・店舗 |
| [Httpster](https://httpster.net/) | 個性的な国内外サイト | ブティック業態 |
| [I/O 3000](https://io3000.com/) | 日本国内の優良サイト | ローカル業態 |
| [4db](https://4db.cc/) | 国内、業種別カテゴリ | 飲食・店舗 |
| [SANKOU!](https://sankoudesign.com/) | 国内、色・業種で検索 | A/B ランク向け |
| [MUUUUU.ORG](https://muuuuu.org/) | 国内、縦長LP特化 | LP単発 |

### 2.2 ピンタレスト・モードボード系

| サービス | 用途 |
|---------|------|
| [Pinterest](https://www.pinterest.com/) | 画像のキュレーション、業態×スタイルで検索 |
| [Are.na](https://www.are.na/) | アート・建築・タイポグラフィに強い |
| [Dribbble](https://dribbble.com/) | UI・グラフィック詳細レベル |
| [Behance](https://www.behance.net/) | 大型プロジェクト全体像 |

### 2.3 業態別リアルサイト探索

直接のリアル競合も見る：

- **飲食・バー**: 食べログ高評価店、Yelp、ぐるなび、tabelog のサイトリンク
- **ライブハウス**: 同地域のライブハウス、スタジオ、レーベル直営店
- **美容室**: ホットペッパービューティーで評価4.5+、HOT PEPPER掲載店
- **整体・治療院**: エキテン、Googleマップで4.5+
- **不動産仲介**: SUUMO、HOME'S掲載業者の自社サイト
- **スクール**: 業界誌・専門メディアの「2026年人気ランキング」

### 2.4 海外事例（特に S ランク向け）

国内に類似がなければ海外を見る：

- 銀座系バー → ロンドンのスピークイージー、パリのオーセンティックバー
- 高級鮨 → ニューヨーク・ロンドン日本食レストラン
- ライブハウス → ベルリン・ロンドンのインディーシーン

---

## 3. クライアントの「らしさ」抽出

### 3.1 既存サイトからの抽出

クライアント既存サイトを開いて以下を5分でメモ：

- **サイトの第一印象**（3形容詞: 例「重厚・歴史・地域密着」）
- **使われている色**（メイン2色 + アクセント1色）
- **使われている書体**（明朝/ゴシック、サンセリフ/セリフ）
- **写真のトーン**（モノクロ/カラー、自然光/ストロボ、温色/寒色）
- **動きの有無**（パララックス、フェードイン、ホバー演出）
- **文章のトーン**（です/だ調、専門的/親しみやすい）

### 3.2 SNS・店内写真からの抽出

- Instagram: 投稿頻度、ハッシュタグ、プロフィール写真
- Google Maps の店内写真: 内装の素材感、照明
- 公式SNSのトーン: 投稿者の人柄

### 3.3 ブランドアセットの確認

- ロゴ（高解像度 / SVG / AI 形式）
- 既存のカラーガイド・ブランドガイド
- 既存印刷物（メニュー、ショップカード、フライヤー）
- ユニフォーム・看板

これらが揃っていれば、それをWebに延長する設計が最速。

### 3.4 オーナー・店主のヒアリング（できれば）

直接話せる場合は5〜10分のヒアリング：

- なぜこの店を始めたか
- 一番大切にしていること
- 来てほしいお客様像
- 競合との違い（避けるべき他社の特徴）
- 5年後のビジョン

これが **3キーワード** の元素材になる。

---

## 4. 3キーワードへの言語化

### 4.1 3キーワード抽出フォーマット

```yaml
案件名: BAR NOIR
3キーワード:
  - 静謐（しずか・余白・沈黙）
  - 一杯のために訪れる（特別感・密度の濃い時間）
  - 銀座の路地裏（隠れ家・密会・文学的）
配色方向: 黒×オフホワイト×極控えめゴールド
書体方向: セリフ系英字 + 明朝系日本語
装飾レベル: 極小（ヘアライン罫線のみ）
温度感: 低温（クール）
```

### 4.2 NGキーワードの確認

以下のキーワードは VAIZO ブランドと相性が悪いため避ける：

- 派手・カラフル・賑やか（VAIZO白黒基調と矛盾）
- パワフル・攻める・革新（軍事比喩・採用語に近い）
- 安さ・お得・コスパ（高単価業態と矛盾）

---

## 5. ムードボード作成

### 5.1 ムードボードとは

「3キーワードの世界観」を 6〜12枚の画像で視覚化したもの。提案3案を作る前の **方向性確認** に使う。

### 5.2 作成手順（30分）

1. Pinterest でキーワード検索（業態名 + 形容詞、例: `intimate bar interior`）
2. 気に入った画像を Pinterest ボードに集める（10〜20枚）
3. 重複・違和感ある画像を除外して 6〜12枚に絞る
4. Figma または Drive スライドに配置
5. 各画像にキャプション（なぜ選んだか）

### 5.3 ムードボードの保管場所

- Drive 案件フォルダ `01_WEBサイト刷新サービス/docs/moodboard_YYYYMMDD/` に保存
- クライアントとのMTG資料に含める

---

## 6. 提案3案の方向性命名

### 6.1 命名規則

`{形容詞}_{配色トーン}` の英語2語で命名する：

- `ELEGANT_WHITE` — 上品・白基調
- `HERITAGE_DARK` — 歴史・暗色基調
- `URBAN_MUSIC` — 都会・音楽
- `WARM_HOSPITALITY` — 温かみ・もてなし
- `MINIMAL_NORDIC` — 北欧ミニマル
- `JAPANESE_MOTHERHOOD` — 和・温もり

### 6.2 業態別の標準3案

#### 飲食・バー（S/A ランク）

- `ELEGANT_WHITE` — 上品な白基調
- `HERITAGE_DARK` — 歴史を感じる暗色
- `WARM_HOSPITALITY` — 温かみ重視

#### ライブハウス・音楽スポット

- `URBAN_MUSIC` — 都会的・音楽の躍動
- `HERITAGE_DARK` — クラシックロック・ジャズ
- `RAW_INDUSTRIAL` — 剥き出しのコンクリート感

#### 美容室・サロン

- `ELEGANT_WHITE` — 清潔・上品
- `MINIMAL_NORDIC` — 北欧風ミニマル
- `WARM_BOUTIQUE` — 温かみのあるブティック

#### 整体・治療院

- `MEDICAL_TRUST` — 信頼感・清潔
- `WARM_HEALING` — 温かみ・癒やし
- `TRADITIONAL_JAPANESE` — 和・伝統技

#### 不動産仲介

- `CORPORATE_TRUST` — 信頼の企業色
- `LOCAL_FRIENDLY` — 地域密着・親しみ
- `LUXURY_ESTATE` — 高級物件特化

#### スクール・教育

- `ACADEMIC_CLASSIC` — 伝統校風
- `MODERN_LEARNING` — 現代的な学び
- `WARM_COMMUNITY` — 温かい仲間意識

---

## 7. AI を活用したデザイン探索

### 7.1 Midjourney / DALL-E でムードボード補完

実在画像が見つからない場合は AI 生成で補完：

```
prompt: "intimate Japanese bar interior, dim warm lighting, walnut counter, 8 leather stools, low pendant light, photographed on 35mm film, moody atmosphere, --ar 16:9"
```

ただし、生成画像は **方向性確認のみ** に使い、実装には実画像（撮影 or ストック）を使う。

### 7.2 Codex プロンプトで方向性試作


```bash
cd 案件ディレクトリ
# codex_prompt_a.md, codex_prompt_b.md, codex_prompt_c.md を作る
codex exec --skip-git-repo-check --cd "$PWD" --output-last-message "./codex_out_a.md" "$(cat ./codex_prompt_a.md)"
codex exec --skip-git-repo-check --cd "$PWD" --output-last-message "./codex_out_b.md" "$(cat ./codex_prompt_b.md)"
codex exec --skip-git-repo-check --cd "$PWD" --output-last-message "./codex_out_c.md" "$(cat ./codex_prompt_c.md)"
```

3案を並列で生成 → クライアントに見せる → 採用案を選んでもらう。

---

## 8. 写真の調達

### 8.1 フォトストック（無料・著作権フリー）

| サービス | 特徴 |
|---------|------|
| [Unsplash](https://unsplash.com/) | 高品質、商用利用可、業態別検索 |
| [Pexels](https://www.pexels.com/) | 動画もあり |
| [Pixabay](https://pixabay.com/) | イラストもあり |
| [Photo AC](https://www.photo-ac.com/) | 日本人モデル多数（無料登録） |
| [Burst](https://burst.shopify.com/) | EC 向け、Shopify提供 |

商用利用の可否・クレジット表記要否は必ず確認。

### 8.2 有料フォトストック

| サービス | 価格帯 |
|---------|------|
| [Adobe Stock](https://stock.adobe.com/jp/) | 月$30〜、最高品質 |
| [iStock](https://www.istockphoto.com/jp) | 月$30〜 |
| [Shutterstock](https://www.shutterstock.com/ja/) | 月$30〜 |

S ランク案件で予算がある場合は有料推奨。

### 8.3 撮影手配（プロカメラマン）

- 単価: 1日 5万〜15万（撮影規模次第）
- VAIZO提携カメラマン名簿は メモリ `project_vaizo_web_ops.md` 参照（Phase 2 で公開予定）
- 案件単価が 50万円以上なら撮影込みで提案

### 8.4 クライアント側既存素材

- 過去のメニュー・パンフレット用素材
- SNS投稿写真（権利確認必要）
- 内装施工時の写真

これらが揃っていれば撮影不要なケースも。

---

## 9. フォント選定

### 9.1 VAIZO 標準フォント

| 用途 | フォント |
|------|---------|
| 英字見出し（標準） | Inter 900 |
| 英字見出し（高級業態） | Cormorant Garamond / Playfair Display |
| 日本語見出し（標準） | Noto Sans JP 700 |
| 日本語見出し（高級業態） | Noto Serif JP 700 |
| 本文 | Noto Sans JP 400 / Noto Serif JP 400 |
| 等幅 | JetBrains Mono |

### 9.2 業態別の推奨

#### 飲食・バー（S）
- 英字: Cormorant Garamond / Playfair Display
- 日本語: Noto Serif JP

#### ライブハウス
- 英字: Inter 900 + Bebas Neue（タイポ重め）
- 日本語: Noto Sans JP 700

#### 美容室
- 英字: Cormorant Garamond / Cardo
- 日本語: Noto Serif JP（細め）

#### 整体・治療院
- 英字: Inter（落ち着き）
- 日本語: Noto Sans JP

#### 不動産仲介
- 英字: Inter（信頼）
- 日本語: Noto Sans JP

#### スクール
- 英字: Cormorant Garamond / Inter
- 日本語: Noto Serif JP（伝統校）または Noto Sans JP（モダン校）

### 9.3 フォントの読み込み

すべての制作で Google Fonts を使う。

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Noto+Sans+JP:wght@400;700&family=Noto+Serif+JP:wght@400;700&display=swap" rel="stylesheet">
```

`display=swap` でフォントロード中もテキストを表示（FOUT 許容、CLS最小化）。

---

## 10. 配色選定

### 10.1 VAIZO 基本配色

詳細: [`02-design-policy.md`](./02-design-policy.md) §2

- 主色: `--ink-black: #0a0a0a`
- 背景: `--paper-off-white: #f5f3ee`
- 罫線: `--rule-hairline: rgba(10,10,10,0.12)`
- アクセント（高級業態のみ）: `--accent-gold: #b89b6a`

### 10.2 業態別アクセントカラー

VAIZO 白黒基調を維持しつつ、業態の「らしさ」を1色で足す：

| 業態 | アクセント例 |
|------|-----------|
| バー（高級） | `#b89b6a` ゴールド |
| バー（カジュアル） | `#8b1a1a` 深紅 |
| ライブハウス | `#ff6b00` ネオンオレンジ |
| ライブハウス（クラシック） | `#3a3a3a` グラファイト |
| 美容室（上品） | `#f4d0c4` サクラベージュ |
| 美容室（モダン） | `#000000` 純黒 |
| 整体 | `#5a8b6e` モスグリーン |
| 不動産 | `#1e3a5f` ネイビー |
| スクール（伝統） | `#7a1d1d` エンジ |
| スクール（モダン） | `#0066cc` シアン |

### 10.3 配色のチェック

- WCAG AA 以上（本文 4.5:1、見出し 3:1）
- [Adobe Color Contrast Analyzer](https://color.adobe.com/ja/create/color-contrast-analyzer)
- [Coolors Contrast Checker](https://coolors.co/contrast-checker)

---

## 11. リサーチ完了の確認

提案3案を作る前に以下が揃っているか：

- [ ] 3キーワード（言語化済）
- [ ] ムードボード（6〜12枚、Drive保管）
- [ ] 既存サイト・SNS・店内写真の分析メモ
- [ ] 提案3案の方向性命名（業態別標準から選定）
- [ ] 配色決定（業態別アクセント + VAIZO 基本配色）
- [ ] 書体決定（VAIZO 標準から選定）
- [ ] 写真調達方針決定（ストック / 撮影 / 既存素材）


---

## 12. 関連ドキュメント

- [`handbook/02-design-policy.md`](./02-design-policy.md) — VAIZO Design Policy v1
- [`runbooks/new-client-kickoff.md`](../runbooks/new-client-kickoff.md) — 新規案件キックオフ
