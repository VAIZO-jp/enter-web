# Playwright 関連のトラブルシューティング

> [`templates/wp-prompts/05-ai-test.md`](../templates/wp-prompts/05-ai-test.md) や [`handbook/03-codex-claude-workflow.md`](../handbook/03-codex-claude-workflow.md) で Playwright が使えない場合の対処。

---

## 1. Codex 環境で Playwright モジュールが読み込めない

### 症状

Codex が「`playwright` モジュールを読み込めず未実施」と出力。

### 原因

Codex CLI のサンドボックス環境に Playwright がインストールされていない。

### 対処

**Claude Code + Playwright MCP** で代替する：

1. Claude Code 側に Playwright MCP を有効化
2. `templates/wp-prompts/05-ai-test.md` のプロンプトを Claude Code に直接投げる
3. Claude が Playwright MCP 経由でブラウザ起動・テスト・スクショ取得

代替手段（ローカル Playwright）：

```bash
npm init -y
npm install -D playwright
npx playwright install chromium

# テストスクリプトを書いて実行
node test-script.mjs
```

---

## 2. ローカルで Playwright がブラウザを起動しない

### 症状

`playwright install` 済みなのに `browser.launch()` が失敗する。

### 原因 / 対処

| 原因 | 対処 |
|------|------|
| Chromium がインストールされていない | `npx playwright install chromium` |
| ヘッドレスモードで動かない（Linux） | `xvfb-run` で実行、または `headless: true` |
| Windows でパス問題 | `playwright install` を管理者権限で再実行 |

---

## 3. Lighthouse スコアが取得できない

### 症状

Playwright Lighthouse プラグインが動かない。

### 対処

代替: [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started) を使う

```bash
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={{公開URL}}&strategy=mobile"
```

または PageSpeed Insights の Web UI:
- https://pagespeed.web.dev/

---

## 4. ヘッドレスでスクショが乱れる

### 症状

`page.screenshot()` がデバイスピクセル比やフォントレンダリングで実機と異なる。

### 対処

```javascript
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 375, height: 812 },
  deviceScaleFactor: 2,         // Retina 相当
  isMobile: true,
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) ...',
});
```

特定の幅でテストする場合:

```javascript
const widths = [320, 375, 414, 768, 1024, 1280, 1920];
for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 800 } });
  const page = await context.newPage();
  await page.goto('{{公開URL}}');
  await page.screenshot({ path: `screenshot-${width}.png`, fullPage: true });
}
```

---

## 5. CORS / mixed content エラー

### 症状

Playwright で外部リソース（Google Fonts、CDN画像）が読み込まれない。

### 対処

- `--ignore-certificate-errors` を Chromium 起動オプションに追加
- もしくはローカルプロキシ経由でリソースを配信

---

## 6. Playwright が遅い・タイムアウト

### 対処

```javascript
// タイムアウトを延長
page.setDefaultTimeout(60000);  // 60秒

// 不要なリソースをブロック
await page.route('**/*.{png,jpg,jpeg,gif,webp}', route => route.abort());
```

LCPが遅い原因が画像なら、それ自体が課題なので画像最適化を先に。

---

## 関連ドキュメント

- [`templates/wp-prompts/05-ai-test.md`](../templates/wp-prompts/05-ai-test.md) — 公開後テストプロンプト
- [`handbook/03-codex-claude-workflow.md`](../handbook/03-codex-claude-workflow.md) §自己検収
- [`troubleshooting/codex-cli-issues.md`](./codex-cli-issues.md) §4
