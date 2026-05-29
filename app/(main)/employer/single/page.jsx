'use client';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";

const IMG = "https://www.sharjeelanjum.com/html/jobs-portal/images";

const companyValues = [
  { icon:"🎨",label:"Design Thinking" }, { icon:"🤝",label:"Radical Candor" },
  { icon:"🚀",label:"Move Fast" }, { icon:"🌍",label:"Global Mindset" },
  { icon:"🔬",label:"Research First" }, { icon:"⚖️",label:"Work-Life Balance" },
];

const lifePerks = [
  { icon:"remote",title:"Work from Anywhere",desc:"Fully distributed with quarterly team retreats around the world." },
  { icon:"learning",title:"Learning Budget",desc:"$3,000 annual stipend for courses, books, and conferences." },
  { icon:"health",title:"Premium Health",desc:"Full medical, dental, and vision for you and your family." },
  { icon:"growth",title:"Career Growth",desc:"Clear ladders, bi-annual reviews, and executive mentorship." },
];

const openRoles = [
  { type:"Full Time",typeClass:"fulltime",title:"Product Delivery Lead",salary:"$6,000 - $9,500",location:"Doha, Qatar",posted:"May 11, 2025",urgent:false },
  { type:"Full Time",typeClass:"fulltime",title:"ERP Transformation Manager",salary:"$7,500 - $11,000",location:"Riyadh, Saudi Arabia",posted:"May 05, 2025",urgent:true },
  { type:"Contract",typeClass:"contract",title:"Technical Program Manager",salary:"$4,800 - $7,200",location:"Remote, EMEA",posted:"Apr 28, 2025",urgent:false },
];

const studioImages = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=280&fit=crop",
];

export default function EmployerSinglePage() {
  const router = useRouter();
  return (
    <>
      <div className={styles.banner}>
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=280&fit=crop" alt="Office" className={styles.bannerImg}/>
      </div>

      <div className={styles.profileHeaderWrap}>
        <div className={styles.profileHeader}>
          <div className={styles.profileLogo}>
            <span className={styles.profileLogoEmoji}>🏢</span>
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.profileEyebrow}>Digital Experience Studio</div>
            <h1 className={styles.profileTitle}>Skyline Digital</h1>
            <div className={styles.profileMetaRow}>
              {["📍 San Francisco, USA","👥 180+ team members","📅 Since 2014"].map((item,i)=>(
                <span key={i} className={styles.profileMeta}>{item}</span>
              ))}
            </div>
          </div>
          <div className={styles.profileActions}>
            <button className={styles.btnFollow}>🔔 Follow Company</button>
            <button className={styles.btnView}>👀 View Open Roles</button>
          </div>
        </div>
      </div>

      <main className={styles.mainGrid}>
        <div>
          {[
            { title:"Who We Are", content:<><p className={styles.paragraph}>Skyline Digital is a multidisciplinary studio building immersive product experiences for finance, ecommerce, and emerging tech brands. We combine research-led design with battle-tested engineering.</p><p className={styles.paragraph}>Our teams operate with a maker-first culture: weekly design critiques, shared ownership of roadmaps, and space to iterate rapidly so we can keep pushing what digital experiences can be.</p></> },
            { title:"What We Value", content:<div className={styles.valueRow}>{companyValues.map((v,i)=><span key={i} className={styles.valueChip}>{v.icon} {v.label}</span>)}</div> },
            { title:"Life at Skyline", content:<div className={styles.perksGrid}>{lifePerks.map((perk,i)=><div key={i} className={styles.perkCard}><div className={styles.perkEmoji}>{perk.icon==="remote"?"✈️":perk.icon==="learning"?"🎓":perk.icon==="health"?"💪":"📈"}</div><h3 className={styles.perkTitle}>{perk.title}</h3><p className={styles.perkDesc}>{perk.desc}</p></div>)}</div> },
            { title:"Inside Our Studios", content:<><p className={styles.paragraph}>Take a peek at some of our favourite moments across Skyline hubs and remote retreats.</p><div className={styles.studioGrid}>{studioImages.map((src,i)=><img key={i} src={src} alt="" className={`${styles.studioImg} ${i===3?styles.studioImgWide:""}`}/>)}</div></> },
          ].map((sec,i)=>(
            <div key={i} className={styles.section}>
              <h2 className={styles.sectionTitle}>{sec.title}</h2>
              {sec.content}
            </div>
          ))}
        </div>

        <aside>
          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Company Snapshot</h3>
            <ul className={styles.snapshotList}>
              {[["🌐","Website","skylinedigital.com"],["🏭","Industry","Product Design & Engineering"],["🏢","Departments","Design, Engineering, Research"],["📍","Offices","SF · Berlin · Singapore · Remote"],["📊","Growth","45% YoY revenue"]].map(([icon,label,val],i)=>(
                <li key={i} className={styles.snapshotItem}>
                  <span className={styles.snapshotIcon}>{icon}</span>
                  <div>
                    <div className={styles.snapshotLabel}>{label}</div>
                    <div className={styles.snapshotValue}>{val}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.socialRow}>
              {["in","✦","𝕏","▶"].map((icon,i)=>(
                <a key={i} href="#" className={styles.socialLink}>{icon}</a>
              ))}
            </div>
          </div>

          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Get In Touch</h3>
            <div className={styles.formStack}>
              <div><label className={styles.fieldLabel}>Full name</label><input placeholder="Jordan Blake" className={styles.fieldInput}/></div>
              <div><label className={styles.fieldLabel}>Work email</label><input type="email" placeholder="you@company.com" className={styles.fieldInput}/></div>
              <div><label className={styles.fieldLabel}>Message</label><textarea rows={4} placeholder="Tell us how we can collaborate..." className={styles.fieldTextarea}/></div>
              <button className={styles.formSubmit}>Send Message</button>
            </div>
          </div>

          <div className={styles.sideCardLast}>
            <h3 className={styles.sideTitleTight}>Studio Locations</h3>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3!2d-74.259865!3d40.697149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s" className={styles.mapFrame} allowFullScreen/>
          </div>
        </aside>
      </main>

      <section className={styles.rolesSection}>
        <div className={styles.rolesInner}>
          <div className={styles.rolesHeader}>
            <div>
              <h2 className={styles.rolesTitle}>Open Roles</h2>
              <p className={styles.rolesSub}>We're hiring across design, engineering, and strategy. Join our fully distributed team.</p>
            </div>
            <button className={styles.referBtn}>✉ Refer a Friend</button>
          </div>
          <div className={styles.rolesGrid}>
            {openRoles.map((role, i) => (
              <div key={i} className={styles.roleCard}>
                <div className={styles.roleHeader}>
                  <span className={`${styles.roleType} ${role.typeClass==="fulltime"?styles.roleTypeFulltime:styles.roleTypeContract}`}>{role.type}</span>
                  {role.urgent && <span className={styles.roleUrgent}>⚡</span>}
                </div>
                <h3 className={styles.roleTitle}>{role.title}</h3>
                <p className={styles.roleSalary}>Salary: {role.salary}</p>
                <p className={styles.roleLocation}>📍 {role.location}</p>
                <div className={styles.roleFooter}>
                  <span className={styles.rolePosted}>Posted {role.posted}</span>
                  <button onClick={()=>router.push("/jobs")} className={styles.applyBtn}>Apply</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
