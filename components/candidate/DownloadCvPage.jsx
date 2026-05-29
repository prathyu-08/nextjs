'use client';
import {
  Shell, IMG,
  TemplatePanel, TemplateButton, TemplateField, TextBox, SelectBox, TemplateGrid,
  templateAccent, templateBlue, mutedText,
} from "./_shared";
import styles from "./DownloadCvPage.module.css";

export default function DownloadCvPage() {
  const templates = [
    ["Professional CV","One-page clean resume with strong recruiter readability.","fa-file-lines",templateAccent,true],
    ["Modern CV","Sidebar profile format with skill blocks and clear sections.","fa-id-card",templateBlue,false],
    ["Classic CV","Traditional corporate resume with simple headings.","fa-file-word","#334155",false],
  ];
  return (
    <Shell path="/candidate/download-cv" title="Download CV" subtitle="Choose a CV style and export your resume">
      <TemplatePanel title="Select CV Template" note="Pick a layout similar to the reference download CV page.">
        <div className={styles.templateGrid}>
          {templates.map(([name,desc,icon,color,selected]) => (
            <article key={name} className={styles.templateCard} style={{ borderColor: selected ? color : "#e4ebf1" }}>
              {selected && <span className={styles.templateCardSelectedBadge} style={{ background: color }}>SELECTED</span>}
              <div className={styles.templatePreview}>
                <div className={styles.templateSheet}>
                  <i className={`fa-solid ${icon} ${styles.templateSheetIcon}`} style={{ color }} />
                  <span className={`${styles.templateLine} ${styles.templateLineAccent}`} style={{ background: color }} />
                  <span className={styles.templateLineGrey1} />
                  <span className={styles.templateLineGrey2} />
                  <span className={styles.templateLineGrey3} />
                  <span className={styles.templateLineGrey4} />
                </div>
              </div>
              <div className={styles.templateBody}>
                <h4 className={styles.templateName}>{name}</h4>
                <p className={styles.templateDesc}>{desc}</p>
                <div className={styles.templateActions}>
                  <TemplateButton variant="ghost" style={{ flex:1 }}>Preview</TemplateButton>
                  <TemplateButton variant={selected ? "primary" : "blue"} style={{ flex:1 }}>Use</TemplateButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </TemplatePanel>

      <div className={styles.settingsPreview}>
        <TemplatePanel title="Download Settings">
          <TemplateGrid>
            <TemplateField label="File Format"><SelectBox opts={["PDF","DOCX","Plain Text"]} defaultValue="PDF" /></TemplateField>
            <TemplateField label="Paper Size"><SelectBox opts={["A4","Letter","Legal"]} defaultValue="A4" /></TemplateField>
            <TemplateField label="Language"><SelectBox opts={["English","Arabic","Spanish","French"]} defaultValue="English" /></TemplateField>
            <TemplateField label="Filename"><TextBox defaultValue="JobSeeker_CV_2026" /></TemplateField>
          </TemplateGrid>
          <div className={styles.downloadActions}>
            <TemplateButton><i className={`fa-solid fa-download ${styles.iconSpace}`} />Download CV</TemplateButton>
            <TemplateButton variant="ghost"><i className={`fa-solid fa-print ${styles.iconSpace}`} />Print</TemplateButton>
          </div>
        </TemplatePanel>

        <TemplatePanel title="CV Preview">
          <div className={styles.previewBox}>
            <div className={styles.previewHeader}>
              <img src={`${IMG}/candidates/01.jpg`} alt="Job Seeker" className={styles.previewAvatar} />
              <div>
                <h3 className={styles.previewName}>Job Seeker</h3>
                <p className={styles.previewTitle}>Full Stack Designer</p>
              </div>
            </div>
            {["Profile Summary","Work Experience","Education","Skills"].map((title, i) => (
              <div key={title} className={styles.previewSection}>
                <h4 className={styles.previewSectionTitle}>{title}</h4>
                <div className={styles.previewSkeleton} style={{ height: i===0 ? 42 : 32 }} />
              </div>
            ))}
          </div>
        </TemplatePanel>
      </div>
    </Shell>
  );
}
