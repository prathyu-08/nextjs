'use client';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Shell, IMG } from "./_shared";
import styles from "./MyApplicationsPage.module.css";

export default function MyApplicationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const apps = [
    { company:"Multimedia Design", logo:`${IMG}/employers/emplogo1.jpg`, title:"Senior UI/UX Designer", type:"Full Time", location:"New York, USA", salary:"$6,000 - $9,000", applied:"Oct 31, 2025", status:"pending" },
    { company:"Connect People", logo:`${IMG}/employers/emplogo7.jpg`, title:"Full Stack Designer", type:"Full Time", location:"Barrington", salary:"$6,000 - $8,000", applied:"Oct 29, 2025", status:"interview" },
    { company:"Power Wave", logo:`${IMG}/employers/emplogo2.jpg`, title:"Product Manager", type:"Full Time", location:"San Francisco", salary:"$8,000 - $12,000", applied:"Oct 25, 2025", status:"rejected" },
    { company:"Net Design", logo:`${IMG}/employers/emplogo5.jpg`, title:"Front-end Developer", type:"Contract", location:"Remote", salary:"$5,000 - $7,000", applied:"Oct 20, 2025", status:"accepted" },
  ];
  const statusStyle = { pending:["#ffedd5","#ea580c"], interview:["#dbeafe","#2563eb"], rejected:["#fee2e2","#dc2626"], accepted:["#dcfce7","#16a34a"] };
  const tabs = [["all","All",apps.length],["pending","Pending",1],["interview","Interview",1],["accepted","Accepted",1],["rejected","Rejected",1]];
  const shown = activeTab==="all" ? apps : apps.filter(a => a.status===activeTab);
  return (
    <Shell path="/candidate/my-applications" title="My Applications" subtitle="Track all your job applications in one place">
      {/* Stats */}
      <div className={styles.statsGrid}>
        {[["fa-paper-plane","Total Applied",apps.length,"#e0e7ff","#4f46e5"],["fa-clock","Pending",1,"#ffedd5","#ea580c"],["fa-comments","Interviews",1,"#dbeafe","#2563eb"],["fa-check-circle","Accepted",1,"#dcfce7","#16a34a"]].map(([icon,label,val,bg,color],i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statIcon} style={{ background:bg, color }}><i className={`fa-solid ${icon}`} /></div>
            <div>
              <div className={styles.statValue}>{val}</div>
              <div className={styles.statLabel}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className={styles.tabsRow}>
        {tabs.map(([key,label,count]) => {
          const isActive = activeTab === key;
          return (
            <button key={key} onClick={() => setActiveTab(key)} className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}>
              {label} <span className={`${styles.tabCount} ${isActive ? styles.tabCountActive : ""}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {shown.map((app,i) => {
        const [bg,color] = statusStyle[app.status];
        return (
          <div key={i} className={styles.appCard}>
            <div className={styles.appHead}>
              <div className={styles.appCompany}>
                <img src={app.logo} alt={app.company} className={styles.appLogo} />
                <div>
                  <h3 className={styles.appTitle}>{app.title}</h3>
                  <div className={styles.appCompanyName}>{app.company}</div>
                </div>
              </div>
              <span className={styles.statusBadge} style={{ background:bg, color }}>{app.status}</span>
            </div>
            <div className={styles.metaRow}>
              {[["fa-map-marker",app.location],["fa-briefcase",app.type],["fa-money-bill",app.salary],["fa-calendar",`Applied: ${app.applied}`]].map(([icon,text],j) => (
                <span key={j} className={styles.metaItem}>
                  <i className={`fa-solid ${icon} ${styles.metaIcon}`} />{text}
                </span>
              ))}
            </div>
            <div className={styles.actions}>
              <button onClick={() => router.push("/jobs")} className={styles.viewBtn}>View Job</button>
              <button className={styles.withdrawBtn}>Withdraw</button>
            </div>
          </div>
        );
      })}
    </Shell>
  );
}
