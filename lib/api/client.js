import axios from 'axios';
import { API_MODE, DIRECT_API_URL, PROXY_BASE } from '../config';

/**
 * Axios instance shared by every `lib/api/*` module.
 *
 * The base URL is chosen at module-load time from `API_MODE`:
 *   - 'proxy'  → same-origin `/api` (Next.js Route Handler forwards to FastAPI)
 *   - 'direct' → FastAPI URL directly from the browser
 *
 * Switching modes requires no code change — just flip
 * `NEXT_PUBLIC_API_MODE` in .env.local and restart the dev server.
 */
const baseURL = API_MODE === 'direct' ? DIRECT_API_URL : PROXY_BASE;

export const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config;
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
