// node dev.mjs — local server: static files + /api/agent, mimicking Vercel. Reads GEMINI_API_KEY from .env.local.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, sep, basename } from 'node:path';

try { process.loadEnvFile('.env.local'); } catch { /* fine if env is set another way */ }
const { default: agent } = await import('./api/agent.js');

const ROOT = process.cwd();
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.json': 'application/json' };

http.createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path === '/api/agent') {
    let raw = '';
    for await (const chunk of req) raw += chunk;
    try { req.body = JSON.parse(raw || '{}'); } catch { req.body = {}; }
    res.status = (code) => { res.statusCode = code; return res; };
    res.json = (obj) => { res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(obj)); };
    return agent(req, res);
  }
  const file = normalize(join(ROOT, path === '/' ? 'index.html' : path));
  if (!file.startsWith(ROOT + sep) || basename(file).startsWith('.')) { res.statusCode = 404; return res.end('Not found'); }
  try {
    const data = await readFile(file);
    res.setHeader('content-type', TYPES[extname(file)] || 'application/octet-stream');
    res.end(data);
  } catch { res.statusCode = 404; res.end('Not found'); }
}).listen(process.env.PORT || 3000, () => console.log(`Yojana Saathi → http://localhost:${process.env.PORT || 3000}`));
