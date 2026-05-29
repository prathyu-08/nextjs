'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail } from "lucide-react";
import api from "../../../lib/api";
import styles from "./page.module.css";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.authApi.forgotPassword(trimmedEmail);
      sessionStorage.setItem("resetPasswordEmail", trimmedEmail);
      setMessage(response.message || "If that email exists, a reset code has been sent.");

      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(trimmedEmail)}`);
      }, 900);
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to start password reset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.brand}>
        <div className={styles.eyebrow}>
          ACCOUNT RECOVERY
        </div>
        <h1 className={styles.brandHeading}>
          Get back into your jobs dashboard.
        </h1>
        <p className={styles.brandLead}>
          Enter the email connected to your account. We will send a secure reset code that lets you create a new password.
        </p>
      </section>

      <section className={styles.formPanel}>
        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <Mail size={22} />
          </div>
          <h2 className={styles.heading}>Forgot password?</h2>
          <p className={styles.subtitle}>
            No problem. We will send reset instructions if the email is registered.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@email.com"
              className={styles.input}
            />

            {error && <p className={styles.errorText}>{error}</p>}
            {message && <p className={styles.messageText}>{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? "Sending reset code..." : "Send reset code"}
            </button>
          </form>

          <p className={styles.footerText}>
            Remembered it?{" "}
            <Link href="/auth/login" className={styles.footerLink}>
              Back to login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
