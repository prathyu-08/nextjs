# NMK Global Jobs Portal — Next.js

Converted from Vite + React to Next.js 14 (Pages Router).

## Setup

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with your API URL
npm run dev
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/jobs-list` | Browse all jobs |
| `/jobs/job-single` | Job detail view |
| `/auth/login` | Login |
| `/auth/signup` | Register |
| `/auth/verify-otp` | Email OTP verification |
| `/employer/dashboard` | Employer dashboard |
| `/employer/post-job` | Post a new job |
| `/employer/manage-jobs` | Manage job listings |
| `/employer/company-profile` | Company profile settings |
| `/employer/company-settings` | Account settings |
| `/employer/list` | Browse employers |
| `/employer/single` | Employer detail |
| `/candidate/dashboard` | Candidate dashboard |
| `/candidate/edit-profile` | Edit candidate profile |
| `/candidate/build-resume` | Resume builder |
| `/candidate/download-cv` | Download CV |
| `/candidate/my-applications` | View applications |
| `/candidate/favourites` | Saved jobs |
| `/candidate/my-messages` | Messages |
| `/candidate/my-followings` | Followed companies |
| `/candidate/packages` | Subscription plans |
| `/candidate/payment-history` | Payment records |
| `/candidate/public-profile` | Public profile view |
| `/candidate/job-alert` | Job alerts |
| `/candidate/manage-resume` | Resume management |
| `/public/about` | About us |
| `/public/contact` | Contact page |
| `/public/faq` | FAQ |

## API

All API calls go through `lib/api.js` using axios.  
Set `NEXT_PUBLIC_API_URL` in `.env.local` to point to your backend.

## Tech Stack
- Next.js 14 (Pages Router)
- React 18
- Axios (API calls)
- Framer Motion (resume builder animations)
- Lucide React (icons)
- Bootstrap 5 + Font Awesome (via CDN)
