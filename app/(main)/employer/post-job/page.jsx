'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { jobApi } from "../../../../lib/api";
import EmployerSidebar from "../../../../components/layout/sidebars/EmployerSidebar";
import styles from "./page.module.css";

const fld = (label, key, type = "text", placeholder = "", required = false) => ({ label, key, type, placeholder, required });
const sel = (label, key, opts) => ({ label, key, type: "select", opts });

const sections = [
  { title: "Role basics", fields: [
    fld("Job title *", "title", "text", "e.g. Senior Product Designer", true),
    fld("Department", "department", "text", "Design Systems"),
    fld("Location *", "location", "text", "Hybrid · Seattle, USA", true),
    sel("Employment type", "employment_type", ["Full Time", "Part Time", "Contract", "Freelance"]),
    fld("Salary min", "salary_min", "number", "90000"),
    fld("Salary max", "salary_max", "number", "120000"),
  ] },
  { title: "Candidate preferences", fields: [
    sel("Experience", "experience", ["1+ years", "3+ years", "5+ years", "7+ years"]),
    fld("Open roles", "open_roles", "number", "1"),
    sel("Visa sponsorship", "visa_sponsorship", ["Not available", "Available", "Case by case"]),
  ] },
];

export default function PostJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    employment_type: "Full Time",
    salary_min: "",
    salary_max: "",
    experience: "1+ years",
    open_roles: "1",
    visa_sponsorship: "Not available",
    summary: "",
    responsibilities: "",
    skills: "",
    application_email: "",
    external_apply_link: "",
    featured: false,
    logo: "",
  });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const jobData = {
        title: form.title,
        description: form.summary || `${form.department} role in ${form.location}`,
        location: form.location,
        min_experience: form.experience ? Number(form.experience.replace(/\D/g, "")) : undefined,
        max_experience: undefined,
        salary_min: form.salary_min ? Number(form.salary_min) : undefined,
        salary_max: form.salary_max ? Number(form.salary_max) : undefined,
        employment_type: form.employment_type,
        featured: form.featured,
        logo: form.logo || undefined,
        skills: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
      };

      const created = await jobApi.createJob(jobData);
      setStatus({ type: "success", message: `Job created: ${created.title}` });
      setTimeout(() => router.push("/employer/manage-jobs"), 1000);
    } catch (error) {
      const message = error?.response?.data?.detail || error?.message || "Could not publish job.";
      setStatus({ type: "error", message });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <div className={styles.heroEyebrow}>Northwind Commerce</div>
            <h2 className={styles.heroTitle}>Create a new opportunity</h2>
            <p className={styles.heroSubtitle}>Share role details so the right candidates can find you faster.</p>
          </div>
          <button onClick={() => router.push("/employer/dashboard")} className={styles.heroBackBtn}>← Back to Dashboard</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <EmployerSidebar currentPath="/post-job" />
        <div className={styles.main}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>Job overview</h3>
                <p className={styles.cardSub}>Fields marked * are required</p>
              </div>
            </div>

            {sections.map((sec, si) => (
              <div key={si} className={styles.section}>
                <h4 className={styles.sectionTitle}>{sec.title}</h4>
                <div className={styles.fieldGrid3}>
                  {sec.fields.map((f, fi) => (
                    <div key={fi}>
                      <label className={styles.fieldLabel}>{f.label}</label>
                      {f.type === "select" ? (
                        <select value={form[f.key]} onChange={(e) => handleChange(f.key, e.target.value)} className={styles.select}>
                          {f.opts.map((o, i) => (
                            <option key={i} value={o}>{o}</option>
                          ))}
                        </select>
                      ) : (
                        <input value={form[f.key]} onChange={(e) => handleChange(f.key, e.target.value)} type={f.type} placeholder={f.placeholder} className={styles.input} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <h4 className={styles.sectionTitle}>Role description</h4>
            <div className={styles.summaryBlock}>
              <label className={styles.fieldLabel}>Summary *</label>
              <textarea value={form.summary} onChange={(e) => handleChange('summary', e.target.value)} placeholder="Describe the mission for this role..." rows={4} className={styles.textarea} />
            </div>
            <div className={styles.fieldGrid2}>
              <div>
                <label className={styles.fieldLabel}>Responsibilities</label>
                <textarea value={form.responsibilities} onChange={(e) => handleChange('responsibilities', e.target.value)} placeholder="Use bullet points or short sentences" rows={4} className={styles.textarea} />
              </div>
              <div>
                <label className={styles.fieldLabel}>Skills</label>
                <input value={form.skills} onChange={(e) => handleChange('skills', e.target.value)} placeholder="e.g. React, TypeScript, UX" className={styles.input} />
              </div>
            </div>

            <h4 className={styles.sectionTitle}>Publishing</h4>
            <div className={styles.fieldGrid2Tight}>
              {[
                ["Application email", "application_email", "talent@northwind.com"],
                ["External apply link", "external_apply_link", "https://company.com/careers"],
              ].map(([label, key, placeholder], i) => (
                <div key={i}>
                  <label className={styles.fieldLabel}>{label}</label>
                  <input value={form[key]} onChange={(e) => handleChange(key, e.target.value)} placeholder={placeholder} className={styles.input} />
                </div>
              ))}
            </div>
            <label className={styles.featuredRow}>
              <input type="checkbox" checked={form.featured} onChange={(e) => handleChange('featured', e.target.checked)} className={styles.featuredCheckbox} />
              <span>Feature this job on the portal</span>
            </label>

            {status && (
              <div className={`${styles.status} ${status.type === 'success' ? styles.statusSuccess : styles.statusError}`}>
                {status.message}
              </div>
            )}
            <div className={styles.footer}>
              <button type="button" onClick={() => router.push('/employer/manage-jobs')} className={styles.cancelBtn}>Cancel</button>
              <button type="submit" disabled={sending} className={styles.publishBtn}>
                {sending ? 'Publishing…' : 'Publish Job'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
