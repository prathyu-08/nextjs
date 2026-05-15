import { useState } from "react";
import CandidateSidebar from "../../components/shared/CandidateSidebar";

const IMG = "https://www.sharjeelanjum.com/html/jobs-portal/images";

export default function CandidateDashboardPage() {
  const [openToWork, setOpenToWork] = useState(true);
  return (
    <section style={{ background:"#f8f9fa",minHeight:"100vh",padding:"40px 0 60px" }}>
      <div style={{ maxWidth:1320,margin:"0 auto",padding:"0 24px",display:"flex",gap:30,alignItems:"flex-start" }}>
        <CandidateSidebar currentPath="/candidate/dashboard"/>
        <div style={{ flex:1,minWidth:0 }}>
          {/* Stats */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24 }}>
            {[
              { icon:"fa-eye",label:"Profile Views",val:219,color:"#9333ea",bg:"#f3e8ff" },
              { icon:"fa-user-plus",label:"Followings",val:4,color:"#ea580c",bg:"#ffedd5" },
              { icon:"fa-file-lines",label:"My CV List",val:1,color:"#2563eb",bg:"#dbeafe" },
              { icon:"fa-message",label:"Messages",val:0,color:"#0d9488",bg:"#ccfbf1" },
            ].map((s, i) => (
              <div key={i} style={{ background:"#fff",borderRadius:12,border:"1px solid #e5e7eb",padding:24,display:"flex",gap:16,alignItems:"center",transition:"all 0.3s",cursor:"default" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 24px rgba(0,0,0,.08)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                <div style={{ width:56,height:56,borderRadius:12,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:s.color }}>
                  <i className={`fa-solid ${s.icon}`}/>
                </div>
                <div>
                  <div style={{ fontSize:13,fontWeight:500,color:"#6b7280" }}>{s.label}</div>
                  <strong style={{ fontSize:28,fontWeight:700,color:s.color }}>{s.val}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Cover Card */}
          <div style={{ background:"#fff",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",marginBottom:24 }}>
            <div style={{ height:200,overflow:"hidden" }}>
              <img src={`${IMG}/user-cover.jpg`} alt="Cover" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
            </div>
            <div style={{ padding:24,display:"flex",gap:24,alignItems:"flex-start" }}>
              <div style={{ width:110,height:110,borderRadius:"50%",overflow:"hidden",border:"4px solid #fff",boxShadow:"0 4px 12px rgba(0,0,0,.1)",flexShrink:0,marginTop:-70,position:"relative",background:"#fff" }}>
                <img src={`${IMG}/candidates/01.jpg`} alt="Job Seeker" style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
              </div>
              <div style={{ flex:1,paddingTop:10 }}>
                <h3 style={{ fontSize:24,fontWeight:700,color:"#1f2937",margin:"0 0 6px" }}>Job Seeker</h3>
                <p style={{ fontSize:14,color:"#6b7280",margin:"0 0 16px" }}>Bainbridge Island, Washington, United States of America</p>
                <div style={{ display:"flex",gap:24,flexWrap:"wrap" }}>
                  {[["fa-phone","+1 234 567 890"],["fa-envelope","seeker@jobsportal.com"]].map(([icon,text],i)=>(
                    <span key={i} style={{ display:"flex",alignItems:"center",gap:8,fontSize:14,color:"#4b5563" }}>
                      <i className={`fa-solid ${icon}`} style={{ color:"#2563eb" }}/>{text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Applied Jobs */}
          <Panel title="My Applied Jobs" link="View All">
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16 }}>
              {[
                { badge:"Full Time",title:"Project Manager",location:"Kaneboe Station",salary:"USD5000 - USD6000/Monthly",applied:"Oct 31, 2025",company:"Multimedia Design",logo:`${IMG}/employers/emplogo5.jpg`,badgeType:"" },
                { badge:"Full Time",title:"Full Stack Designer",location:"Barrington",salary:"USD6000 - USD8000/Monthly",applied:"Oct 29, 2025",company:"Connect People",logo:`${IMG}/employers/emplogo7.jpg`,badgeType:"" },
                { badge:"Contract",title:"Full Stack Developer",location:"Bessemer",salary:"USD10000 - USD20000/Monthly",applied:"Oct 25, 2025",company:"Multimedia Design",logo:`${IMG}/employers/emplogo1.jpg`,badgeType:"danger" },
              ].map((job, i) => <AppliedCard key={i} {...job}/>)}
            </div>
          </Panel>

          {/* Active Package */}
          <Panel title="Active Package Details">
            <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:16 }}>
              {[["Package Name","Basic Jobs View"],["Price","USD 10"],["Applications","02 / 20"],["Started On","N/A"],["Expires On","31 Dec, 2025"]].map(([label,val],i)=>(
                <div key={i} style={{ background:i===4?"#fef2f2":"#f9fafb",borderRadius:12,padding:16,border:`1px solid ${i===4?"#fecaca":"#e5e7eb"}`,textAlign:"center" }}>
                  <div style={{ fontSize:12,color:"#6b7280",marginBottom:6 }}>{label}</div>
                  <strong style={{ fontSize:15,color:i===4?"#dc2626":"#1f2937" }}>{val}</strong>
                </div>
              ))}
            </div>
          </Panel>

          {/* Recommended Jobs */}
          <Panel title="Recommended Jobs" link="View All">
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16 }}>
              {[
                { badge:"Full Time",title:"UI/UX Designer",sub:"Islamabad · Power Color",salary:"$6000 - $9000/Monthly",date:"Mar 07, 2025" },
                { badge:"Full Time",title:"iOS Developer",sub:"Atlanta · Multimedia Design",salary:"$6000 - $9000/Monthly",date:"Mar 07, 2025" },
                { badge:"Contract",title:"Electrical Engineer",sub:"Denver · Power Wave",salary:"$5000 - $9000/Monthly",date:"Mar 07, 2025",danger:true },
              ].map((job, i) => (
                <div key={i} style={{ background:"#f9fafb",borderRadius:12,padding:20,border:"1px solid #e5e7eb" }}>
                  <span style={{ display:"inline-block",padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:job.danger?"#fee2e2":"#dcfce7",color:job.danger?"#dc2626":"#166534",marginBottom:12 }}>{job.badge}</span>
                  <h4 style={{ fontSize:16,fontWeight:600,color:"#1f2937",margin:"0 0 6px" }}>{job.title}</h4>
                  <p style={{ fontSize:14,color:"#6b7280",margin:"0 0 14px" }}>{job.sub}</p>
                  <div style={{ fontSize:12,color:"#6b7280" }}><div>{job.salary}</div><div>{job.date}</div></div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Followings */}
          <Panel title="My Followings" link="View All">
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16 }}>
              {[
                { name:"Web Design Studio",sub:"Information Technology\nYour Location Address USA",jobs:8,logo:`${IMG}/employers/emplogo1.jpg` },
                { name:"Multimedia Design",sub:"Manufacturing\nYour Location Address USA",jobs:5,logo:`${IMG}/employers/emplogo5.jpg` },
                { name:"Connect People",sub:"Technology Services\nYour Location Address USA",jobs:5,logo:`${IMG}/employers/emplogo7.jpg` },
              ].map((c, i) => (
                <div key={i} style={{ background:"#f9fafb",borderRadius:12,padding:24,border:"1px solid #e5e7eb",textAlign:"center" }}>
                  <div style={{ width:64,height:64,borderRadius:12,overflow:"hidden",margin:"0 auto 16px",background:"#fff",padding:8 }}>
                    <img src={c.logo} alt={c.name} style={{ width:"100%",height:"100%",objectFit:"contain" }}/>
                  </div>
                  <h4 style={{ fontSize:16,fontWeight:600,color:"#1f2937",margin:"0 0 8px" }}>{c.name}</h4>
                  <p style={{ fontSize:13,color:"#6b7280",margin:"0 0 14px",lineHeight:1.5,whiteSpace:"pre-line" }}>{c.sub}</p>
                  <span style={{ display:"inline-block",padding:"6px 14px",background:"#eff6ff",color:"#2563eb",borderRadius:20,fontSize:13,fontWeight:500 }}>{c.jobs} Open Jobs</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function Panel({ title, link, children }) {
  return (
    <div style={{ background:"#fff",borderRadius:12,border:"1px solid #e5e7eb",padding:24,marginBottom:24 }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
        <h3 style={{ fontSize:18,fontWeight:700,color:"#1f2937",margin:0 }}>{title}</h3>
        {link && <a href="#" style={{ fontSize:14,color:"#2563eb",textDecoration:"none" }}>{link}</a>}
      </div>
      {children}
    </div>
  );
}

function AppliedCard({ badge, title, location, salary, applied, company, logo, badgeType }) {
  return (
    <div style={{ background:"#f9fafb",borderRadius:12,padding:20,border:"1px solid #e5e7eb" }}>
      <span style={{ display:"inline-block",padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:badgeType==="danger"?"#fee2e2":"#dcfce7",color:badgeType==="danger"?"#dc2626":"#166534",marginBottom:12 }}>{badge}</span>
      <h4 style={{ fontSize:16,fontWeight:600,color:"#1f2937",margin:"0 0 6px" }}>{title}</h4>
      <p style={{ fontSize:14,color:"#6b7280",margin:"0 0 14px" }}>{location}</p>
      <div style={{ fontSize:12,color:"#6b7280",marginBottom:14 }}>
        <div>Salary: {salary}</div>
        <div>Applied: {applied}</div>
      </div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:14,borderTop:"1px solid #e5e7eb" }}>
        <strong style={{ fontSize:13,color:"#4b5563" }}>{company}</strong>
        <img src={logo} alt={company} style={{ width:36,height:36,borderRadius:8,objectFit:"cover" }}/>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  return { props: {} };
}
