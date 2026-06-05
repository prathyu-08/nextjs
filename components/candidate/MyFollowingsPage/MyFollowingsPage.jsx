'use client';
import { useRouter } from 'next/navigation';
import { Shell, IMG } from "../_shared";
import styles from "./MyFollowingsPage.module.css";

export default function MyFollowingsPage() {
  const router = useRouter();
  const companies = [
    { name:"Web Design Studio", industry:"Information Technology", location:"New York, USA", jobs:8, size:"50-200", logo:`${IMG}/employers/emplogo1.jpg`, desc:"Award-winning digital design agency crafting experiences for global brands." },
    { name:"Multimedia Design", industry:"Manufacturing", location:"Chicago, USA", jobs:5, size:"200-500", logo:`${IMG}/employers/emplogo5.jpg`, desc:"Industrial design and manufacturing solutions for Fortune 500 clients." },
    { name:"Connect People", industry:"Technology Services", location:"San Francisco, USA", jobs:5, size:"10-50", logo:`${IMG}/employers/emplogo7.jpg`, desc:"HR tech startup revolutionising talent acquisition with AI-powered tools." },
    { name:"Power Wave", industry:"Cloud Infrastructure", location:"Austin, USA", jobs:3, size:"50-200", logo:`${IMG}/employers/emplogo2.jpg`, desc:"Building scalable cloud solutions and developer tools for modern teams." },
  ];
  return (
    <Shell path="/candidate/my-followings" title="My Followings" subtitle={`Following ${companies.length} companies`}>
      <div className={styles.grid}>
        {companies.map((c,i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardTop}>
              <img src={c.logo} alt={c.name} className={styles.logo} />
              <button className={styles.unfollowBtn}>Unfollow</button>
            </div>
            <h3 className={styles.name}>{c.name}</h3>
            <div className={styles.industry}>{c.industry}</div>
            <div className={styles.metaRow}>
              {[["fa-map-marker",c.location],["fa-briefcase",`${c.jobs} open jobs`],["fa-users",`${c.size} employees`]].map(([icon,text],j) => (
                <span key={j} className={styles.metaItem}>
                  <i className={`fa-solid ${icon} ${styles.metaIcon}`} />{text}
                </span>
              ))}
            </div>
            <p className={styles.desc}>{c.desc}</p>
            <div className={styles.actions}>
              <button onClick={() => router.push("/employer/single")} className={styles.viewCompanyBtn}>View Company</button>
              <button onClick={() => router.push("/jobs")} className={styles.viewJobsBtn}>View Jobs</button>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
