'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Jobs', path: '/jobs-list', dropdown: [
    { label: 'Jobs List View', path: '/jobs-list' },
    { label: 'Job Single', path: '/jobs/job-single' },
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
  }, [router.pathname]);

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
    <header style={{ position:'fixed',top:0,left:0,right:0,zIndex:50,background:'#fff',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',borderBottom:'1px solid #f1f5f9' }}>
      <div style={{ maxWidth:1280,margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:72 }}>
        {/* Logo */}
        <Link href="/" style={{ display:'flex',alignItems:'center',gap:12,textDecoration:'none' }}>
          <div style={{ position:'relative',width:48,height:40 }}>
            <div style={{ position:'absolute',bottom:0,left:0,width:28,height:28,borderRadius:6,background:'#fde047',transform:'rotate(45deg)' }}/>
            <div style={{ position:'absolute',bottom:0,left:10,width:28,height:28,borderRadius:6,background:'#4ade80',opacity:0.9,transform:'rotate(45deg) translate(2px,-2px)' }}/>
            <div style={{ position:'absolute',bottom:0,left:20,width:28,height:28,borderRadius:6,background:'#06b6d4',opacity:0.9,transform:'rotate(45deg) translate(4px,-4px)' }}/>
          </div>
          <div>
            <div style={{ fontSize:20,fontWeight:800,color:'#1a9bc0',fontFamily:'Georgia,serif',letterSpacing:1 }}>NMK <span>GLOBAL</span></div>
            <div style={{ fontSize:9,color:'#9ca3af',letterSpacing:3,textTransform:'uppercase' }}>incorporated</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display:'flex',alignItems:'center',gap:4 }} className="desktop-nav">
          {filteredNavItems.map((item, i) => (
            <div key={i} style={{ position:'relative' }}
              onMouseEnter={() => item.dropdown && setOpenIdx(i)}
              onMouseLeave={() => setOpenIdx(-1)}>
              <Link href={item.dropdown ? '#' : item.path}
                onClick={(e) => { if (item.dropdown) e.preventDefault(); }}
                style={{ display:'flex',alignItems:'center',gap:4,padding:'8px 14px',fontSize:14,fontWeight:500,color:'#4b5563',cursor:'pointer',borderRadius:8,textDecoration:'none',background:openIdx===i?'#f0fdfa':'transparent' }}>
                {item.label}
                {item.dropdown && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>}
              </Link>
              {item.dropdown && openIdx === i && (
                <div style={{ position:'absolute',left:0,top:'100%',minWidth:220,background:'#fff',borderRadius:12,boxShadow:'0 10px 40px rgba(0,0,0,0.12)',border:'1px solid #f1f5f9',padding:'6px 0',zIndex:99,maxHeight:420,overflowY:'auto' }}>
                  {item.dropdown.map((sub, j) => (
                    <Link key={j} href={sub.path}
                      onClick={() => setOpenIdx(-1)}
                      style={{ display:'block',padding:'9px 16px',fontSize:13,color:'#4b5563',textDecoration:'none' }}
                      onMouseEnter={e => e.currentTarget.style.background='#f0fdfa'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display:'flex',alignItems:'center',gap:10 }}>
          {user && token ? (
            <div style={{ position:'relative' }}
              onMouseEnter={() => setProfileMenuOpen(true)}
              onMouseLeave={() => setProfileMenuOpen(false)}>
              <button
                onClick={() => router.push(user.role === 'recruiter' ? '/employer/dashboard' : '/candidate/dashboard')}
                style={{ display:'flex',alignItems:'center',gap:8,padding:'6px 14px',borderRadius:999,border:'1px solid #e5e7eb',background:'#fff',cursor:'pointer' }}>
                <div style={{ width:28,height:28,borderRadius:'50%',background:'#6366f1',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:13,fontWeight:600 }}>
                  {user.email ? user.email[0].toUpperCase() : 'U'}
                </div>
                <span style={{ fontSize:13,fontWeight:500,color:'#374151',maxWidth:120,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>
                  {user.email || (user.role === 'recruiter' ? 'Employer' : 'Candidate')}
                </span>
              </button>
              {profileMenuOpen && (
                <div style={{ position:'absolute',right:0,top:'100%',minWidth:220,marginTop:4,background:'#fff',borderRadius:12,boxShadow:'0 10px 40px rgba(0,0,0,0.12)',border:'1px solid #f1f5f9',padding:'6px 0',zIndex:99 }}>
                  <div style={{ padding:'12px 16px',borderBottom:'1px solid #f3f4f6' }}>
                    <div style={{ fontSize:13,fontWeight:600,color:'#1f2937',marginBottom:2 }}>{user.email || 'User'}</div>
                    <div style={{ fontSize:11,color:'#6b7280' }}>{user.role === 'recruiter' ? 'Employer Account' : 'Candidate Account'}</div>
                  </div>
                  <Link href={user.role === 'recruiter' ? '/employer/dashboard' : '/candidate/dashboard'}
                    onClick={() => setProfileMenuOpen(false)}
                    style={{ display:'block',padding:'9px 16px',fontSize:13,color:'#4b5563',textDecoration:'none' }}>Dashboard</Link>
                  <button onClick={handleLogout}
                    style={{ display:'block',width:'100%',textAlign:'left',padding:'9px 16px',fontSize:13,color:'#dc2626',background:'none',border:'none',cursor:'pointer' }}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login" style={{ padding:'8px 20px',fontSize:13,fontWeight:700,color:'#06b6d4',border:'2px solid #06b6d4',borderRadius:999,textDecoration:'none' }}>Sign in</Link>
              <Link href="/auth/signup" style={{ padding:'8px 20px',fontSize:13,fontWeight:700,color:'#fff',background:'#22c55e',borderRadius:999,textDecoration:'none' }}>Register</Link>
            </>
          )}
          {/* Mobile toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background:'none',border:'none',cursor:'pointer',padding:8,display:'none' }} className="mobile-menu-btn">
            <svg width="20" height="20" fill="none" stroke="#4b5563" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}/></svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background:'#fff',borderTop:'1px solid #f1f5f9',padding:'12px 16px' }}>
          {filteredNavItems.map((item, i) => (
            <div key={i}>
              <div onClick={() => {
                if (!item.dropdown) { router.push(item.path); setMenuOpen(false); }
                else setMobileOpen(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
              }}
                style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 12px',fontSize:14,fontWeight:500,color:'#4b5563',cursor:'pointer',borderRadius:8 }}>
                {item.label}
              </div>
              {item.dropdown && mobileOpen.includes(i) && item.dropdown.map((sub, j) => (
                <Link key={j} href={sub.path} onClick={() => setMenuOpen(false)}
                  style={{ display:'block',padding:'8px 12px 8px 28px',fontSize:13,color:'#6b7280',textDecoration:'none' }}>
                  {sub.label}
                </Link>
              ))}
            </div>
          ))}
          <div style={{ marginTop:8,display:'flex',gap:10 }}>
            {user && token ? (
              <>
                <Link href={user.role === 'recruiter' ? '/employer/dashboard' : '/candidate/dashboard'}
                  onClick={() => setMenuOpen(false)}
                  style={{ flex:1,textAlign:'center',padding:10,fontSize:13,fontWeight:600,color:'#2563eb',border:'1px solid #2563eb',borderRadius:8,textDecoration:'none' }}>Dashboard</Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }}
                  style={{ flex:1,padding:10,fontSize:13,fontWeight:600,color:'#dc2626',border:'1px solid #fecaca',borderRadius:8,background:'#fef2f2',cursor:'pointer' }}>Logout</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setMenuOpen(false)}
                  style={{ flex:1,textAlign:'center',padding:10,fontSize:13,fontWeight:700,color:'#06b6d4',border:'2px solid #06b6d4',borderRadius:999,textDecoration:'none' }}>Sign in</Link>
                <Link href="/auth/signup" onClick={() => setMenuOpen(false)}
                  style={{ flex:1,textAlign:'center',padding:10,fontSize:13,fontWeight:700,color:'#fff',background:'#22c55e',borderRadius:999,textDecoration:'none' }}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
