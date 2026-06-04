/**
 * Public configuration.
 *
 * Everything in this file ships to the browser. Only put values here
 * that are safe to be publicly visible (feature flags, public client
 * IDs, the mode toggle, etc.). For secrets see `lib/server/config.js`.
 */

/**
 * API_MODE controls how the frontend reaches the FastAPI backend.
 *
 *   'proxy'  (default, recommended for production)
 *     Frontend calls `/api/<path>` (same origin).
 *     Next.js Route Handler forwards to FastAPI server-side using
 *     `serverConfig.backendUrl` from lib/server/config.js.
 *     -> FastAPI URL is HIDDEN from the browser.
 *     -> All third-party credentials can be injected server-side.
 *
 *   'direct'
 *     Frontend calls FastAPI directly using DIRECT_API_URL below.
 *     -> FastAPI URL is VISIBLE in the browser bundle.
 *     -> Use for local development, debugging, or when you intentionally
 *        want to bypass the Next.js proxy layer.
 *
 * Flip via `NEXT_PUBLIC_API_MODE` in .env.local — no code change needed.
 */
export const API_MODE = process.env.NEXT_PUBLIC_API_MODE === 'direct' ? 'direct' : 'proxy';

/**
 * FastAPI URL used when API_MODE === 'direct'.
 * Ignored in proxy mode (the URL never leaves the server).
 *
 * Falls back to the legacy NEXT_PUBLIC_API_URL for backwards compat.
 */
export const DIRECT_API_URL =
  process.env.NEXT_PUBLIC_DIRECT_API_URL
  || process.env.NEXT_PUBLIC_API_URL
  || 'http://localhost:8000';

/**
 * Path under which Next.js mounts the proxy Route Handler.
 * Frontend requests in proxy mode are sent to `${PROXY_BASE}/<resource>`.
 */
export const PROXY_BASE = '/api';
