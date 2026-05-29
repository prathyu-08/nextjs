export const metadata = {
  title: 'Authentication',
  description: 'Sign in or sign up to your NMK Global Jobs Portal account.',
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }) {
  return <main>{children}</main>;
}
