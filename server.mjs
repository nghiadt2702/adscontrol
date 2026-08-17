import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";
const maxBodyBytes = 5 * 1024 * 1024;

const apiRoutes = new Map([
  ["/api/status", "./api/status.js"],
  ["/api/connectors", "./api/connectors.js"],
  ["/api/me", "./api/me.js"],
  ["/api/team", "./api/team.js"],
  ["/api/invite", "./api/invite.js"],
  ["/api/appsflyer-sync", "./api/appsflyer-sync.js"],
  ["/api/appsflyer-push", "./api/appsflyer-push.js"],
  ["/api/meta-oauth", "./api/meta-oauth.js"],
  ["/api/meta-accounts", "./api/meta-accounts.js"],
  ["/api/google-accounts", "./api/google-accounts.js"],
  ["/api/tiktok-accounts", "./api/tiktok-accounts.js"]
]);

const apiAliases = new Map([
  ["/api/health", { target: "./api/status.js", query: { route: "health" } }],
  ["/api/config", { target: "./api/status.js", query: { route: "config" } }],
  ["/api/sync-status", { target: "./api/status.js", query: { route: "sync-status" } }],
  ["/api/meta-oauth-start", { target: "./api/meta-oauth.js", query: {} }],
  ["/api/meta-oauth-callback", { target: "./api/meta-oauth.js", query: { route: "callback" } }],
  ["/api/google-oauth-start", { target: "./api/google-accounts.js", query: { route: "start" } }],
  ["/api/google-oauth-callback", { target: "./api/google-accounts.js", query: { route: "callback" } }],
  ["/api/tiktok-oauth-start", { target: "./api/tiktok-accounts.js", query: { route: "start" } }],
  ["/api/tiktok-oauth-callback", { target: "./api/tiktok-accounts.js", query: { route: "callback" } }]
]);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function setSecurityHeaders(response, isApi = false) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (isApi) response.setHeader("Cache-Control", "no-store");
}

function createResponse(response, isApi = false) {
  let statusCode = 200;
  setSecurityHeaders(response, isApi);

  const adapter = {
    setHeader(name, value) {
      response.setHeader(name, value);
    },
    status(code) {
      statusCode = Number(code) || 500;
      return adapter;
    },
    json(payload) {
      response.statusCode = statusCode;
      if (!response.headersSent) response.setHeader("Content-Type", "application/json; charset=utf-8");
      response.end(JSON.stringify(payload));
    },
    send(payload) {
      response.statusCode = statusCode;
      if (!response.headersSent && typeof payload === "string" && !response.getHeader("Content-Type")) {
        response.setHeader("Content-Type", "text/plain; charset=utf-8");
      }
      response.end(payload);
    }
  };

  return adapter;
}

async function parseBody(request) {
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) return undefined;

  const chunks = [];
  let total = 0;
  for await (const chunk of request) {
    total += chunk.length;
    if (total > maxBodyBytes) {
      const error = new Error("Request body too large.");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  if (!total) return {};
  const raw = Buffer.concat(chunks).toString("utf8");
  const contentType = String(request.headers["content-type"] || "").toLowerCase();

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(raw);
    } catch {
      const error = new Error("Invalid JSON request body.");
      error.statusCode = 400;
      throw error;
    }
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(raw));
  }

  return raw;
}

function getRoute(pathname) {
  if (apiAliases.has(pathname)) {
    const alias = apiAliases.get(pathname);
    return { target: alias.target, query: alias.query };
  }
  if (apiRoutes.has(pathname)) return { target: apiRoutes.get(pathname), query: {} };
  return null;
}

async function runApi(request, response, pathname, url) {
  const route = getRoute(pathname);
  if (!route) return false;

  const query = Object.fromEntries(url.searchParams.entries());
  Object.assign(query, route.query);
  request.query = query;
  request.body = await parseBody(request);

  const moduleUrl = pathToFileURL(path.resolve(rootDir, route.target)).href;
  const module = await import(moduleUrl);
  const handler = module.default;
  if (typeof handler !== "function") throw new Error(`Invalid API handler for ${pathname}`);

  await handler(request, createResponse(response, true));
  return true;
}

function resolveStaticPath(pathname) {
  let relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  if (relativePath === "app") relativePath = "app.html";
  if (relativePath === "login") relativePath = "login.html";
  if (relativePath.endsWith("/")) relativePath += "index.html";

  const filePath = path.resolve(rootDir, relativePath);
  if (filePath !== rootDir && !filePath.startsWith(`${rootDir}${path.sep}`)) return null;
  return filePath;
}

async function serveStatic(request, response, pathname) {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.statusCode = 405;
    response.setHeader("Allow", "GET, HEAD");
    response.end();
    return;
  }

  const filePath = resolveStaticPath(pathname);
  if (!filePath) {
    response.statusCode = 403;
    response.end("Forbidden");
    return;
  }

  try {
    const body = await readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();
    setSecurityHeaders(response);
    response.statusCode = 200;
    response.setHeader("Content-Type", contentTypes[extension] || "application/octet-stream");
    response.setHeader("Content-Length", body.byteLength);
    if (request.method === "HEAD") response.end();
    else response.end(body);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EISDIR") {
      response.statusCode = 404;
      response.end("Not found");
      return;
    }
    throw error;
  }
}

async function handleRequest(request, response) {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  const pathname = url.pathname.replace(/\/+$/, "") || "/";

  if (pathname.startsWith("/api/")) {
    const handled = await runApi(request, response, pathname, url);
    if (handled) return;
    response.statusCode = 404;
    setSecurityHeaders(response, true);
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  await serveStatic(request, response, pathname);
}

const server = http.createServer(async (request, response) => {
  try {
    await handleRequest(request, response);
  } catch (error) {
    const statusCode = Number(error.statusCode) || 500;
    if (response.headersSent) {
      response.destroy();
      return;
    }
    setSecurityHeaders(response, request.url?.startsWith("/api/") ?? false);
    response.statusCode = statusCode;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.end(JSON.stringify({ error: statusCode >= 500 ? "Internal server error" : error.message }));
    if (statusCode >= 500) console.error(error);
  }
});

server.listen(port, host, () => {
  console.log(`David Growth OS listening on http://${host}:${port}`);
});

function shutdown(signal) {
  console.log(`${signal} received, shutting down.`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
