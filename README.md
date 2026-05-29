# NMK Global Jobs Portal

A two-sided recruitment platform built on Next.js 14 (App Router). Candidates discover and apply to jobs, employers post and manage openings, and a resume builder lets candidates produce polished CVs.

> For codebase architecture, conventions, and onboarding guidance, see [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## Table of contents
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Project layout](#project-layout)
- [Routes](#routes)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Tech stack
- **Framework:** Next.js 14 (App Router) + React 18
- **HTTP:** Axios with bearer-token interceptor
- **Animation:** Framer Motion (resume builder)
- **Icons:** Font Awesome 6 (CDN) + Lucide React
- **Styling:** Vanilla CSS via `styles/globals.css` design system
- **Language:** JavaScript (ESM, `.jsx`)
- **Node:** 18.17+ (Next.js 14 minimum)

## Prerequisites
- **Node.js** 18.17 or newer (LTS recommended)
- **npm** 9+ (or pnpm/yarn — examples below use npm)
- Access to the backend API (default: `http://localhost:8000`)

## Setup

```bash
# 1. Clone and install
git clone <repository-url>
cd nextjs
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Edit .env.local — see "Environment variables" below

# 3. Start the dev server
npm run dev
# → http://localhost:3000
```

## Environment variables

All public env vars are prefixed `NEXT_PUBLIC_`. Place them in `.env.local` (gitignored).

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | `http://localhost:8000` | Base URL of the backend REST API. |

`.env.local.example`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server with hot reload at `http://localhost:3000`. |
| `npm run build` | Create an optimized production build (`.next/`). |
| `npm start` | Serve the production build (run `npm run build` first). |

## Project layout

```
app/                    # Next.js App Router pages (routes & layouts)
components/             # Feature-grouped React components
  layout/               # Navbar, Footer, sidebars
  jobs/                 # Job-related components
  candidate/            # Candidate dashboard components
  employer/             # Employer dashboard components
  public/               # About / Contact / FAQ
  auth/                 # (reserved) auth-specific components
  resume-builder/       # Resume builder system
lib/
  api/                  # Axios client + per-resource API modules
  constants/            # Centralized constants (routes, etc.)
styles/
  globals.css           # Design system (tokens + components)
public/                 # (reserved) static assets served at /
```

Full conventions and reasoning live in [ARCHITECTURE.md](./ARCHITECTURE.md).

## Routes

| Route | Description |
|---|---|
| `/` | Marketing landing page |
| `/jobs` | Job listings with filters |
| `/jobs/[id]` | Job detail page (dynamic) |
| `/auth/login` | Login |
| `/auth/signup` | Register (candidate or employer) |
| `/auth/verify-otp` | Email OTP verification |
| `/auth/forgot-username` | Username recovery |
| `/forgot-password` | Forgot password |
| `/reset-password` | Reset password (token via query) |
| `/candidate/*` | Candidate dashboard (13 pages) |
| `/employer/*` | Employer dashboard (7 pages) |
| `/public/about` | About us |
| `/public/contact` | Contact |
| `/public/faq` | FAQ |

---

## Deployment

### Option A — Vercel (recommended)

1. Push your branch to GitHub/GitLab/Bitbucket.
2. Create a new project on [vercel.com](https://vercel.com) and import the repo.
3. In **Settings → Environment Variables**, add `NEXT_PUBLIC_API_URL` for each environment (Production, Preview, Development).
4. Vercel auto-detects Next.js — no further config required.
5. Trigger a deploy by pushing to `main` (production) or any branch (preview).

The Vercel build runs `npm install && npm run build`. The output is served on Vercel's global edge network with automatic HTTPS, image optimization, and ISR support.

### Option B — Self-hosted (Node + PM2)

For an enterprise environment that requires self-hosting (on-prem or a private VPC):

```bash
# On the server
git clone <repository-url> /opt/nmk-jobs-portal
cd /opt/nmk-jobs-portal
npm ci --omit=dev   # production install, skips dev deps
echo "NEXT_PUBLIC_API_URL=https://api.example.com" > .env.local
npm run build

# Start with PM2
npm install -g pm2
pm2 start "npm start" --name nmk-jobs-portal
pm2 save
pm2 startup   # follow the printed instructions
```

Place an Nginx (or any reverse proxy) in front to terminate TLS:

```nginx
server {
  listen 443 ssl http2;
  server_name jobs.example.com;
  ssl_certificate     /etc/letsencrypt/live/jobs.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/jobs.example.com/privkey.pem;

  location / {
    proxy_pass         http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header   Upgrade $http_upgrade;
    proxy_set_header   Connection 'upgrade';
    proxy_set_header   Host $host;
    proxy_set_header   X-Real-IP $remote_addr;
    proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### Option C — Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
USER nextjs
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t nmk-jobs-portal .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://api.example.com nmk-jobs-portal
```

### Pre-deployment checklist
- [ ] `npm run build` succeeds locally with zero warnings
- [ ] `.env.local.example` reflects every variable the app actually reads
- [ ] `NEXT_PUBLIC_API_URL` points to the correct backend for the target environment
- [ ] CORS on the backend allows the deployed frontend origin
- [ ] All routes load in production mode (`npm run build && npm start`)
- [ ] SEO metadata renders correctly (view-source on `/`, `/jobs`, `/jobs/[id]`)
- [ ] HTTPS certificate is valid (Let's Encrypt or vendor-managed)

---

## Troubleshooting

**`Module not found` after pulling new changes**
Run `npm install` — dependencies may have changed.

**API requests fail with 401/CORS**
Confirm `NEXT_PUBLIC_API_URL` is set in `.env.local` and the backend's CORS config allows your origin (`http://localhost:3000` in dev).

**Build fails on `useSearchParams` Suspense error**
Pages that use `useSearchParams()` must be wrapped in `<Suspense>`. Pattern: extract inner component, wrap it in `<Suspense fallback={null}>` in the default export. See `app/(main)/reset-password/page.jsx` and `components/jobs/JobDetailPage.jsx` for examples.

**Hot reload not picking up changes**
Stop the dev server (`Ctrl+C`), delete `.next/`, and restart with `npm run dev`.

---

## License
Proprietary — © NMK Global Incorporated. All rights reserved.
