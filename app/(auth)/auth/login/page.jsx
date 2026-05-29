'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import api from "../../../../lib/api";

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
    <div style={{ display:"flex",minHeight:"100vh",fontFamily:"Inter,sans-serif" }}>
      <div style={{ flex:1,background:"linear-gradient(135deg,#1e3a8a,#1d4ed8)",color:"#fff",padding:"60px 48px",display:"flex",flexDirection:"column",justifyContent:"center" }}>
        <div style={{ display:"inline-block",padding:"6px 16px",background:"rgba(255,255,255,0.15)",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:2,marginBottom:32 }}>WELCOME BACK</div>
        <h1 style={{ fontSize:"clamp(1.8rem,3vw,2.5rem)",fontWeight:800,lineHeight:1.2,marginBottom:20 }}>Log in to continue your job search</h1>
        <p style={{ opacity:0.8,lineHeight:1.7,marginBottom:32,maxWidth:400 }}>Access personalised recommendations, manage your applications, and stay ahead with instant updates from top employers.</p>
        <ul style={{ listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:16 }}>
          {["Track your applications in real time","Discover openings tailored to your skills","Save jobs and set alerts in one dashboard"].map((item,i)=>(
            <li key={i} style={{ display:"flex",alignItems:"center",gap:12,fontSize:15 }}>
              <span style={{ background:"rgba(255,255,255,0.2)",borderRadius:"50%",width:26,height:26,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12 }}>✔</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:48,background:"#fff" }}>
        <div style={{ width:"100%",maxWidth:420 }}>
          <h2 style={{ fontSize:28,fontWeight:700,color:"#1f2937",marginBottom:8 }}>Sign in to your account</h2>
          <p style={{ color:"#6b7280",fontSize:14,marginBottom:28 }}>Enter your details below or continue with a social account.</p>
          <div style={{ display:"flex",gap:12,marginBottom:24 }}>
            {[{img:"https://img.icons8.com/color/16/google-logo.png",label:"Login with Google"},{img:"https://img.icons8.com/color/16/linkedin.png",label:"Login with LinkedIn"}].map((btn,i)=>(
              <button key={i} style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"12px 16px",border:"1px solid #e5e7eb",borderRadius:10,background:"#fff",cursor:"pointer",fontSize:13,fontWeight:500,color:"#374151" }}>
                <img src={btn.img} alt=""/>{btn.label}
              </button>
            ))}
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:24 }}>
            <div style={{ flex:1,height:1,background:"#e5e7eb" }}/><span style={{ fontSize:13,color:"#9ca3af" }}>OR</span><div style={{ flex:1,height:1,background:"#e5e7eb" }}/>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <input type="text" name="fakeusername" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            <input type="password" name="fakepassword" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            <label style={{ display:"block",fontSize:14,fontWeight:500,color:"#374151",marginBottom:6 }}>Email address</label>
            <input name="email" type="email" autoComplete="off" value={formData.email} onChange={handleChange} placeholder="name@email.com" style={{ width:"100%",padding:"12px 16px",border:"1px solid #e5e7eb",borderRadius:10,fontSize:14,marginBottom:16,boxSizing:"border-box",outline:"none" }}/>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6 }}>
              <label style={{ fontSize:14,fontWeight:500,color:"#374151" }}>Password</label>
              <div style={{ display:"flex",gap:12 }}>
                <a href="/auth/forgot-username" style={{ fontSize:13,color:"#6b7280",textDecoration:"none" }}>Forgot username?</a>
                <a href="/forgot-password" style={{ fontSize:13,color:"#2563eb",textDecoration:"none" }}>Forgot password?</a>
              </div>
            </div>
            <input name="password" type="password" autoComplete="new-password" value={formData.password} onChange={handleChange} placeholder="••••••••" style={{ width:"100%",padding:"12px 16px",border:"1px solid #e5e7eb",borderRadius:10,fontSize:14,marginBottom:8,boxSizing:"border-box",outline:"none" }}/>
            {error && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 16 }}>{error}</p>}
            <label style={{ display:"flex",alignItems:"center",gap:10,fontSize:14,color:"#374151",marginBottom:20,cursor:"pointer" }}>
              <input name="remember" type="checkbox" checked={formData.remember} onChange={handleChange}/><span>Keep me signed in</span>
            </label>
            <button type="submit" disabled={loading} style={{ width:"100%",padding:"14px",background:"#2563eb",color:"#fff",border:"none",borderRadius:10,fontSize:15,fontWeight:700,cursor:"pointer",marginBottom:16,opacity: loading ? 0.7 : 1 }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p style={{ textAlign:"center",fontSize:14,color:"#6b7280",margin:0 }}>New to JobsPortal? <a onClick={()=>router.push("/auth/signup")} style={{ color:"#2563eb",fontWeight:600,cursor:"pointer",textDecoration:"none" }}>Create an account</a></p>
        </div>
      </div>
    </div>
  );
}
