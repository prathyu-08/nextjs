import Link from 'next/link';

const footerCols = [
  { title: 'For Job Seekers', links: [
    { label: 'Browse Jobs', path: '/jobs-list' },
    { label: 'Job Categories', path: '/jobs-list' },
    { label: 'Resume Builder', path: '/candidate/build-resume' },
  ]},
  { title: 'For Employers', links: [
    { label: 'Post a Job', path: '/employer/post-job' },
    { label: 'Employer Dashboard', path: '/employer/dashboard' },
    { label: 'Pricing Plans', path: '#' },
  ]},
  { title: 'Company', links: [
    { label: 'About Us', path: '/public/about' },
    { label: 'Contact Us', path: '/public/contact' },
    { label: 'FAQ', path: '/public/faq' },
  ]},
];

export default function Footer() {
  return (
    <footer style={{ background:'#111827',color:'#fff' }}>
      <div style={{ maxWidth:1280,margin:'0 auto',padding:'64px 24px 40px' }}>
        <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:40,marginBottom:48 }}>
          <div>
            <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:16 }}>
              <div style={{ position:'relative',width:40,height:36 }}>
                <div style={{ position:'absolute',bottom:0,left:0,width:24,height:24,borderRadius:4,background:'#fde047',transform:'rotate(45deg)' }}/>
                <div style={{ position:'absolute',bottom:0,left:8,width:24,height:24,borderRadius:4,background:'#4ade80',opacity:0.9,transform:'rotate(45deg) translate(2px,-2px)' }}/>
                <div style={{ position:'absolute',bottom:0,left:16,width:24,height:24,borderRadius:4,background:'#06b6d4',opacity:0.9,transform:'rotate(45deg) translate(4px,-4px)' }}/>
              </div>
              <div>
                <div style={{ fontWeight:800,fontSize:16,color:'#22d3ee',fontFamily:'Georgia,serif' }}>NMK GLOBAL</div>
                <div style={{ fontSize:9,color:'#6b7280',letterSpacing:2,textTransform:'uppercase' }}>incorporated</div>
              </div>
            </div>
            <p style={{ color:'#9ca3af',fontSize:14,lineHeight:1.6,maxWidth:280,marginBottom:20 }}>
              Connecting talent with opportunity since 2020. Your career journey starts here with NMK Global.
            </p>
            <div style={{ display:'flex',gap:10 }}>
              {['𝕏','in','f','◎'].map((icon,i) => (
                <a key={i} href="#" style={{ width:36,height:36,background:'#1f2937',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:'#9ca3af',textDecoration:'none',fontSize:12,fontWeight:700 }}>{icon}</a>
              ))}
            </div>
          </div>
          {footerCols.map((col,i) => (
            <div key={i}>
              <h4 style={{ fontSize:11,fontWeight:700,color:'#fff',marginBottom:16,textTransform:'uppercase',letterSpacing:2 }}>{col.title}</h4>
              <ul style={{ listStyle:'none',padding:0,margin:0 }}>
                {col.links.map((link,j) => (
                  <li key={j} style={{ marginBottom:12 }}>
                    <Link href={link.path} style={{ color:'#9ca3af',fontSize:14,textDecoration:'none',display:'flex',alignItems:'center',gap:6 }}>
                      <span style={{ width:4,height:4,background:'#374151',borderRadius:'50%',display:'inline-block' }}/>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop:'1px solid #1f2937',paddingTop:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16 }}>
          <p style={{ color:'#6b7280',fontSize:14,margin:0 }}>© 2025 NMK Global Incorporated. All rights reserved.</p>
          <div style={{ display:'flex',gap:24 }}>
            {['Privacy Policy','Terms of Service','Cookies'].map((item,i) => (
              <a key={i} href="#" style={{ color:'#6b7280',fontSize:14,textDecoration:'none' }}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
