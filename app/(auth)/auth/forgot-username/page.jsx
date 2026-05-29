'use client';
import Link from "next/link";
import { useState } from "react";
import { User } from "lucide-react";
import api from "../../../../lib/api";
import styles from "./page.module.css";

export default function ForgotUsernamePage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const trimmedPhone = phone.trim();

    if (!trimmedPhone) {
      setError("Please enter your phone number.");
      return;
    }

    setLoading(true);

    try {
      // const response = await api.authApi.forgotUsername(trimmedPhone);

      setMessage(
        "If that phone number is registered, recovery instructions will be sent."
      );

      setPhone("");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to look up username. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.brand}>
        <div className={styles.eyebrow}>ACCOUNT RECOVERY</div>

        <h1 className={styles.brandHeading}>
          Can&apos;t remember your username?
        </h1>

        <p className={styles.brandLead}>
          No worries. Enter the phone number linked to your account to recover
          your username.
        </p>

        <ul className={styles.brandList}>
          {[
            "Use your registered mobile number",
            "Recovery instructions will be shared securely",
            "Contact support if you no longer have phone access",
          ].map((item, i) => (
            <li key={i} className={styles.brandListItem}>
              <span className={styles.brandCheck}>✔</span>

              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.formPanel}>
        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <User size={22} />
          </div>

          <h2 className={styles.heading}>
            Forgot username?
          </h2>

          <p className={styles.subtitle}>
            Enter the phone number linked to your account to recover your
            username.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="phone" className={styles.label}>
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Enter phone number"
              className={styles.input}
            />

            {error && (
              <p className={styles.errorText}>
                {error}
              </p>
            )}

            {message && (
              <p className={styles.messageText}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? "Processing..." : "Recover Username"}
            </button>
          </form>

          <div className={styles.footerLinks}>
            <p className={styles.footerText}>
              Remembered it?{" "}
              <Link
                href="/auth/login"
                className={styles.footerLinkBlue}
              >
                Back to login
              </Link>
            </p>

            <p className={styles.footerText}>
              Forgot your password too?{" "}
              <Link
                href="/forgot-password"
                className={styles.footerLinkTeal}
              >
                Reset password
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
