'use client';
import { IMG } from "./_shared";

export default function PublicProfilePage() {
  const skills = ["React","TypeScript","Node.js","Figma","Python","PostgreSQL","AWS","Docker"];
  const langs = [["English","Native"],["Arabic","Intermediate"],["Spanish","Basic"]];
  return (
    <div style={{ background:"#f9fafb", minHeight:"100vh" }}>
      {/* Cover */}
      <div style={{ height:280, overflow:"hidden" }}>
        <img src={`${IMG}/user-cover.jpg`} alt="Cover" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
      </div>

      <div style={{ maxWidth:1200, margin:"-80px auto 0", padding:"0 24px", position:"relative", zIndex:1 }}>
        {/* Header card */}
        <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:32, display:"flex", alignItems:"flex-start", gap:24, marginBottom:24, boxShadow:"0 10px 40px rgba(0,0,0,.08)" }}>
          <div style={{ position:"relative", width:150, height:150, borderRadius:"50%", border:"4px solid #fff", boxShadow:"0 4px 12px rgba(0,0,0,.1)", flexShrink:0 }}>
            <img src={`${IMG}/candidates/01.jpg`} alt="" style={{ width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover" }} />
            <span style={{ position:"absolute", bottom:8, right:8, width:24, height:24, borderRadius:"50%", background:"#22c55e", border:"3px solid #fff" }} />
          </div>
          <div style={{ flex:1 }}>
            <h1 style={{ fontSize:28, fontWeight:700, color:"#1f2937", margin:"0 0 4px" }}>Job Seeker</h1>
            <div style={{ fontSize:18, color:"#2563eb", marginBottom:12 }}>Senior UI/UX Designer</div>
            <div style={{ display:"flex", gap:20, flexWrap:"wrap", marginBottom:14 }}>
              {[["fa-map-marker","Washington, USA"],["fa-briefcase","5 years exp"],["fa-money-bill","$6k–$9k/mo"]].map(([icon,text],i) => (
                <span key={i} style={{ display:"flex", alignItems:"center", gap:6, fontSize:14, color:"#6b7280" }}>
                  <i className={`fa-solid ${icon}`} style={{ color:"#2563eb" }} />{text}
                </span>
              ))}
            </div>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {[["Open to Work","#dcfce7","#166534"],["5 Years Exp","#dbeafe","#1e40af"],["$6k–$9k Salary","#fef3c7","#92400e"]].map(([label,bg,color],i) => (
                <span key={i} style={{ padding:"6px 16px", background:bg, color, borderRadius:20, fontSize:13, fontWeight:500 }}>{label}</span>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", gap:10, flexShrink:0 }}>
            <button style={{ padding:"10px 20px", border:"1px solid #2563eb", color:"#2563eb", background:"transparent", borderRadius:10, cursor:"pointer", fontWeight:600 }}>Message</button>
            <button style={{ padding:"10px 20px", background:"#2563eb", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontWeight:600 }}>Download CV</button>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:24, paddingBottom:40 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {[
              { title:"About Me", body:<p style={{ fontSize:15, color:"#4b5563", lineHeight:1.7, margin:0 }}>I'm a multi-disciplinary designer with 5 years of experience shipping products used by millions. I bridge the gap between design thinking and engineering, leading teams from research to production.</p> },
              { title:"Work Experience", body:
                <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                  {[["Senior UI/UX Designer","Multimedia Design","Jan 2022 – Present","Led design of core product features serving 500K+ users. Established design system."],["UI Designer","Creative Studio","Jun 2019 – Dec 2021","Designed interfaces for e-commerce and SaaS clients."]].map(([title,company,period,desc],i) => (
                    <div key={i} style={{ paddingBottom:20, borderBottom:i===0?"1px solid #f3f4f6":"none" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                        <h4 style={{ fontSize:16, fontWeight:600, color:"#1f2937", margin:0 }}>{title}</h4>
                        <span style={{ fontSize:13, color:"#6b7280" }}>{period}</span>
                      </div>
                      <div style={{ fontSize:14, color:"#2563eb", marginBottom:8 }}>{company}</div>
                      <p style={{ fontSize:14, color:"#4b5563", margin:0, lineHeight:1.6 }}>{desc}</p>
                    </div>
                  ))}
                </div>
              },
              { title:"Education", body:
                <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                  <div style={{ width:48, height:48, borderRadius:10, background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", color:"#2563eb", fontSize:20 }}><i className="fa-solid fa-graduation-cap" /></div>
                  <div>
                    <h4 style={{ fontSize:15, fontWeight:600, color:"#1f2937", margin:"0 0 4px" }}>B.Sc. Computer Science — MIT</h4>
                    <p style={{ fontSize:13, color:"#6b7280", margin:0 }}>2015 – 2019 · GPA: 3.8/4.0</p>
                  </div>
                </div>
              },
            ].map((sec,i) => (
              <div key={i} style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:24 }}>
                <h3 style={{ fontSize:18, fontWeight:600, color:"#1f2937", marginBottom:16 }}>{sec.title}</h3>
                {sec.body}
              </div>
            ))}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {/* Skills */}
            <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:24 }}>
              <h3 style={{ fontSize:16, fontWeight:600, color:"#1f2937", marginBottom:14 }}>Skills</h3>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {skills.map((s,i) => <span key={i} style={{ padding:"6px 14px", background:"#f3f4f6", borderRadius:20, fontSize:13, color:"#4b5563" }}>{s}</span>)}
              </div>
            </div>
            {/* Languages */}
            <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:24 }}>
              <h3 style={{ fontSize:16, fontWeight:600, color:"#1f2937", marginBottom:14 }}>Languages</h3>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {langs.map(([lang,level],i) => (
                  <li key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:i<langs.length-1?"1px solid #f3f4f6":"none", fontSize:14, color:"#4b5563" }}>
                    <span><i className="fa-solid fa-language" style={{ marginRight:8, color:"#2563eb" }} />{lang}</span>
                    <span style={{ fontSize:12, color:"#6b7280" }}>{level}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:24 }}>
              <h3 style={{ fontSize:16, fontWeight:600, color:"#1f2937", marginBottom:14 }}>Contact</h3>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {[["fa-envelope","seeker@jobsportal.com"],["fa-phone","+1 234 567 890"],["fa-map-marker","Washington, USA"]].map(([icon,text],i) => (
                  <li key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom:i<2?"1px solid #f3f4f6":"none", fontSize:14, color:"#4b5563" }}>
                    <i className={`fa-solid ${icon}`} style={{ color:"#2563eb", width:16 }} />{text}
                  </li>
                ))}
              </ul>
              <div style={{ display:"flex", gap:8, marginTop:16 }}>
                {["in","𝕏","◎","f"].map((icon,i) => (
                  <a key={i} href="#" style={{ width:40, height:40, borderRadius:10, background:"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", color:"#4b5563", fontSize:14, fontWeight:700 }}>{icon}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
