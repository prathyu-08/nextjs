# Architecture & Conventions

> This document is the onboarding reference for any developer — human or AI — joining this codebase. It explains **how the project is structured, why it's structured that way, and which conventions to follow when adding new code**.
>
> For setup and deployment, see [README.md](./README.md).

---

## Table of contents
1. [System overview](#system-overview)
2. [Directory structure](#directory-structure)
3. [Routing model (App Router)](#routing-model-app-router)
4. [Data layer (API)](#data-layer-api)
5. [Component organization](#component-organization)
6. [Styling & design system](#styling--design-system)
7. [Authentication & authorization](#authentication--authorization)
8. [Testing](#testing)
9. [SEO conventions](#seo-conventions)
10. [Naming & code conventions](#naming--code-conventions)
11. [Adding a new feature: the playbook](#adding-a-new-feature-the-playbook)
12. [Known gaps & future work](#known-gaps--future-work)

---

## 1. System overview

NMK Global Jobs Portal is a **client-rendered Next.js 14 application** with two primary user roles:

- **Candidates** — discover jobs, apply, manage applications, build resumes.
- **Employers (recruiters)** — post jobs, manage applicants, view analytics.

The Next.js frontend talks to a separate FastAPI backend. By default it goes through a same-origin proxy (`/api/*`) handled by a Next.js Route Handler, which forwards to FastAPI server-side and keeps the backend URL and the auth token off the browser. A single env var (`NEXT_PUBLIC_API_MODE`) can switch to calling FastAPI directly for local debugging. Data fetching happens client-side via Axios.

```
proxy mode (default)
┌───────────────────┐   /api/*    ┌──────────────────┐   forwards    ┌──────────────┐
│  Browser (React)  │ ──────────► │  Next.js Route   │ ────────────► │  FastAPI     │
│  httpOnly cookie  │ ◄────────── │  Handler (proxy) │ ◄──────────── │  backend     │
└───────────────────┘             └──────────────────┘               └──────────────┘

direct mode (debug)
┌───────────────────┐   Bearer token / NEXT_PUBLIC_DIRECT_API_URL    ┌──────────────┐
│  Browser (React)  │ ◄────────────────────────────────────────────► │  FastAPI     │
└───────────────────┘                                                 └──────────────┘
```

---

## 2. Directory structure

```
nextjs/
├── app/                              # Next.js App Router (file-based routing)
│   ├── layout.jsx                    # Root layout: <html>, <body>, <SessionProvider>, metadata
│   ├── (auth)/                       # Route group — pages WITHOUT Navbar/Footer
│   │   ├── layout.jsx                # Auth layout (noindex metadata)
│   │   └── auth/
│   │       ├── login/                # page.jsx + page.test.jsx (tests co-located)
│   │       ├── signup/
│   │       ├── verify-otp/
│   │       └── forgot-username/
│   ├── (main)/                       # Route group — pages WITH Navbar/Footer
│   │   ├── layout.jsx                # Renders <Navbar> + <main> + <Footer>
│   │   ├── page.jsx                  # Home (/)  (+ page.test.jsx)
│   │   ├── jobs/                     # /jobs (list) + /jobs/[id] (dynamic detail)
│   │   ├── candidate/<feature>/      # 13 candidate routes (mostly re-export the component)
│   │   ├── employer/<feature>/       # 7 employer routes
│   │   ├── public/                   # /public/about, /public/contact, /public/faq
│   │   ├── forgot-password/
│   │   └── reset-password/
│   └── api/                          # Route Handlers (run server-side)
│       ├── [...path]/route.js        # Catch-all proxy → FastAPI (+ session cookie handling)
│       └── session/route.js          # GET rehydrate / DELETE logout (proxy-mode session)
│
├── components/                       # Feature-grouped; ONE FOLDER PER COMPONENT
│   ├── layout/
│   │   ├── Navbar/                   # Navbar.jsx + Navbar.module.css + Navbar.test.jsx + index.js
│   │   ├── Footer/
│   │   └── sidebars/
│   │       ├── CandidateSidebar/
│   │       └── EmployerSidebar/
│   ├── jobs/                         # JobsListPage/ · JobDetailPage/ · JobBadge/
│   ├── candidate/                    # 12 page components + _shared/ (private helpers: Shell, Card, IMG)
│   ├── employer/                     # ManageJobsPage/ · CompanyProfilePage/ · CompanySettingsPage/
│   ├── public/                       # AboutPage/ · ContactPage/ · FaqPage/
│   └── resume-builder/               # ResumeBuilderContext/ · EditProfileResumeBuilder/ · Modal/ · …
│       # Each folder: <Name>.jsx + <Name>.module.css + <Name>.test.jsx + index.js (barrel)
│
├── lib/
│   ├── config.js                     # Public config: API_MODE, DIRECT_API_URL, PROXY_BASE
│   ├── api/                          # One file per backend resource
│   │   ├── client.js                 # Axios instance; mode-aware baseURL + session-token interceptor
│   │   ├── auth.js · jobs.js · candidate.js · … (one per resource)
│   │   └── index.js                  # Re-exports + default `api` object
│   ├── server/                       # SERVER-ONLY (never import from a client component)
│   │   ├── config.js                 # serverConfig.backendUrl (server-only env)
│   │   └── session.js                # httpOnly cookie read/write/clear helpers
│   ├── session/                      # Client session library (see §7)
│   │   ├── constants.js              # cookie names, TTLs, pickUser()
│   │   ├── memory.js                 # in-memory store + subscribe
│   │   ├── client.js                 # direct-mode cookie persistence
│   │   ├── index.js                  # mode-aware facade (start/hydrate/getToken/…)
│   │   └── SessionProvider.jsx       # <SessionProvider> + useSession()
│   └── constants/
│       └── routes.js                 # ROUTES.* — single source of truth for paths
│
├── styles/
│   └── globals.css                   # Design system: tokens + component classes
│
├── jest.config.js                    # next/jest config (jsdom, co-located *.test.*)
├── jest.setup.js                     # global mocks (next/navigation, next/link, next/image)
├── .env.local.example                # template for .env.local (gitignored)
├── public/                           # (reserved) Static assets
├── next.config.js
├── package.json
├── README.md                         # Setup, deployment, troubleshooting
└── ARCHITECTURE.md                   # ← this file
```

---

## 3. Routing model (App Router)

The project uses **Next.js 14 App Router** (the `/app` directory), not Pages Router.

### Route groups

Two top-level groups control whether the Navbar/Footer wraps the page:

| Group | Layout | Used by |
|---|---|---|
| `app/(auth)/` | Bare `<main>` only | All `/auth/*` routes — auth pages don't show Navbar |
| `app/(main)/` | Navbar + `<main>` + Footer | Everything else (home, jobs, dashboards, public) |

Parentheses around a folder name make it a **route group**: it does not appear in the URL but it scopes the layout.

### Client Components

Most pages are **Client Components** (`'use client'` at top) because they use hooks, browser APIs, or interactive state. The initial HTML is still server-rendered (good for SEO), then hydrated on the client.

For pages where SEO matters most and content is mostly static (`/jobs`, `/jobs/[id]`, `/public/*`), the *page wrapper* in `app/(main)/...` is a Server Component that exports `metadata` and renders the Client Component. Example: `app/(main)/jobs/page.jsx` exports metadata as a Server Component, then renders `<JobsListPage />`.

### Navigation API

This project uses `next/navigation` (App Router). **Never use `next/router`** — that's Pages Router.

```jsx
// Reading the current path
import { usePathname } from 'next/navigation';
const pathname = usePathname();

// Reading query params
import { useSearchParams } from 'next/navigation';
const searchParams = useSearchParams();
const value = searchParams.get('key');

// Programmatic navigation
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/jobs');

// Dynamic route params (in server pages only)
export default function Page({ params }) {
  return <JobDetailPage jobId={params.id} />;
}
```

### Suspense boundary requirement

Pages that call `useSearchParams()` **must** be wrapped in `<Suspense>` (Next.js limitation for static prerendering). Pattern:

```jsx
'use client';
import { Suspense, useSearchParams } from 'next/navigation';

function Inner() {
  const searchParams = useSearchParams();
  // …
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}
```

---

## 4. Data layer (API)

### Two-mode architecture

The frontend never knows the FastAPI URL directly. It calls `/api/*` (same origin) and a catch-all Route Handler at `app/api/[...path]/route.js` forwards the request to FastAPI server-side. A single env var toggles between this **proxy mode** (production default) and **direct mode** (browser calls FastAPI directly — useful for debugging).

```
proxy mode (production)
  Browser ─► /api/jobs ─► Next.js Route Handler ─► FastAPI
                              │
                              └── serverConfig.backendUrl (server-only env)

direct mode (debug)
  Browser ─► FastAPI URL                          (NEXT_PUBLIC_DIRECT_API_URL)
```

**Toggle in `.env.local`:**
```
NEXT_PUBLIC_API_MODE=proxy        # or 'direct'
API_BACKEND_URL=http://localhost:8000     # used by proxy mode (server-only)
NEXT_PUBLIC_DIRECT_API_URL=http://localhost:8000   # used by direct mode only
```

Switching modes is config-only — no code changes. `lib/api/client.js` reads `API_MODE` at module load and points axios's `baseURL` at the right target.

### Where to find it

- `lib/server/config.js` — server-only secrets (FastAPI URL, future third-party keys). **Never import from a client component.**
- `lib/config.js` — public config (mode toggle, public client IDs). Safe to ship to the browser.
- `lib/api/client.js` — shared axios instance with the mode-aware base URL.
- `lib/api/<resource>.js` — one file per backend resource, exporting an API object (e.g. `authApi`, `jobApi`). These do not change between modes.
- `app/api/[...path]/route.js` — the proxy Route Handler that forwards everything under `/api/` to FastAPI in proxy mode.

### Adding a new endpoint

```jsx
// lib/api/jobs.js
import { client } from './client';

export const jobApi = {
  // existing methods…
  getFeaturedJobs: async () => {
    const response = await client.get('/jobs/featured');
    return response.data;
  },
};
```

If the resource is new, create `lib/api/<resource>.js` and register it in `lib/api/index.js`.

### Importing in components

Prefer named imports for clarity:

```jsx
import { jobApi } from '../../lib/api';
const jobs = await jobApi.getJobs();
```

The default export (`import api from '../../lib/api'` → `api.jobApi.getJobs()`) also works for backwards compatibility.

### Authentication — the session library

Session handling lives in `lib/session/*` (client) and `lib/server/session.js` (server), and mirrors the same dual-mode split as the API layer (`NEXT_PUBLIC_API_MODE`).

The durable source of truth is an **httpOnly cookie set by the backend**; the running app reads from an **in-memory store** that is re-hydrated from the cookie on every refresh. Tokens never touch `localStorage` or any JS-readable cookie.

| File | Role |
| --- | --- |
| `lib/session/constants.js` | Shared cookie names, TTLs, and the `pickUser` payload mapper. Runtime-agnostic — safe to import anywhere. |
| `lib/session/memory.js` | In-memory store (module singleton) + `subscribe`. The single source the running app reads from; wiped on refresh. |
| `lib/session/client.js` | Direct-mode persistence to a JS cookie (no `localStorage`). The dev/debug fallback (JS can't set httpOnly). |
| `lib/session/index.js` | Mode-aware facade: `start` / `hydrate` / `getToken` / `getUser` / `isAuthenticated` / `end`. |
| `lib/session/SessionProvider.jsx` | `<SessionProvider>` (mounted in `app/layout.jsx`) + the `useSession()` hook. Hydrates memory on mount. |
| `lib/server/session.js` | Server helpers used by route handlers: `writeSessionCookies` (httpOnly), `clearSessionCookies`, `readSessionToken/User`. |
| `app/api/session/route.js` | `GET` re-hydrates the client after refresh (reads httpOnly cookie server-side); `DELETE` logs out. |

**proxy mode ("from backend") — recommended/production.** The `/api` proxy reads the FastAPI auth response, moves `id_token`/`refresh_token` into httpOnly+`Secure` cookies, strips them from the JS-visible body, and injects `Authorization: Bearer <cookie>` on every upstream request. The browser never holds the token. `useSession()` gets the user from the in-memory store, hydrated via `GET /api/session`.

**direct mode ("from frontend") — dev/debug.** No Next server in the path, so JS can't set httpOnly cookies; the client lib persists the token to a JS cookie + memory instead. Documented as a fallback, not for production.

Components consume `useSession()` (`{ user, isAuthenticated, loading, login, logout }`); they never read cookies or storage directly.

---

## 5. Component organization

### Feature-first folders

Components are grouped **by feature**, not by type. Don't create `components/forms/`, `components/cards/`, `components/lists/` — those become catch-alls that no reviewer can navigate.

```
components/
├── jobs/         ← anything job-related
├── candidate/    ← candidate dashboard
├── employer/     ← employer dashboard
└── layout/       ← navbar, footer, sidebars
```

### One folder per component (co-location)

Every component lives in its **own folder** that co-locates the component, its
CSS Module, its test, and a barrel `index.js`:

```
components/candidate/EditProfilePage/
├── EditProfilePage.jsx          ← the component (default export)
├── EditProfilePage.module.css   ← its styles
├── EditProfilePage.test.jsx     ← its unit tests
└── index.js                     ← barrel: export * (+ default) from './EditProfilePage'
```

The folder name matches the component name. The `index.js` barrel re-exports the
component so importers can keep using the folder path with no file extension:

```jsx
import EditProfilePage from '@/components/candidate/EditProfilePage'; // resolves to .../EditProfilePage/index.js
```

This keeps each component self-contained and the feature folder navigable, and
means a component can be moved or have files added without touching its importers.

When adding a component: create `components/<feature>/<Name>/` with those four
files. Inside the folder, import siblings as `../OtherComponent` and reach
outward (lib, other features) with the matching relative depth.

### Private helpers — leading underscore

If a helper component is used only within one feature folder, put it in a
`_shared/` folder (e.g. `components/candidate/_shared/`). The leading underscore
signals "internal — don't import from outside this folder."

Example: `components/candidate/_shared/` exports `Shell`, `Card`, `Input`, `IMG`
used across all candidate pages.

### Thin page wrappers

A `app/(main)/<feature>/<name>/page.jsx` file should be a **thin wrapper**: import the component from `components/<feature>/`, optionally export `metadata`, and render. Heavy logic and JSX live in the component file, not the page file.

```jsx
// app/(main)/jobs/page.jsx
import JobsListPage from '../../../components/jobs/JobsListPage';

export const metadata = { title: 'Browse Jobs', description: '…' };

export default function Page() {
  return <JobsListPage />;
}
```

This separation lets the page file own routing/metadata and the component file own rendering. It also makes it easy to render the same component on multiple routes if needed.

---

## 6. Styling & design system

### Where styles live

`styles/globals.css` is the single source of truth. It contains:

1. **Reset + base typography** (top)
2. **Design tokens** as CSS custom properties (`:root { --color-primary: … }`)
3. **Layout primitives** (`.container`, `.section`, `.grid-2/3/4`)
4. **Components** (`.btn`, `.card`, `.input`, `.badge`, `.hero-split`, `.sidebar`)
5. **Feature blocks** (dashboard, resume builder, tables, timeline — legacy)
6. **Print rules** (resume preview)

### Design tokens

Colors, spacing, radii, and shadows are defined as CSS custom properties in `:root`:

```css
:root {
  --color-primary: #2563eb;
  --color-success: #17d27c;
  --radius-md: 10px;
  --shadow-md: 0 4px 15px rgba(0, 0, 0, 0.06);
}
```

Use them in new CSS rules — don't hardcode hex values.

### When to inline-style vs. use a class

| Use a class | Use inline `style={{}}` |
|---|---|
| The pattern recurs in 2+ places | One-off positioning unique to this view |
| It maps to a design token (button, card, badge, container, grid) | Computed style based on runtime state (e.g. progress bar width) |
| It's a layout primitive | Conditional styling driven by props for THIS instance |

In practice: **reach for a class first**, fall back to inline only when the value genuinely varies per render.

### Conditional className for state

For state-driven styling, switch the className — don't toggle inline styles:

```jsx
// ✅ Good
<button className={`btn ${active ? 'btn-primary' : 'btn-outline-primary'}`}>

// ❌ Bad
<button style={{ background: active ? '#2563eb' : 'transparent' }}>
```

### Hover effects

Use `:hover` in CSS, not `onMouseEnter`/`onMouseLeave` event handlers:

```css
.card-hover { transition: transform 0.2s, box-shadow 0.2s; }
.card-hover:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
```

### Migration status

The design system is **established** but **not yet fully adopted**: about 90% of the codebase still uses inline styles inherited from the original Vite → Next conversion. The path forward:

1. **Foundation (done)** — design tokens, base components in `globals.css`.
2. **Showcase (done)** — `CandidateSidebar` and `EmployerSidebar` use the new classes.
3. **Page-by-page migration (in progress)** — refactor each page to use classes. Each refactored page reduces inline-style count and adds to a consistent visual language. Recommended order: home → auth pages → jobs → public → dashboards.

When refactoring a page, replace inline styles with classes wherever possible. If the inline style doesn't map cleanly to an existing class, *add the class to `globals.css`* rather than inlining a new variant.

---

## 7. Authentication & authorization

### Login flow (proxy mode)

1. `POST /api/auth/login` → the proxy forwards to FastAPI, which returns `id_token`, `refresh_token`, `user_id`, `email`, `role`.
2. The proxy moves the tokens into httpOnly cookies, strips them from the response body, and returns only the non-sensitive fields.
3. `app/(auth)/auth/login/page.jsx` calls `login(...)` (`useSession`) which seeds the in-memory user. No tokens reach JS.
4. Navbar reads the user from `useSession()`; on refresh `SessionProvider` re-hydrates memory via `GET /api/session`.
5. The Axios interceptor adds nothing in proxy mode — the httpOnly cookie rides along and the proxy injects `Authorization: Bearer <token>` upstream. (In direct mode the interceptor attaches the token from `session.getToken()`.)

See [§4 → Authentication](#authentication--the-session-library) for the full file map.

### Roles

`user.role` is either `'user'` (candidate) or `'recruiter'` (employer). The Navbar shows different dropdowns based on role.

### Route protection

> ⚠️ **Not currently implemented.** All routes are accessible without authentication; protected pages fetch data on mount and rely on the backend returning 401 to surface a problem. See [Known gaps](#known-gaps--future-work) for the recommended fix (Next.js middleware).

---

## 8. Testing

### Stack

Jest (via `next/jest`) + React Testing Library, running on `jsdom`. `next/jest`
handles the SWC transform, CSS Module stubbing, and `.env.local` loading, so
there's no Babel config to maintain.

```bash
npm test            # run once
npm run test:watch  # watch mode
npm run test:coverage
```

### Co-location

Tests live next to the code they cover: `Navbar/Navbar.test.jsx` beside
`Navbar/Navbar.jsx`, and `page.test.jsx` beside each `page.jsx`. App routes that
just re-export a component aren't tested separately — the component's own test
covers them.

### Global setup (`jest.setup.js`)

Applied to every test, so individual files don't repeat it:

- `next/navigation` is mocked. The router is a shared spy at **`global.__router`**
  (`push`, `replace`, `back`, …); `usePathname` returns `'/'`, `useSearchParams`
  returns an empty `URLSearchParams`, `useParams` returns `{}`.
- `next/link` renders a plain `<a href>`, `next/image` renders a plain `<img>`.
- `jest.clearAllMocks()` runs after each test.

Override `next/navigation` in a single file only when you need real values
(active route, a query param, a dynamic `[id]`).

### Conventions

- **Navigation:** assert with `expect(global.__router.push).toHaveBeenCalledWith('/path')`.
- **Session:** for components using `useSession`, mock the provider and return a
  controllable value:
  ```js
  const mockUseSession = jest.fn();
  jest.mock('../../lib/session/SessionProvider', () => ({ useSession: () => mockUseSession() }));
  ```
- **API:** mock `lib/api` so nothing hits the network. Because `jest.mock` is
  hoisted, create the `jest.fn()`s **inside** the factory and read them back with
  `jest.requireMock(...)` — referencing an outer `const` throws a TDZ error.
- **CSS Modules** are stubbed by `next/jest`; assert on text/roles/labels/values,
  never on class names.
- **Hover-gated UI** (menus that open on `mouseEnter`): open with
  `await user.hover(trigger)`, then `fireEvent.click(target)` — `user.click`
  moves the pointer and can re-close the menu.
- **Duplicate text** (desktop + mobile, list rows): use `getAllBy*`.
- **Animated modals** (`AnimatePresence`): assert close with
  `waitForElementToBeRemoved(...)`, not a synchronous `queryBy`.
- **Route handlers / the proxy** need web `fetch`/`Headers` globals, so those
  test files start with `@jest-environment node` and mock `next/server`.

Coverage (`collectCoverageFrom` in `jest.config.js`) focuses on the session
library, the route handlers, and the API client; the broader component/page
suite guards against UI regressions.

---

## 9. SEO conventions

### Metadata per route

Use Next.js Metadata API in **Server Component page wrappers**:

```jsx
export const metadata = {
  title: 'Browse Jobs',
  description: 'Search thousands of curated job openings…',
};
```

For dynamic routes, use `generateMetadata`:

```jsx
export async function generateMetadata({ params }) {
  return {
    title: `Job ${params.id}`,
    description: '…',
  };
}
```

The root `app/layout.jsx` defines defaults and a title template (`%s | NMK Global Jobs Portal`) so per-page titles compose correctly.

### Structured data (JSON-LD)

Job detail pages emit `JobPosting` JSON-LD inside the page (`components/jobs/JobDetailPage.jsx`). This lets Google index jobs into its dedicated Jobs search UI.

When adding new entity pages (Organization, Person, etc.), follow the same pattern using [schema.org](https://schema.org) types.

### Crawl rules

`app/(auth)/layout.jsx` sets `robots: { index: false, follow: false }` — auth pages should never appear in search results.

---

## 10. Naming & code conventions

### Files
- **Components:** one folder per component, PascalCase, holding `<Name>.jsx`,
  `<Name>.module.css`, `<Name>.test.jsx`, and an `index.js` barrel (see §5).
- **Tests:** co-located, `<Name>.test.jsx` (or `page.test.jsx` beside a page).
- **Page wrappers:** lowercase, `page.jsx` (App Router requirement)
- **Layouts:** lowercase, `layout.jsx` (App Router requirement)
- **API modules:** lowercase, `.js` → `jobs.js`, `candidate.js`
- **Constants/utilities:** lowercase, `.js` → `routes.js`
- **Private helpers within a feature folder:** leading underscore → `_shared/`

### Identifiers
- **Components:** PascalCase
- **Functions / variables:** camelCase
- **Constants:** UPPER_SNAKE_CASE (`ROUTES`, `AUTH_ROUTES`, `NAV_LINKS`)
- **CSS classes:** kebab-case, BEM-ish where it helps (`.sidebar__nav-link`, `.sidebar__nav-link.is-active`)

### React
- Use `'use client'` only when the component needs hooks, browser APIs, or event handlers. Default to Server Components when possible.
- Keep components under ~200 lines. Past that, split into sub-components.
- Prefer named imports over default-export-everything.
- Use the `key` prop on lists with a **stable id**, not the array index, when items can be reordered or filtered.

### Avoid
- Inline `style={{ ... }}` for patterns covered by `globals.css`.
- `onMouseEnter`/`onMouseLeave` for hover — use `:hover` in CSS.
- Hardcoded URLs in JSX — use `ROUTES.*` from `lib/constants/routes.js`.
- Direct `axios` calls inside components — go through `lib/api/`.
- Logic in `app/.../page.jsx` files — those should be thin wrappers.

---

## 11. Adding a new feature: the playbook

Suppose you're adding a "Saved searches" feature.

1. **Routes** — add the path to `lib/constants/routes.js`:
   ```js
   CANDIDATE: { …, SAVED_SEARCHES: '/candidate/saved-searches' }
   ```

2. **API** — if the backend has a new resource, create `lib/api/savedSearches.js` and register it in `lib/api/index.js`. Otherwise add methods to an existing module.

3. **Component** — create the component's folder with its four files:
   ```
   components/candidate/SavedSearchesPage/
   ├── SavedSearchesPage.jsx        # 'use client', imports from lib/api, uses design-system classes
   ├── SavedSearchesPage.module.css
   ├── SavedSearchesPage.test.jsx
   └── index.js                     # export { default } from './SavedSearchesPage'
   ```
   Inside the folder, import siblings as `../Other` and reach `lib/` with the
   matching depth (`../../../lib/...`).

4. **Page wrapper** — create the route:
   ```
   app/(main)/candidate/saved-searches/page.jsx
   ```
   Export `metadata` and render the component (import resolves via the barrel:
   `components/candidate/SavedSearchesPage`).

5. **Sidebar link** — if the feature appears in navigation, add it to `components/layout/sidebars/CandidateSidebar/`.

6. **Test** — fill in `SavedSearchesPage.test.jsx`: render it, assert key content,
   exercise interactions, and mock `lib/api` / `useSession` as needed (see §8).

7. **Verify** — run `npm test` and `npm run build`. Both must pass and the new
   route must appear in the route table.

8. **PR** — describe what changed and reference any backend ticket / Figma.

---

## 12. Known gaps & future work

These are deliberate, documented technical debt items. Address before launching to wide production traffic.

| # | Item | Why it matters | Recommended fix |
|---|---|---|---|
| 1 | ~~**Tokens in `localStorage`**~~ ✅ **Resolved** | Was XSS-vulnerable. | Done: the session library (`lib/session/*`, `lib/server/session.js`) keeps tokens in httpOnly cookies (proxy mode) + an in-memory store; no tokens in `localStorage`. See [Authentication](#authentication--the-session-library). |
| 2 | **No route protection** | `/candidate/*` and `/employer/*` are accessible without login. | Add Next.js middleware (`middleware.js` at the root) — it can use `readSessionToken`/`hasSession` from `lib/server/session.js` to check the httpOnly cookie and redirect to `/auth/login`. |
| 3 | **Hardcoded external image host** | `sharjeelanjum.com` is used for demo employer logos, hero images, etc. If that host disappears, every visual breaks. | Move assets to `public/images/` or a CDN you control; replace `<img>` with `next/image` for automatic optimization. |
| 4 | **~1,500 inline styles remain** | Code review friction; design inconsistency. | Continue the page-by-page migration to the design system (`styles/globals.css`). See [Styling](#styling--design-system). |
| 5 | ~~**No tests**~~ ✅ **Partly resolved** | Regressions used to land silently. | Done: Jest + React Testing Library cover the session library and every component/page (co-located `*.test.jsx`). See [Testing](#testing). Still open: Playwright E2E and CI (gap #10). |
| 6 | **Client-side data fetching only** | Slower TTFB; SEO crawlers see empty content for a moment. | Convert SEO-critical pages (`/jobs`, `/jobs/[id]`, `/public/*`) to Server Components that `await` data in the function body — eliminates the loading flash and ships less JS. |
| 7 | **No error boundaries** | One failed API call crashes the page tree. | Add `app/(main)/error.jsx` (and per-segment `error.jsx` where granularity matters). |
| 8 | **Stub candidate/employer pages** | Many dashboard pages show mock data. | Wire each to the corresponding `lib/api/` module; this was deferred during the App Router migration. |
| 9 | **`public/` static folder is empty** | Logos, OG images, favicon all served from CDNs. | Populate with brand assets so the app is self-contained. |
| 10 | **No CI** | Builds break silently on push. | Add a GitHub Actions workflow that runs `npm ci && npm run build` on every PR. |

---

## Glossary

| Term | Meaning here |
|---|---|
| **App Router** | Next.js 14's `/app` directory routing (vs. the legacy `/pages`). |
| **Route group** | A folder wrapped in parentheses like `(auth)` — scopes layouts without affecting the URL. |
| **Client Component** | A component marked with `'use client'` at the top; ships JS to the browser. |
| **Server Component** | The default in App Router; runs on the server, ships no JS. |
| **Page wrapper** | A `page.jsx` file under `app/` that imports a real component and renders it. |
| **Feature folder** | A folder under `components/` grouped by domain (jobs, candidate, employer). |
| **Design token** | A CSS custom property defined in `:root` (`--color-primary`, `--radius-md`). |
| **JSON-LD** | `<script type="application/ld+json">` structured data — what Google reads for rich results. |
