'use client';
import { useRouter } from 'next/navigation';

const IMG = "https://www.sharjeelanjum.com/html/jobs-portal/images";

const companyValues = [
  { icon:"🎨",label:"Design Thinking" }, { icon:"🤝",label:"Radical Candor" },
  { icon:"🚀",label:"Move Fast" }, { icon:"🌍",label:"Global Mindset" },
  { icon:"🔬",label:"Research First" }, { icon:"⚖️",label:"Work-Life Balance" },
];

const lifePerks = [
  { icon:"remote",title:"Work from Anywhere",desc:"Fully distributed with quarterly team retreats around the world." },
  { icon:"learning",title:"Learning Budget",desc:"$3,000 annual stipend for courses, books, and conferences." },
  { icon:"health",title:"Premium Health",desc:"Full medical, dental, and vision for you and your family." },
  { icon:"growth",title:"Career Growth",desc:"Clear ladders, bi-annual reviews, and executive mentorship." },
];

const openRoles = [
  { type:"Full Time",typeClass:"fulltime",title:"Product Delivery Lead",salary:"$6,000 - $9,500",location:"Doha, Qatar",posted:"May 11, 2025",urgent:false },
  { type:"Full Time",typeClass:"fulltime",title:"ERP Transformation Manager",salary:"$7,500 - $11,000",location:"Riyadh, Saudi Arabia",posted:"May 05, 2025",urgent:true },
  { type:"Contract",typeClass:"contract",title:"Technical Program Manager",salary:"$4,800 - $7,200",location:"Remote, EMEA",posted:"Apr 28, 2025",urgent:false },
];

const studioImages = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=280&fit=crop",
];

export default function EmployerSinglePage() {
  const router = useRouter();
  return (
    <>
      <div style={{ height:280,overflow:"hidden" }}>
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=280&fit=crop" alt="Office" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
      </div>

      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:28,marginTop:-60,position:"relative",zIndex:2,display:"flex",gap:24,alignItems:"flex-start",flexWrap:"wrap",boxShadow:"0 10px 40px rgba(0,0,0,.1)" }}>
          <div style={{ width:80,height:80,borderRadius:16,background:"#e8f4fd",border:"2px solid #4a9fd5",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            <span style={{ fontSize:32 }}>🏢</span>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13,color:"#6b7280",marginBottom:4 }}>Digital Experience Studio</div>
            <h1 style={{ fontSize:28,fontWeight:800,color:"#1f2937",margin:"0 0 10px" }}>Skyline Digital</h1>
            <div style={{ display:"flex",flexWrap:"wrap",gap:16 }}>
              {["📍 San Francisco, USA","👥 180+ team members","📅 Since 2014"].map((item,i)=>(
                <span key={i} style={{ fontSize:14,color:"#6b7280" }}>{item}</span>
              ))}
            </div>
          </div>
          <div style={{ display:"flex",gap:12 }}>
            <button style={{ padding:"10px 20px",border:"2px solid #0891b2",color:"#0891b2",background:"transparent",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600 }}>🔔 Follow Company</button>
            <button style={{ padding:"10px 20px",background:"#2563eb",color:"#fff",border:"none",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600 }}>👀 View Open Roles</button>
          </div>
        </div>
      </div>

      <main style={{ maxWidth:1280,margin:"32px auto",padding:"0 24px",display:"grid",gridTemplateColumns:"1fr 360px",gap:28 }}>
        <div>
          {[
            { title:"Who We Are", content:<><p style={p}>Skyline Digital is a multidisciplinary studio building immersive product experiences for finance, ecommerce, and emerging tech brands. We combine research-led design with battle-tested engineering.</p><p style={p}>Our teams operate with a maker-first culture: weekly design critiques, shared ownership of roadmaps, and space to iterate rapidly so we can keep pushing what digital experiences can be.</p></> },
            { title:"What We Value", content:<div style={{ display:"flex",flexWrap:"wrap",gap:10 }}>{companyValues.map((v,i)=><span key={i} style={{ padding:"8px 16px",background:"#eff6ff",color:"#2563eb",borderRadius:20,fontSize:14,fontWeight:500 }}>{v.icon} {v.label}</span>)}</div> },
            { title:"Life at Skyline", content:<div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16 }}>{lifePerks.map((perk,i)=><div key={i} style={{ background:"#f9fafb",borderRadius:12,padding:20,border:"1px solid #e5e7eb" }}><div style={{ fontSize:28,marginBottom:10 }}>{perk.icon==="remote"?"✈️":perk.icon==="learning"?"🎓":perk.icon==="health"?"💪":"📈"}</div><h3 style={{ fontSize:15,fontWeight:700,color:"#1f2937",marginBottom:6 }}>{perk.title}</h3><p style={{ fontSize:13,color:"#6b7280",margin:0,lineHeight:1.5 }}>{perk.desc}</p></div>)}</div> },
            { title:"Inside Our Studios", content:<><p style={p}>Take a peek at some of our favourite moments across Skyline hubs and remote retreats.</p><div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginTop:12 }}>{studioImages.map((src,i)=><img key={i} src={src} alt="" style={{ width:"100%",height:160,objectFit:"cover",borderRadius:10,gridColumn:i===3?"span 2":"auto" }}/>)}</div></> },
          ].map((sec,i)=>(
            <div key={i} style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:28,marginBottom:20 }}>
              <h2 style={{ fontSize:20,fontWeight:700,color:"#1f2937",marginBottom:16 }}>{sec.title}</h2>
              {sec.content}
            </div>
          ))}
        </div>

        <aside>
          <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24,marginBottom:20 }}>
            <h3 style={{ fontSize:17,fontWeight:600,color:"#1f2937",marginBottom:16 }}>Company Snapshot</h3>
            <ul style={{ listStyle:"none",padding:0,margin:0 }}>
              {[["🌐","Website","skylinedigital.com"],["🏭","Industry","Product Design & Engineering"],["🏢","Departments","Design, Engineering, Research"],["📍","Offices","SF · Berlin · Singapore · Remote"],["📊","Growth","45% YoY revenue"]].map(([icon,label,val],i)=>(
                <li key={i} style={{ display:"flex",gap:12,marginBottom:14 }}>
                  <span style={{ fontSize:20 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize:12,color:"#9ca3af" }}>{label}</div>
                    <div style={{ fontSize:14,color:"#1f2937",fontWeight:500 }}>{val}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ display:"flex",gap:8,marginTop:16 }}>
              {["in","✦","𝕏","▶"].map((icon,i)=>(
                <a key={i} href="#" style={{ width:36,height:36,background:"#f3f4f6",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",color:"#4b5563",fontSize:13,fontWeight:700 }}>{icon}</a>
              ))}
            </div>
          </div>

          <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24,marginBottom:20 }}>
            <h3 style={{ fontSize:17,fontWeight:600,color:"#1f2937",marginBottom:16 }}>Get In Touch</h3>
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <div><label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6 }}>Full name</label><input placeholder="Jordan Blake" style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}/></div>
              <div><label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6 }}>Work email</label><input type="email" placeholder="you@company.com" style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}/></div>
              <div><label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6 }}>Message</label><textarea rows={4} placeholder="Tell us how we can collaborate..." style={{ width:"100%",padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none",resize:"vertical" }}/></div>
              <button style={{ width:"100%",padding:"12px",background:"#2563eb",color:"#fff",border:"none",borderRadius:10,fontWeight:600,cursor:"pointer" }}>Send Message</button>
            </div>
          </div>

          <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24 }}>
            <h3 style={{ fontSize:17,fontWeight:600,color:"#1f2937",marginBottom:12 }}>Studio Locations</h3>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3!2d-74.259865!3d40.697149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s" style={{ width:"100%",height:180,border:"none",borderRadius:8 }} allowFullScreen/>
          </div>
        </aside>
      </main>

      <section style={{ background:"#f9fafb",padding:"60px 0" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32,flexWrap:"wrap",gap:20 }}>
            <div>
              <h2 style={{ fontSize:28,fontWeight:700,color:"#1f2937",marginBottom:6 }}>Open Roles</h2>
              <p style={{ color:"#6b7280",fontSize:15,margin:0 }}>We're hiring across design, engineering, and strategy. Join our fully distributed team.</p>
            </div>
            <button style={{ padding:"10px 20px",border:"1px solid #e5e7eb",borderRadius:10,background:"#fff",cursor:"pointer",fontSize:14 }}>✉ Refer a Friend</button>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }}>
            {openRoles.map((role, i) => (
              <div key={i} style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:20 }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:12 }}>
                  <span style={{ padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:600,background:role.typeClass==="fulltime"?"#dcfce7":"#fee2e2",color:role.typeClass==="fulltime"?"#166534":"#dc2626" }}>{role.type}</span>
                  {role.urgent && <span style={{ fontSize:16 }}>⚡</span>}
                </div>
                <h3 style={{ fontSize:16,fontWeight:700,color:"#1f2937",marginBottom:6 }}>{role.title}</h3>
                <p style={{ fontSize:13,color:"#6b7280",marginBottom:4 }}>Salary: {role.salary}</p>
                <p style={{ fontSize:13,color:"#6b7280",marginBottom:16 }}>📍 {role.location}</p>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:12,borderTop:"1px solid #e5e7eb" }}>
                  <span style={{ fontSize:12,color:"#9ca3af" }}>Posted {role.posted}</span>
                  <button onClick={()=>router.push("/jobs")} style={{ padding:"7px 14px",background:"#2563eb",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:600 }}>Apply</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const p = { fontSize:14,color:"#4b5563",lineHeight:1.7,marginBottom:12 };
