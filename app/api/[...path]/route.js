import { NextResponse } from 'next/server';
import { serverConfig } from '../../../lib/server/config';
import {
  writeSessionCookies,
  readSessionToken,
} from '../../../lib/server/session';

// Catch-all proxy: forwards everything under /api/* to the FastAPI backend
// (proxy mode only; direct mode skips this entirely). It strips the /api
// prefix, forwards method/query/headers/body, and returns the upstream
// response, or 502 if the backend is down.
//
// It also handles the session: a session cookie is injected as a Bearer header
// on the way out, and auth responses get their tokens moved into httpOnly
// cookies and stripped from the body so the token never reaches JS.

export const dynamic = 'force-dynamic';

const STREAMING_METHODS_WITH_BODY = ['POST', 'PUT', 'PATCH', 'DELETE'];
const TOKEN_FIELDS = ['id_token', 'refresh_token'];

async function proxy(req) {
  const path = req.nextUrl.pathname.replace(/^\/api/, '');
  const target = `${serverConfig.backendUrl}${path}${req.nextUrl.search}`;

  const isAuthMutation = req.method === 'POST' && path.startsWith('/auth/');

  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('content-length');
  headers.delete('connection');

  // Frontend never holds the token; pull it from the cookie. An explicit
  // Authorization header (if any) still wins.
  const cookieToken = readSessionToken(req);
  if (cookieToken && !headers.has('authorization')) {
    headers.set('authorization', `Bearer ${cookieToken}`);
  }

  const init = {
    method: req.method,
    headers,
    redirect: 'manual',
  };

  let remember = false;
  if (STREAMING_METHODS_WITH_BODY.includes(req.method)) {
    // arrayBuffer covers JSON and multipart bodies alike.
    const body = await req.arrayBuffer();
    if (body.byteLength > 0) {
      init.body = body;
      if (isAuthMutation) {
        try {
          remember = !!JSON.parse(new TextDecoder().decode(body)).remember;
        } catch {
          // non-JSON body (form-data); remember stays false
        }
      }
    }
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

  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete('transfer-encoding');
  responseHeaders.delete('content-encoding');
  responseHeaders.delete('content-length');

  // On auth responses, move the tokens into httpOnly cookies and drop them from
  // the body. Everything else passes through untouched.
  if (isAuthMutation && upstream.ok) {
    const contentType = upstream.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      let payload;
      try {
        payload = JSON.parse(await upstream.text());
      } catch {
        payload = null;
      }
      if (payload && payload.id_token) {
        const safeBody = { ...payload };
        TOKEN_FIELDS.forEach((field) => delete safeBody[field]);
        const res = NextResponse.json(safeBody, {
          status: upstream.status,
          headers: responseHeaders,
        });
        writeSessionCookies(res, payload, { remember });
        return res;
      }
      // auth response without tokens (signup/confirm) — pass through
      return NextResponse.json(payload ?? {}, {
        status: upstream.status,
        headers: responseHeaders,
      });
    }
  }

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
