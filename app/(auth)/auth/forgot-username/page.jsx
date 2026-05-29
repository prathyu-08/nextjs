'use client';
import Link from "next/link";
import { useState } from "react";
import { User } from "lucide-react";
import api from "../../../../lib/api";

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
    <main
      className="forgot-username-page"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "minmax(0, 0.95fr) minmax(360px, 1.05fr)",
        fontFamily: "Inter, sans-serif",
        background: "#fff",
      }}
    >
      <section
        style={{
          background: "#1e3a8a",
          color: "#fff",
          padding: "64px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            width: "fit-content",
            padding: "6px 14px",
            background: "rgba(255,255,255,0.16)",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 2,
            marginBottom: 28,
          }}
        >
          ACCOUNT RECOVERY
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            lineHeight: 1.05,
            fontWeight: 850,
            marginBottom: 18,
          }}
        >
          Can&apos;t remember your username?
        </h1>

        <p
          style={{
            maxWidth: 460,
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.75,
            fontSize: 16,
          }}
        >
          No worries. Enter the phone number linked to your account to recover
          your username.
        </p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "36px 0 0",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {[
            "Use your registered mobile number",
            "Recovery instructions will be shared securely",
            "Contact support if you no longer have phone access",
          ].map((item, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 15,
              }}
            >
              <span
                style={{
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  width: 26,
                  height: 26,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  flexShrink: 0,
                }}
              >
                ✔
              </span>

              {item}
            </li>
          ))}
        </ul>
      </section>

      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 430,
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: 34,
            boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              background: "#dbeafe",
              color: "#1e3a8a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 22,
            }}
          >
            <User size={22} />
          </div>

          <h2
            style={{
              fontSize: 27,
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: 8,
            }}
          >
            Forgot username?
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: 14,
              lineHeight: 1.6,
              marginBottom: 26,
            }}
          >
            Enter the phone number linked to your account to recover your
            username.
          </p>

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="phone"
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 650,
                color: "#334155",
                marginBottom: 7,
              }}
            >
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Enter phone number"
              style={{
                width: "100%",
                padding: "13px 15px",
                border: "1px solid #cbd5e1",
                borderRadius: 8,
                fontSize: 14,
                outline: "none",
                marginBottom: 14,
                boxSizing: "border-box",
              }}
            />

            {error && (
              <p
                style={{
                  color: "#dc2626",
                  fontSize: 13,
                  lineHeight: 1.5,
                  marginBottom: 14,
                }}
              >
                {error}
              </p>
            )}

            {message && (
              <p
                style={{
                  color: "#047857",
                  fontSize: 13,
                  lineHeight: 1.5,
                  marginBottom: 14,
                }}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "none",
                borderRadius: 8,
                background: "#1e3a8a",
                color: "#fff",
                fontSize: 15,
                fontWeight: 800,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Processing..." : "Recover Username"}
            </button>
          </form>

          <div
            style={{
              marginTop: 22,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
              Remembered it?{" "}
              <Link
                href="/auth/login"
                style={{ color: "#1e3a8a", fontWeight: 700 }}
              >
                Back to login
              </Link>
            </p>

            <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
              Forgot your password too?{" "}
              <Link
                href="/forgot-password"
                style={{ color: "#0f766e", fontWeight: 700 }}
              >
                Reset password
              </Link>
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 860px) {
          .forgot-username-page {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
