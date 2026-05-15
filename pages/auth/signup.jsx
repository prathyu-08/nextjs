import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import api from "../../lib/api";


export default function SignupPage() {
  const router = useRouter();
  const [type, setType] = useState("candidate");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    desired_role: "",
    company_name: "",
    website: "",
    designation: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Clear form on mount
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone_number: "",
      desired_role: "",
      company_name: "",
      website: "",
      designation: "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = type === "candidate"
        ? {
            role: type,
            email: formData.email.trim(),
            password: formData.password,
            confirm_password: formData.confirm_password,
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
            ...(formData.phone_number.trim() && { phone_number: formData.phone_number.trim() }),
            ...(formData.desired_role && { desired_role: formData.desired_role }),
          }
        : {
            role: type,
            email: formData.email.trim(),
            password: formData.password,
            confirm_password: formData.confirm_password,
            company_name: formData.company_name.trim(),
            designation: formData.designation.trim(),
            ...(formData.website.trim() && { website: formData.website.trim() }),
          };

      await api.authApi.signup(payload);
      setError("");
      // Store email for OTP verification
      sessionStorage.setItem("pendingEmail", formData.email);
      router.push("/auth/verify-otp");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ display:"flex",minHeight:"100vh",fontFamily:"Inter,sans-serif" }}>
      <div style={{ flex:1,background:"linear-gradient(135deg,#667eea,#764ba2)",color:"#fff",padding:"60px 48px",display:"flex",flexDirection:"column",justifyContent:"center" }}>
        <div style={{ display:"inline-block",padding:"6px 16px",background:"rgba(255,255,255,0.15)",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:2,marginBottom:32 }}>CREATE ACCOUNT</div>
        <h1 style={{ fontSize:"clamp(1.8rem,3vw,2.6rem)",fontWeight:800,lineHeight:1.2,marginBottom:20 }}>Join thousands of professionals hiring and getting hired</h1>
        <p style={{ opacity:0.85,lineHeight:1.7,marginBottom:32,maxWidth:400 }}>Build a profile that stands out, connect with employers, and unlock tailored recommendations.</p>
        <ul style={{ listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:14 }}>
          {["Access curated jobs from verified companies","Showcase your portfolio and skill badges","Collaborate with hiring teams in real time"].map((item,i)=>(
            <li key={i} style={{ display:"flex",alignItems:"center",gap:12,fontSize:14 }}>
              <span style={{ background:"rgba(255,255,255,0.2)",borderRadius:"50%",width:26,height:26,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11 }}>✔</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:48,background:"#f9fafb",overflowY:"auto" }}>
        <div style={{ width:"100%",maxWidth:480,background:"#fff",borderRadius:16,padding:36,boxShadow:"0 10px 40px rgba(0,0,0,0.08)" }}>
          <h2 style={{ fontSize:24,fontWeight:700,color:"#1f2937",marginBottom:6 }}>Create your free account</h2>
          <p style={{ color:"#6b7280",fontSize:13,marginBottom:24 }}>Start as a candidate or employer. Switch anytime.</p>
          <div style={{ display:"flex",gap:10,marginBottom:20 }}>
            {["G Sign up with Google","in Sign up with LinkedIn"].map((label,i)=>(
              <button key={i} style={{ flex:1,padding:"10px",border:"1px solid #e5e7eb",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,fontWeight:500,color:"#374151" }}>{label}</button>
            ))}
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20 }}>
            <div style={{ flex:1,height:1,background:"#e5e7eb" }}/><span style={{ fontSize:12,color:"#9ca3af" }}>OR</span><div style={{ flex:1,height:1,background:"#e5e7eb" }}/>
          </div>
          <div style={{ display:"flex",border:"1px solid #e5e7eb",borderRadius:10,overflow:"hidden",marginBottom:20 }}>
            {["candidate","employer"].map(t=>(
              <button key={t} onClick={()=>setType(t)} style={{ flex:1,padding:"10px",border:"none",cursor:"pointer",fontSize:14,fontWeight:600,background:type===t?"#2563eb":"#fff",color:type===t?"#fff":"#374151",textTransform:"capitalize" }}>{t}</button>
            ))}
          </div>
           {type==="candidate" ? (
             <form onSubmit={handleSubmit} autoComplete="off" style={{ display:"flex",flexDirection:"column",gap:14 }}>
               {/* Honeypot fields to prevent autofill */}
               <input type="text" name="fakeusername" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
               <input type="password" name="fakepassword" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
               
               <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                 <div>
                   <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:4 }}>First name</label>
                   <input name="first_name" autoComplete="given-name" value={formData.first_name} onChange={handleChange} placeholder="Samantha" required minLength={2} maxLength={30} pattern="[A-Za-z\s]+" style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}/>
                 </div>
                 <div>
                   <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:4 }}>Last name</label>
                   <input name="last_name" autoComplete="family-name" value={formData.last_name} onChange={handleChange} placeholder="Jenkins" required minLength={2} maxLength={30} pattern="[A-Za-z\s]+" style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}/>
                 </div>
               </div>
               <div>
                 <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:4 }}>Email address</label>
                 <input name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="name@email.com" required maxLength={50} style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}/>
               </div>
               <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                 <div>
                   <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:4 }}>Password</label>
                   <input name="password" type="password" autoComplete="new-password" value={formData.password} onChange={handleChange} placeholder="Strong password" required minLength={8} maxLength={25} style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}/>
                 </div>
                 <div>
                   <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:4 }}>Confirm password</label>
                   <input name="confirm_password" type="password" autoComplete="new-password" value={formData.confirm_password} onChange={handleChange} placeholder="Repeat password" required minLength={8} maxLength={25} style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}/>
                 </div>
               </div>
                <div>
                  <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:4 }}>Phone number</label>
                  <input name="phone_number" inputMode="numeric" autoComplete="tel-national" value={formData.phone_number} onChange={handleChange} placeholder="10 digit mobile number" maxLength={10} pattern="\d{10}" style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}/>
                </div>
                <div>
                  <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:4 }}>Desired role</label>
                  <select name="desired_role" value={formData.desired_role} onChange={handleChange} autoComplete="off" style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}>
                    <option value="">Select a role</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Product Designer">Product Designer</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Data Analyst">Data Analyst</option>
                  </select>
                </div>
               <label style={{ display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",fontSize:13,color:"#374151" }}>
                 <input type="checkbox" required/><span>I agree to the <b>Terms of Service</b> and <b>Privacy Policy</b></span>
               </label>
               {error && <p style={{ color: "#ef4444", fontSize: 13, margin: 0 }}>{error}</p>}
               <button type="submit" disabled={loading} style={{ width:"100%",padding:"12px",background:"#2563eb",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer",opacity: loading ? 0.7 : 1 }}>
                 {loading ? "Creating account..." : "Create Candidate Account"}
               </button>
             </form>
           ) : (
             <form onSubmit={handleSubmit} autoComplete="off" style={{ display:"flex",flexDirection:"column",gap:14 }}>
               {/* Honeypot fields to prevent autofill */}
               <input type="text" name="fakeusername" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
               <input type="password" name="fakepassword" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
               
               <div>
                 <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:4 }}>Company name</label>
                 <input name="company_name" value={formData.company_name} onChange={handleChange} placeholder="Acme Studios" autoComplete="organization" required minLength={2} maxLength={50} style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}/>
               </div>
               <div>
                 <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:4 }}>Website</label>
                 <input name="website" type="url" value={formData.website} onChange={handleChange} placeholder="https://yourcompany.com" autoComplete="url" maxLength={100} style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}/>
               </div>
               <div>
                 <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:4 }}>Work email</label>
                 <input name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" required maxLength={50} style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}/>
               </div>
               <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                 <div>
                   <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:4 }}>Password</label>
                   <input name="password" type="password" autoComplete="new-password" value={formData.password} onChange={handleChange} required minLength={8} maxLength={25} style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}/>
                 </div>
                 <div>
                   <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:4 }}>Confirm password</label>
                   <input name="confirm_password" type="password" autoComplete="new-password" value={formData.confirm_password} onChange={handleChange} required minLength={8} maxLength={25} style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}/>
                 </div>
               </div>
               <div>
                 <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:4 }}>Your designation</label>
                 <input name="designation" value={formData.designation} onChange={handleChange} placeholder="Recruiter / HR Manager" autoComplete="off" required minLength={2} maxLength={50} pattern="[A-Za-z\s]+" style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}/>
               </div>
               <label style={{ display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",fontSize:13,color:"#374151" }}>
                 <input type="checkbox" required/><span>I agree to the <b>Terms of Service</b> and <b>Privacy Policy</b></span>
               </label>
               {error && <p style={{ color: "#ef4444", fontSize: 13, margin: 0 }}>{error}</p>}
               <button type="submit" disabled={loading} style={{ width:"100%",padding:"12px",background:"#2563eb",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer",opacity: loading ? 0.7 : 1 }}>
                 {loading ? "Creating account..." : "Create Employer Account"}
               </button>
             </form>
          )}
          <p style={{ textAlign:"center",fontSize:13,color:"#6b7280",marginTop:16,marginBottom:0 }}>
            Already have an account? <a onClick={()=>router.push("/auth/login")} style={{ color:"#2563eb",fontWeight:600,cursor:"pointer",textDecoration:"none" }}>Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  return { props: {} };
}
