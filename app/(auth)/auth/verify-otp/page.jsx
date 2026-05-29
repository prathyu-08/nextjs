'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import api from "../../../../lib/api";
import styles from "./page.module.css";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setEmail(sessionStorage.getItem("pendingEmail") || "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.authApi.confirmSignup({ email, confirmation_code: otp });
      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.detail || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setLoading(true);
    try {
      await api.authApi.resendConfirmation({ email });
      setError("");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to resend code.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="center-page">
        <div className={`${styles.card} ${styles.cardSuccess}`}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successHeading}>Email Verified!</h2>
          <p className={styles.successText}>Your account has been successfully verified. Redirecting to login...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="center-page">
      <div className={styles.card}>
        <div className={styles.eyebrow}>VERIFY EMAIL</div>
        <h2 className={styles.heading}>Check your email</h2>
        <p className={styles.subtitle}>
          We've sent a 6-digit verification code to<br/>
          <strong className={styles.emailStrong}>{email || "your email address"}</strong>
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>Enter verification code</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              maxLength={6}
              className={styles.otpInput}
              autoFocus
            />
            <p className={styles.resendHint}>
              Didn't receive code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={loading}
                className={styles.resendBtn}
              >
                Resend code
              </button>
            </p>
          </div>

          {error && (
            <div className={styles.errorBox}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className={styles.submitBtn}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <p className={styles.footerText}>
          Wrong email? <a href="/auth/signup" className={styles.footerLink}>Go back</a>
        </p>
      </div>
    </main>
  );
}
