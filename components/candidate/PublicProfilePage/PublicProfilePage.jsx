'use client';
import { IMG } from "../_shared";
import styles from "./PublicProfilePage.module.css";

export default function PublicProfilePage() {
  const skills = ["React","TypeScript","Node.js","Figma","Python","PostgreSQL","AWS","Docker"];
  const langs = [["English","Native"],["Arabic","Intermediate"],["Spanish","Basic"]];
  const experiences = [
    ["Senior UI/UX Designer","Multimedia Design","Jan 2022 – Present","Led design of core product features serving 500K+ users. Established design system."],
    ["UI Designer","Creative Studio","Jun 2019 – Dec 2021","Designed interfaces for e-commerce and SaaS clients."],
  ];
  const chips = [["Open to Work","#dcfce7","#166534"],["5 Years Exp","#dbeafe","#1e40af"],["$6k–$9k Salary","#fef3c7","#92400e"]];
  const contacts = [["fa-envelope","seeker@jobsportal.com"],["fa-phone","+1 234 567 890"],["fa-map-marker","Washington, USA"]];
  return (
    <div className={styles.page}>
      {/* Cover */}
      <div className={styles.cover}>
        <img src={`${IMG}/user-cover.jpg`} alt="Cover" className={styles.coverImg} />
      </div>

      <div className={styles.wrap}>
        {/* Header card */}
        <div className={styles.headerCard}>
          <div className={styles.avatarWrap}>
            <img src={`${IMG}/candidates/01.jpg`} alt="" className={styles.avatar} />
            <span className={styles.onlineDot} />
          </div>
          <div className={styles.headerBody}>
            <h1 className={styles.name}>Job Seeker</h1>
            <div className={styles.role}>Senior UI/UX Designer</div>
            <div className={styles.metaRow}>
              {[["fa-map-marker","Washington, USA"],["fa-briefcase","5 years exp"],["fa-money-bill","$6k–$9k/mo"]].map(([icon,text],i) => (
                <span key={i} className={styles.metaItem}>
                  <i className={`fa-solid ${icon} ${styles.metaIcon}`} />{text}
                </span>
              ))}
            </div>
            <div className={styles.chipsRow}>
              {chips.map(([label,bg,color],i) => (
                <span key={i} className={styles.chip} style={{ background:bg, color }}>{label}</span>
              ))}
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.msgBtn}>Message</button>
            <button className={styles.downloadBtn}>Download CV</button>
          </div>
        </div>

        <div className={styles.twoCol}>
          <div className={styles.mainCol}>
            {/* About */}
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>About Me</h3>
              <p className={styles.aboutBody}>I'm a multi-disciplinary designer with 5 years of experience shipping products used by millions. I bridge the gap between design thinking and engineering, leading teams from research to production.</p>
            </div>

            {/* Work Experience */}
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>Work Experience</h3>
              <div className={styles.expList}>
                {experiences.map(([title,company,period,desc],i) => (
                  <div key={i} className={`${styles.expItem} ${i === 0 ? styles.expItemDivider : ""}`}>
                    <div className={styles.expHead}>
                      <h4 className={styles.expTitle}>{title}</h4>
                      <span className={styles.expPeriod}>{period}</span>
                    </div>
                    <div className={styles.expCompany}>{company}</div>
                    <p className={styles.expDesc}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>Education</h3>
              <div className={styles.eduRow}>
                <div className={styles.eduIcon}><i className="fa-solid fa-graduation-cap" /></div>
                <div>
                  <h4 className={styles.eduTitle}>B.Sc. Computer Science — MIT</h4>
                  <p className={styles.eduMeta}>2015 – 2019 · GPA: 3.8/4.0</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sideCol}>
            {/* Skills */}
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitleSm}>Skills</h3>
              <div className={styles.skillsList}>
                {skills.map((s,i) => <span key={i} className={styles.skill}>{s}</span>)}
              </div>
            </div>
            {/* Languages */}
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitleSm}>Languages</h3>
              <ul className={styles.list}>
                {langs.map(([lang,level],i) => (
                  <li key={i} className={`${styles.langItem} ${i === langs.length - 1 ? styles.langItemLast : ""}`}>
                    <span><i className={`fa-solid fa-language ${styles.langIcon}`} />{lang}</span>
                    <span className={styles.langLevel}>{level}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitleSm}>Contact</h3>
              <ul className={styles.list}>
                {contacts.map(([icon,text],i) => (
                  <li key={i} className={`${styles.contactItem} ${i === contacts.length - 1 ? styles.contactItemLast : ""}`}>
                    <i className={`fa-solid ${icon} ${styles.contactIcon}`} />{text}
                  </li>
                ))}
              </ul>
              <div className={styles.socials}>
                {["in","𝕏","◎","f"].map((icon,i) => (
                  <a key={i} href="#" className={styles.socialLink}>{icon}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
