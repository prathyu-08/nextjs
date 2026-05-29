'use client';
import { Shell, IMG } from "./_shared";
import styles from "./EditProfilePage.module.css";

export default function EditProfilePage() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const field = (name, child) => (
    <label key={name} className={styles.fieldBlock}>
      <span className={styles.label}>{name}</span>
      {child}
    </label>
  );
  const text = (value, placeholder="", type="text") => <input type={type} defaultValue={value} placeholder={placeholder} className={styles.input} />;
  return (
    <Shell path="/candidate/edit-profile">
      {/* Profile header */}
      <div className={`${styles.sectionCard} ${styles.headerCard}`}>
        <div className={styles.profileHeader}>
          <img src={`${IMG}/candidates/01.jpg`} alt="Job Seeker" className={styles.avatar} />
          <div className={styles.headerInfo}>
            <button className={styles.updatePhotoBtn}>
              <i className={`fa-solid fa-upload ${styles.iconSpacer}`} />Update Photo
            </button>
            <div>
              <span className={styles.eyebrowBadge}>Candidate Profile</span>
              <h1 className={styles.profileName}>Job Seeker</h1>
              <p className={styles.profileTagline}>Keep your information fresh so hiring teams understand your intent, availability and the type of roles you're excited about.</p>
              <div className={styles.metaRow}>
                {[
                  ["fa-briefcase","Product Design Lead"],
                  ["fa-location-dot","Remote - USA"],
                  ["fa-clock","Updated 2 days ago"],
                ].map(([icon, textValue]) => (
                  <span key={textValue} className={styles.metaChip}>
                    <i className={`fa-solid ${icon}`} />{textValue}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <section className={styles.sectionCard}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Profile</p>
            <h2 className={styles.heading}>Personal Information</h2>
            <p className={styles.helper}>These details power your public profile and application cards.</p>
          </div>
          <button className={styles.sectionAction}>
            <i className={`fa-regular fa-file-lines ${styles.iconSpacer}`} />Upload resume
          </button>
        </div>
        <div className={styles.grid4}>
          {field("Full name", text("Jordan Blake"))}
          {field("Professional title", text("Lead Product Designer"))}
          {field("Email address", text(user?.email || "you@company.com", "", "email"))}
          {field("Phone", text("+1 234 567 890"))}
          {field("Primary location", text("Seattle, USA"))}
          {field("Preferred locations", text("Remote - San Francisco - Boston"))}
          {field("Website", text("https://www.personal-site.com"))}
          {field("Portfolio / Case study", text("https://dribbble.com/jordan"))}
          <label className={styles.fieldSpan2}>
            <span className={styles.label}>About you</span>
            <textarea defaultValue={"Summarize your superpowers, recent wins, and what you're looking for next."} className={styles.textarea} />
          </label>
        </div>
      </section>

      {/* Professional Snapshot */}
      <section className={styles.sectionCard}>
        <p className={styles.eyebrow}>Career</p>
        <h2 className={styles.heading}>Professional Snapshot</h2>
        <p className={styles.helper}>Showcase your current standing and ideal role.</p>
        <div className={styles.grid4}>
          {field("Experience level", text("10+ years"))}
          {field("Current company", text("Skyline Digital"))}
          {field("Notice period", text("2 weeks"))}
          {field("Desired employment", text("Full-time"))}
          {field("Salary expectation", text("USD 120k - 150k / year"))}
          {field("Work preference", text("Remote friendly"))}
          <label className={styles.fieldSpan2Row2}>
            <span className={styles.label}>Target roles</span>
            <textarea defaultValue={"Principal Product Designer, Product Design Manager, Design Lead"} className={styles.textarea} />
          </label>
        </div>
      </section>

      {/* Skills & Tools */}
      <section className={styles.sectionCard}>
        <p className={styles.eyebrow}>Skills</p>
        <h2 className={styles.heading}>Skills & Tools</h2>
        <p className={styles.helper}>Highlight stacks, frameworks, and certifications.</p>
        <div className={styles.skillsRow}>
          {["Product Strategy","Design Systems","Figma","React","UX Research"].map((skill) => (
            <span key={skill} className={styles.skillChip}>{skill}</span>
          ))}
        </div>
        <button className={styles.addSkill}>
          <i className={`fa-solid fa-plus ${styles.iconSpacer}`} />Add skill
        </button>
      </section>

      {/* Experience & Education */}
      <section className={styles.sectionCard}>
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Experience</p>
            <h2 className={styles.heading}>Experience & Education</h2>
            <p className={styles.helper}>Keep your latest role and flagship education updated.</p>
          </div>
          <button className={styles.sectionActionGrey}>
            <i className={`fa-solid fa-circle-plus ${styles.iconSpacer}`} />Add entry
          </button>
        </div>
        <div className={styles.grid4}>
          {field("Company", text("Skyline Digital"))}
          {field("Role", text("Lead Product Designer"))}
          {field("Start date", text("", "", "month"))}
          {field("End date", text("", "", "month"))}
          <label className={styles.fieldSpan2}>
            <span className={styles.label}>Key highlights</span>
            <textarea defaultValue={"Scaled design system, mentored 6 designers, partnered with research to ship 4 product lines."} className={styles.textarea} />
          </label>
          {field("Education", text("Stanford - BSc Human Computer Interaction"))}
          {field("Graduation year", text("2014"))}
        </div>
      </section>

      {/* Social & Contact Links */}
      <section className={styles.sectionCard}>
        <p className={styles.eyebrow}>Links</p>
        <h2 className={styles.heading}>Social & Contact Links</h2>
        <p className={styles.helper}>Share channels where hiring teams can follow your work.</p>
        <div className={styles.grid4}>
          {field("LinkedIn", text("https://www.linkedin.com/"))}
          {field("Dribbble", text("https://dribbble.com/username"))}
          {field("GitHub / Code", text("https://github.com/username"))}
          {field("Twitter / X", text("https://twitter.com/username"))}
        </div>
      </section>

      <div className={styles.footerActions}>
        <button className={styles.cancelBtn}>Cancel</button>
        <button className={styles.saveBtn}>Save changes</button>
      </div>
    </Shell>
  );
}
