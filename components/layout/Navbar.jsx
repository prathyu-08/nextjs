'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Navbar.module.css';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Jobs', path: '/jobs', dropdown: [
    { label: 'Browse Jobs', path: '/jobs' },
  ]},
  { label: 'Pages', path: '/public/about', dropdown: [
    { label: 'About Us', path: '/public/about' },
    { label: 'Contact Us', path: '/public/contact' },
    { label: 'FAQ', path: '/public/faq' },
  ]},
  { label: 'Employer', path: '/employer/dashboard', dropdown: [
    { label: 'Employer List', path: '/employer/list' },
    { label: 'Employer Single', path: '/employer/single' },
    { label: 'Employer Dashboard', path: '/employer/dashboard' },
    { label: 'Post Job', path: '/employer/post-job' },
    { label: 'Manage Jobs', path: '/employer/manage-jobs' },
    { label: 'Company Profile', path: '/employer/company-profile' },
    { label: 'Company Settings', path: '/employer/company-settings' },
  ]},
  { label: 'Candidate', path: '/candidate/dashboard', dropdown: [
    { label: 'Candidate Dashboard', path: '/candidate/dashboard' },
    { label: 'Edit Profile', path: '/candidate/edit-profile' },
    { label: 'Build Resume', path: '/candidate/build-resume' },
    { label: 'Download CV', path: '/candidate/download-cv' },
    { label: 'View Public Profile', path: '/candidate/public-profile' },
    { label: 'My Job Applications', path: '/candidate/my-applications' },
    { label: 'My Favourite Jobs', path: '/candidate/favourites' },
    { label: 'Job Alerts', path: '/candidate/job-alert' },
    { label: 'Manage Resume', path: '/candidate/manage-resume' },
    { label: 'My Messages', path: '/candidate/my-messages' },
    { label: 'My Followings', path: '/candidate/my-followings' },
    { label: 'Packages', path: '/candidate/packages' },
    { label: 'Payment History', path: '/candidate/payment-history' },
  ]},
  { label: 'Contact Us', path: '/public/contact' },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [openIdx, setOpenIdx] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState([]);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    const t = localStorage.getItem('token');
    setUser(u);
    setToken(t);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    router.push('/');
  };

  const isEmployer = user?.role === 'recruiter';
  const isCandidate = user?.role === 'user';

  const filteredNavItems = navItems.filter(item => {
    if (item.label === 'Employer' && !isEmployer) return false;
    if (item.label === 'Candidate' && !isCandidate) return false;
    return true;
  });

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <div className={`${styles.logoShape} ${styles.logoShape1}`} />
            <div className={`${styles.logoShape} ${styles.logoShape2}`} />
            <div className={`${styles.logoShape} ${styles.logoShape3}`} />
          </div>
          <div>
            <div className={styles.logoText}>NMK <span>GLOBAL</span></div>
            <div className={styles.logoTagline}>incorporated</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className={`${styles.nav} desktop-nav`}>
          {filteredNavItems.map((item, i) => (
            <div key={i} className={styles.navItemWrap}
              onMouseEnter={() => item.dropdown && setOpenIdx(i)}
              onMouseLeave={() => setOpenIdx(-1)}>
              <Link href={item.dropdown ? '#' : item.path}
                onClick={(e) => { if (item.dropdown) e.preventDefault(); }}
                className={`${styles.navLink}${openIdx === i ? ' ' + styles.navLinkActive : ''}`}>
                {item.label}
                {item.dropdown && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>}
              </Link>
              {item.dropdown && openIdx === i && (
                <div className={styles.dropdown}>
                  {item.dropdown.map((sub, j) => (
                    <Link key={j} href={sub.path}
                      onClick={() => setOpenIdx(-1)}
                      className={styles.dropdownLink}>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          {user && token ? (
            <div className={styles.profileWrap}
              onMouseEnter={() => setProfileMenuOpen(true)}
              onMouseLeave={() => setProfileMenuOpen(false)}>
              <button
                onClick={() => router.push(user.role === 'recruiter' ? '/employer/dashboard' : '/candidate/dashboard')}
                className={styles.profileBtn}>
                <div className={styles.avatar}>
                  {user.email ? user.email[0].toUpperCase() : 'U'}
                </div>
                <span className={styles.profileName}>
                  {user.email || (user.role === 'recruiter' ? 'Employer' : 'Candidate')}
                </span>
              </button>
              {profileMenuOpen && (
                <div className={styles.profileMenu}>
                  <div className={styles.profileMenuHeader}>
                    <div className={styles.profileMenuName}>{user.email || 'User'}</div>
                    <div className={styles.profileMenuRole}>{user.role === 'recruiter' ? 'Employer Account' : 'Candidate Account'}</div>
                  </div>
                  <Link href={user.role === 'recruiter' ? '/employer/dashboard' : '/candidate/dashboard'}
                    onClick={() => setProfileMenuOpen(false)}
                    className={styles.profileMenuLink}>Dashboard</Link>
                  <button onClick={handleLogout}
                    className={styles.profileMenuLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login" className={styles.authSignIn}>Sign in</Link>
              <Link href="/auth/signup" className={styles.authRegister}>Register</Link>
            </>
          )}
          {/* Mobile toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className={`${styles.mobileToggle} mobile-menu-btn`}>
            <svg width="20" height="20" fill="none" stroke="#4b5563" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}/></svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {filteredNavItems.map((item, i) => (
            <div key={i}>
              <div onClick={() => {
                if (!item.dropdown) { router.push(item.path); setMenuOpen(false); }
                else setMobileOpen(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
              }}
                className={styles.mobileItem}>
                {item.label}
              </div>
              {item.dropdown && mobileOpen.includes(i) && item.dropdown.map((sub, j) => (
                <Link key={j} href={sub.path} onClick={() => setMenuOpen(false)}
                  className={styles.mobileSubLink}>
                  {sub.label}
                </Link>
              ))}
            </div>
          ))}
          <div className={styles.mobileActions}>
            {user && token ? (
              <>
                <Link href={user.role === 'recruiter' ? '/employer/dashboard' : '/candidate/dashboard'}
                  onClick={() => setMenuOpen(false)}
                  className={styles.mobileDashboard}>Dashboard</Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className={styles.mobileLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setMenuOpen(false)}
                  className={styles.mobileSignIn}>Sign in</Link>
                <Link href="/auth/signup" onClick={() => setMenuOpen(false)}
                  className={styles.mobileRegister}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
