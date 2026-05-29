'use client';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";

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
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Explore top employers</span>
          <h1 className={styles.heroTitle}>Find companies that align with your values</h1>
          <p className={styles.heroDesc}>Browse company profiles, read about their culture, and connect with employers actively building diverse teams.</p>
          <div className={styles.searchPanel}>
            <div className={styles.searchGrid}>
              {[{icon:"fa-building",placeholder:"Company name or keyword",type:"text"},{icon:"fa-location-dot",type:"select",opts:["Location","New York","San Francisco","Chicago"]},{icon:"fa-industry",type:"select",opts:["Industry","Design","Tech","HR"]}].map((f,i)=>(
                <label key={i} className={styles.searchField}>
                  <i className={`fa ${f.icon} ${styles.searchIcon}`}/>
                  {f.type==="text" ? <input placeholder={f.placeholder} className={styles.searchInput}/> :
                    <select className={styles.searchInput}>{f.opts.map((o,j)=><option key={j}>{o}</option>)}</select>}
                </label>
              ))}
              <button className={styles.searchBtn}><i className="fa fa-search"/></button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.listingSection}>
        <div className={styles.listingInner}>
          <div className={styles.listingGrid}>
            <aside>
              <div className={styles.filterCard}>
                <h5 className={styles.filterTitle}>Search companies</h5>
                {["Company name","Location","Industry"].map((p,i)=>(
                  <input key={i} placeholder={p} className={styles.filterInput}/>
                ))}
                <button className={styles.applyBtn}>Apply filters</button>
              </div>
              {[
                { title:"Company size", items:[["1-10 employees","12"],["11-50 employees","24"],["51-200 employees","18"],["200+ employees","9"]] },
                { title:"Open positions", items:[["1-5 openings","15"],["6-10 openings","20"],["11-20 openings","12"],["20+ openings","8"]] },
                { title:"Industry", items:[["Information Technology","22"],["Design & Creative","15"],["Marketing","13"],["Finance","9"]] },
                { title:"Work model", items:[["Remote","18"],["Hybrid","24"],["On-site","15"]] },
              ].map((card,i)=>(
                <div key={i} className={styles.filterCard}>
                  <h5 className={styles.filterTitle}>{card.title}</h5>
                  <ul className={styles.filterList}>
                    {card.items.map(([label,count],j)=>(
                      <li key={j} className={styles.filterListItem}>
                        <label className={styles.filterLabel}>
                          <span><input type="checkbox" className={styles.filterCheckbox}/>{label}</span>
                          <span className={styles.filterCount}>{count}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </aside>

            <div>
              <div className={styles.resultsHeader}>
                <div>
                  <h2 className={styles.resultsTitle}>5 Companies Found</h2>
                  <span className={styles.resultsSub}>Showing 1 - 5 verified employers</span>
                </div>
                <div className={styles.resultsControls}>
                  <div className={styles.viewToggle}>
                    {["fa-th-large","fa-bars"].map((icon,i)=>(
                      <button key={i} className={`${styles.viewToggleBtn} ${i===1?styles.viewToggleBtnActive:""}`}>
                        <i className={`fa ${icon}`}/>
                      </button>
                    ))}
                  </div>
                  <select className={styles.sortSelect}>
                    <option>Most relevant</option><option>Most openings</option><option>Recently joined</option>
                  </select>
                </div>
              </div>

              <div className={styles.employerList}>
                {employers.map((emp, i) => (
                  <article key={i} className={styles.empCard}>
                    <div className={styles.logoBox}>
                      <img src={emp.logo} alt={emp.name} className={styles.logoImg}/>
                    </div>
                    <div className={styles.empMain}>
                      <div className={styles.empMainHeader}>
                        <div>
                          {emp.verified && <span className={styles.verifiedBadge}>Verified</span>}
                          <h4 className={styles.empName}>
                            <a onClick={()=>router.push("/employer/single")} className={styles.empNameLink}>{emp.name}</a>
                          </h4>
                          <p className={styles.empMeta}>{emp.type} · {emp.employees} employees · {emp.location}</p>
                        </div>
                        <button className={styles.followBtn}>☆ Follow</button>
                      </div>
                      <p className={styles.empDesc}>{emp.description}</p>
                      <div className={styles.tagRow}>
                        {emp.tags.map((tag,j)=><span key={j} className={styles.tag}>{tag}</span>)}
                      </div>
                    </div>
                    <div className={styles.empSide}>
                      <div className={styles.empSideInfo}>
                        <div><i className={`fa fa-briefcase ${styles.empSideInfoIcon}`}/>{emp.openPositions} open positions</div>
                        <div className={styles.empSideRow2}><i className={`fa fa-calendar ${styles.empSideInfoIcon}`}/>Founded {emp.founded}</div>
                      </div>
                      <button onClick={()=>router.push("/employer/single")} className={styles.viewBtn}>View company</button>
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
