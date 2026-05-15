import { useRouter } from 'next/router';

const IMG = "https://www.sharjeelanjum.com/html/jobs-portal/images";
const employers = [
  { id:1,name:"Multimedia Design",type:"Private",employees:"50-200",location:"New York, USA",description:"We create award-winning digital experiences for Fortune 500 brands. Our studio specializes in UX research, product design, and front-end engineering.",tags:["Design","Technology","Creative"],openPositions:5,founded:"2010",logo:`${IMG}/employers/emplogo1.jpg`,verified:true },
  { id:2,name:"Power Wave",type:"Public",employees:"200-500",location:"San Francisco, USA",description:"Power Wave builds scalable cloud infrastructure and developer tools. We're on a mission to make cloud computing accessible for every developer.",tags:["Cloud","DevOps","Engineering"],openPositions:8,founded:"2014",logo:`${IMG}/employers/emplogo2.jpg`,verified:true },
  { id:3,name:"Travel Advisor",type:"Private",employees:"500+",location:"Miami, USA",description:"Leading travel technology platform connecting travelers with the world's best experiences, hotels, and local guides.",tags:["Travel","Tech","SaaS"],openPositions:3,founded:"2012",logo:`${IMG}/employers/emplogo3.jpg`,verified:false },
  { id:4,name:"Connect People",type:"Private",employees:"10-50",location:"Chicago, USA",description:"HR technology startup building the future of talent acquisition with AI-powered matching and smart onboarding tools.",tags:["HR Tech","AI","Startup"],openPositions:6,founded:"2019",logo:`${IMG}/employers/emplogo7.jpg`,verified:true },
  { id:5,name:"Net Design",type:"Private",employees:"50-200",location:"Austin, USA",description:"Full-service digital agency specializing in brand identity, web design, and performance marketing for growth-stage companies.",tags:["Marketing","Design","Digital"],openPositions:2,founded:"2016",logo:`${IMG}/employers/emplogo5.jpg`,verified:false },
];

export default function EmployerListPage() {
  const router = useRouter();
  return (
    <>
      <section style={{ background:"linear-gradient(120deg,#dbeafe,#e0e7ff,#dcfce7)",padding:"60px 0",borderBottom:"1px solid #e5e7eb" }}>
        <div style={{ maxWidth:800,margin:"0 auto",padding:"0 24px",textAlign:"center" }}>
          <span style={{ display:"inline-block",padding:"6px 16px",background:"rgba(255,255,255,0.7)",borderRadius:30,fontSize:12,fontWeight:600,color:"#2563eb",textTransform:"uppercase",letterSpacing:1,marginBottom:20 }}>Explore top employers</span>
          <h1 style={{ fontSize:42,fontWeight:800,color:"#1f2937",margin:"0 0 12px",lineHeight:1.2 }}>Find companies that align with your values</h1>
          <p style={{ fontSize:16,color:"#6b7280",marginBottom:28 }}>Browse company profiles, read about their culture, and connect with employers actively building diverse teams.</p>
          <div style={{ background:"#fff",padding:20,borderRadius:16,boxShadow:"0 10px 40px rgba(0,0,0,0.08)" }}>
            <div style={{ display:"grid",gridTemplateColumns:"5fr 3fr 3fr 1fr",gap:12 }}>
              {[{icon:"fa-building",placeholder:"Company name or keyword",type:"text"},{icon:"fa-location-dot",type:"select",opts:["Location","New York","San Francisco","Chicago"]},{icon:"fa-industry",type:"select",opts:["Industry","Design","Tech","HR"]}].map((f,i)=>(
                <label key={i} style={{ display:"flex",alignItems:"center",gap:10,background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:10,padding:"0 14px",height:50 }}>
                  <i className={`fa ${f.icon}`} style={{ color:"#2563eb" }}/>
                  {f.type==="text" ? <input placeholder={f.placeholder} style={{ border:"none",background:"transparent",outline:"none",fontSize:13,flex:1 }}/> :
                    <select style={{ border:"none",background:"transparent",outline:"none",fontSize:13,flex:1 }}>{f.opts.map((o,j)=><option key={j}>{o}</option>)}</select>}
                </label>
              ))}
              <button style={{ background:"#2563eb",color:"#fff",border:"none",borderRadius:10,height:50,cursor:"pointer",fontSize:18 }}><i className="fa fa-search"/></button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background:"#f9fafb",padding:"40px 0" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ display:"grid",gridTemplateColumns:"280px 1fr",gap:24 }}>
            <aside>
              <div style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24,marginBottom:20 }}>
                <h5 style={{ fontSize:16,fontWeight:700,color:"#1f2937",marginBottom:14 }}>Search companies</h5>
                {["Company name","Location","Industry"].map((p,i)=>(
                  <input key={i} placeholder={p} style={{ width:"100%",marginBottom:10,padding:"10px 12px",border:"1px solid #e5e7eb",borderRadius:8,fontSize:13,boxSizing:"border-box",outline:"none" }}/>
                ))}
                <button style={{ width:"100%",padding:10,background:"#2563eb",color:"#fff",border:"none",borderRadius:8,fontWeight:600,cursor:"pointer" }}>Apply filters</button>
              </div>
              {[
                { title:"Company size", items:[["1-10 employees","12"],["11-50 employees","24"],["51-200 employees","18"],["200+ employees","9"]] },
                { title:"Open positions", items:[["1-5 openings","15"],["6-10 openings","20"],["11-20 openings","12"],["20+ openings","8"]] },
                { title:"Industry", items:[["Information Technology","22"],["Design & Creative","15"],["Marketing","13"],["Finance","9"]] },
                { title:"Work model", items:[["Remote","18"],["Hybrid","24"],["On-site","15"]] },
              ].map((card,i)=>(
                <div key={i} style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24,marginBottom:20 }}>
                  <h5 style={{ fontSize:16,fontWeight:700,color:"#1f2937",marginBottom:14 }}>{card.title}</h5>
                  <ul style={{ listStyle:"none",padding:0,margin:0 }}>
                    {card.items.map(([label,count],j)=>(
                      <li key={j} style={{ marginBottom:10 }}>
                        <label style={{ display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",color:"#4b5563",fontSize:14 }}>
                          <span><input type="checkbox" style={{ marginRight:10 }}/>{label}</span>
                          <span style={{ fontSize:11,color:"#9ca3af",background:"#f3f4f6",padding:"2px 8px",borderRadius:10 }}>{count}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </aside>

            <div>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12 }}>
                <div>
                  <h2 style={{ fontSize:24,fontWeight:700,color:"#1f2937",marginBottom:4 }}>5 Companies Found</h2>
                  <span style={{ fontSize:14,color:"#6b7280" }}>Showing 1 - 5 verified employers</span>
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                  <div style={{ display:"flex",border:"1px solid #e5e7eb",borderRadius:10,overflow:"hidden" }}>
                    {["fa-th-large","fa-bars"].map((icon,i)=>(
                      <button key={i} style={{ padding:"10px 14px",border:"none",background:i===1?"#2563eb":"#fff",color:i===1?"#fff":"#6b7280",cursor:"pointer",fontSize:14 }}>
                        <i className={`fa ${icon}`}/>
                      </button>
                    ))}
                  </div>
                  <select style={{ padding:"10px 16px",border:"1px solid #e5e7eb",borderRadius:10,fontSize:14,outline:"none" }}>
                    <option>Most relevant</option><option>Most openings</option><option>Recently joined</option>
                  </select>
                </div>
              </div>

              <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
                {employers.map((emp, i) => (
                  <article key={i} style={{ background:"#fff",borderRadius:16,border:"1px solid #e5e7eb",padding:24,display:"flex",gap:20,alignItems:"flex-start",transition:"all 0.3s" }}
                    onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 25px rgba(0,0,0,.08)"}
                    onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                    <div style={{ width:72,height:72,borderRadius:12,overflow:"hidden",flexShrink:0 }}>
                      <img src={emp.logo} alt={emp.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10 }}>
                        <div>
                          {emp.verified && <span style={{ fontSize:11,fontWeight:600,color:"#16a34a",background:"#dcfce7",padding:"3px 8px",borderRadius:20,marginBottom:6,display:"inline-block" }}>Verified</span>}
                          <h4 style={{ fontSize:18,fontWeight:700,color:"#1f2937",margin:"4px 0 4px" }}>
                            <a onClick={()=>router.push("/employer/single")} style={{ color:"inherit",cursor:"pointer",textDecoration:"none" }}>{emp.name}</a>
                          </h4>
                          <p style={{ fontSize:13,color:"#6b7280",margin:0 }}>{emp.type} · {emp.employees} employees · {emp.location}</p>
                        </div>
                        <button style={{ padding:"8px 12px",border:"1px solid #e5e7eb",borderRadius:8,background:"#fff",cursor:"pointer",fontSize:12 }}>☆ Follow</button>
                      </div>
                      <p style={{ fontSize:14,color:"#4b5563",lineHeight:1.6,marginBottom:12 }}>{emp.description}</p>
                      <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                        {emp.tags.map((tag,j)=><span key={j} style={{ padding:"4px 12px",background:"#f3f4f6",borderRadius:20,fontSize:12,color:"#4b5563" }}>{tag}</span>)}
                      </div>
                    </div>
                    <div style={{ flexShrink:0,display:"flex",flexDirection:"column",gap:12,alignItems:"flex-end",minWidth:160 }}>
                      <div style={{ fontSize:13,color:"#6b7280",textAlign:"right" }}>
                        <div><i className="fa fa-briefcase" style={{ marginRight:6,color:"#2563eb" }}/>{emp.openPositions} open positions</div>
                        <div style={{ marginTop:6 }}><i className="fa fa-calendar" style={{ marginRight:6,color:"#2563eb" }}/>Founded {emp.founded}</div>
                      </div>
                      <button onClick={()=>router.push("/employer/single")} style={{ padding:"10px 20px",border:"1px solid #17d27c",color:"#17d27c",background:"transparent",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600,whiteSpace:"nowrap" }}>View company</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export async function getServerSideProps() {
  return { props: {} };
}
