import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  { icon: 'fa-gauge', label: 'Dashboard', path: '/candidate/dashboard' },
  { icon: 'fa-user-pen', label: 'Edit Profile', path: '/candidate/edit-profile' },
  { icon: 'fa-id-badge', label: 'Build Resume', path: '/candidate/build-resume' },
  { icon: 'fa-download', label: 'Download CV', path: '/candidate/download-cv' },
  { icon: 'fa-eye', label: 'View Public Profile', path: '/candidate/public-profile' },
  { icon: 'fa-briefcase', label: 'My Job Applications', path: '/candidate/my-applications' },
  { icon: 'fa-heart', label: 'My Favourite Jobs', path: '/candidate/favourites' },
  { icon: 'fa-bell', label: 'Job Alerts', path: '/candidate/job-alert' },
  { icon: 'fa-file-pen', label: 'Manage Resume', path: '/candidate/manage-resume' },
  { icon: 'fa-envelope', label: 'My Messages', path: '/candidate/my-messages' },
  { icon: 'fa-people-group', label: 'My Followings', path: '/candidate/my-followings' },
  { icon: 'fa-boxes-stacked', label: 'Packages', path: '/candidate/packages' },
  { icon: 'fa-credit-card', label: 'Payment History', path: '/candidate/payment-history' },
  { icon: 'fa-right-from-bracket', label: 'Logout', path: '/' },
];

export default function CandidateSidebar() {
  const router = useRouter();
  const [openToWork, setOpenToWork] = useState(true);

  return (
    <aside style={{ width: 280, flexShrink: 0, background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', height: 'fit-content' }}>
      <div style={{ padding: 24, background: 'linear-gradient(135deg,#667eea,#764ba2)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Open to Work</div>
            <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>Visible to recruiters</div>
          </div>
          <label style={{ position: 'relative', width: 44, height: 24, cursor: 'pointer' }}>
            <input type="checkbox" checked={openToWork} onChange={e => setOpenToWork(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
            <span style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: openToWork ? '#22c55e' : 'rgba(255,255,255,0.3)', borderRadius: 24, transition: '0.3s' }} />
            <span style={{ position: 'absolute', width: 18, height: 18, left: 3, bottom: 3, background: '#fff', borderRadius: '50%', transition: '0.3s', transform: openToWork ? 'translateX(20px)' : 'none' }} />
          </label>
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>Job Seeker</h2>
        <p style={{ fontSize: 13, margin: 0, opacity: 0.9 }}>jobseeker@jobsportal.com</p>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {navLinks.map((link, i) => {
          const isActive = router.pathname === link.path;
          return (
            <li key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <Link href={link.path} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px',
                fontSize: 14, fontWeight: isActive ? 600 : 500,
                color: isActive ? '#2563eb' : '#4b5563',
                textDecoration: 'none', background: isActive ? '#eff6ff' : 'transparent',
                borderLeft: isActive ? '3px solid #2563eb' : '3px solid transparent',
              }}>
                <i className={`fa-solid ${link.icon}`} style={{ width: 20, textAlign: 'center', fontSize: 15 }} />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
