'use client';
import { useRouter } from 'next/navigation';
import EmployerSidebar from "../../../../components/layout/sidebars/EmployerSidebar";
import styles from "./page.module.css";

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
  return <span className={styles.statusBadge} style={{ background:bg, color }}>{status}</span>;
}

export default function EmployerDashboardPage() {
  const router = useRouter();
  return (
    <section className={styles.page}>
      <div className={styles.layout}>
        <EmployerSidebar currentPath="/employer/dashboard"/>
        <div className={styles.main}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Welcome back, Gopikiran!</h1>
              <p className={styles.subtitle}>Here's what's happening with your job postings today.</p>
            </div>
            <button onClick={()=>router.push("/employer/post-job")} className={styles.postBtn}>
              <i className={`fa-solid fa-plus ${styles.postBtnIcon}`}/>Post New Job
            </button>
          </div>

          {/* Stats */}
          <div className={styles.statsGrid}>
            {[
              { icon:"fa-briefcase",label:"Active Jobs",value:stats.openJobs,color:"#9333ea",bg:"#f3e8ff",trend:"+12%" },
              { icon:"fa-users",label:"Total Applicants",value:stats.totalApplicants,color:"#ea580c",bg:"#ffedd5",trend:"+8%" },
              { icon:"fa-eye",label:"Profile Views",value:stats.profileViews,color:"#2563eb",bg:"#dbeafe",trend:"+24%" },
              { icon:"fa-user-check",label:"Followers",value:stats.followers,color:"#0d9488",bg:"#ccfbf1",trend:"+15%" },
            ].map((s, i) => (
              <div key={i} className={styles.statCard} style={{ borderLeft:`4px solid ${s.color}` }}>
                <div className={styles.statIcon} style={{ background:s.bg, color:s.color }}>
                  <i className={`fa-solid ${s.icon}`}/>
                </div>
                <div>
                  <span className={styles.statLabel}>{s.label}</span>
                  <strong className={styles.statValue} style={{ color:s.color }}>{s.value}</strong>
                </div>
                <span className={styles.statTrend}>↑ {s.trend} this month</span>
              </div>
            ))}
          </div>

          {/* Middle */}
          <div className={styles.middleRow}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Recent Applications</h3>
                <a href="#" className={styles.viewAllLink}>View All</a>
              </div>
              <div className={styles.appList}>
                {recentApplications.map((app, i) => (
                  <div key={i} className={i<recentApplications.length-1?styles.appRow:styles.appRowLast}>
                    <img src={app.avatar} alt={app.name} className={styles.appAvatar}/>
                    <div className={styles.appInfo}>
                      <div className={styles.appName}>{app.name}</div>
                      <div className={styles.appPosition}>{app.position}</div>
                      <div className={styles.appDate}>{app.appliedDate}</div>
                    </div>
                    <SBadge status={app.status}/>
                    <div className={styles.iconBtnRow}>
                      {["fa-user","fa-download"].map((icon,j)=>(
                        <button key={j} className={styles.iconBtn}>
                          <i className={`fa-solid ${icon}`}/>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Your Package</h3>
                <span className={styles.packageBadge}>Premium</span>
              </div>
              <div className={styles.packageHero}>
                <div className={styles.packageEmoji}>👑</div>
                <h4 className={styles.packageTitle}>Premium Pack</h4>
                <p className={styles.packagePrice}>$199 / month</p>
              </div>
              {[["Job Posts Used",75,"#667eea"],["CV Downloads",40,"#2563eb"]].map(([label,pct,color],i)=>(
                <div key={i} className={styles.packageMeter}>
                  <div className={styles.packageMeterLabel}>
                    <span>{label}</span><span className={styles.packageMeterPct}>{pct}%</span>
                  </div>
                  <div className={styles.packageMeterTrack}>
                    <div className={styles.packageMeterFill} style={{ width:`${pct}%`, background:color }}/>
                  </div>
                </div>
              ))}
              <div className={styles.packageExpiry}>⏰ Expires on Dec 31, 2025</div>
              <button className={styles.upgradeBtn}>Upgrade Package</button>
            </div>
          </div>

          {/* Active Jobs Table */}
          <div className={styles.cardSpaced}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Your Active Jobs</h3>
              <a onClick={()=>router.push("/employer/manage-jobs")} className={styles.viewAllLink}>Manage Jobs</a>
            </div>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr className={styles.theadRow}>
                    {["Job Title","Applications","Views","Status","Posted","Expires","Actions"].map(th=>(
                      <th key={th} className={styles.th}>{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeJobs.map((job, i) => (
                    <tr key={i} className={styles.tbodyRow}>
                      <td className={styles.td}>
                        <div className={styles.jobTitle}>{job.title}</div>
                        <div className={styles.jobType}>{job.type}</div>
                      </td>
                      <td className={`${styles.td} ${styles.cell}`}>{job.applications}</td>
                      <td className={`${styles.td} ${styles.cell}`}>{job.views}</td>
                      <td className={styles.td}><SBadge status={job.status}/></td>
                      <td className={`${styles.td} ${styles.cellMuted}`}>{job.postedDate}</td>
                      <td className={`${styles.td} ${styles.cellMuted}`}>{job.expiresDate}</td>
                      <td className={styles.td}>
                        <div className={styles.iconBtnRow}>
                          {[["fa-pen","edit"],["fa-eye","view"],["fa-trash","delete"]].map(([icon,action])=>(
                            <button key={action} className={`${styles.actionBtn} ${action==="delete"?styles.actionBtnDanger:""}`}>
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
          <div className={styles.bottomGrid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitleSm}>Recent Messages</h3>
                <a href="#" className={styles.viewAllLinkSm}>View All</a>
              </div>
              {recentMessages.map((msg, i) => (
                <div key={i} className={`${styles.message} ${!msg.read?styles.messageUnread:""}`}>
                  <div className={styles.messageAvatarWrap}>
                    <img src={msg.avatar} alt={msg.sender} className={styles.messageAvatar}/>
                    {msg.online && <span className={styles.onlineDot}/>}
                  </div>
                  <div className={styles.messageBody}>
                    <div className={styles.messageMeta}>
                      <span className={styles.messageSender}>{msg.sender}</span>
                      <span className={styles.messageTime}>{msg.time}</span>
                    </div>
                    <p className={styles.messagePreview}>{msg.preview}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitleSm}>Quick Actions</h3>
              <div className={styles.quickGrid}>
                {[["fa-plus-circle","Post a Job","/post-job"],["fa-gear","Manage Jobs","/employer/manage-jobs"],["fa-layer-group","CV Packages","#"],["fa-building","Company Profile","/employer/company-profile"],["fa-credit-card","Payments","#"],["fa-sliders","Settings","/employer/company-settings"]].map(([icon,label,path],i)=>(
                  <a key={i} onClick={()=>path!=="#"&&router.push(path)} className={styles.quickItem}>
                    <i className={`fa-solid ${icon} ${styles.quickIcon}`}/>
                    <span className={styles.quickLabel}>{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitleSm}>Recent Activity</h3>
              {recentActivities.map((act, i) => (
                <div key={i} className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <i className={act.icon}/>
                  </div>
                  <div>
                    <p className={styles.activityDesc}>{act.description}</p>
                    <span className={styles.activityTime}>{act.time}</span>
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
