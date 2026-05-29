'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import api from "../../../../lib/api";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({ email: "", password: "", remember: false });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.authApi.login(formData);
      localStorage.setItem("token", response.id_token);
      localStorage.setItem("refreshToken", response.refresh_token);
      localStorage.setItem("user", JSON.stringify({
        id: response.user_id,
        email: response.email || formData.email,
        role: response.role,
        recruiter_id: response.recruiter_id,
      }));
      if (response.role === "recruiter") {
        router.push("/employer/dashboard");
      } else {
        router.push("/candidate/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="hero-split">
      <section className="hero-split__brand hero-split__brand--blue">
        <div className="hero-split__eyebrow">WELCOME BACK</div>
        <h1 className={styles.brandHeading}>Log in to continue your job search</h1>
        <p className={styles.brandLead}>Access personalised recommendations, manage your applications, and stay ahead with instant updates from top employers.</p>
        <ul className={styles.brandList}>
          {["Track your applications in real time","Discover openings tailored to your skills","Save jobs and set alerts in one dashboard"].map((item,i)=>(
            <li key={i} className={styles.brandListItem}>
              <span className={styles.brandCheck}>✔</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="hero-split__form">
        <div className={styles.formWrap}>
          <h2 className={styles.formHeading}>Sign in to your account</h2>
          <p className={styles.formSubtitle}>Enter your details below or continue with a social account.</p>
          <div className={styles.socialRow}>
            {[{img:"https://img.icons8.com/color/16/google-logo.png",label:"Login with Google"},{img:"https://img.icons8.com/color/16/linkedin.png",label:"Login with LinkedIn"}].map((btn,i)=>(
              <button key={i} className={styles.socialBtn}>
                <img src={btn.img} alt=""/>{btn.label}
              </button>
            ))}
          </div>
          <div className={styles.divider}>
            <div className={styles.dividerLine}/><span className={styles.dividerText}>OR</span><div className={styles.dividerLine}/>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <input type="text" name="fakeusername" className={styles.hidden} tabIndex={-1} autoComplete="off" />
            <input type="password" name="fakepassword" className={styles.hidden} tabIndex={-1} autoComplete="off" />
            <label className="label">Email address</label>
            <input name="email" type="email" autoComplete="off" value={formData.email} onChange={handleChange} placeholder="name@email.com" className={styles.fieldEmail}/>
            <div className={styles.passwordRow}>
              <label className={styles.passwordLabel}>Password</label>
              <div className={styles.passwordLinks}>
                <a href="/auth/forgot-username" className={styles.linkMuted}>Forgot username?</a>
                <a href="/forgot-password" className={styles.linkPrimary}>Forgot password?</a>
              </div>
            </div>
            <input name="password" type="password" autoComplete="new-password" value={formData.password} onChange={handleChange} placeholder="••••••••" className={styles.fieldPassword}/>
            {error && <p className={styles.errorText}>{error}</p>}
            <label className={styles.rememberLabel}>
              <input name="remember" type="checkbox" checked={formData.remember} onChange={handleChange}/><span>Keep me signed in</span>
            </label>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p className={styles.footerText}>New to JobsPortal? <a onClick={()=>router.push("/auth/signup")} className={styles.footerLink}>Create an account</a></p>
        </div>
      </section>
    </main>
  );
}
