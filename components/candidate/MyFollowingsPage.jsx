'use client';
import { useRouter } from 'next/navigation';
import { Shell, IMG } from "./_shared";

export default function MyFollowingsPage() {
  const router = useRouter();
  const companies = [
    { name:"Web Design Studio", industry:"Information Technology", location:"New York, USA", jobs:8, size:"50-200", logo:`${IMG}/employers/emplogo1.jpg`, desc:"Award-winning digital design agency crafting experiences for global brands." },
    { name:"Multimedia Design", industry:"Manufacturing", location:"Chicago, USA", jobs:5, size:"200-500", logo:`${IMG}/employers/emplogo5.jpg`, desc:"Industrial design and manufacturing solutions for Fortune 500 clients." },
    { name:"Connect People", industry:"Technology Services", location:"San Francisco, USA", jobs:5, size:"10-50", logo:`${IMG}/employers/emplogo7.jpg`, desc:"HR tech startup revolutionising talent acquisition with AI-powered tools." },
    { name:"Power Wave", industry:"Cloud Infrastructure", location:"Austin, USA", jobs:3, size:"50-200", logo:`${IMG}/employers/emplogo2.jpg`, desc:"Building scalable cloud solutions and developer tools for modern teams." },
  ];
  return (
    <Shell path="/candidate/my-followings" title="My Followings" subtitle={`Following ${companies.length} companies`}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
        {companies.map((c,i) => (
          <div key={i} style={{ background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", padding:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
              <img src={c.logo} alt={c.name} style={{ width:56, height:56, borderRadius:12, objectFit:"cover" }} />
              <button style={{ padding:"6px 14px", borderRadius:8, border:"1px solid #fecaca", background:"#fee2e2", color:"#dc2626", fontSize:12, fontWeight:500, cursor:"pointer" }}>Unfollow</button>
            </div>
            <h3 style={{ fontSize:16, fontWeight:600, color:"#1f2937", margin:"0 0 4px" }}>{c.name}</h3>
            <div style={{ fontSize:13, color:"#6b7280", marginBottom:10 }}>{c.industry}</div>
            <div style={{ display:"flex", gap:16, marginBottom:12 }}>
              {[["fa-map-marker",c.location],["fa-briefcase",`${c.jobs} open jobs`],["fa-users",`${c.size} employees`]].map(([icon,text],j) => (
                <span key={j} style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:"#6b7280" }}>
                  <i className={`fa-solid ${icon}`} style={{ color:"#2563eb" }} />{text}
                </span>
              ))}
            </div>
            <p style={{ fontSize:13, color:"#4b5563", lineHeight:1.5, marginBottom:16 }}>{c.desc}</p>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => router.push("/employer/single")} style={{ flex:1, padding:"9px", border:"1px solid #2563eb", color:"#2563eb", background:"transparent", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:500 }}>View Company</button>
              <button onClick={() => router.push("/jobs")} style={{ flex:1, padding:"9px", background:"#2563eb", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600 }}>View Jobs</button>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
