'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
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
  const pathname = usePathname();

  return (
    <aside className="sidebar" style={{ width: 260 }}>
      <div className="sidebar__header sidebar__header--employer" style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700 }}>G</div>
        <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>Gopikiran</h3>
        <p style={{ fontSize: 12, opacity: 0.9, margin: '0 0 10px' }}>gopi.kiran@nmkglobalinc.com</p>
        <span style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(255,255,255,0.2)', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>Premium Employer</span>
      </div>
      <ul className="sidebar__nav" style={{ padding: '8px 0' }}>
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.path;
          return (
            <li key={`${link.label}-${link.path}`}>
              <Link
                href={link.path}
                className={`sidebar__nav-link ${isActive ? 'is-active' : ''}`}
                style={{ padding: '12px 20px' }}
              >
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
