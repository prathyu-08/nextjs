'use client';
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { KeyRound } from "lucide-react";
import api from "../../../lib/api";
import styles from "./page.module.css";

const passwordRules = [
  { label: "8 to 25 characters", test: (value) => value.length >= 8 && value.length <= 25 },
  { label: "One uppercase letter", test: (value) => /[A-Z]/.test(value) },
  { label: "One lowercase letter", test: (value) => /[a-z]/.test(value) },
  { label: "One number", test: (value) => /\d/.test(value) },
  { label: "One special character", test: (value) => /[\W_]/.test(value) },
];

function ResetPasswordInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryEmail = searchParams.get('email');
    const queryCode =
      searchParams.get('token') ||
      searchParams.get('code') ||
      searchParams.get('confirmation_code');

    setEmail(queryEmail || sessionStorage.getItem("resetPasswordEmail") || "");
    setCode(queryCode || "");
  }, [searchParams]);

  const isPasswordValid = useMemo(
    () => passwordRules.every((rule) => rule.test(password)),
    [password]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Email is required to reset your password.");
      return;
    }
    if (!code.trim()) {
      setError("Enter the reset code from your email.");
      return;
    }
    if (!isPasswordValid) {
      setError("Please choose a password that meets all requirements.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.authApi.confirmResetPassword({
        email: email.trim(),
        confirmation_code: code.trim(),
        new_password: password,
      });

      setMessage(response.message || "Password reset successful.");
      sessionStorage.removeItem("resetPasswordEmail");

      setTimeout(() => {
        router.push("/auth/login");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.detail || "Password reset failed. Please check the code and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="center-page">
      <section className={styles.card}>
        <div className={styles.iconWrap}>
          <KeyRound size={22} />
        </div>
        <h1 className={styles.heading}>Set a new password</h1>
        <p className={styles.subtitle}>
          Use the reset code from your email and choose a strong password for your account.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles.label}>
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@email.com"
            className={styles.input}
          />

          <label htmlFor="code" className={styles.label}>
            Reset code
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value.trim())}
            placeholder="Enter code from email"
            className={styles.input}
          />

          <label htmlFor="password" className={styles.label}>
            New password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a strong password"
            className={styles.inputTight}
          />

          <div className={styles.rulesList}>
            {passwordRules.map((rule) => {
              const passed = rule.test(password);
              return (
                <span key={rule.label} className={`${styles.ruleItem} ${passed ? styles.rulePassed : ""}`}>
                  {passed ? "OK" : "-"} {rule.label}
                </span>
              );
            })}
          </div>

          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Repeat new password"
            className={styles.input}
          />

          {error && <p className={styles.errorText}>{error}</p>}
          {message && <p className={styles.messageText}>{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className={styles.submitBtn}
          >
            {loading ? "Resetting password..." : "Reset password"}
          </button>
        </form>

        <p className={styles.footerText}>
          Need a new code?{" "}
          <Link href="/forgot-password" className={styles.footerLink}>
            Start again
          </Link>
        </p>
      </section>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordInner />
    </Suspense>
  );
}
