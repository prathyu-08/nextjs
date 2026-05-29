'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import api from "../../../../lib/api";

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
      <div style={{ display:"flex",minHeight:"100vh",fontFamily:"Inter,sans-serif", alignItems:"center", justifyContent:"center", background:"#f9fafb" }}>
        <div style={{ width:"100%",maxWidth:420,background:"#fff",borderRadius:16,padding:36,boxShadow:"0 10px 40px rgba(0,0,0,0.08)", textAlign:"center" }}>
          <div style={{ width:64,height:64,background:"#dcfce7",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px", fontSize:32, color:"#16a34a" }}>✓</div>
          <h2 style={{ fontSize:24,fontWeight:700,color:"#1f2937",marginBottom:12 }}>Email Verified!</h2>
          <p style={{ color:"#6b7280",fontSize:14,marginBottom:24 }}>Your account has been successfully verified. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display:"flex",minHeight:"100vh",fontFamily:"Inter,sans-serif", alignItems:"center", justifyContent:"center", background:"#f9fafb" }}>
      <div style={{ width:"100%",maxWidth:420,background:"#fff",borderRadius:16,padding:36,boxShadow:"0 10px 40px rgba(0,0,0,0.08)" }}>
        <div style={{ display:"inline-block",padding:"6px 16px",background:"rgba(37,99,235,0.1)",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:2,marginBottom:24, color:"#2563eb" }}>VERIFY EMAIL</div>
        <h2 style={{ fontSize:24,fontWeight:700,color:"#1f2937",marginBottom:8 }}>Check your email</h2>
        <p style={{ color:"#6b7280",fontSize:14,marginBottom:32 }}>
          We've sent a 6-digit verification code to<br/>
          <strong style={{ color:"#1f2937" }}>{email || "your email address"}</strong>
        </p>

        <form onSubmit={handleSubmit} style={{ display:"flex",flexDirection:"column",gap:16 }}>
          <div>
            <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6 }}>Enter verification code</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              maxLength={6}
              style={{
                width:"100%",
                padding:"14px 16px",
                border:"2px solid #e5e7eb",
                borderRadius:10,
                fontSize:18,
                letterSpacing:8,
                textAlign:"center",
                boxSizing:"border-box",
                outline:"none",
                fontWeight:600
              }}
              autoFocus
            />
            <p style={{ fontSize:12,color:"#6b7280",marginTop:8,textAlign:"center" }}>
              Didn't receive code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={loading}
                style={{ color:"#2563eb",fontWeight:600,background:"none",border:"none",cursor:"pointer",fontSize:12 }}
              >
                Resend code
              </button>
            </p>
          </div>

          {error && (
            <div style={{
              padding:"12px 16px",
              background:"#fef2f2",
              border:"1px solid #fecaca",
              borderRadius:8,
              color:"#dc2626",
              fontSize:13,
              display:"flex",
              alignItems:"center",
              gap:8
            }}>
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
            style={{
              width:"100%",
              padding:"14px",
              background:"#2563eb",
              color:"#fff",
              border:"none",
              borderRadius:10,
              fontSize:15,
              fontWeight:700,
              cursor:"pointer",
              opacity: (loading || otp.length !== 6) ? 0.6 : 1,
              transition:"all 0.2s"
            }}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <p style={{ textAlign:"center",fontSize:13,color:"#6b7280",marginTop:24,marginBottom:0 }}>
          Wrong email? <a href="/auth/signup" style={{ color:"#2563eb",fontWeight:600,textDecoration:"none" }}>Go back</a>
        </p>
      </div>
    </div>
  );
}
