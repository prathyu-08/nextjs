import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { KeyRound } from "lucide-react";
import api from "../lib/api";

const passwordRules = [
  { label: "8 to 25 characters", test: (value) => value.length >= 8 && value.length <= 25 },
  { label: "One uppercase letter", test: (value) => /[A-Z]/.test(value) },
  { label: "One lowercase letter", test: (value) => /[a-z]/.test(value) },
  { label: "One number", test: (value) => /\d/.test(value) },
  { label: "One special character", test: (value) => /[\W_]/.test(value) },
];

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const queryEmail = Array.isArray(router.query.email) ? router.query.email[0] : router.query.email;
    const queryCode =
      (Array.isArray(router.query.token) ? router.query.token[0] : router.query.token) ||
      (Array.isArray(router.query.code) ? router.query.code[0] : router.query.code) ||
      (Array.isArray(router.query.confirmation_code) ? router.query.confirmation_code[0] : router.query.confirmation_code);

    setEmail(queryEmail || sessionStorage.getItem("resetPasswordEmail") || "");
    setCode(queryCode || "");
  }, [router.isReady, router.query]);

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
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      <section style={{ width: "100%", maxWidth: 480, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 34, boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)" }}>
        <div style={{ width: 44, height: 44, borderRadius: 8, background: "#dbeafe", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
          <KeyRound size={22} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 850, color: "#0f172a", marginBottom: 8 }}>Set a new password</h1>
        <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6, marginBottom: 26 }}>
          Use the reset code from your email and choose a strong password for your account.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={{ display: "block", fontSize: 14, fontWeight: 650, color: "#334155", marginBottom: 7 }}>
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@email.com"
            style={{ width: "100%", padding: "13px 15px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, outline: "none", marginBottom: 14 }}
          />

          <label htmlFor="code" style={{ display: "block", fontSize: 14, fontWeight: 650, color: "#334155", marginBottom: 7 }}>
            Reset code
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value.trim())}
            placeholder="Enter code from email"
            style={{ width: "100%", padding: "13px 15px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, outline: "none", marginBottom: 14 }}
          />

          <label htmlFor="password" style={{ display: "block", fontSize: 14, fontWeight: 650, color: "#334155", marginBottom: 7 }}>
            New password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a strong password"
            style={{ width: "100%", padding: "13px 15px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, outline: "none", marginBottom: 10 }}
          />

          <div style={{ display: "grid", gap: 6, marginBottom: 16 }}>
            {passwordRules.map((rule) => {
              const passed = rule.test(password);
              return (
                <span key={rule.label} style={{ color: passed ? "#047857" : "#64748b", fontSize: 12 }}>
                  {passed ? "OK" : "-"} {rule.label}
                </span>
              );
            })}
          </div>

          <label htmlFor="confirmPassword" style={{ display: "block", fontSize: 14, fontWeight: 650, color: "#334155", marginBottom: 7 }}>
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Repeat new password"
            style={{ width: "100%", padding: "13px 15px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, outline: "none", marginBottom: 14 }}
          />

          {error && <p style={{ color: "#dc2626", fontSize: 13, lineHeight: 1.5, marginBottom: 14 }}>{error}</p>}
          {message && <p style={{ color: "#047857", fontSize: 13, lineHeight: 1.5, marginBottom: 14 }}>{message}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "14px 16px", border: "none", borderRadius: 8, background: "#2563eb", color: "#fff", fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Resetting password..." : "Reset password"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 22, color: "#64748b", fontSize: 14 }}>
          Need a new code?{" "}
          <Link href="/forgot-password" style={{ color: "#2563eb", fontWeight: 700 }}>
            Start again
          </Link>
        </p>
      </section>
    </main>
  );
}
