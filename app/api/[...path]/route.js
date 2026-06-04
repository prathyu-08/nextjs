import { NextResponse } from 'next/server';
import { serverConfig } from '../../../lib/server/config';

/**
 * Catch-all proxy that forwards every request under `/api/*` to the
 * FastAPI backend defined in `lib/server/config.js`.
 *
 *   Browser     →  GET /api/jobs/         (this handler)
 *   Next server →  GET ${backendUrl}/jobs/  (FastAPI)
 *
 * Active only when `API_MODE === 'proxy'`. In direct mode the frontend
 * calls FastAPI directly and never hits this handler.
 *
 * What this handler does:
 *   - Strips the `/api` prefix from the path
 *   - Forwards method, query string, headers, and body verbatim
 *   - Drops headers that fetch/Node must recompute (host, content-length)
 *   - Returns the upstream response with its original status/headers
 *   - Returns 502 if the upstream is unreachable
 *
 * What this handler does NOT yet do (track in ARCHITECTURE.md known gaps):
 *   - Move auth tokens to httpOnly cookies (still passed via Authorization
 *     header from the browser; httpOnly cookie support is a follow-up)
 *   - Inject third-party credentials from server-only env vars
 *   - Rate limiting / request validation
 */

// Force this route to run on the Node.js runtime (default) and never be
// statically optimized — every request is dynamic by definition.
export const dynamic = 'force-dynamic';

const STREAMING_METHODS_WITH_BODY = ['POST', 'PUT', 'PATCH', 'DELETE'];

async function proxy(req) {
  // Strip the /api prefix so the path matches FastAPI's routes 1:1.
  const path = req.nextUrl.pathname.replace(/^\/api/, '');
  const target = `${serverConfig.backendUrl}${path}${req.nextUrl.search}`;

  // Clone incoming headers and remove ones fetch must recompute.
  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('content-length');
  headers.delete('connection');

  const init = {
    method: req.method,
    headers,
    redirect: 'manual',
  };

  if (STREAMING_METHODS_WITH_BODY.includes(req.method)) {
    // arrayBuffer() handles both JSON and multipart/form-data correctly.
    // For very large uploads, swap to req.body (ReadableStream) — but that
    // requires `duplex: 'half'` and has Node-version caveats.
    const body = await req.arrayBuffer();
    if (body.byteLength > 0) init.body = body;
  }

  let upstream;
  try {
    upstream = await fetch(target, init);
  } catch (err) {
    return NextResponse.json(
      { detail: 'Upstream service unavailable', error: err.message },
      { status: 502 },
    );
  }

  // Drop transport-layer headers that the runtime will set itself.
  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete('transfer-encoding');
  responseHeaders.delete('content-encoding');
  responseHeaders.delete('content-length');

  // Buffer the response so we can return a plain NextResponse without
  // worrying about ReadableStream edge cases. Fine for API payloads.
  const responseBody = await upstream.arrayBuffer();

  return new NextResponse(responseBody, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const HEAD = proxy;
