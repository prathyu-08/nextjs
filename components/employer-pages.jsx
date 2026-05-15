import { useRouter } from 'next/router';
import EmployerSidebar from "../components/shared/EmployerSidebar";

export function ManageJobsPage() {
  const jobs = [
    { title:"Senior UI/UX Designer",type:"Full Time",apps:24,newApps:3,views:345,status:"active",posted:"Mar 07, 2025",expires:"Apr 07, 2025" },
    { title:"Full Stack Developer",type:"Contract",apps:18,newApps:0,views:289,status:"active",posted:"Mar 10, 2025",expires:"Apr 10, 2025" },
    { title:"Product Manager",type:"Full Time",apps:31,newApps:5,views:412,status:"paused",posted:"Feb 28, 2025",expires:"Mar 28, 2025" },
    { title:"Data Analyst",type:"Full Time",apps:15,newApps:2,views:198,status:"expired",posted:"Jan 15, 2025",expires:"Feb 15, 2025" },
  ];
  const statColors = { active:"#dcfce7|#166534", paused:"#fef3c7|#92400e", expired:"#fee2e2|#dc2626" };
  return (
    <section style={{ background:"#f7f9fc",minHeight:"100vh",padding:"40px 0 60px" }}>
      <div style={{ maxWidth:1320,margin:"0 auto",padding:"0 24px",display:"flex",gap:24,alignItems:"flex-start" }}>
        <EmployerSidebar currentPath="/employer/manage-jobs"/>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:16 }}>
            <div><h1 style={{ fontSize:28,fontWeight:700,color:"#1f2937",margin:"0 0 4px" }}>Manage Jobs</h1><p style={{ color:"#6b7280",margin:0 }}>View and manage all your job postings</p></div>
            <button onClick={()=>router.push("/employer/post-job")} style={{ padding:"12px 24px",background:"#2563eb",color:"#fff",border:"none",borderRadius:10,fontWeight:600,cursor:"pointer" }}>+ Post New Job</button>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24 }}>
            {[["Total Jobs","4","fa-briefcase","#e0e7ff","#4f46e5"],["Active","2","fa-check-circle","#dcfce7","#16a34a"],["Applications","88","fa-users","#dbeafe","#2563eb"],["Expired","1","fa-clock","#fef3c7","#d97706"]].map(([label,val,icon,bg,color],i)=>(
              <div key={i} style={{ background:"#fff",borderRadius:12,border:"1px solid #e5e7eb",padding:20,display:"flex",gap:16,alignItems:"center" }}>
                <div style={{ width:48,height:48,borderRadius:10,background:bg,display:"flex",alignItems:"center",justifyContent:"center",color,fontSize:20 }}>
                  <i className={`fa-solid ${icon}`}/>
                </div>
                <div>
                  <div style={{ fontSize:24,fontWeight:700,color:"#1f2937" }}>{val}</div>
                  <div style={{ fontSize:13,color:"#6b7280" }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",overflow:"hidden" }}>
            <table style={{ width:"100%",borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"#f9fafb" }}>
                  {["Job Info","Applications","Views","Status","Dates","Actions"].map(th=>(
                    <th key={th} style={{ textAlign:"left",padding:"14px 16px",fontSize:11,fontWeight:700,color:"#6b7280",textTransform:"uppercase",borderBottom:"1px solid #e5e7eb" }}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.map((job,i)=>{
                  const [bg,color]=(statColors[job.status]||"#f3f4f6|#6b7280").split("|");
                  return (
                    <tr key={i} style={{ borderBottom:"1px solid #f3f4f6" }}
                      onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <td style={{ padding:16 }}>
                        <div style={{ fontSize:14,fontWeight:600,color:"#1f2937" }}>{job.title}</div>
                        <div style={{ fontSize:12,color:"#6b7280" }}>{job.type}</div>
                      </td>
                      <td style={{ padding:16 }}>
                        <span style={{ fontSize:16,fontWeight:700,color:"#1f2937" }}>{job.apps}</span>
                        {job.newApps>0&&<span style={{ marginLeft:8,padding:"2px 8px",background:"#dbeafe",color:"#2563eb",borderRadius:10,fontSize:11,fontWeight:500 }}>+{job.newApps} new</span>}
                      </td>
                      <td style={{ padding:16,fontSize:14,color:"#374151" }}>{job.views}</td>
                      <td style={{ padding:16 }}>
                        <span style={{ padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:600,background:bg,color,textTransform:"capitalize" }}>{job.status}</span>
                      </td>
                      <td style={{ padding:16 }}>
                        <div style={{ fontSize:12,color:"#6b7280" }}>Posted: {job.posted}</div>
                        <div style={{ fontSize:12,color:"#9ca3af" }}>Expires: {job.expires}</div>
                      </td>
                      <td style={{ padding:16 }}>
                        <div style={{ display:"flex",gap:6 }}>
                          {[["fa-pen","#6b7280"],["fa-eye","#2563eb"],["fa-trash","#dc2626"]].map(([icon,color],j)=>(
                            <button key={j} style={{ width:32,height:32,border:"1px solid #e5e7eb",borderRadius:8,background:"#fff",cursor:"pointer",color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12 }}>
                              <i className={`fa-solid ${icon}`}/>
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CompanyProfilePage() {
  return (
    <section style={{ background:"#f7f9fc",minHeight:"100vh",padding:"40px 0 60px" }}>
      <div style={{ maxWidth:1320,margin:"0 auto",padding:"0 24px",display:"flex",gap:24,alignItems:"flex-start" }}>
        <EmployerSidebar currentPath="/employer/company-profile"/>
        <div style={{ flex:1 }}>
          <h1 style={{ fontSize:28,fontWeight:700,color:"#1f2937",marginBottom:4 }}>Company Profile</h1>
          <p style={{ color:"#6b7280",marginBottom:24 }}>Update your company information visible to candidates</p>
          <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:28,marginBottom:24 }}>
            <h3 style={{ fontSize:18,fontWeight:600,color:"#1f2937",marginBottom:20 }}>Company Logo</h3>
            <div style={{ display:"flex",alignItems:"center",gap:20 }}>
              <div style={{ width:120,height:120,borderRadius:12,background:"#eff6ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40 }}>🏢</div>
              <div>
                <button style={{ padding:"10px 20px",border:"1px solid #2563eb",color:"#2563eb",background:"transparent",borderRadius:8,cursor:"pointer",marginRight:12 }}>Upload Logo</button>
                <button style={{ padding:"10px 20px",border:"1px solid #e5e7eb",color:"#374151",background:"transparent",borderRadius:8,cursor:"pointer" }}>Remove</button>
                <p style={{ fontSize:13,color:"#9ca3af",marginTop:8 }}>PNG, JPG, GIF up to 10MB. Min 200x200px recommended.</p>
              </div>
            </div>
          </div>
          {[
            { title:"Basic Info", fields:[["Company Name","NMK Global Inc.",1],["Industry","Information Technology",1],["Company Type","Private",1],["Founded Year","2015",1],["Company Size","50-200 employees",1],["Website","https://nmkglobalinc.com",1],["Tagline","Empowering careers, connecting talent",2],["Description","",2,"textarea"]] },
            { title:"Contact & Location", fields:[["Email","info@nmkglobalinc.com",1],["Phone","+1 555 123 4567",1],["Address","123 Business Ave",1],["City","New York",1],["Country","United States",1],["Zip Code","10001",1]] },
          ].map((sec,si)=>(
            <div key={si} style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:28,marginBottom:24 }}>
              <h3 style={{ fontSize:18,fontWeight:600,color:"#1f2937",marginBottom:20 }}>{sec.title}</h3>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20 }}>
                {sec.fields.map(([label,placeholder,span,type],fi)=>(
                  <div key={fi} style={{ gridColumn:`span ${span}` }}>
                    <label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6 }}>{label}</label>
                    {type==="textarea" ? <textarea placeholder={placeholder} rows={4} style={{ width:"100%",padding:"11px 14px",border:"1px solid #e5e7eb",borderRadius:10,fontSize:13,boxSizing:"border-box",outline:"none",resize:"vertical" }}/> :
                      <input defaultValue={placeholder} style={{ width:"100%",padding:"11px 14px",border:"1px solid #e5e7eb",borderRadius:10,fontSize:13,boxSizing:"border-box",outline:"none" }}/>}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display:"flex",justifyContent:"flex-end",gap:12 }}>
            <button style={{ padding:"12px 24px",border:"1px solid #e5e7eb",background:"#f9fafb",color:"#374151",borderRadius:10,fontWeight:600,cursor:"pointer" }}>Cancel</button>
            <button style={{ padding:"12px 24px",background:"#2563eb",color:"#fff",border:"none",borderRadius:10,fontWeight:600,cursor:"pointer" }}>Save Changes</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CompanySettingsPage() {
  return (
    <section style={{ background:"#f7f9fc",minHeight:"100vh",padding:"40px 0 60px" }}>
      <div style={{ maxWidth:1320,margin:"0 auto",padding:"0 24px",display:"flex",gap:24,alignItems:"flex-start" }}>
        <EmployerSidebar currentPath="/employer/company-settings"/>
        <div style={{ flex:1 }}>
          <h1 style={{ fontSize:28,fontWeight:700,color:"#1f2937",marginBottom:4 }}>Company Settings</h1>
          <p style={{ color:"#6b7280",marginBottom:24 }}>Manage account settings and preferences</p>
          {[
            { title:"Notification Preferences", options:[["New application received","Get notified when candidates apply to your jobs"],["Application status updates","Updates when candidates respond or withdraw"],["Profile views","Know when candidates view your company profile"],["Weekly digest","Get a weekly summary of your hiring activity"]] },
            { title:"Privacy Settings", options:[["Make company profile public","Allow all candidates to view your company profile"],["Show open positions","Display your job listings on the public company page"],["Allow candidate messages","Enable candidates to message you directly"]] },
          ].map((card,ci)=>(
            <div key={ci} style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:28,marginBottom:24 }}>
              <h3 style={{ fontSize:18,fontWeight:600,color:"#1f2937",marginBottom:20 }}>{card.title}</h3>
              <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                {card.options.map(([title,desc],i)=>(
                  <label key={i} style={{ display:"flex",alignItems:"center",gap:16,cursor:"pointer" }}>
                    <input type="checkbox" defaultChecked style={{ width:18,height:18,accentColor:"#2563eb" }}/>
                    <div>
                      <div style={{ fontSize:14,fontWeight:500,color:"#1f2937" }}>{title}</div>
                      <div style={{ fontSize:13,color:"#6b7280" }}>{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:28,marginBottom:24 }}>
            <h3 style={{ fontSize:18,fontWeight:600,color:"#1f2937",marginBottom:16 }}>Security</h3>
            <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
              <button style={{ padding:"10px 20px",border:"1px solid #e5e7eb",borderRadius:10,cursor:"pointer",fontSize:14 }}>Change Password</button>
              <button style={{ padding:"10px 20px",border:"1px solid #e5e7eb",borderRadius:10,cursor:"pointer",fontSize:14 }}>Enable 2FA</button>
              <button style={{ padding:"10px 20px",border:"1px solid #e5e7eb",borderRadius:10,cursor:"pointer",fontSize:14 }}>Active Sessions</button>
            </div>
          </div>
          <div style={{ background:"#fff",borderRadius:16,border:"2px solid #fecaca",padding:28 }}>
            <h3 style={{ fontSize:18,fontWeight:600,color:"#dc2626",marginBottom:8 }}>Danger Zone</h3>
            <p style={{ fontSize:14,color:"#6b7280",marginBottom:16 }}>Once you delete your account, there is no going back. Please be certain.</p>
            <div style={{ display:"flex",gap:12 }}>
              <button style={{ padding:"10px 20px",border:"1px solid #dc2626",color:"#dc2626",background:"transparent",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600 }}>Deactivate Account</button>
              <button style={{ padding:"10px 20px",background:"#dc2626",color:"#fff",border:"none",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600 }}>Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
