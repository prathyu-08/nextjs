import { useRouter } from 'next/router';

﻿import { useState, useEffect } from "react";
import { jobApi } from "../../lib/api";
import EmployerSidebar from "../../components/shared/EmployerSidebar";

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
    <section style={{ background: "#f7f9fc", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg,#1d4ed8,#1e3a8a)", padding: "32px 0" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>Northwind Commerce</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>Create a new opportunity</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", margin: 0, fontSize: 14 }}>Share role details so the right candidates can find you faster.</p>
          </div>
          <button onClick={() => router.push("/employer/dashboard")} style={{ padding: "10px 20px", border: "2px solid rgba(255,255,255,0.5)", color: "#fff", background: "transparent", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>← Back to Dashboard</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 1320, margin: "32px auto", padding: "0 24px", display: "flex", gap: 24, alignItems: "flex-start" }}>
        <EmployerSidebar currentPath="/post-job" />
        <div style={{ flex: 1 }}>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid #e5e7eb" }}>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#1f2937", margin: "0 0 4px" }}>Job overview</h3>
                <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>Fields marked * are required</p>
              </div>
            </div>

            {sections.map((sec, si) => (
              <div key={si} style={{ marginBottom: 28 }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "#374151", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>{sec.title}</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
                  {sec.fields.map((f, fi) => (
                    <div key={fi}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>{f.label}</label>
                      {f.type === "select" ? (
                        <select value={form[f.key]} onChange={(e) => handleChange(f.key, e.target.value)} style={{ width: "100%", padding: "11px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 13, boxSizing: "border-box", outline: "none", background: "#fff" }}>
                          {f.opts.map((o, i) => (
                            <option key={i} value={o}>{o}</option>
                          ))}
                        </select>
                      ) : (
                        <input value={form[f.key]} onChange={(e) => handleChange(f.key, e.target.value)} type={f.type} placeholder={f.placeholder} style={{ width: "100%", padding: "11px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 13, boxSizing: "border-box", outline: "none" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#374151", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>Role description</h4>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Summary *</label>
              <textarea value={form.summary} onChange={(e) => handleChange('summary', e.target.value)} placeholder="Describe the mission for this role..." rows={4} style={{ width: "100%", padding: "11px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 13, boxSizing: "border-box", outline: "none", resize: "vertical" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Responsibilities</label>
                <textarea value={form.responsibilities} onChange={(e) => handleChange('responsibilities', e.target.value)} placeholder="Use bullet points or short sentences" rows={4} style={{ width: "100%", padding: "11px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 13, boxSizing: "border-box", outline: "none", resize: "vertical" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Skills</label>
                <input value={form.skills} onChange={(e) => handleChange('skills', e.target.value)} placeholder="e.g. React, TypeScript, UX" style={{ width: "100%", padding: "11px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 13, boxSizing: "border-box", outline: "none" }} />
              </div>
            </div>

            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#374151", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>Publishing</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              {[
                ["Application email", "application_email", "talent@northwind.com"],
                ["External apply link", "external_apply_link", "https://company.com/careers"],
              ].map(([label, key, placeholder], i) => (
                <div key={i}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>{label}</label>
                  <input value={form[key]} onChange={(e) => handleChange(key, e.target.value)} placeholder={placeholder} style={{ width: "100%", padding: "11px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 13, boxSizing: "border-box", outline: "none" }} />
                </div>
              ))}
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#374151", marginBottom: 24, cursor: "pointer" }}>
              <input type="checkbox" checked={form.featured} onChange={(e) => handleChange('featured', e.target.checked)} style={{ width: 16, height: 16, accentColor: "#2563eb" }} />
              <span>Feature this job on the portal</span>
            </label>

            {status && (
              <div style={{ marginBottom: 20, color: status.type === 'success' ? '#166534' : '#b91c1c', background: status.type === 'success' ? '#dcfce7' : '#fee2e2', padding: 12, borderRadius: 10 }}>
                {status.message}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingTop: 20, borderTop: "1px solid #e5e7eb" }}>
              <button type="button" onClick={() => router.push('/employer/manage-jobs')} style={{ padding: "12px 28px", border: "1px solid #e5e7eb", background: "#f9fafb", color: "#374151", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Cancel</button>
              <button type="submit" disabled={sending} style={{ padding: "12px 28px", background: "#22c55e", color: "#fff", border: "none", borderRadius: 10, fontWeight: 600, cursor: sending ? 'not-allowed' : 'pointer', fontSize: 14, boxShadow: "0 4px 12px rgba(34,197,94,.3)" }}>
                {sending ? 'Publishing…' : 'Publish Job'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
export async function getServerSideProps() {
  return { props: {} };
}
