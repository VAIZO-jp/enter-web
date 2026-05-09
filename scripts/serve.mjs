#!/usr/bin/env node
/**
 * docs/ ディレクトリをローカルでホストするミニマルサーバー。
 *
 * Usage:
 *   node scripts/serve.mjs [port]
 *
 * デフォルトポート: 4173
 * ホスト後、http://localhost:4173/ をブラウザで開く。
 */

import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DOCS_DIR = path.join(ROOT, "docs");

const PORT = parseInt(process.argv[2] || "4173", 10);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function tryRead(filePath) {
  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      const indexPath = path.join(filePath, "index.html");
      if (await exists(indexPath)) {
        return { path: indexPath, body: await fs.readFile(indexPath) };
      }
      return null;
    }
    return { path: filePath, body: await fs.readFile(filePath) };
  } catch {
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  let filePath = path.join(DOCS_DIR, urlPath);

  // セキュリティ: docs/ 配下に限定
  if (!filePath.startsWith(DOCS_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  let result = await tryRead(filePath);

  // .html を補完（拡張子なしアクセス対応）
  if (!result && !urlPath.endsWith("/")) {
    result = await tryRead(filePath + ".html");
  }

  if (!result) {
    // 404 ページ
    const notFoundPath = path.join(DOCS_DIR, "404.html");
    if (await exists(notFoundPath)) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(await fs.readFile(notFoundPath));
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
    return;
  }

  const ext = path.extname(result.path).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";

  res.writeHead(200, {
    "Content-Type": mime,
    "Cache-Control": "no-cache",
  });
  res.end(result.body);
});

server.listen(PORT, () => {
  console.log(`🔍 Serving docs/ at http://localhost:${PORT}/`);
  console.log("   Press Ctrl+C to stop.");
});
