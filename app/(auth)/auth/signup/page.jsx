'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import api from "../../../../lib/api";
import styles from "./page.module.css";

export default function SignupPage() {
  const router = useRouter();
  const [type, setType] = useState("candidate");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    desired_role: "",
    company_name: "",
    website: "",
    designation: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone_number: "",
      desired_role: "",
      company_name: "",
      website: "",
      designation: "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = type === "candidate"
        ? {
            role: type,
            email: formData.email.trim(),
            password: formData.password,
            confirm_password: formData.confirm_password,
            first_name: formData.first_name.trim(),
            agree_to_terms: true,
            last_name: formData.last_name.trim(),
            ...(formData.phone_number.trim() && { phone_number: formData.phone_number.trim() }),
            ...(formData.desired_role && { desired_role: formData.desired_role }),
          }
        : {
          role: type,
          work_email: formData.email.trim(),
          password: formData.password,
          confirm_password: formData.confirm_password,
          company_name: formData.company_name.trim(),
          agree_to_terms: true,
          ...(formData.website.trim() && { website: formData.website.trim() }),
        };

      await api.authApi.signup(payload);
      setError("");
      sessionStorage.setItem("pendingEmail", formData.email);
      router.push("/auth/login");
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        setError(detail[0]?.msg || "Validation error");
      } else {
        setError(detail || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="hero-split">
      <section className="hero-split__brand hero-split__brand--purple">
        <div className="hero-split__eyebrow">CREATE ACCOUNT</div>
        <h1 className={styles.brandHeading}>Join thousands of professionals hiring and getting hired</h1>
        <p className={styles.brandLead}>Build a profile that stands out, connect with employers, and unlock tailored recommendations.</p>
        <ul className={styles.brandList}>
          {["Access curated jobs from verified companies","Showcase your portfolio and skill badges","Collaborate with hiring teams in real time"].map((item,i)=>(
            <li key={i} className={styles.brandListItem}>
              <span className={styles.brandCheck}>✔</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.formPanel}>
        <div className={styles.formCard}>
          <h2 className={styles.formHeading}>Create your free account</h2>
          <p className={styles.formSubtitle}>Start as a candidate or employer. Switch anytime.</p>
          <div className={styles.socialRow}>
            {["G Sign up with Google","in Sign up with LinkedIn"].map((label,i)=>(
              <button key={i} className={styles.socialBtn}>{label}</button>
            ))}
          </div>
          <div className={styles.divider}>
            <div className={styles.dividerLine}/><span className={styles.dividerText}>OR</span><div className={styles.dividerLine}/>
          </div>
          <div className={styles.typeToggle}>
            {["candidate","employer"].map(t=>(
              <button key={t} onClick={()=>setType(t)} className={`${styles.typeBtn} ${type===t ? styles.typeBtnActive : ""}`}>{t}</button>
            ))}
          </div>
           {type==="candidate" ? (
             <form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
               <input type="text" name="fakeusername" className={styles.hidden} tabIndex={-1} autoComplete="off" />
               <input type="password" name="fakepassword" className={styles.hidden} tabIndex={-1} autoComplete="off" />

               <div className={styles.fieldGrid}>
                 <div>
                   <label className={styles.fieldLabel}>First name</label>
                   <input name="first_name" autoComplete="given-name" value={formData.first_name} onChange={handleChange} placeholder="Samantha" required minLength={2} maxLength={30} pattern="[A-Za-z\s]+" className={styles.fieldInput}/>
                 </div>
                 <div>
                   <label className={styles.fieldLabel}>Last name</label>
                   <input name="last_name" autoComplete="family-name" value={formData.last_name} onChange={handleChange} placeholder="Jenkins" required minLength={2} maxLength={30} pattern="[A-Za-z\s]+" className={styles.fieldInput}/>
                 </div>
               </div>
               <div>
                 <label className={styles.fieldLabel}>Email address</label>
                 <input name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="name@email.com" required maxLength={50} className={styles.fieldInput}/>
               </div>
               <div className={styles.fieldGrid}>
                 <div>
                   <label className={styles.fieldLabel}>Password</label>
                   <input name="password" type="password" autoComplete="new-password" value={formData.password} onChange={handleChange} placeholder="Strong password" required minLength={8} maxLength={25} className={styles.fieldInput}/>
                 </div>
                 <div>
                   <label className={styles.fieldLabel}>Confirm password</label>
                   <input name="confirm_password" type="password" autoComplete="new-password" value={formData.confirm_password} onChange={handleChange} placeholder="Repeat password" required minLength={8} maxLength={25} className={styles.fieldInput}/>
                 </div>
               </div>
                <div>
                  <label className={styles.fieldLabel}>Phone number</label>
                  <input name="phone_number" inputMode="numeric" autoComplete="tel-national" value={formData.phone_number} onChange={handleChange} placeholder="10 digit mobile number" maxLength={10} pattern="\d{10}" className={styles.fieldInput}/>
                </div>
                <div>
                  <label className={styles.fieldLabel}>Desired role</label>
                  <select name="desired_role" value={formData.desired_role} onChange={handleChange} autoComplete="off" className={styles.fieldInput}>
                    <option value="">Select a role</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Product Designer">Product Designer</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Data Analyst">Data Analyst</option>
                  </select>
                </div>
               <label className={styles.termsLabel}>
                 <input type="checkbox" required/><span>I agree to the <b>Terms of Service</b> and <b>Privacy Policy</b></span>
               </label>
               {error && <p className={styles.errorText}>{error}</p>}
               <button type="submit" disabled={loading} className={styles.submitBtn}>
                 {loading ? "Creating account..." : "Create Candidate Account"}
               </button>
             </form>
           ) : (
             <form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
               <input type="text" name="fakeusername" className={styles.hidden} tabIndex={-1} autoComplete="off" />
               <input type="password" name="fakepassword" className={styles.hidden} tabIndex={-1} autoComplete="off" />

               <div>
                 <label className={styles.fieldLabel}>Company name</label>
                 <input name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Acme Studios" autoComplete="organization" required minLength={2} maxLength={50} className={styles.fieldInput}/>
               </div>
               <div>
                 <label className={styles.fieldLabel}>Website</label>
                 <input name="website" type="url" value={formData.website} onChange={handleChange} placeholder="https://yourcompany.com" autoComplete="url" maxLength={100} className={styles.fieldInput}/>
               </div>
               <div>
                 <label className={styles.fieldLabel}>Work email</label>
                 <input name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" required maxLength={50} className={styles.fieldInput}/>
               </div>
               <div className={styles.fieldGrid}>
                 <div>
                   <label className={styles.fieldLabel}>Password</label>
                   <input name="password" type="password" autoComplete="new-password" value={formData.password} onChange={handleChange} required minLength={8} maxLength={25} className={styles.fieldInput}/>
                 </div>
                 <div>
                   <label className={styles.fieldLabel}>Confirm password</label>
                   <input name="confirm_password" type="password" autoComplete="new-password" value={formData.confirm_password} onChange={handleChange} required minLength={8} maxLength={25} className={styles.fieldInput}/>
                 </div>
               </div>
               <div>
                 <label className={styles.fieldLabel}>Your designation</label>
                 <input name="designation" value={formData.designation} onChange={handleChange} placeholder="Recruiter / HR Manager" autoComplete="off" required minLength={2} maxLength={50} pattern="[A-Za-z\s]+" className={styles.fieldInput}/>
               </div>
               <label className={styles.termsLabel}>
                 <input type="checkbox" required/><span>I agree to the <b>Terms of Service</b> and <b>Privacy Policy</b></span>
               </label>
               {error && <p className={styles.errorText}>{error}</p>}
               <button type="submit" disabled={loading} className={styles.submitBtn}>
                 {loading ? "Creating account..." : "Create Employer Account"}
               </button>
             </form>
          )}
          <p className={styles.footerText}>
            Already have an account? <a onClick={()=>router.push("/auth/login")} className={styles.footerLink}>Sign in</a>
          </p>
        </div>
      </section>
    </main>
  );
}
