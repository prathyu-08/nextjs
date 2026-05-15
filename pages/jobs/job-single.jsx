import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import api from "../../lib/api";


export default function JobDetailsPage() {const router = useRouter();
  const routeKey = router.query.key || 0;
  const [job, setJob] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        let jobId = sessionStorage.getItem("selectedJobId");
        let data;
        let allJobs = [];

        const loadFirstAvailableJob = async () => {
          allJobs = await api.jobApi.getJobs();
          if (!allJobs.length) {
            throw new Error("No jobs are available right now.");
          }
          data = allJobs[0];
          jobId = data.id;
          sessionStorage.setItem("selectedJobId", jobId);
          window.history.replaceState(null, "", `/job-single/${jobId}`);
        };

        if (jobId) {
          try {
            data = await api.jobApi.getJobById(jobId);
          } catch (jobError) {
            sessionStorage.removeItem("selectedJobId");
            await loadFirstAvailableJob();
          }
        } else {
          await loadFirstAvailableJob();
        }

        const transformedJob = {
          id: data.id,
          type: data.type || data.employment_type || "Full Time",
          title: data.title,
          company: data.company_name || data.company?.name || "",
          location: data.location,
          salary: data.salary || "",
          summary: data.description || data.summary || "",
          logo: data.logo || "",
          featured: data.featured || false,
          postedDate: data.created_at ? new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : "May 19, 2025"
        };

        setJob(transformedJob);

        const relatedData = allJobs.length ? allJobs : await api.jobApi.getJobs();
        const transformedRelated = relatedData
          .filter(relatedJob => relatedJob.id !== data.id)
          .slice(0, 3)
          .map(relatedJob => ({
            id: relatedJob.id,
            type: relatedJob.type || relatedJob.employment_type || "Full Time",
            title: relatedJob.title,
            salary: relatedJob.salary || "",
            location: relatedJob.location,
            logo: relatedJob.logo || "",
            posted: relatedJob.created_at ? new Date(relatedJob.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : "May 11, 2025",
            featured: relatedJob.featured || false
          }));
        setRelated(transformedRelated);
      } catch (err) {
        console.error("Error fetching job details:", err);
        const errorMessage = err.response?.data?.detail || err.message || "Failed to load job details";
        setError(errorMessage);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [routeKey]);

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading job details...</div>;
  if (error) return <div style={{ padding: 40, color: "#dc2626", textAlign: "center" }}>
    <h3>Failed to load job details</h3>
    <p style={{ fontSize: 14, color: "#6b7280", marginTop: 8 }}>{error}</p>
    <button onClick={() => router.push("/jobs-list")} style={{ marginTop: 16, padding: "10px 20px", border: "1px solid #e5e7eb", background: "#fff", borderRadius: 8, cursor: "pointer" }}>
      ← Back to Jobs
    </button>
  </div>;

  const p = { fontSize:14,color:"#4b5563",lineHeight:1.7,marginBottom:12 };

  return (
    <>
      {/* Hero */}
      <section style={{ background:"linear-gradient(120deg,#dbeafe,#e0e7ff)",padding:"48px 0 40px" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:24 }}>
            <div style={{ display:"flex",gap:20,alignItems:"flex-start" }}>
               <div style={{ width:72,height:72,borderRadius:16,overflow:"hidden",boxShadow:"0 4px 12px rgba(0,0,0,.1)",flexShrink:0 }}>
                {job?.logo ? (
                  <img 
                    src={job.logo} 
                    alt={job.company || "Company"} 
                    style={{ width:"100%",height:"100%",objectFit:"cover" }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/72?text=Logo';
                      console.log("Job detail image failed to load:", job.logo);
                    }}
                  />
                ) : (
                  <div style={{ width:"100%",height:"100%",background:"#f3f4f6",display:"flex",alignItems:"center",justifyContent:"center",color:"#9ca3af",fontSize:24 }}>?</div>
                )}
              </div>
              <div>
                <span style={{ fontSize:13,color:"#2563eb",fontWeight:600,display:"block",marginBottom:4 }}>{job?.type || "Product & Engineering"}</span>
                <h1 style={{ fontSize:"clamp(1.4rem,3vw,2rem)",fontWeight:800,color:"#1f2937",margin:"0 0 12px" }}>{job?.title || "IT Delivery Manager — Epicor ERP"}</h1>
                <div style={{ display:"flex",flexWrap:"wrap",gap:16 }}>
                  {[["fa-location-dot",job?.location || "Dubai, UAE"],["fa-briefcase",job?.type || "Full Time · Hybrid"],["fa-money-bill-wave",job?.salary || "$500 - $3000 / month"]].map(([icon,text],i)=>(
                    <span key={i} style={{ display:"flex",alignItems:"center",gap:6,fontSize:14,color:"#374151",background:"rgba(255,255,255,0.7)",padding:"6px 12px",borderRadius:20 }}>
                      <i className={`fa-solid ${icon}`} style={{ color:"#2563eb" }}/>{text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display:"flex",gap:10,alignItems:"center" }}>
              <button style={{ padding:"12px 24px",background:"#2563eb",color:"#fff",border:"none",borderRadius:10,fontWeight:600,cursor:"pointer",fontSize:14 }}><i className="fa-solid fa-paper-plane" style={{ marginRight:6 }}/>Apply Now</button>
              <button style={{ padding:"12px 20px",border:"1px solid #2563eb",color:"#2563eb",background:"transparent",borderRadius:10,cursor:"pointer",fontSize:14 }}>☆ Save Job</button>
            </div>
          </div>
          <div style={{ display:"flex",flexWrap:"wrap",gap:20,marginTop:28 }}>
            {[["fa-calendar","Posted On",job?.postedDate || "May 19, 2025"],["fa-user-tie","Seniority","Lead / Manager"],["fa-building","Company",job?.company || "Forum International"],["fa-clock","Working Time","Mon - Fri · 9am-5pm"]].map(([icon,label,value],i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:12,background:"rgba(255,255,255,0.7)",padding:"12px 20px",borderRadius:12 }}>
                <i className={`fa-solid ${icon}`} style={{ color:"#2563eb",fontSize:18 }}/>
                <div><div style={{ fontSize:12,color:"#64748b" }}>{label}</div><div style={{ fontSize:14,fontWeight:600,color:"#1f2937" }}>{value}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding:"48px 0" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 360px",gap:40 }}>
            <div>
              {[
                { h:"Role Overview", tag:"h2", content:[<><p style={p}>{job?.summary || "We are looking for a strategic delivery manager who can lead cross-functional teams to ship Epicor ERP initiatives on schedule. You will coordinate the full lifecycle from discovery to go-live and ensure stakeholders are aligned every step of the way."}</p><p style={p}>Working closely with engineering, product, and operations, you will design scalable processes, build dashboards that surface health metrics, and remove blockers so teams can focus on creating value for thousands of global users.</p></>] },
                { h:"What You'll Do", tag:"h3", content:[<ul key="0" style={{ paddingLeft:20,margin:0 }}>{["Own the roadmap for Epicor ERP releases, aligning plans with business OKRs and financial goals.","Mentor scrum leads and coordinate delivery ceremonies, sprint planning, and retrospectives.","Partner with security and infrastructure teams to maintain compliance and high availability SLAs.","Present delivery status, risk assessments, and mitigation plans to executive stakeholders.","Continuously refine workflows by analyzing cycle times, throughput, and quality signals."].map((li,i)=><li key={i} style={{ fontSize:14,color:"#4b5563",lineHeight:1.7,marginBottom:8 }}>{li}</li>)}</ul>] },
                { h:"Skills & Experience", tag:"h3", content:[<ul key="0" style={{ paddingLeft:20,margin:0 }}>{["5+ years leading enterprise software implementations or technical program management.","Hands-on experience with Epicor ERP (or similar platforms) across manufacturing workflows.","Working knowledge of Agile practices, modern DevOps tooling, and cloud infrastructure.","Comfort presenting to senior leadership and aligning teams across time zones.","Strong communication, stakeholder management, and change enablement skills."].map((li,i)=><li key={i} style={{ fontSize:14,color:"#4b5563",lineHeight:1.7,marginBottom:8 }}>{li}</li>)}</ul>] },
                { h:"Benefits & Perks", tag:"h3", content:[<div key="0" style={{ display:"flex",flexWrap:"wrap",gap:10 }}>{["Annual bonus","Hybrid work flexibility","Private medical cover","Learning stipend","Wellness allowance","Visa sponsorship"].map((t,i)=><span key={i} style={{ padding:"8px 16px",background:"#eff6ff",color:"#2563eb",borderRadius:20,fontSize:13,fontWeight:500 }}>{t}</span>)}</div>] },
              ].map((sec,i)=>(
                <div key={i} style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:28,marginBottom:20 }}>
                  {sec.tag==="h2" ? <h2 style={{ fontSize:22,fontWeight:700,color:"#1f2937",marginBottom:16 }}>{sec.h}</h2> : <h3 style={{ fontSize:18,fontWeight:600,color:"#1f2937",marginBottom:16 }}>{sec.h}</h3>}
                  {sec.content}
                </div>
              ))}
              <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:28,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20 }}>
                <div><h3 style={{ fontSize:18,fontWeight:600,color:"#1f2937",marginBottom:6 }}>How to Apply</h3><p style={{ ...p,margin:0 }}>{job?.summary || "Attach your updated resume, share 2-3 project highlights, and tell us how you improved delivery velocity."}</p></div>
                <button style={{ padding:"12px 24px",background:"#2563eb",color:"#fff",border:"none",borderRadius:10,fontWeight:600,cursor:"pointer" }}><i className="fa-solid fa-cloud-upload" style={{ marginRight:6 }}/>Submit Application</button>
              </div>
            </div>

            <aside>
              <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24,marginBottom:20 }}>
                <h3 style={{ fontSize:17,fontWeight:600,color:"#1f2937",marginBottom:16 }}>Job Snapshot</h3>
                <ul style={{ listStyle:"none",padding:0,margin:0 }}>
                  {[["fa-hashtag","Job ID",job?.id || "JB132456"],["fa-map-pin","Location",job?.location || "Dubai, UAE"],["fa-people-group","Team Size","25+ collaborators"],["fa-sack-dollar","Compensation",job?.salary || "$500 - $3000"],["fa-briefcase","Employment",job?.type || "Full-time · Hybrid"],["fa-graduation-cap","Education","Master's preferred"]].map(([icon,label,val],i)=>(
                    <li key={i} style={{ display:"flex",gap:12,alignItems:"center",marginBottom:14 }}>
                      <i className={`fa-solid ${icon}`} style={{ width:24,color:"#2563eb",fontSize:14 }}/>
                      <span style={{ fontSize:13,color:"#6b7280",flex:1 }}>{label}</span>
                      <strong style={{ fontSize:13,color:"#1f2937" }}>{val}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24,marginBottom:20 }}>
                <h3 style={{ fontSize:17,fontWeight:600,color:"#1f2937",marginBottom:16 }}>Talk to Forum International</h3>
                <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                  <div><label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6 }}>Full name</label><input type="text" placeholder="Alex Morgan" style={{ width:"100%",padding:"10px 14px",border:"1px solid #e5e7eb",borderRadius:10,fontSize:13,boxSizing:"border-box",outline:"none" }}/></div>
                  <div><label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6 }}>Email address</label><input type="email" placeholder="you@email.com" style={{ width:"100%",padding:"10px 14px",border:"1px solid #e5e7eb",borderRadius:10,fontSize:13,boxSizing:"border-box",outline:"none" }}/></div>
                  <div><label style={{ display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6 }}>Message</label><textarea rows={4} placeholder="Share a short note…" style={{ width:"100%",padding:"10px 14px",border:"1px solid #e5e7eb",borderRadius:10,fontSize:13,boxSizing:"border-box",outline:"none",resize:"vertical" }}/></div>
                  <button style={{ width:"100%",padding:"12px",border:"1px solid #17d27c",color:"#17d27c",background:"transparent",borderRadius:10,fontWeight:600,cursor:"pointer",fontSize:14 }}>Send Message</button>
                </div>
              </div>
              <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24 }}>
                <h3 style={{ fontSize:17,fontWeight:600,color:"#1f2937",marginBottom:14 }}>Office Location</h3>
                <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d13276.272465119835!2d72.97962462269287!3d33.70718629417979!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1480401216309" style={{ width:"100%",height:200,border:"none",borderRadius:10 }} allowFullScreen/>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related */}
      <section style={{ padding:"60px 0",background:"#f9fafb" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ textAlign:"center",marginBottom:32 }}>
            <div style={{ fontSize:16,fontWeight:600,color:"#17d27c",marginBottom:4 }}>Explore More Roles</div>
            <h3 style={{ fontSize:32,fontWeight:600,color:"#000",fontFamily:"Montserrat,sans-serif",margin:0 }}>Related Opportunities</h3>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }}>
            {related.map((job, i) => (
              <div key={i} style={{ background:job.featured?"#f0f7ff":"#fff",borderRadius:16,padding:20,border:`1px solid ${job.featured?"#2563eb":"#e5e7eb"}` }}>
                <div style={{ marginBottom:12 }}>
                  <span style={{ display:"inline-block",padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:job.danger?"#fee2e2":"#dcfce7",color:job.danger?"#dc2626":"#166534",marginBottom:12 }}>{job.type}</span>
                </div>
                <h4 style={{ fontSize:16,fontWeight:700,color:"#1f2937",marginBottom:6 }}><a href="#" style={{ color:"inherit",textDecoration:"none" }}>{job.title}</a></h4>
                <div style={{ fontSize:13,color:"#64748b",marginBottom:6 }}>Salary: <strong style={{ color:"#1f2937" }}>{job.salary}</strong></div>
                <div style={{ fontSize:13,color:"#64748b",marginBottom:16 }}><i className="fa-solid fa-location-dot" style={{ marginRight:4 }}/>{job.location}</div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:14,borderTop:"1px solid #e5e7eb" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <img src={job.logo} alt="" style={{ width:32,height:32,borderRadius:6,objectFit:"cover" }}/>
                    <span style={{ fontSize:12,color:"#9ca3af" }}>Posted {job.posted}</span>
                  </div>
                  <button onClick={()=>router.push(`/job-single/${job.id}`)} style={{ padding:"6px 14px",border:"none",background:"#2563eb",color:"#fff",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:600 }}>View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export async function getServerSideProps() {
  return { props: {} };
}
