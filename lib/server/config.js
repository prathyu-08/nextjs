/**
 * SERVER-ONLY configuration.
 *
 * CRITICAL: This file must NEVER be imported from client components.
 * It reads env vars without the `NEXT_PUBLIC_` prefix — those values
 * stay on the server and never reach the browser bundle.
 *
 * Safe to import from:
 *   - Route Handlers in `app/api/...`
 *   - Server Components (no `'use client'` directive)
 *   - middleware.js
 *
 * Unsafe to import from:
 *   - Any file containing `'use client'`
 *   - Any module imported by a client component
 *
 * If you import this from a client component, Next.js will inline the
 * env-var values into the browser bundle. The build will not warn — it
 * is your responsibility to keep this import server-side only.
 */

export const serverConfig = {
  /**
   * URL of the FastAPI backend.
   * Used by the proxy route handler to forward requests server-side.
   * NEVER exposed to the browser when API_MODE === 'proxy'.
   *
   * Falls back to the legacy NEXT_PUBLIC_API_URL during migration so
   * existing setups continue to work; set API_BACKEND_URL in production
   * to remove the URL from the client bundle.
   */
  backendUrl:
    process.env.API_BACKEND_URL
    || process.env.NEXT_PUBLIC_API_URL
    || 'http://localhost:8000',

  /**
   * Reserved for future server-only secrets:
   *   stripeSecretKey: process.env.STRIPE_SECRET_KEY,
   *   sendgridApiKey: process.env.SENDGRID_API_KEY,
   *   jwtSigningKey:  process.env.JWT_SIGNING_KEY,
   */
};
