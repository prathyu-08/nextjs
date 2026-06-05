import { NextResponse } from 'next/server';
import {
  clearSessionCookies,
  readSessionUser,
  hasSession,
} from '../../../lib/server/session';

// Session endpoint for proxy mode. A static segment wins over the [...path]
// catch-all, so this is handled here and not forwarded to FastAPI. (Don't rename
// to _session — Next treats leading-underscore folders as private and drops
// them from routing.)
//
//   GET returns { authenticated, user } for SessionProvider to rehydrate after
//   a refresh (reads the httpOnly cookies server-side). DELETE expires the
//   cookies on logout; POST does the same for clients that can't send DELETE.

export const dynamic = 'force-dynamic';

export async function GET(req) {
  return NextResponse.json({
    authenticated: hasSession(req),
    user: readSessionUser(req),
  });
}

function destroy() {
  const res = NextResponse.json({ ok: true });
  clearSessionCookies(res);
  return res;
}

export const DELETE = destroy;
export const POST = destroy;
