'use client';
import { useRouter } from 'next/navigation';

const IMG = "https://www.sharjeelanjum.com/html/jobs-portal/images";

const companies = [
  { name:"Multimedia Design", location:"United States of America", openJobs:5, logo:`${IMG}/employers/emplogo1.jpg` },
  { name:"Power Wave", location:"United States of America", openJobs:2, logo:`${IMG}/employers/emplogo2.jpg` },
  { name:"Travel Advisor", location:"United States of America", openJobs:0, logo:`${IMG}/employers/emplogo3.jpg` },
  { name:"New Design Studio", location:"United States of America", openJobs:1, logo:`${IMG}/employers/emplogo4.jpg` },
  { name:"Net Design", location:"United States of America", openJobs:1, logo:`${IMG}/employers/emplogo5.jpg` },
  { name:"Power Color", location:"United States of America", openJobs:2, logo:`${IMG}/employers/emplogo6.jpg` },
  { name:"Connect People", location:"United States of America", openJobs:2, logo:`${IMG}/employers/emplogo7.jpg` },
  { name:"Surf Wave", location:"United States of America", openJobs:1, logo:`${IMG}/employers/emplogo8.jpg` },
];

const categories = [
  { name:"Business Management", jobs:2, image:`${IMG}/categories/business-management.png` },
  { name:"Information Technology", jobs:1, image:`${IMG}/categories/it.png` },
  { name:"Software & Web Development", jobs:1, image:`${IMG}/categories/developer.png` },
  { name:"Electronics Technician", jobs:1, image:`${IMG}/categories/electrician.png` },
];

const industries = [
  { name:"Manufacturing (5)", icon:"fa-industry" },
  { name:"Fashion (2)", icon:"fa-female" },
  { name:"Electronics (2)", icon:"fa-plug" },
  { name:"Advertising/PR (2)", icon:"fa-bullhorn" },
  { name:"Information Technology (2)", icon:"fa-desktop" },
  { name:"Courier/Logistics (1)", icon:"fa-truck" },
  { name:"Automobile (1)", icon:"fa-car" },
  { name:"Education/Training (1)", icon:"fa-graduation-cap" },
  { name:"Banking/Financial Services (1)", icon:"fa-university" },
  { name:"Health & Fitness (1)", icon:"fa-heartbeat" },
];

const featuredJobs = [
  { type:"Full Time/Permanent", title:"Full Stack Designer", company:"Connect People", location:"Barrington", posted:"Mar 07, 2025", logo:`${IMG}/employers/emplogo7.jpg` },
  { type:"Part Time", title:"Marketing Specialist", company:"Power Wave", location:"New York", posted:"Mar 10, 2025", logo:`${IMG}/employers/emplogo2.jpg` },
  { type:"Freelance", title:"UI Engineer", company:"Design Studio", location:"Los Angeles", posted:"Mar 12, 2025", logo:`${IMG}/employers/emplogo4.jpg` },
  { type:"Contract", title:"Data Analyst", company:"Sphere Tech", location:"Chicago", posted:"Mar 15, 2025", logo:`${IMG}/employers/emplogo9.jpg` },
];

const latestJobs = [
  { type:"Full Time", title:"Technical Database Engineer", company:"Datebase Mgmt Co", location:"New York", posted:"Mar 07, 2025", logo:`${IMG}/employers/emplogo1.jpg` },
  { type:"Freelance", title:"Front-end Developer", company:"Creative Studio", location:"Boston", posted:"Mar 05, 2025", logo:`${IMG}/employers/emplogo11.jpg` },
  { type:"Part Time", title:"Product Designer", company:"Bright Agency", location:"Chicago", posted:"Mar 04, 2025", logo:`${IMG}/employers/emplogo12.jpg` },
  { type:"Freelance", title:"Mobile Developer", company:"Appify Labs", location:"Remote", posted:"Mar 02, 2025", logo:`${IMG}/employers/emplogo13.jpg` },
  { type:"Full Time", title:"Senior UX Researcher", company:"Insights Co.", location:"San Francisco", posted:"Feb 28, 2025", logo:`${IMG}/employers/emplogo14.jpg` },
  { type:"Full Time", title:"Systems Administrator", company:"Sphere Networks", location:"Austin", posted:"Feb 26, 2025", logo:`${IMG}/employers/emplogo15.jpg` },
];

const cities = [
  { name:"Atlanta", jobs:18, image:`${IMG}/cities/atlanta.jpg` },
  { name:"Barrington", jobs:9, image:`${IMG}/cities/barrington.jpg` },
  { name:"Durant", jobs:12, image:`${IMG}/cities/durant.jpg` },
  { name:"Bessemer", jobs:6, image:`${IMG}/cities/bessemer.jpg` },
];

const testimonials = [
  { name:"Samantha Lee", role:"Product Designer, Bright Labs", text:"JobsPortal helped me land my dream role within weeks. The process was seamless.", avatar:`${IMG}/testimonials/user1.jpg` },
  { name:"Michael Robinson", role:"HR Manager, SphereTech", text:"We found top talent faster than ever before. The platform makes managing applicants incredibly simple.", avatar:`${IMG}/testimonials/user2.jpg` },
  { name:"Priya Patel", role:"Software Engineer, Connect People", text:"I appreciate the curated job recommendations and the ability to connect directly with companies.", avatar:`${IMG}/testimonials/user3.jpg` },
  { name:"Liam Carter", role:"Founder, Appify Labs", text:"We scaled our hiring pipeline dramatically thanks to JobsPortal's reach and user-friendly tools.", avatar:`${IMG}/testimonials/user4.jpg` },
];

const blogs = [
  { title:"How to design a candidate experience that actually converts", category:"Hiring", date:"17 Sep", author:"Samira Hodge", excerpt:"From first touch to offer, here's the messaging stack we use to keep talent engaged.", image:`${IMG}/blog/1.jpg` },
  { title:"7 rituals our leadership team uses to stay aligned remotely", category:"Leadership", date:"15 Sep", author:"Devon Marks", excerpt:"Weekly dashboards, async standups, and lightweight rituals that keep strategic bets on track.", image:`${IMG}/blog/2.jpg` },
  { title:"Inside the onboarding sprint that ramps new hires in 10 days", category:"Culture", date:"12 Sep", author:"Lily Ortega", excerpt:"A look at how we bundle product education, values training, and buddy systems into a journey.", image:`${IMG}/blog/3.jpg` },
];

const badgeColors = { "Full Time":"#dcfce7|#166534", "Freelance":"#fef3c7|#92400e", "Part Time":"#dbeafe|#1e40af", "Contract":"#e0e7ff|#3730a3", "Internship":"#fce7f3|#9d174d", "Remote":"#ede9fe|#5b21b6", "Full Time/Permanent":"#dcfce7|#166534" };

function JobBadge({ type }) {
  const [bg, color] = (badgeColors[type]||"#f3f4f6|#374151").split("|");
  return <span style={{ display:"inline-block",padding:"3px 10px",borderRadius:4,fontSize:11,fontWeight:600,background:bg,color }}>{type}</span>;
}

export default function HomePage() {
  const router = useRouter();
  return (
    <main>
      {/* Hero */}
      <section style={{ padding:"120px 0 80px",background:"radial-gradient(circle at 10% 20%,rgba(59,130,246,.12),rgba(59,130,246,0) 45%),linear-gradient(135deg,#f0f9ff,#f0fff4 45%,#fff)" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center" }}>
            <div>
              <span style={{ display:"inline-block",padding:"6px 18px",fontSize:11,fontWeight:600,letterSpacing:"0.08em",color:"#047857",background:"rgba(34,197,94,.12)",borderRadius:999,textTransform:"uppercase",marginBottom:20 }}>Ready to Find Your Dream Job?</span>
              <h1 style={{ fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#0f172a",lineHeight:1.1,marginBottom:16,fontFamily:"Montserrat,sans-serif" }}>Take the next step in your career journey.</h1>
              <p style={{ fontSize:16,color:"#475569",marginBottom:32,maxWidth:500 }}>Explore opportunities that match your skills and passions, and land the job you've always wanted with JobsPortal.</p>
              <div style={{ background:"#fff",borderRadius:18,padding:14,boxShadow:"0 24px 55px rgba(15,23,42,.12)",marginBottom:28 }}>
                <div style={{ display:"flex",gap:12 }}>
                  <label style={{ flex:1,display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:"#f8fafc",borderRadius:12,border:"1px solid transparent" }}>
                    <i className="fa fa-search" style={{ color:"#64748b" }}/>
                    <input type="text" placeholder="Enter skills or job title" style={{ border:"none",background:"transparent",outline:"none",fontSize:14,color:"#1f2937",width:"100%" }}/>
                  </label>
                  <label style={{ flex:1,display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:"#f8fafc",borderRadius:12,border:"1px solid transparent" }}>
                    <i className="fa fa-map-marker" style={{ color:"#64748b" }}/>
                    <select style={{ border:"none",background:"transparent",outline:"none",fontSize:14,color:"#1f2937",width:"100%" }}>
                      <option>Select Category</option>
                      <option>Marketing</option>
                      <option>Design</option>
                      <option>Development</option>
                    </select>
                  </label>
                  <button style={{ background:"#22c55e",border:"none",borderRadius:12,color:"#fff",padding:"0 22px",fontSize:18,cursor:"pointer",boxShadow:"0 12px 25px rgba(34,197,94,.25)" }}>
                    <i className="fa fa-search"/>
                  </button>
                </div>
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:20,flexWrap:"wrap" }}>
                <div style={{ background:"#ecfeff",borderRadius:18,padding:"14px 20px",display:"inline-flex",flexDirection:"column",boxShadow:"inset 0 0 0 1px rgba(14,165,233,.28)" }}>
                  <span style={{ fontSize:24,fontWeight:700,color:"#0ea5e9",lineHeight:1.1 }}>50k+</span>
                  <span style={{ fontSize:13,fontWeight:600,color:"#0f172a" }}>Active Jobs</span>
                </div>
                <div style={{ display:"flex",gap:20 }}>
                  <a onClick={()=>router.push("/employer/post-job")} style={{ fontWeight:600,color:"#2563eb",cursor:"pointer",display:"flex",alignItems:"center",gap:8,textDecoration:"none" }}>
                    <i className="fa fa-briefcase" style={{ color:"#22c55e" }}/> Post Your Job
                  </a>
                  <a onClick={()=>router.push("/jobs")} style={{ fontWeight:600,color:"#2563eb",cursor:"pointer",display:"flex",alignItems:"center",gap:8,textDecoration:"none" }}>
                    <i className="fa fa-user-o" style={{ color:"#22c55e" }}/> Search Jobs
                  </a>
                </div>
              </div>
            </div>
            <div style={{ position:"relative" }}>
              <img src={`${IMG}/hero-image.png`} alt="Find a perfect job" style={{ width:"100%",maxWidth:500 }}/>
              <div style={{ position:"absolute",left:"12%",bottom:-30,background:"#fff",borderRadius:20,padding:"18px 20px",boxShadow:"0 20px 50px rgba(15,23,42,.18)",display:"flex",alignItems:"center",gap:16 }}>
                <span style={{ fontWeight:700,color:"#0f172a" }}>Find a Perfect Job</span>
                <button style={{ borderRadius:999,padding:"8px 18px",fontWeight:600,background:"#2563eb",color:"#fff",border:"none",cursor:"pointer" }}>Apply Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Box */}
      <div style={{ paddingTop:60,paddingBottom:20 }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
            <a onClick={()=>router.push("/jobs")} style={{ background:"#0357e9",padding:"30px 110px 30px 40px",display:"block",borderRadius:100,color:"#fff",position:"relative",textDecoration:"none",cursor:"pointer" }}>
              <h3 style={{ fontWeight:700,marginBottom:8,margin:"0 0 8px" }}>Search your desired Job</h3>
              <p style={{ fontSize:14,margin:0,color:"rgba(255,255,255,0.9)" }}>Discover a career you are passionate about</p>
              <img src={`${IMG}/icons/search-job-icon.png`} alt="" style={{ position:"absolute",right:30,top:"50%",width:70,marginTop:-35 }}/>
            </a>
            <a onClick={()=>router.push("/employer/post-job")} style={{ background:"#17d27c",padding:"30px 110px 30px 40px",display:"block",borderRadius:100,color:"#fff",position:"relative",textDecoration:"none",cursor:"pointer" }}>
              <h3 style={{ fontWeight:700,margin:"0 0 8px" }}>Post a Job Today</h3>
              <p style={{ fontSize:14,margin:0,color:"rgba(255,255,255,0.9)" }}>Discover the ideal candidate for your team</p>
              <img src={`${IMG}/icons/postjob.png`} alt="" style={{ position:"absolute",right:30,top:"50%",width:70,marginTop:-35 }}/>
            </a>
          </div>
        </div>
      </div>

      {/* Top Companies */}
      <section style={{ padding:"80px 0" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ textAlign:"center",marginBottom:40 }}>
            <div style={{ fontSize:18,fontWeight:600,color:"#17d27c",marginBottom:5 }}>Here You Can See</div>
            <h3 style={{ fontSize:36,fontWeight:600,color:"#000",fontFamily:"Montserrat,sans-serif",margin:0 }}>Top Companies are Hiring</h3>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24 }}>
            {companies.map((c, i) => (
              <a key={i} onClick={()=>router.push("/employer/single")} style={{ background:"#fff",borderRadius:18,padding:"32px 24px",boxShadow:"0 12px 35px rgba(15,23,42,.08)",border:"1px solid rgba(148,163,184,.15)",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:12,cursor:"pointer",textDecoration:"none",transition:"transform 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-6px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                <div style={{ width:72,height:72,borderRadius:16,background:"#f8fafc",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 18px rgba(15,23,42,.12)" }}>
                  <img src={c.logo} alt={c.name} style={{ width:52,height:52,objectFit:"contain" }}/>
                </div>
                <h5 style={{ fontFamily:"Montserrat,sans-serif",fontSize:15,fontWeight:700,color:"#0f172a",margin:0 }}>{c.name}</h5>
                <div style={{ fontSize:13,color:"#64748b" }}><i className="fa fa-map-marker" style={{ color:"#22c55e",marginRight:4 }}/>{c.location}</div>
                <div style={{ fontSize:13,fontWeight:600,color:"#1f2937",background:"rgba(37,99,235,.08)",borderRadius:12,padding:"8px 16px" }}>
                  <i className="fa fa-briefcase" style={{ color:"#2563eb",marginRight:6 }}/>{c.openJobs} Open Jobs
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign:"center",marginTop:40 }}>
            <button onClick={()=>router.push("/employer/list")} style={{ padding:"14px 32px",borderRadius:999,background:"#2563eb",color:"#fff",border:"none",fontWeight:600,cursor:"pointer",fontSize:15,boxShadow:"0 18px 35px rgba(37,99,235,.25)" }}>View All Featured Companies</button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding:"80px 0",background:"#f6f6f6" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ textAlign:"center",marginBottom:40 }}>
            <div style={{ fontSize:18,fontWeight:600,color:"#17d27c",marginBottom:5 }}>Find Your Path</div>
            <h3 style={{ fontSize:36,fontWeight:600,color:"#000",fontFamily:"Montserrat,sans-serif",margin:0 }}>Browse Jobs By Categories</h3>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24 }}>
            {categories.map((cat, i) => (
              <a key={i} style={{ background:"#fff",borderRadius:16,padding:24,textAlign:"center",boxShadow:"0 4px 15px rgba(0,0,0,.06)",cursor:"pointer",textDecoration:"none",display:"block" }}
                onMouseEnter={e=>e.currentTarget.style.boxShadow="0 12px 30px rgba(0,0,0,.1)"}
                onMouseLeave={e=>e.currentTarget.style.boxShadow="0 4px 15px rgba(0,0,0,.06)"}>
                <div style={{ width:80,height:80,margin:"0 auto 16px",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <img src={cat.image} alt={cat.name} style={{ width:64,height:64,objectFit:"contain" }}/>
                </div>
                <h5 style={{ fontFamily:"Montserrat,sans-serif",fontSize:15,fontWeight:700,color:"#0f172a",marginBottom:8 }}>{cat.name}</h5>
                <div style={{ fontSize:13,color:"#64748b" }}><i className="fa fa-briefcase" style={{ marginRight:4 }}/>({cat.jobs}) Jobs</div>
              </a>
            ))}
          </div>
          <div style={{ textAlign:"center",marginTop:40 }}>
            <button style={{ padding:"14px 32px",borderRadius:999,background:"#2563eb",color:"#fff",border:"none",fontWeight:600,cursor:"pointer",fontSize:15 }}>View All Categories</button>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section style={{ padding:"80px 0",background:"#fff" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ textAlign:"center",marginBottom:32 }}>
            <div style={{ fontSize:18,fontWeight:600,color:"#17d27c",marginBottom:5 }}>Explore Sectors</div>
            <h3 style={{ fontSize:36,fontWeight:600,color:"#000",fontFamily:"Montserrat,sans-serif",margin:0 }}>Popular Industries</h3>
          </div>
          <div style={{ display:"flex",flexWrap:"wrap",justifyContent:"center",gap:14 }}>
            {industries.map((ind, i) => (
              <a key={i} style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"10px 18px",borderRadius:999,background:"rgba(37,99,235,.08)",color:"#1d4ed8",fontWeight:600,cursor:"pointer",textDecoration:"none",transition:"all 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.background="#2563eb";e.currentTarget.style.color="#fff";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(37,99,235,.08)";e.currentTarget.style.color="#1d4ed8";}}>
                <span style={{ width:28,height:28,borderRadius:"50%",background:"#fff",display:"inline-flex",alignItems:"center",justifyContent:"center",boxShadow:"0 5px 12px rgba(37,99,235,.15)" }}>
                  <i className={`fa ${ind.icon}`} style={{ fontSize:13 }}/>
                </span>
                {ind.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding:"80px 0",background:"#f6f6f6" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ textAlign:"center",marginBottom:40 }}>
            <div style={{ fontSize:18,fontWeight:600,color:"#17d27c",marginBottom:5 }}>Simple Steps</div>
            <h3 style={{ fontSize:36,fontWeight:600,color:"#000",fontFamily:"Montserrat,sans-serif",margin:0 }}>How It Works</h3>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:32 }}>
            {[
              { icon:"fa-user-plus", title:"Create An Account", desc:"It's very easy to open an account and start your journey." },
              { icon:"fa-file", title:"Complete your profile", desc:"Share all the key details so employers can get to know you." },
              { icon:"fa-paper-plane", title:"Apply job or hire", desc:"Apply to your preferred jobs or hire top talent effortlessly." },
            ].map((step, i) => (
              <div key={i} style={{ background:"#fff",borderRadius:16,padding:32,textAlign:"center",boxShadow:"0 4px 15px rgba(0,0,0,.06)" }}>
                <div style={{ width:72,height:72,borderRadius:"50%",background:"rgba(37,99,235,.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:28,color:"#2563eb" }}>
                  <i className={`fa-solid ${step.icon}`}/>
                </div>
                <h4 style={{ fontSize:18,fontWeight:700,color:"#0f172a",marginBottom:10 }}>{step.title}</h4>
                <p style={{ color:"#64748b",fontSize:14,lineHeight:1.6,margin:0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section style={{ padding:"80px 0" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ marginBottom:32 }}>
            <div style={{ fontSize:18,fontWeight:600,color:"#17d27c",marginBottom:5 }}>Here You Can See</div>
            <h3 style={{ fontSize:36,fontWeight:600,color:"#000",fontFamily:"Montserrat,sans-serif",margin:0 }}>Featured <span style={{ color:"#263bd6",fontWeight:200 }}>Jobs</span></h3>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }}>
            {featuredJobs.map((job, i) => (
              <div key={i} style={{ background:"#fff",borderRadius:16,padding:20,border:"1px solid #e5e7eb",boxShadow:"0 4px 12px rgba(0,0,0,.05)" }}>
                <div style={{ marginBottom:12 }}>
                  <span style={{ display:"inline-flex",alignItems:"center",gap:6,fontSize:12,color:"#64748b",background:"#f8fafc",padding:"4px 10px",borderRadius:20 }}>
                    <i className="fa fa-briefcase"/>
                    {job.type}
                  </span>
                </div>
                <h4 style={{ fontSize:16,fontWeight:700,color:"#0f172a",marginBottom:8 }}>
                  <a onClick={()=>router.push("/jobs")} style={{ color:"inherit",cursor:"pointer",textDecoration:"none" }}>{job.title}</a>
                </h4>
                <div style={{ fontSize:13,color:"#64748b",marginBottom:16 }}><i className="fa fa-map-marker" style={{ marginRight:6 }}/>{job.location}</div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid #f3f4f6",paddingTop:12 }}>
                  <div>
                    <div style={{ fontSize:11,color:"#9ca3af" }}>{job.posted}</div>
                    <div style={{ fontSize:12,fontWeight:600,color:"#1f2937" }}>{job.company}</div>
                  </div>
                  <img src={job.logo} alt={job.company} style={{ width:36,height:36,borderRadius:8,objectFit:"cover" }}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center",marginTop:40 }}>
            <button onClick={()=>router.push("/jobs")} style={{ padding:"14px 32px",borderRadius:999,background:"#2563eb",color:"#fff",border:"none",fontWeight:600,cursor:"pointer",fontSize:15 }}>View All Featured Jobs</button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section style={{ padding:"80px 0",background:"linear-gradient(135deg,#f8f9fa,#e9ecef)" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center" }}>
            <div>
              <span style={{ display:"inline-block",background:"#dcfce7",color:"#16a34a",padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:600,marginBottom:16 }}>Here You Can See</span>
              <h2 style={{ fontSize:36,fontWeight:600,color:"#000",fontFamily:"Montserrat,sans-serif",marginBottom:16 }}>Watch Our <span style={{ color:"#263bd6" }}>Video</span></h2>
              <p style={{ color:"#555",marginBottom:24,lineHeight:1.6 }}>Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus.</p>
              <ul style={{ listStyle:"none",padding:0,margin:0 }}>
                {["Learn about our platform","Discover success stories","See how it works"].map((item, i) => (
                  <li key={i} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12,color:"#333",fontSize:15 }}>
                    <i className="fa fa-check-circle" style={{ color:"#17d27c",fontSize:16 }}/>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ position:"relative",borderRadius:16,overflow:"hidden" }}>
              <img src={`${IMG}/video-thumbnail.jpg`} alt="Video" style={{ width:"100%",display:"block" }}/>
              <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.3)" }}/>
              <button style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"#fff",border:"none",width:70,height:70,borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ width:50,height:50,background:"#17d27c",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <i className="fa fa-play" style={{ color:"#fff",marginLeft:4 }}/>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section style={{ padding:"80px 0",background:"#f6f6f6" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ marginBottom:32 }}>
            <div style={{ fontSize:18,fontWeight:600,color:"#17d27c",marginBottom:5 }}>Here You Can See</div>
            <h3 style={{ fontSize:36,fontWeight:600,color:"#000",fontFamily:"Montserrat,sans-serif",margin:0 }}>Latest <span style={{ color:"#263bd6",fontWeight:200 }}>Jobs</span></h3>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }}>
            {latestJobs.map((job, i) => (
              <div key={i} style={{ background:"#fff",padding:20,borderRadius:12,border:"1px solid #e5e7eb",transition:"all 0.3s" }}
                onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 25px rgba(0,0,0,.08)"}
                onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
                  <JobBadge type={job.type}/>
                  <a style={{ color:"#9ca3af",cursor:"pointer",textDecoration:"none" }}>♡</a>
                </div>
                <h4 style={{ fontSize:16,fontWeight:700,marginBottom:8 }}>
                  <a onClick={()=>router.push("/jobs")} style={{ color:"#1f2937",cursor:"pointer",textDecoration:"none" }}>{job.title}</a>
                </h4>
                <div style={{ display:"flex",flexWrap:"wrap",gap:12,fontSize:13,color:"#6b7280",marginBottom:16 }}>
                  <span><i className="fa fa-building" style={{ marginRight:4 }}/>{job.company}</span>
                  <span><i className="fa fa-map-marker" style={{ marginRight:4 }}/>{job.location}</span>
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:14,borderTop:"1px solid #e5e7eb" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <img src={job.logo} alt="" style={{ width:40,height:40,borderRadius:8,objectFit:"cover" }}/>
                    <div>
                      <div style={{ fontSize:11,color:"#9ca3af" }}>Posted on</div>
                      <div style={{ fontSize:12,fontWeight:600,color:"#1f2937" }}>{job.posted}</div>
                    </div>
                  </div>
                  <button onClick={()=>router.push("/jobs")} style={{ padding:"7px 14px",borderRadius:20,border:"1px solid #17d27c",color:"#17d27c",background:"transparent",cursor:"pointer",fontSize:12,fontWeight:600 }}>Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section style={{ padding:"80px 0" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ textAlign:"center",marginBottom:40 }}>
            <div style={{ fontSize:18,fontWeight:600,color:"#17d27c",marginBottom:5 }}>Choose Your Location</div>
            <h3 style={{ fontSize:36,fontWeight:600,color:"#000",fontFamily:"Montserrat,sans-serif",margin:0 }}>Jobs by Cities</h3>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }}>
            {cities.map((city, i) => (
              <a key={i} style={{ position:"relative",display:"block",borderRadius:12,overflow:"hidden",cursor:"pointer",textDecoration:"none" }}>
                <img src={city.image} alt={city.name} style={{ width:"100%",height:200,objectFit:"cover",display:"block" }}/>
                <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:20,background:"linear-gradient(to top,rgba(0,0,0,0.8),transparent)",color:"#fff" }}>
                  <span style={{ display:"block",fontSize:18,fontWeight:700 }}>{city.name}</span>
                  <span style={{ fontSize:14,opacity:0.9 }}>{city.jobs} Jobs</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding:"80px 0",background:"#f6f6f6" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ textAlign:"center",marginBottom:40 }}>
            <div style={{ fontSize:18,fontWeight:600,color:"#17d27c",marginBottom:5 }}>Stories from our community</div>
            <h3 style={{ fontSize:36,fontWeight:600,color:"#000",fontFamily:"Montserrat,sans-serif",margin:0 }}>Success Stories</h3>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background:"#fff",padding:24,borderRadius:12,border:"1px solid #e5e7eb" }}>
                <p style={{ color:"#6b7280",fontStyle:"italic",marginBottom:20 }}>"{t.text}"</p>
                <div style={{ display:"flex",alignItems:"center",gap:12,paddingTop:16,borderTop:"1px solid #e5e7eb" }}>
                  <img src={t.avatar} alt={t.name} style={{ width:48,height:48,borderRadius:"50%",objectFit:"cover" }}/>
                  <div>
                    <div style={{ fontWeight:700,color:"#1f2937",fontSize:14 }}>{t.name}</div>
                    <div style={{ fontSize:12,color:"#6b7280" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Section */}
      <section style={{ padding:"80px 0",background:"linear-gradient(135deg,#17d27c,#0ea5e9)" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center" }}>
            <div>
              <h2 style={{ fontSize:36,fontWeight:700,color:"#fff",marginBottom:8 }}>The JobsPortal APP</h2>
              <p style={{ fontSize:20,color:"rgba(255,255,255,.9)",marginBottom:16 }}>A world of opportunity in your hand</p>
              <p style={{ color:"rgba(255,255,255,.8)",marginBottom:24,lineHeight:1.6 }}>Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac condimentum. Vestibulum congue posuere lacus.</p>
              <div style={{ display:"flex",gap:16 }}>
                <img src={`${IMG}/apple-btn.png`} alt="Apple Store" style={{ height:50,borderRadius:8 }}/>
                <img src={`${IMG}/andriod-btn.png`} alt="Google Play" style={{ height:50,borderRadius:8 }}/>
              </div>
            </div>
            <div><img src={`${IMG}/app-screens.png`} alt="App Screens" style={{ width:"100%" }}/></div>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section style={{ padding:"80px 0",background:"#fff" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px",textAlign:"center" }}>
          <div style={{ fontSize:18,fontWeight:600,color:"#17d27c",marginBottom:5 }}>Stay in the loop</div>
          <h3 style={{ fontSize:36,fontWeight:600,color:"#000",fontFamily:"Montserrat,sans-serif",marginBottom:10 }}>Subscribe To Our Newsletter</h3>
          <p style={{ color:"#444",marginBottom:30 }}>Get the latest jobs, hiring trends, and tips delivered directly to your inbox.</p>
          <div style={{ maxWidth:500,margin:"0 auto" }}>
            <div style={{ display:"flex",gap:10 }}>
              <input type="email" placeholder="Enter your email" style={{ flex:1,padding:"14px 20px",borderRadius:50,border:"1px solid #ddd",fontSize:14,outline:"none" }}/>
              <button style={{ padding:"14px 28px",borderRadius:50,background:"#17d27c",color:"#fff",border:"none",fontWeight:600,cursor:"pointer",fontSize:14 }}>Subscribe</button>
            </div>
            <p style={{ fontSize:13,color:"#999",marginTop:10 }}>We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section style={{ padding:"80px 0",background:"#f6f6f6" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ textAlign:"center",marginBottom:40 }}>
            <div style={{ fontSize:18,fontWeight:600,color:"#17d27c",marginBottom:5 }}>Our Blog</div>
            <h3 style={{ fontSize:36,fontWeight:600,color:"#000",fontFamily:"Montserrat,sans-serif",margin:0 }}>Latest <span style={{ color:"#263bd6",fontWeight:200 }}>Blog Posts</span></h3>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }}>
            {blogs.map((blog, i) => (
              <div key={i} style={{ background:"#fff",borderRadius:12,overflow:"hidden",border:"1px solid #e5e7eb",transition:"all 0.3s" }}
                onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 25px rgba(0,0,0,.08)"}
                onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div style={{ height:200,overflow:"hidden",position:"relative" }}>
                  <img src={blog.image} alt={blog.title} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                  <span style={{ position:"absolute",top:16,left:16,background:"#17d27c",color:"#fff",padding:"4px 12px",borderRadius:4,fontSize:12,fontWeight:600 }}>{blog.category}</span>
                </div>
                <div style={{ padding:20 }}>
                  <div style={{ fontSize:12,color:"#999",marginBottom:10 }}>
                    <span style={{ marginRight:12 }}><i className="fa fa-calendar" style={{ marginRight:4 }}/>{blog.date}</span>
                    <span><i className="fa fa-user" style={{ marginRight:4 }}/>{blog.author}</span>
                  </div>
                  <h5 style={{ fontSize:18,fontWeight:700,marginBottom:8,fontFamily:"Montserrat,sans-serif" }}><a href="#" style={{ color:"#1f2937",textDecoration:"none" }}>{blog.title}</a></h5>
                  <p style={{ color:"#6b7280",fontSize:14,marginBottom:16,lineHeight:1.5 }}>{blog.excerpt}</p>
                  <button style={{ padding:"8px 16px",border:"1px solid #17d27c",borderRadius:6,color:"#17d27c",background:"transparent",cursor:"pointer",fontSize:13,fontWeight:600 }}>Read article</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
