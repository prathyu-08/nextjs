'use client';
import EmployerSidebar from "../layout/sidebars/EmployerSidebar";
import styles from "./CompanyProfilePage.module.css";

export default function CompanyProfilePage() {
  return (
    <section className={styles.page}>
      <div className={styles.layout}>
        <EmployerSidebar currentPath="/employer/company-profile"/>
        <div className={styles.main}>
          <h1 className={styles.title}>Company Profile</h1>
          <p className={styles.subtitle}>Update your company information visible to candidates</p>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Company Logo</h3>
            <div className={styles.logoRow}>
              <div className={styles.logoBox}>🏢</div>
              <div>
                <button className={styles.btnUpload}>Upload Logo</button>
                <button className={styles.btnRemove}>Remove</button>
                <p className={styles.logoHint}>PNG, JPG, GIF up to 10MB. Min 200x200px recommended.</p>
              </div>
            </div>
          </div>
          {[
            { title:"Basic Info", fields:[["Company Name","NMK Global Inc.",1],["Industry","Information Technology",1],["Company Type","Private",1],["Founded Year","2015",1],["Company Size","50-200 employees",1],["Website","https://nmkglobalinc.com",1],["Tagline","Empowering careers, connecting talent",2],["Description","",2,"textarea"]] },
            { title:"Contact & Location", fields:[["Email","info@nmkglobalinc.com",1],["Phone","+1 555 123 4567",1],["Address","123 Business Ave",1],["City","New York",1],["Country","United States",1],["Zip Code","10001",1]] },
          ].map((sec,si)=>(
            <div key={si} className={styles.card}>
              <h3 className={styles.cardTitle}>{sec.title}</h3>
              <div className={styles.fieldsGrid}>
                {sec.fields.map(([label,placeholder,span,type],fi)=>(
                  <div key={fi} style={{ gridColumn:`span ${span}` }}>
                    <label className={styles.fieldLabel}>{label}</label>
                    {type==="textarea" ? <textarea placeholder={placeholder} rows={4} className={styles.fieldTextarea}/> :
                      <input defaultValue={placeholder} className={styles.fieldInput}/>}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className={styles.footerActions}>
            <button className={styles.btnCancel}>Cancel</button>
            <button className={styles.btnSave}>Save Changes</button>
          </div>
        </div>
      </div>
    </section>
  );
}
