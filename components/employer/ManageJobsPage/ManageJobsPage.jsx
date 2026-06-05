'use client';
import { useRouter } from 'next/navigation';
import EmployerSidebar from "../../layout/sidebars/EmployerSidebar";
import styles from "./ManageJobsPage.module.css";

export default function ManageJobsPage() {
  const router = useRouter();
  const jobs = [
    { title:"Senior UI/UX Designer",type:"Full Time",apps:24,newApps:3,views:345,status:"active",posted:"Mar 07, 2025",expires:"Apr 07, 2025" },
    { title:"Full Stack Developer",type:"Contract",apps:18,newApps:0,views:289,status:"active",posted:"Mar 10, 2025",expires:"Apr 10, 2025" },
    { title:"Product Manager",type:"Full Time",apps:31,newApps:5,views:412,status:"paused",posted:"Feb 28, 2025",expires:"Mar 28, 2025" },
    { title:"Data Analyst",type:"Full Time",apps:15,newApps:2,views:198,status:"expired",posted:"Jan 15, 2025",expires:"Feb 15, 2025" },
  ];
  const statColors = { active:"#dcfce7|#166534", paused:"#fef3c7|#92400e", expired:"#fee2e2|#dc2626" };
  return (
    <section className={styles.page}>
      <div className={styles.layout}>
        <EmployerSidebar currentPath="/employer/manage-jobs"/>
        <div className={styles.main}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Manage Jobs</h1>
              <p className={styles.subtitle}>View and manage all your job postings</p>
            </div>
            <button onClick={()=>router.push("/employer/post-job")} className={styles.postBtn}>+ Post New Job</button>
          </div>
          <div className={styles.statsGrid}>
            {[["Total Jobs","4","fa-briefcase","#e0e7ff","#4f46e5"],["Active","2","fa-check-circle","#dcfce7","#16a34a"],["Applications","88","fa-users","#dbeafe","#2563eb"],["Expired","1","fa-clock","#fef3c7","#d97706"]].map(([label,val,icon,bg,color],i)=>(
              <div key={i} className={styles.statCard}>
                <div className={styles.statIcon} style={{ background:bg, color }}>
                  <i className={`fa-solid ${icon}`}/>
                </div>
                <div>
                  <div className={styles.statValue}>{val}</div>
                  <div className={styles.statLabel}>{label}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.tableCard}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  {["Job Info","Applications","Views","Status","Dates","Actions"].map(th=>(
                    <th key={th} className={styles.th}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.map((job,i)=>{
                  const [bg,color]=(statColors[job.status]||"#f3f4f6|#6b7280").split("|");
                  return (
                    <tr key={i} className={styles.tbodyRow}>
                      <td className={styles.td}>
                        <div className={styles.jobTitle}>{job.title}</div>
                        <div className={styles.jobType}>{job.type}</div>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.appsCount}>{job.apps}</span>
                        {job.newApps>0&&<span className={styles.newAppsBadge}>+{job.newApps} new</span>}
                      </td>
                      <td className={`${styles.td} ${styles.viewsCell}`}>{job.views}</td>
                      <td className={styles.td}>
                        <span className={styles.statusBadge} style={{ background:bg, color }}>{job.status}</span>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.datePosted}>Posted: {job.posted}</div>
                        <div className={styles.dateExpires}>Expires: {job.expires}</div>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.actions}>
                          {[["fa-pen","#6b7280"],["fa-eye","#2563eb"],["fa-trash","#dc2626"]].map(([icon,color],j)=>(
                            <button key={j} className={styles.actionBtn} style={{ color }}>
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
