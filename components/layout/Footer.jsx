import Link from 'next/link';
import styles from './Footer.module.css';

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
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topGrid}>
          <div>
            <div className={styles.brandRow}>
              <div className={styles.logoIcon}>
                <div className={`${styles.logoShape} ${styles.logoShape1}`} />
                <div className={`${styles.logoShape} ${styles.logoShape2}`} />
                <div className={`${styles.logoShape} ${styles.logoShape3}`} />
              </div>
              <div>
                <div className={styles.brandName}>NMK GLOBAL</div>
                <div className={styles.brandTagline}>incorporated</div>
              </div>
            </div>
            <p className={styles.brandText}>
              Connecting talent with opportunity since 2020. Your career journey starts here with NMK Global.
            </p>
            <div className={styles.social}>
              {['𝕏', 'in', 'f', '◎'].map((icon, i) => (
                <a key={i} href="#" className={styles.socialIcon}>{icon}</a>
              ))}
            </div>
          </div>
          {footerCols.map((col, i) => (
            <div key={i}>
              <h4 className={styles.colTitle}>{col.title}</h4>
              <ul className={styles.colList}>
                {col.links.map((link, j) => (
                  <li key={j} className={styles.colItem}>
                    <Link href={link.path} className={styles.colLink}>
                      <span className={styles.colDot} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2025 NMK Global Incorporated. All rights reserved.</p>
          <div className={styles.legal}>
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item, i) => (
              <a key={i} href="#" className={styles.legalLink}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
