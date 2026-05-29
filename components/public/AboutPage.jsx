'use client';
import { useRouter } from 'next/navigation';

const IMG = "https://www.sharjeelanjum.com/html/jobs-portal/images";

export default function AboutPage() {
  const router = useRouter();
  const stats = [["50K+","Active Jobs"],["120K+","Companies"],["1M+","Job Seekers"],["25K+","Placements"]];
  const team = [
    { name:"Sarah Johnson", role:"CEO & Founder", img:`${IMG}/team1.jpg` },
    { name:"Michael Chen", role:"Head of Operations", img:`${IMG}/team2.jpg` },
    { name:"Emily Davis", role:"Head of Product", img:`${IMG}/team3.jpg` },
    { name:"James Wilson", role:"Lead Engineer", img:`${IMG}/team4.jpg` },
  ];
  return (
    <>
      {/* Hero */}
      <section style={{ background:"linear-gradient(135deg,#667eea,#764ba2)", padding:"100px 0", color:"#fff" }}>
        <div style={{ maxWidth:700, margin:"0 auto", padding:"0 24px", textAlign:"center" }}>
          <h1 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:800, margin:"0 0 18px" }}>Connecting Talent with Opportunity</h1>
          <p style={{ fontSize:18, opacity:0.9, margin:0, lineHeight:1.6 }}>We're building the future of job recruitment, making it easier for candidates and employers to find their perfect match.</p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding:"60px 0", background:"#f9fafb" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24, textAlign:"center" }}>
            {stats.map(([val,label],i) => (
              <div key={i}>
                <div style={{ fontSize:48, fontWeight:800, color:"#2563eb", marginBottom:8 }}>{val}</div>
                <div style={{ fontSize:16, color:"#6b7280" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding:"80px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
            <div>
              <img src={`${IMG}/about.jpg`} alt="Our Mission" style={{ width:"100%", borderRadius:16 }} onError={e => e.target.style.display="none"} />
              {/* Fallback placeholder */}
              <div style={{ width:"100%", height:360, borderRadius:16, background:"linear-gradient(135deg,#667eea22,#764ba222)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:80 }}>🎯</div>
            </div>
            <div>
              <h2 style={{ fontSize:36, fontWeight:700, color:"#1f2937", marginBottom:18 }}>Our Mission</h2>
              <p style={{ fontSize:15, color:"#4b5563", marginBottom:14, lineHeight:1.7 }}>We believe that finding the right job shouldn't be a challenge. Our platform connects talented individuals with world-class companies, creating meaningful careers and building stronger teams.</p>
              <p style={{ fontSize:15, color:"#4b5563", marginBottom:24, lineHeight:1.7 }}>Since our founding, we've helped thousands of people find their dream jobs and assisted companies in building high-performing teams.</p>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {["Smart job matching algorithm","Verified company listings","Resume builder tools","Job alerts & notifications"].map((item,i) => (
                  <li key={i} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12, fontSize:15, color:"#4b5563" }}>
                    <i className="fa-solid fa-check" style={{ color:"#22c55e", fontSize:16 }} />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding:"80px 0", background:"#f9fafb" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ textAlign:"center", maxWidth:600, margin:"0 auto 48px" }}>
            <h2 style={{ fontSize:36, fontWeight:700, color:"#1f2937", marginBottom:10 }}>Meet Our Team</h2>
            <p style={{ fontSize:16, color:"#6b7280", margin:0 }}>The people behind your career success</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:32 }}>
            {team.map((member,i) => (
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ width:200, height:200, borderRadius:"50%", overflow:"hidden", margin:"0 auto 20px", background:"#e0e7ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:60 }}>
                  {["👩","👨","👩","👨"][i]}
                </div>
                <h4 style={{ fontSize:18, fontWeight:600, color:"#1f2937", marginBottom:4 }}>{member.name}</h4>
                <p style={{ fontSize:14, color:"#6b7280", margin:0 }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"80px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ background:"linear-gradient(135deg,#eff6ff,#f0fdf4)", borderRadius:20, border:"1px solid #e5e7eb", padding:60, textAlign:"center" }}>
            <h2 style={{ fontSize:32, fontWeight:700, color:"#1f2937", marginBottom:12 }}>Ready to Get Started?</h2>
            <p style={{ fontSize:16, color:"#6b7280", marginBottom:28 }}>Join thousands of job seekers and employers on our platform</p>
            <div style={{ display:"flex", gap:16, justifyContent:"center" }}>
              <button onClick={() => router.push("/auth/signup")} style={{ padding:"14px 32px", background:"#2563eb", color:"#fff", border:"none", borderRadius:12, fontWeight:700, cursor:"pointer", fontSize:15 }}>Find a Job</button>
              <button onClick={() => router.push("/employer/list")} style={{ padding:"14px 32px", border:"2px solid #2563eb", color:"#2563eb", background:"transparent", borderRadius:12, fontWeight:700, cursor:"pointer", fontSize:15 }}>Post a Job</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
