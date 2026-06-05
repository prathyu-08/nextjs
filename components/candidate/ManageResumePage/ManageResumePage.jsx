'use client';
import { Shell, Card, CardHead } from "../_shared";
import styles from "./ManageResumePage.module.css";

export default function ManageResumePage() {
  const resumes = [
    { name:"JobSeeker_Resume_2025.pdf", size:"245 KB", uploaded:"Nov 15, 2025", isDefault:true },
    { name:"Portfolio_CV.pdf", size:"1.2 MB", uploaded:"Oct 3, 2025", isDefault:false },
  ];
  const tips = [
    "Keep your resume to 1-2 pages for best results",
    "Use keywords from the job description",
    "Quantify achievements where possible (e.g. 'increased sales by 32%')",
    "Save as PDF to preserve formatting",
    "Update regularly with new skills and experience",
  ];
  return (
    <Shell path="/candidate/manage-resume" title="Manage Resume" subtitle="Upload and manage your resume files">
      {/* Upload area */}
      <div className={styles.uploadBox}>
        <div className={styles.uploadIcon}>
          <i className="fa-solid fa-cloud-arrow-up" />
        </div>
        <h3 className={styles.uploadTitle}>Upload Your Resume</h3>
        <p className={styles.uploadHelp}>Drag & drop your file here, or click to browse. PDF, DOC, or DOCX up to 5MB.</p>
        <button className={styles.uploadBtn}>
          <i className={`fa-solid fa-upload ${styles.iconSpacer}`} />Choose File
        </button>
      </div>

      {/* Resume list */}
      <Card>
        <CardHead title={`Your Resumes (${resumes.length})`} />
        <div className={styles.resumeList}>
          {resumes.map((r,i) => (
            <div key={i} className={`${styles.resumeItem} ${r.isDefault ? styles.resumeItemDefault : ""}`}>
              <div className={styles.fileIcon}>
                <i className="fa-solid fa-file-pdf" />
              </div>
              <div className={styles.fileBody}>
                <div className={styles.fileName}>
                  {r.name}
                  {r.isDefault && <span className={styles.defaultBadge}>Default</span>}
                </div>
                <div className={styles.metaRow}>
                  {[["fa-file","Size: "+r.size],["fa-calendar","Uploaded: "+r.uploaded]].map(([icon,text],j) => (
                    <span key={j}><i className={`fa-solid ${icon} ${styles.metaIcon}`} />{text}</span>
                  ))}
                </div>
              </div>
              <div className={styles.actions}>
                <button className={styles.btnPreview}>Preview</button>
                <button className={styles.btnDownload}>Download</button>
                {!r.isDefault && <button className={styles.btnDelete}>Delete</button>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className={styles.tipsTitle}>
          <i className={`fa-solid fa-lightbulb ${styles.tipsTitleIcon}`} />Resume Tips
        </h3>
        <ul className={styles.tipsList}>
          {tips.map((tip,i) => (
            <li key={i} className={`${styles.tipItem} ${i === tips.length - 1 ? styles.tipItemLast : ""}`}>
              <span className={styles.tipBullet}>•</span>{tip}
            </li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}
