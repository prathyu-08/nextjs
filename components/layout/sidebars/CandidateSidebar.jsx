'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
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
  const pathname = usePathname();
  const [openToWork, setOpenToWork] = useState(true);

  return (
    <aside className="sidebar">
      <div className="sidebar__header sidebar__header--candidate">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Open to Work</div>
            <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>Visible to recruiters</div>
          </div>
          <label className="status-switch" aria-label="Toggle open to work">
            <input type="checkbox" checked={openToWork} onChange={(e) => setOpenToWork(e.target.checked)} />
            <span className="status-slider" />
          </label>
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>Job Seeker</h2>
        <p style={{ fontSize: 13, margin: 0, opacity: 0.9 }}>jobseeker@jobsportal.com</p>
      </div>
      <ul className="sidebar__nav">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.path;
          return (
            <li key={link.path} className="sidebar__nav-item">
              <Link
                href={link.path}
                className={`sidebar__nav-link ${isActive ? 'is-active' : ''}`}
              >
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
