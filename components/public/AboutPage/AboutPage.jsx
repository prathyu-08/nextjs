'use client';
import { useRouter } from 'next/navigation';
import styles from './AboutPage.module.css';

const IMG = "https://www.sharjeelanjum.com/html/jobs-portal/images";

export default function AboutPage() {
  const router = useRouter();
  const stats = [["50K+","Active Jobs"],["120K+","Companies"],["1M+","Job Seekers"],["25K+","Placements"]];
  const team = [
    { name:"Sarah Johnson", role:"CEO & Founder", img:`${IMG}/team1.jpg` },
    { name:"Michael Chen", role:"Head of Operations", img:`${IMG}/team2.jpg` },
    { name:"Emily Davis", role:"Head of Product", img:`${IMG}/team3.jpg` },
    { name:"James Wilson", role:"Lead Engineer", img:`${IMG}/team4.jpg` },
  ];
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>Connecting Talent with Opportunity</h1>
          <p className={styles.heroLead}>We're building the future of job recruitment, making it easier for candidates and employers to find their perfect match.</p>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map(([val,label],i) => (
              <div key={i}>
                <div className={styles.statValue}>{val}</div>
                <div className={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className={styles.missionGrid}>
            <div>
              <img src={`${IMG}/about.jpg`} alt="Our Mission" className={styles.missionImg} onError={e => e.target.style.display="none"} />
              {/* Fallback placeholder */}
              <div className={styles.missionPlaceholder}>🎯</div>
            </div>
            <div>
              <h2 className={styles.missionTitle}>Our Mission</h2>
              <p className={styles.missionText}>We believe that finding the right job shouldn't be a challenge. Our platform connects talented individuals with world-class companies, creating meaningful careers and building stronger teams.</p>
              <p className={`${styles.missionText} ${styles.missionTextLast}`}>Since our founding, we've helped thousands of people find their dream jobs and assisted companies in building high-performing teams.</p>
              <ul className={styles.missionList}>
                {["Smart job matching algorithm","Verified company listings","Resume builder tools","Job alerts & notifications"].map((item,i) => (
                  <li key={i} className={styles.missionItem}>
                    <i className={`fa-solid fa-check ${styles.missionCheck}`} />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={styles.teamSection}>
        <div className="container">
          <div className={styles.teamHead}>
            <h2 className={styles.teamTitle}>Meet Our Team</h2>
            <p className={styles.teamSubtitle}>The people behind your career success</p>
          </div>
          <div className={styles.teamGrid}>
            {team.map((member,i) => (
              <div key={i} className={styles.teamMember}>
                <div className={styles.teamAvatar}>
                  {["👩","👨","👩","👨"][i]}
                </div>
                <h4 className={styles.teamName}>{member.name}</h4>
                <p className={styles.teamRole}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
            <p className={styles.ctaText}>Join thousands of job seekers and employers on our platform</p>
            <div className={styles.ctaBtns}>
              <button onClick={() => router.push("/auth/signup")} className={styles.ctaBtnPrimary}>Find a Job</button>
              <button onClick={() => router.push("/employer/list")} className={styles.ctaBtnOutline}>Post a Job</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
