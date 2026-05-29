'use client';
import { useState } from "react";
import { Shell, Card, CardHead, Input, Sel } from "./_shared";
import styles from "./JobAlertPage.module.css";

export default function JobAlertPage() {
  const [alerts] = useState([
    { title:"UI/UX Designer Jobs", keywords:"UI Designer, UX Designer", location:"New York, USA", frequency:"Daily", type:"Full Time", active:true },
    { title:"React Developer Roles", keywords:"React, Frontend, JavaScript", location:"Remote", frequency:"Weekly", type:"Contract", active:true },
    { title:"Product Manager Positions", keywords:"Product Manager, PM", location:"San Francisco", frequency:"Instant", type:"Full Time", active:false },
  ]);
  return (
    <Shell path="/candidate/job-alert" title="Job Alerts" subtitle="Get notified when new matching jobs are posted">
      {/* Create alert form */}
      <Card>
        <CardHead title="Create New Alert" />
        <div className={styles.formGrid}>
          <Input label="Alert Name" placeholder="e.g. Senior Designer Jobs" />
          <Input label="Keywords" placeholder="e.g. UI Designer, Figma, React" />
          <Input label="Location" placeholder="e.g. New York, USA or Remote" />
          <Sel label="Job Type" opts={["Any Type","Full Time","Part Time","Contract","Freelance"]} />
          <Sel label="Salary Range" opts={["Any Salary","$2k-$4k","$4k-$6k","$6k-$10k","$10k+"]} />
          <Sel label="Alert Frequency" opts={["Instant","Daily Digest","Weekly Summary"]} />
          <div className={styles.formActions}>
            <button className={styles.cancelBtn}>Cancel</button>
            <button className={styles.createBtn}>Create Alert</button>
          </div>
        </div>
      </Card>

      {/* Existing alerts */}
      <h3 className={styles.sectionHeading}>Your Alerts ({alerts.length})</h3>
      {alerts.map((alert,i) => (
        <div key={i} className={styles.alertRow}>
          <div className={`${styles.alertIcon} ${alert.active ? styles.alertIconActive : styles.alertIconPaused}`}>
            <i className="fa-solid fa-bell" />
          </div>
          <div className={styles.alertBody}>
            <div className={styles.alertTopRow}>
              <h4 className={styles.alertTitle}>{alert.title}</h4>
              <span className={`${styles.statusBadge} ${alert.active ? styles.statusActive : styles.statusPaused}`}>{alert.active?"Active":"Paused"}</span>
            </div>
            <div className={styles.metaRow}>
              {[["fa-search",alert.keywords],["fa-map-marker",alert.location],["fa-briefcase",alert.type],["fa-clock",alert.frequency]].map(([icon,text],j) => (
                <span key={j} className={styles.metaItem}>
                  <i className={`fa-solid ${icon} ${styles.metaIcon}`} />{text}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.alertActions}>
            <button className={`${styles.iconBtn} ${styles.iconBtnEdit}`}>
              <i className={`fa-solid fa-pen ${styles.iconBtnInner}`} />
            </button>
            <button className={`${styles.iconBtn} ${styles.iconBtnDelete}`}>
              <i className={`fa-solid fa-trash ${styles.iconBtnInner}`} />
            </button>
          </div>
        </div>
      ))}
    </Shell>
  );
}
