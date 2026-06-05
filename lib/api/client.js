import axios from 'axios';
import { API_MODE, DIRECT_API_URL, PROXY_BASE } from '../config';
import session from '../session';

// Shared axios instance. Base URL is picked from API_MODE at load time:
// proxy -> same-origin /api (Next forwards to FastAPI), direct -> FastAPI URL.
// Flip NEXT_PUBLIC_API_MODE in .env.local and restart to switch.
const baseURL = API_MODE === 'direct' ? DIRECT_API_URL : PROXY_BASE;

export const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config;
  // proxy mode returns null here — the httpOnly cookie rides along and the proxy
  // adds the Bearer header. direct mode returns the real token for FastAPI.
  const token = session.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
