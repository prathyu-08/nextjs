import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  { icon: '🏠', label: 'Dashboard', path: '/employer/dashboard' },
  { icon: '✏️', label: 'Edit Account Details', path: '/employer/company-settings' },
  { icon: '🏢', label: 'Company Profile', path: '/employer/company-profile' },
  { icon: '➕', label: 'Post a Job', path: '/employer/post-job' },
  { icon: '📄', label: 'Manage Jobs', path: '/employer/manage-jobs' },
  { icon: '📦', label: 'Packages', path: '#' },
  { icon: '💳', label: 'Payment History', path: '#' },
  { icon: '⚙️', label: 'Company Messages', path: '#' },
  { icon: '👥', label: 'Company Followers', path: '#' },
  { icon: '🚪', label: 'Logout', path: '/' },
];

export default function EmployerSidebar() {
  const router = useRouter();
  return (
    <aside style={{ width: 260, flexShrink: 0, background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', height: 'fit-content' }}>
      <div style={{ padding: 20, background: 'linear-gradient(135deg,#1a9bc0,#0891b2)', color: '#fff', textAlign: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700 }}>G</div>
        <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>Gopikiran</h3>
        <p style={{ fontSize: 12, opacity: 0.9, margin: '0 0 10px' }}>gopi.kiran@nmkglobalinc.com</p>
        <span style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(255,255,255,0.2)', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>Premium Employer</span>
      </div>
      <ul style={{ listStyle: 'none', padding: '8px 0', margin: 0 }}>
        {navLinks.map((link, i) => {
          const isActive = router.pathname === link.path;
          return (
            <li key={i}>
              <Link href={link.path} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
                fontSize: 14, fontWeight: isActive ? 600 : 400,
                color: isActive ? '#0891b2' : '#4b5563',
                textDecoration: 'none', background: isActive ? '#ecfeff' : 'transparent',
                borderLeft: isActive ? '3px solid #0891b2' : '3px solid transparent',
              }}>
                <span style={{ fontSize: 16 }}>{link.icon}</span>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
