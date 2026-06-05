'use client';
import { useRouter } from 'next/navigation';
import { Shell, IMG } from "../_shared";
import styles from "./MyFavouritesPage.module.css";

export default function MyFavouritesPage() {
  const router = useRouter();
  const jobs = [
    { company:"Multimedia Design", logo:`${IMG}/employers/emplogo1.jpg`, title:"UI UX Designer Required", type:"Full Time", location:"Fairbanks", salary:"$2,500 - $3,000", posted:"Mar 07, 2025", desc:"We are seeking a multi-disciplinary designer to ship intuitive product experiences for our SaaS platform." },
    { company:"Connect People", logo:`${IMG}/employers/emplogo7.jpg`, title:"Full Stack Designer", type:"Full Time", location:"Barrington", salary:"$6,000 - $8,000", posted:"Mar 10, 2025", desc:"Lead design systems powering mobile & web apps for our fast-growing HR solutions suite." },
    { company:"Power Wave", logo:`${IMG}/employers/emplogo2.jpg`, title:"Marketing Specialist", type:"Part Time", location:"New York", salary:"$3,000 - $4,500", posted:"Mar 12, 2025", desc:"Drive digital marketing campaigns and grow our brand across social and paid channels." },
    { company:"Net Design", logo:`${IMG}/employers/emplogo5.jpg`, title:"Web Developer", type:"Contract", location:"Remote", salary:"$5,000 - $7,000", posted:"Mar 14, 2025", desc:"Build and maintain client-facing web applications using modern JavaScript frameworks." },
  ];
  const typeColor = { "Full Time":["#dcfce7","#166534"], "Part Time":["#dbeafe","#1e40af"], "Contract":["#fee2e2","#dc2626"] };
  return (
    <Shell path="/candidate/favourites" title="My Favourite Jobs" subtitle={`${jobs.length} saved jobs`}>
      <div className={styles.grid}>
        {jobs.map((job,i) => {
          const [bg,color] = typeColor[job.type]||["#f3f4f6","#374151"];
          return (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <img src={job.logo} alt={job.company} className={styles.logo} />
                <button className={styles.heartBtn}>♥</button>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.title}>{job.title}</h3>
                <div className={styles.company}>{job.company}</div>
                <div className={styles.metaRow}>
                  {[["fa-map-marker",job.location],["fa-money-bill",job.salary]].map(([icon,text],j) => (
                    <span key={j} className={styles.metaItem}>
                      <i className={`fa-solid ${icon} ${styles.metaIcon}`} />{text}
                    </span>
                  ))}
                  <span className={styles.typeBadge} style={{ background:bg, color }}>{job.type}</span>
                </div>
                <p className={styles.desc}>{job.desc}</p>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.posted}>Posted {job.posted}</span>
                <div className={styles.actions}>
                  <button onClick={() => router.push("/jobs")} className={styles.detailsBtn}>Details</button>
                  <button className={styles.applyBtn}>Apply Now</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}
