'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail } from "lucide-react";
import api from "../../../lib/api";

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
    <main className="forgot-password-page" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "minmax(0, 0.95fr) minmax(360px, 1.05fr)", fontFamily: "Inter, sans-serif", background: "#fff" }}>
      <section style={{ background: "#0f766e", color: "#fff", padding: "64px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "inline-flex", width: "fit-content", padding: "6px 14px", background: "rgba(255,255,255,0.16)", borderRadius: 20, fontSize: 11, fontWeight: 800, letterSpacing: 2, marginBottom: 28 }}>
          ACCOUNT RECOVERY
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.05, fontWeight: 850, marginBottom: 18 }}>
          Get back into your jobs dashboard.
        </h1>
        <p style={{ maxWidth: 460, color: "rgba(255,255,255,0.82)", lineHeight: 1.75, fontSize: 16 }}>
          Enter the email connected to your account. We will send a secure reset code that lets you create a new password.
        </p>
      </section>

      <section style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px", background: "#f8fafc" }}>
        <div style={{ width: "100%", maxWidth: 430, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 34, boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)" }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: "#ccfbf1", color: "#0f766e", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
            <Mail size={22} />
          </div>
          <h2 style={{ fontSize: 27, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Forgot password?</h2>
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6, marginBottom: 26 }}>
            No problem. We will send reset instructions if the email is registered.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email" style={{ display: "block", fontSize: 14, fontWeight: 650, color: "#334155", marginBottom: 7 }}>
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
              style={{ width: "100%", padding: "13px 15px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, outline: "none", marginBottom: 14 }}
            />

            {error && <p style={{ color: "#dc2626", fontSize: 13, lineHeight: 1.5, marginBottom: 14 }}>{error}</p>}
            {message && <p style={{ color: "#047857", fontSize: 13, lineHeight: 1.5, marginBottom: 14 }}>{message}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "14px 16px", border: "none", borderRadius: 8, background: "#0f766e", color: "#fff", fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Sending reset code..." : "Send reset code"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 22, color: "#64748b", fontSize: 14 }}>
            Remembered it?{" "}
            <Link href="/auth/login" style={{ color: "#0f766e", fontWeight: 700 }}>
              Back to login
            </Link>
          </p>
        </div>
      </section>
      <style jsx>{`
        @media (max-width: 860px) {
          .forgot-password-page {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
