'use client';
import { useRouter } from 'next/navigation';
import { Shell, IMG } from "./_shared";

export default function MyFavouritesPage() {
  const router = useRouter();
  const jobs = [
    { company:"Multimedia Design", logo:`${IMG}/employers/emplogo1.jpg`, title:"UI UX Designer Required", type:"Full Time", location:"Fairbanks", salary:"$2,500 - $3,000", posted:"Mar 07, 2025", desc:"We are seeking a multi-disciplinary designer to ship intuitive product experiences for our SaaS platform." },
    { company:"Connect People", logo:`${IMG}/employers/emplogo7.jpg`, title:"Full Stack Designer", type:"Full Time", location:"Barrington", salary:"$6,000 - $8,000", posted:"Mar 10, 2025", desc:"Lead design systems powering mobile & web apps for our fast-growing HR solutions suite." },
    { company:"Power Wave", logo:`${IMG}/employers/emplogo2.jpg`, title:"Marketing Specialist", type:"Part Time", location:"New York", salary:"$3,000 - $4,500", posted:"Mar 12, 2025", desc:"Drive digital marketing campaigns and grow our brand across social and paid channels." },
    { company:"Net Design", logo:`${IMG}/employers/emplogo5.jpg`, title:"Web Developer", type:"Contract", location:"Remote", salary:"$5,000 - $7,000", posted:"Mar 14, 2025", desc:"Build and maintain client-facing web applications using modern JavaScript frameworks." },
  ];
  const typeColor = { "Full Time":["#dcfce7","#166534"], "Part Time":["#dbeafe","#1e40af"], "Contract":["#fee2e2","#dc2626"] };
  return (
    <Shell path="/candidate/favourites" title="My Favourite Jobs" subtitle={`${jobs.length} saved jobs`}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
        {jobs.map((job,i) => {
          const [bg,color] = typeColor[job.type]||["#f3f4f6","#374151"];
          return (
            <div key={i} style={{ background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:16 }}>
                <img src={job.logo} alt={job.company} style={{ width:48, height:48, borderRadius:10, objectFit:"cover" }} />
                <button style={{ width:32, height:32, borderRadius:8, border:"1px solid #fecaca", background:"#fee2e2", color:"#dc2626", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>♥</button>
              </div>
              <div style={{ padding:"0 16px 16px" }}>
                <h3 style={{ fontSize:16, fontWeight:600, color:"#1f2937", margin:"0 0 4px" }}>{job.title}</h3>
                <div style={{ fontSize:13, color:"#6b7280", marginBottom:12 }}>{job.company}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:12 }}>
                  {[["fa-map-marker",job.location],["fa-money-bill",job.salary]].map(([icon,text],j) => (
                    <span key={j} style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:"#6b7280" }}>
                      <i className={`fa-solid ${icon}`} style={{ color:"#2563eb" }} />{text}
                    </span>
                  ))}
                  <span style={{ padding:"2px 10px", borderRadius:20, fontSize:11, fontWeight:600, background:bg, color }}>{job.type}</span>
                </div>
                <p style={{ fontSize:13, color:"#4b5563", lineHeight:1.5, marginBottom:14 }}>{job.desc}</p>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px", borderTop:"1px solid #e5e7eb" }}>
                <span style={{ fontSize:12, color:"#9ca3af" }}>Posted {job.posted}</span>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={() => router.push("/jobs")} style={{ padding:"7px 14px", border:"1px solid #e5e7eb", background:"#f9fafb", color:"#374151", borderRadius:8, cursor:"pointer", fontSize:12 }}>Details</button>
                  <button style={{ padding:"7px 14px", background:"#2563eb", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:600 }}>Apply Now</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}
