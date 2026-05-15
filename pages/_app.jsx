import '../styles/globals.css';
import { useRouter } from 'next/router';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const AUTH_PATHS = ['/auth/login', '/auth/signup', '/auth/verify-otp'];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAuth = AUTH_PATHS.includes(router.pathname);
  const showNavFooter = !isAuth;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {showNavFooter && <Navbar />}
      <main style={{ paddingTop: showNavFooter ? '72px' : 0 }}>
        <Component {...pageProps} />
      </main>
      {showNavFooter && <Footer />}
    </div>
  );
}
