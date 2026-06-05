import '../styles/globals.css';
import { SessionProvider } from '../lib/session/SessionProvider';

export const metadata = {
  title: {
    default: 'NMK Global Jobs Portal',
    template: '%s | NMK Global Jobs Portal',
  },
  description: 'Find your next career opportunity with NMK Global. Browse thousands of jobs, post openings, and connect with top employers and candidates worldwide.',
  keywords: ['jobs', 'careers', 'employment', 'recruitment', 'hiring', 'job portal', 'NMK Global'],
  openGraph: {
    title: 'NMK Global Jobs Portal',
    description: 'Connecting talent with opportunity since 2020.',
    type: 'website',
    siteName: 'NMK Global Jobs Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NMK Global Jobs Portal',
    description: 'Connecting talent with opportunity since 2020.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, sans-serif", margin: 0 }}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
