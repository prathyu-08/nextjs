'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { jobApi } from '../../../lib/api';
import { ROUTES } from '../../../lib/constants/routes';
import styles from './JobDetailPage.module.css';

function transformJob(data) {
  return {
    id: data.id,
    type: data.type || data.employment_type || 'Full Time',
    title: data.title,
    company: data.company_name || data.company?.name || '',
    location: data.location,
    salary: data.salary || '',
    summary: data.description || data.summary || '',
    logo: data.logo || '',
    featured: data.featured || false,
    postedDate: data.created_at
      ? new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : 'May 19, 2025',
  };
}

function transformRelated(data) {
  return {
    id: data.id,
    type: data.type || data.employment_type || 'Full Time',
    title: data.title,
    salary: data.salary || '',
    location: data.location,
    logo: data.logo || '',
    posted: data.created_at
      ? new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : 'May 11, 2025',
    featured: data.featured || false,
  };
}

export default function JobDetailPage({ jobId }) {
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await jobApi.getJobById(jobId);
        if (!isMounted) return;
        setJob(transformJob(data));

        const allJobs = await jobApi.getJobs();
        if (!isMounted) return;
        setRelated(allJobs.filter(j => j.id !== data.id).slice(0, 3).map(transformRelated));
      } catch (err) {
        if (!isMounted) return;
        setError(err.response?.data?.detail || err.message || 'Failed to load job details');
        setJob(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [jobId]);

  if (loading) return <div className={styles.stateCenter}>Loading job details...</div>;
  if (error) {
    return (
      <div className={styles.errorBox}>
        <h3>Failed to load job details</h3>
        <p className={styles.errorDetail}>{error}</p>
        <button
          onClick={() => router.push(ROUTES.JOBS.LIST)}
          className={styles.backBtn}
        >
          ← Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <>
      {/* JobPosting JSON-LD structured data for SEO */}
      {job && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'JobPosting',
            title: job.title,
            description: job.summary,
            datePosted: job.postedDate,
            employmentType: job.type,
            hiringOrganization: {
              '@type': 'Organization',
              name: job.company,
              logo: job.logo,
            },
            jobLocation: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: job.location,
              },
            },
            identifier: { '@type': 'PropertyValue', name: job.company, value: String(job.id) },
          }) }}
        />
      )}

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroRow}>
            <div className={styles.heroLeft}>
              <div className={styles.logoBox}>
                {job?.logo ? (
                  <img src={job.logo} alt={job.company || 'Company'} className={styles.logoImg} onError={(e) => { e.target.src = 'https://via.placeholder.com/72?text=Logo'; }} />
                ) : (
                  <div className={styles.logoPlaceholder}>?</div>
                )}
              </div>
              <div>
                <span className={styles.jobType}>{job?.type}</span>
                <h1 className={styles.jobTitle}>{job?.title}</h1>
                <div className={styles.metaRow}>
                  {[['fa-location-dot', job?.location], ['fa-briefcase', job?.type], ['fa-money-bill-wave', job?.salary]].map(([icon, text], i) => (
                    <span key={i} className={styles.metaPill}>
                      <i className={`fa-solid ${icon} ${styles.metaPillIcon}`} />{text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.heroActions}>
              <button className={styles.applyBtn}><i className={`fa-solid fa-paper-plane ${styles.iconLeading}`} />Apply Now</button>
              <button className={styles.saveBtn}>☆ Save Job</button>
            </div>
          </div>
          <div className={styles.snapshotStrip}>
            {[['fa-calendar', 'Posted On', job?.postedDate], ['fa-user-tie', 'Seniority', 'Lead / Manager'], ['fa-building', 'Company', job?.company], ['fa-clock', 'Working Time', 'Mon - Fri · 9am-5pm']].map(([icon, label, value], i) => (
              <div key={i} className={styles.snapshotItem}>
                <i className={`fa-solid ${icon} ${styles.snapshotIcon}`} />
                <div>
                  <div className={styles.snapshotLabel}>{label}</div>
                  <div className={styles.snapshotValue}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentInner}>
          <div className={styles.contentLayout}>
            <div>
              {[
                { h: 'Role Overview', tag: 'h2', content: <p className={styles.bodyText}>{job?.summary}</p> },
                { h: "What You'll Do", tag: 'h3', content: (
                  <ul className={styles.bulletList}>
                    {['Own the roadmap aligned with business OKRs and financial goals.', 'Mentor team leads and coordinate delivery ceremonies.', 'Partner with security and infrastructure to maintain SLAs.', 'Present delivery status and risk assessments to leadership.', 'Continuously refine workflows by analyzing throughput and quality.'].map((li, i) => (
                      <li key={i} className={styles.bulletItem}>{li}</li>
                    ))}
                  </ul>
                ) },
                { h: 'Skills & Experience', tag: 'h3', content: (
                  <ul className={styles.bulletList}>
                    {['5+ years leading enterprise software implementations.', 'Hands-on experience with relevant platforms.', 'Working knowledge of Agile practices and modern DevOps tooling.', 'Comfort presenting to senior leadership across time zones.', 'Strong communication, stakeholder management, change enablement.'].map((li, i) => (
                      <li key={i} className={styles.bulletItem}>{li}</li>
                    ))}
                  </ul>
                ) },
                { h: 'Benefits & Perks', tag: 'h3', content: (
                  <div className={styles.perkRow}>
                    {['Annual bonus', 'Hybrid work flexibility', 'Private medical cover', 'Learning stipend', 'Wellness allowance', 'Visa sponsorship'].map((t, i) => (
                      <span key={i} className={styles.perkTag}>{t}</span>
                    ))}
                  </div>
                ) },
              ].map((sec, i) => (
                <div key={i} className={styles.sectionCard}>
                  {sec.tag === 'h2'
                    ? <h2 className={styles.sectionH2}>{sec.h}</h2>
                    : <h3 className={styles.sectionH3}>{sec.h}</h3>}
                  {sec.content}
                </div>
              ))}
              <div className={styles.applyCard}>
                <div>
                  <h3 className={styles.applyCardTitle}>How to Apply</h3>
                  <p className={styles.bodyTextFlush}>Attach your updated resume and share a short note about your relevant experience.</p>
                </div>
                <button className={styles.submitBtn}><i className={`fa-solid fa-cloud-upload ${styles.iconLeading}`} />Submit Application</button>
              </div>
            </div>

            <aside>
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Job Snapshot</h3>
                <ul className={styles.snapshotList}>
                  {[['fa-hashtag', 'Job ID', job?.id], ['fa-map-pin', 'Location', job?.location], ['fa-people-group', 'Team Size', '25+ collaborators'], ['fa-sack-dollar', 'Compensation', job?.salary], ['fa-briefcase', 'Employment', job?.type], ['fa-graduation-cap', 'Education', "Master's preferred"]].map(([icon, label, val], i) => (
                    <li key={i} className={styles.snapshotRow}>
                      <i className={`fa-solid ${icon} ${styles.snapshotRowIcon}`} />
                      <span className={styles.snapshotRowLabel}>{label}</span>
                      <strong className={styles.snapshotRowValue}>{val}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Contact the hiring team</h3>
                <div className={styles.contactForm}>
                  <div>
                    <label className={styles.fieldLabel}>Full name</label>
                    <input type="text" placeholder="Alex Morgan" className={styles.fieldInput} />
                  </div>
                  <div>
                    <label className={styles.fieldLabel}>Email address</label>
                    <input type="email" placeholder="you@email.com" className={styles.fieldInput} />
                  </div>
                  <div>
                    <label className={styles.fieldLabel}>Message</label>
                    <textarea rows={4} placeholder="Share a short note…" className={styles.fieldTextarea} />
                  </div>
                  <button className={styles.sendBtn}>Send Message</button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.relatedSection}>
        <div className={styles.relatedInner}>
          <div className={styles.relatedHeader}>
            <div className={styles.relatedEyebrow}>Explore More Roles</div>
            <h3 className={styles.relatedTitle}>Related Opportunities</h3>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((job) => (
              <div key={job.id} className={`${styles.relatedCard}${job.featured ? ' ' + styles.relatedCardFeatured : ''}`}>
                <div className={styles.relatedBadgeWrap}>
                  <span className={styles.relatedBadge}>{job.type}</span>
                </div>
                <h4 className={styles.relatedTitleSm}>
                  <a onClick={() => router.push(ROUTES.JOBS.DETAIL(job.id))} className={styles.relatedLink}>{job.title}</a>
                </h4>
                <div className={styles.relatedSalary}>Salary: <strong className={styles.relatedSalaryStrong}>{job.salary}</strong></div>
                <div className={styles.relatedLocation}><i className={`fa-solid fa-location-dot ${styles.iconLeading}`} />{job.location}</div>
                <div className={styles.relatedFooter}>
                  <div className={styles.relatedFooterLeft}>
                    <img src={job.logo} alt="" className={styles.relatedLogo} />
                    <span className={styles.relatedPosted}>Posted {job.posted}</span>
                  </div>
                  <button onClick={() => router.push(ROUTES.JOBS.DETAIL(job.id))} className={styles.relatedViewBtn}>View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
