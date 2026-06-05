# NMK Global Jobs Portal

A two-sided job board built with Next.js 14 (App Router) and React 18. Candidates
search and apply for jobs and build resumes; employers post openings and manage
applicants. The frontend talks to a separate FastAPI backend.

This README covers running it locally and shipping it. For how the code is laid
out and why, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Requirements

- Node.js 18.17 or newer (Next 14 won't run on older versions)
- npm 9+
- A running instance of the FastAPI backend (defaults assume `http://localhost:8000`)

## Running locally

```bash
git clone <repository-url>
cd nextjs
npm install
cp .env.local.example .env.local   # then edit it (see below)
npm run dev
```

That serves the app at http://localhost:3000 with hot reload.

A couple of things that trip people up:

- It's `.env.local` that matters, **not** `.env.local.example`. The example file
  is just a template you copy from.
- Anything starting with `NEXT_PUBLIC_` is baked in at build time, so if you
  change it you have to restart `npm run dev` — a hot reload won't pick it up.

## Environment

The frontend can reach the backend two ways, controlled by `NEXT_PUBLIC_API_MODE`:

**`proxy` (default, and what you want in production).** The browser only ever
calls `/api/*` on its own origin. A Next.js route handler forwards those requests
to FastAPI server-side, so the backend URL never ships to the browser and the
auth token lives in an httpOnly cookie. Set the backend URL with `API_BACKEND_URL`
(server-only — no `NEXT_PUBLIC_` prefix, so it stays on the server).

**`direct`.** The browser calls FastAPI straight from `NEXT_PUBLIC_DIRECT_API_URL`.
Handy for debugging, but the backend URL is visible in the bundle and the backend
needs CORS open for your origin. Don't use this in production.

A typical `.env.local`:

```env
NEXT_PUBLIC_API_MODE=proxy
API_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_DIRECT_API_URL=http://localhost:8000   # only used in direct mode
```

`.env.local` is gitignored — keep real values out of the repo.

## Scripts

- `npm run dev` — dev server with hot reload (port 3000)
- `npm run build` — production build into `.next/`
- `npm start` — serve the production build (build first)
- `npm test` — run the Jest suite
- `npm run test:watch` — Jest in watch mode
- `npm run test:coverage` — suite with a coverage report

## Tests

Jest + React Testing Library, with test files sitting next to the code they cover.
`npm test` runs everything; see the Testing section in
[ARCHITECTURE.md](./ARCHITECTURE.md#testing) for the conventions if you're adding
to the suite.

## Deploying

Whatever the target, set the env vars there (don't ship `.env.local`), and in
proxy mode make sure the Next server can actually reach `API_BACKEND_URL` — that
call happens server-side, so it's the host's network that matters, not the
user's. In proxy mode you generally don't need CORS on the backend at all, since
the browser only talks to the same origin; you only need it in direct mode.

### Vercel

Import the repo, add the env vars under Settings → Environment Variables
(`NEXT_PUBLIC_API_MODE`, `API_BACKEND_URL`, and `NEXT_PUBLIC_DIRECT_API_URL` if
you use direct mode), and deploy. Vercel detects Next.js on its own; the `/api/*`
proxy runs as a serverless function.

### Node server (self-hosted)

```bash
git clone <repository-url> /opt/nmk-jobs-portal
cd /opt/nmk-jobs-portal
npm ci
# create .env.local with your production values
npm run build
npm start            # listens on 3000
```

For anything long-running, put it behind a process manager (PM2, systemd) and a
reverse proxy that terminates TLS:

```bash
npm install -g pm2
pm2 start "npm start" --name nmk-jobs-portal
pm2 save && pm2 startup
```

Minimal Nginx in front:

```nginx
server {
  listen 443 ssl;
  server_name jobs.example.com;
  ssl_certificate     /etc/letsencrypt/live/jobs.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/jobs.example.com/privkey.pem;

  location / {
    proxy_pass         http://127.0.0.1:3000;
    proxy_set_header   Host $host;
    proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto $scheme;
  }
}
```

### Docker

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t nmk-jobs-portal .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_MODE=proxy \
  -e API_BACKEND_URL=https://api.example.com \
  nmk-jobs-portal
```

Before you ship, it's worth confirming `npm run build` and `npm test` both pass,
that `.env.local.example` still lists every variable the app reads, and that the
backend URL is right for the environment you're deploying to.

## Troubleshooting

**Changed `NEXT_PUBLIC_API_MODE` (or another `NEXT_PUBLIC_` var) and nothing
happened.** Those are inlined at build time — restart the dev server, or rebuild.
Also double-check you edited `.env.local`, not the `.example`.

**Requests still go through `/api` after switching to direct mode.** Same cause —
restart so the new value is picked up.

**401s or CORS errors in direct mode.** The backend has to allow your origin
(`http://localhost:3000` locally). Proxy mode sidesteps this entirely.

**Build fails with a `useSearchParams` / Suspense error.** Any page calling
`useSearchParams()` needs a `<Suspense>` boundary; `app/(main)/reset-password/page.jsx`
is a working example.

**Weird stale build after pulling changes.** Delete `.next/` and run again. If a
dependency changed, `npm install` first.

## License

Proprietary — © NMK Global Incorporated. All rights reserved.
