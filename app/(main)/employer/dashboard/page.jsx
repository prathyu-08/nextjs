'use client';
import { useRouter } from 'next/navigation';
import EmployerSidebar from "../../../../components/layout/sidebars/EmployerSidebar";

const IMG = "https://www.sharjeelanjum.com/html/jobs-portal/images";

const stats = { openJobs:12, totalApplicants:142, profileViews:2341, followers:89 };

const recentApplications = [
  { name:"Sarah Johnson", position:"UI/UX Designer", appliedDate:"2 hours ago", status:"New", statusClass:"new", avatar:`${IMG}/candidates/01.jpg` },
  { name:"Michael Chen", position:"Full Stack Developer", appliedDate:"5 hours ago", status:"Reviewed", statusClass:"reviewed", avatar:`${IMG}/candidates/02.jpg` },
  { name:"Emily Davis", position:"Product Manager", appliedDate:"1 day ago", status:"Shortlisted", statusClass:"shortlisted", avatar:`${IMG}/candidates/03.jpg` },
  { name:"James Wilson", position:"Data Analyst", appliedDate:"2 days ago", status:"New", statusClass:"new", avatar:`${IMG}/candidates/04.jpg` },
];

const activeJobs = [
  { title:"Senior UI/UX Designer", type:"Full Time", applications:24, views:345, status:"Active", statusClass:"active", postedDate:"Mar 07, 2025", expiresDate:"Apr 07, 2025" },
  { title:"Full Stack Developer", type:"Contract", applications:18, views:289, status:"Active", statusClass:"active", postedDate:"Mar 10, 2025", expiresDate:"Apr 10, 2025" },
  { title:"Product Manager", type:"Full Time", applications:31, views:412, status:"Paused", statusClass:"paused", postedDate:"Feb 28, 2025", expiresDate:"Mar 28, 2025" },
];

const recentMessages = [
  { sender:"Sarah Johnson", preview:"Hi, I'm very interested in the UI/UX position...", time:"2h ago", read:false, online:true, avatar:`${IMG}/candidates/01.jpg` },
  { sender:"Michael Chen", preview:"Thank you for reviewing my application...", time:"5h ago", read:true, online:false, avatar:`${IMG}/candidates/02.jpg` },
];

const recentActivities = [
  { icon:"fa-solid fa-user-plus", iconClass:"purple", description:"New application received for Senior UI/UX Designer", time:"2 hours ago" },
  { icon:"fa-solid fa-eye", iconClass:"blue", description:"Your job post 'Full Stack Developer' got 50 new views", time:"5 hours ago" },
  { icon:"fa-solid fa-star", iconClass:"yellow", description:"Candidate Sarah Johnson shortlisted", time:"1 day ago" },
];

const statusColors = { active:"#dcfce7|#166534", paused:"#f3f4f6|#6b7280", new:"#dbeafe|#1e40af", reviewed:"#fef3c7|#92400e", shortlisted:"#dcfce7|#166534" };
function SBadge({ status }) {
  const [bg,color] = (statusColors[status.toLowerCase()]||"#f3f4f6|#6b7280").split("|");
  return <span style={{ padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:bg,color }}>{status}</span>;
}

export default function EmployerDashboardPage() {
  const router = useRouter();
  return (
    <section style={{ background:"#f7f9fc",minHeight:"100vh",padding:"40px 0 60px" }}>
      <div style={{ maxWidth:1320,margin:"0 auto",padding:"0 24px",display:"flex",gap:24,alignItems:"flex-start" }}>
        <EmployerSidebar currentPath="/employer/dashboard"/>
        <div style={{ flex:1,minWidth:0 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:16 }}>
            <div>
              <h1 style={{ fontSize:28,fontWeight:700,color:"#1f2937",marginBottom:4 }}>Welcome back, Gopikiran!</h1>
              <p style={{ color:"#6b7280",fontSize:15,margin:0 }}>Here's what's happening with your job postings today.</p>
            </div>
            <button onClick={()=>router.push("/employer/post-job")} style={{ padding:"12px 24px",background:"#2563eb",color:"#fff",border:"none",borderRadius:10,fontWeight:600,cursor:"pointer",fontSize:14 }}>
              <i className="fa-solid fa-plus" style={{ marginRight:6 }}/>Post New Job
            </button>
          </div>

          {/* Stats */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24 }}>
            {[
              { icon:"fa-briefcase",label:"Active Jobs",value:stats.openJobs,color:"#9333ea",bg:"#f3e8ff",trend:"+12%" },
              { icon:"fa-users",label:"Total Applicants",value:stats.totalApplicants,color:"#ea580c",bg:"#ffedd5",trend:"+8%" },
              { icon:"fa-eye",label:"Profile Views",value:stats.profileViews,color:"#2563eb",bg:"#dbeafe",trend:"+24%" },
              { icon:"fa-user-check",label:"Followers",value:stats.followers,color:"#0d9488",bg:"#ccfbf1",trend:"+15%" },
            ].map((s, i) => (
              <div key={i} style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24,display:"flex",flexDirection:"column",gap:10,borderLeft:`4px solid ${s.color}` }}>
                <div style={{ width:48,height:48,borderRadius:12,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:s.color }}>
                  <i className={`fa-solid ${s.icon}`}/>
                </div>
                <div>
                  <span style={{ fontSize:13,color:"#6b7280",display:"block",marginBottom:4 }}>{s.label}</span>
                  <strong style={{ fontSize:28,fontWeight:700,color:s.color }}>{s.value}</strong>
                </div>
                <span style={{ fontSize:12,color:"#16a34a",fontWeight:600 }}>↑ {s.trend} this month</span>
              </div>
            ))}
          </div>

          {/* Middle */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 320px",gap:24,marginBottom:24 }}>
            <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
                <h3 style={{ fontSize:18,fontWeight:700,color:"#1f2937",margin:0 }}>Recent Applications</h3>
                <a href="#" style={{ fontSize:14,color:"#2563eb",textDecoration:"none" }}>View All</a>
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                {recentApplications.map((app, i) => (
                  <div key={i} style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:i<recentApplications.length-1?"1px solid #f3f4f6":"none" }}>
                    <img src={app.avatar} alt={app.name} style={{ width:44,height:44,borderRadius:"50%",objectFit:"cover",flexShrink:0 }}/>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15,fontWeight:600,color:"#1f2937" }}>{app.name}</div>
                      <div style={{ fontSize:13,color:"#6b7280" }}>{app.position}</div>
                      <div style={{ fontSize:12,color:"#9ca3af" }}>{app.appliedDate}</div>
                    </div>
                    <SBadge status={app.status}/>
                    <div style={{ display:"flex",gap:6 }}>
                      {["fa-user","fa-download"].map((icon,j)=>(
                        <button key={j} style={{ width:32,height:32,border:"1px solid #e5e7eb",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:13,color:"#6b7280",display:"flex",alignItems:"center",justifyContent:"center" }}>
                          <i className={`fa-solid ${icon}`}/>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
                <h3 style={{ fontSize:18,fontWeight:700,color:"#1f2937",margin:0 }}>Your Package</h3>
                <span style={{ fontSize:11,fontWeight:700,color:"#d97706",background:"#fef3c7",padding:"3px 10px",borderRadius:20 }}>Premium</span>
              </div>
              <div style={{ background:"linear-gradient(135deg,#667eea,#764ba2)",borderRadius:12,padding:20,color:"#fff",marginBottom:20 }}>
                <div style={{ fontSize:24,marginBottom:8 }}>👑</div>
                <h4 style={{ fontSize:18,fontWeight:700,margin:"0 0 4px" }}>Premium Pack</h4>
                <p style={{ fontSize:14,opacity:0.9,margin:0 }}>$199 / month</p>
              </div>
              {[["Job Posts Used",75,"#667eea"],["CV Downloads",40,"#2563eb"]].map(([label,pct,color],i)=>(
                <div key={i} style={{ marginBottom:16 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",fontSize:13,color:"#6b7280",marginBottom:6 }}>
                    <span>{label}</span><span style={{ fontWeight:600,color:"#1f2937" }}>{pct}%</span>
                  </div>
                  <div style={{ height:8,background:"#f3f4f6",borderRadius:8,overflow:"hidden" }}>
                    <div style={{ height:"100%",width:`${pct}%`,background:color,borderRadius:8 }}/>
                  </div>
                </div>
              ))}
              <div style={{ fontSize:13,color:"#6b7280",marginBottom:16 }}>⏰ Expires on Dec 31, 2025</div>
              <button style={{ width:"100%",padding:"12px",background:"#2563eb",color:"#fff",border:"none",borderRadius:10,fontWeight:600,cursor:"pointer" }}>Upgrade Package</button>
            </div>
          </div>

          {/* Active Jobs Table */}
          <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24,marginBottom:24 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
              <h3 style={{ fontSize:18,fontWeight:700,color:"#1f2937",margin:0 }}>Your Active Jobs</h3>
              <a onClick={()=>router.push("/employer/manage-jobs")} style={{ fontSize:14,color:"#2563eb",cursor:"pointer",textDecoration:"none" }}>Manage Jobs</a>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%",borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:"#f9fafb" }}>
                    {["Job Title","Applications","Views","Status","Posted","Expires","Actions"].map(th=>(
                      <th key={th} style={{ textAlign:"left",padding:"12px 16px",fontSize:11,fontWeight:600,color:"#6b7280",textTransform:"uppercase",letterSpacing:0.5,borderBottom:"1px solid #e5e7eb" }}>{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeJobs.map((job, i) => (
                    <tr key={i} style={{ borderBottom:"1px solid #f3f4f6" }}>
                      <td style={{ padding:"16px" }}>
                        <div style={{ fontSize:14,fontWeight:600,color:"#1f2937" }}>{job.title}</div>
                        <div style={{ fontSize:12,color:"#6b7280" }}>{job.type}</div>
                      </td>
                      <td style={{ padding:"16px",fontSize:14,color:"#374151" }}>{job.applications}</td>
                      <td style={{ padding:"16px",fontSize:14,color:"#374151" }}>{job.views}</td>
                      <td style={{ padding:"16px" }}><SBadge status={job.status}/></td>
                      <td style={{ padding:"16px",fontSize:13,color:"#6b7280" }}>{job.postedDate}</td>
                      <td style={{ padding:"16px",fontSize:13,color:"#6b7280" }}>{job.expiresDate}</td>
                      <td style={{ padding:"16px" }}>
                        <div style={{ display:"flex",gap:6 }}>
                          {[["fa-pen","edit"],["fa-eye","view"],["fa-trash","delete"]].map(([icon,action])=>(
                            <button key={action} style={{ width:32,height:32,border:"1px solid #e5e7eb",borderRadius:8,background:action==="delete"?"#fff":"#fff",color:action==="delete"?"#dc2626":"#6b7280",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13 }}>
                              <i className={`fa-solid ${icon}`}/>
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom section */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:24 }}>
            <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
                <h3 style={{ fontSize:16,fontWeight:700,color:"#1f2937",margin:0 }}>Recent Messages</h3>
                <a href="#" style={{ fontSize:13,color:"#2563eb",textDecoration:"none" }}>View All</a>
              </div>
              {recentMessages.map((msg, i) => (
                <div key={i} style={{ display:"flex",gap:12,marginBottom:14,padding:"12px",background:!msg.read?"#eff6ff":"transparent",borderRadius:10 }}>
                  <div style={{ position:"relative" }}>
                    <img src={msg.avatar} alt={msg.sender} style={{ width:38,height:38,borderRadius:"50%",objectFit:"cover" }}/>
                    {msg.online && <span style={{ position:"absolute",bottom:0,right:0,width:10,height:10,background:"#22c55e",borderRadius:"50%",border:"2px solid #fff" }}/>}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",marginBottom:2 }}>
                      <span style={{ fontSize:13,fontWeight:600,color:"#1f2937" }}>{msg.sender}</span>
                      <span style={{ fontSize:11,color:"#9ca3af" }}>{msg.time}</span>
                    </div>
                    <p style={{ fontSize:12,color:"#6b7280",margin:0,lineHeight:1.4 }}>{msg.preview}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24 }}>
              <h3 style={{ fontSize:16,fontWeight:700,color:"#1f2937",marginBottom:16 }}>Quick Actions</h3>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10 }}>
                {[["fa-plus-circle","Post a Job","/post-job"],["fa-gear","Manage Jobs","/employer/manage-jobs"],["fa-layer-group","CV Packages","#"],["fa-building","Company Profile","/employer/company-profile"],["fa-credit-card","Payments","#"],["fa-sliders","Settings","/employer/company-settings"]].map(([icon,label,path],i)=>(
                  <a key={i} onClick={()=>path!=="#"&&router.push(path)} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:8,padding:"14px 10px",border:"1px solid #e5e7eb",borderRadius:10,cursor:"pointer",textDecoration:"none",transition:"all 0.2s",background:"#f9fafb" }}
                    onMouseEnter={e=>{e.currentTarget.style.background="#eff6ff";e.currentTarget.style.borderColor="#2563eb";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="#f9fafb";e.currentTarget.style.borderColor="#e5e7eb";}}>
                    <i className={`fa-solid ${icon}`} style={{ fontSize:20,color:"#2563eb" }}/>
                    <span style={{ fontSize:12,fontWeight:500,color:"#374151",textAlign:"center" }}>{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24 }}>
              <h3 style={{ fontSize:16,fontWeight:700,color:"#1f2937",marginBottom:16 }}>Recent Activity</h3>
              {recentActivities.map((act, i) => (
                <div key={i} style={{ display:"flex",gap:12,marginBottom:16 }}>
                  <div style={{ width:36,height:36,borderRadius:"50%",background:"#eff6ff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"#2563eb" }}>
                    <i className={act.icon} style={{ fontSize:14 }}/>
                  </div>
                  <div>
                    <p style={{ fontSize:13,color:"#374151",margin:"0 0 3px",lineHeight:1.4 }}>{act.description}</p>
                    <span style={{ fontSize:11,color:"#9ca3af" }}>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
