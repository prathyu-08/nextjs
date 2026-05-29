'use client';
import EmployerSidebar from "../layout/sidebars/EmployerSidebar";
import styles from "./CompanySettingsPage.module.css";

export default function CompanySettingsPage() {
  return (
    <section className={styles.page}>
      <div className={styles.layout}>
        <EmployerSidebar currentPath="/employer/company-settings"/>
        <div className={styles.main}>
          <h1 className={styles.title}>Company Settings</h1>
          <p className={styles.subtitle}>Manage account settings and preferences</p>
          {[
            { title:"Notification Preferences", options:[["New application received","Get notified when candidates apply to your jobs"],["Application status updates","Updates when candidates respond or withdraw"],["Profile views","Know when candidates view your company profile"],["Weekly digest","Get a weekly summary of your hiring activity"]] },
            { title:"Privacy Settings", options:[["Make company profile public","Allow all candidates to view your company profile"],["Show open positions","Display your job listings on the public company page"],["Allow candidate messages","Enable candidates to message you directly"]] },
          ].map((card,ci)=>(
            <div key={ci} className={styles.card}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <div className={styles.optionList}>
                {card.options.map(([title,desc],i)=>(
                  <label key={i} className={styles.optionRow}>
                    <input type="checkbox" defaultChecked className={styles.checkbox}/>
                    <div>
                      <div className={styles.optionTitle}>{title}</div>
                      <div className={styles.optionDesc}>{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className={styles.card}>
            <h3 className={styles.cardTitleTight}>Security</h3>
            <div className={styles.btnRow}>
              <button className={styles.btnSecondary}>Change Password</button>
              <button className={styles.btnSecondary}>Enable 2FA</button>
              <button className={styles.btnSecondary}>Active Sessions</button>
            </div>
          </div>
          <div className={styles.dangerCard}>
            <h3 className={styles.dangerTitle}>Danger Zone</h3>
            <p className={styles.dangerDesc}>Once you delete your account, there is no going back. Please be certain.</p>
            <div className={styles.dangerActions}>
              <button className={styles.btnDangerOutline}>Deactivate Account</button>
              <button className={styles.btnDangerFilled}>Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
