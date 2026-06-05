'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { jobApi } from '../../../lib/api';
import { ROUTES } from '../../../lib/constants/routes';
import JobBadge from '../JobBadge';
import styles from './JobsListPage.module.css';

const currencyFormatter = new Intl.NumberFormat('en-US');

function formatSalary(job) {
  if (!job.salary_min && !job.salary_max) return job.salary || '';
  const min = job.salary_min ? `$${currencyFormatter.format(job.salary_min)}` : '';
  const max = job.salary_max ? `$${currencyFormatter.format(job.salary_max)}` : '';
  if (job.salary_min && job.salary_max) return `${min} - ${max}`;
  return min || max;
}

function transformJob(job) {
  const summary = job.summary
    || (job.description && (job.description.length > 120
      ? job.description.substring(0, 120) + '...'
      : job.description))
    || '';

  return {
    id: job.id,
    type: job.employment_type || 'Full Time',
    title: job.title,
    company: job.company_name || job.company?.name || '',
    location: job.location || '',
    salary: formatSalary(job),
    summary,
    logo: job.logo || '',
    featured: job.featured || false,
  };
}

const FILTERS = [
  { title: 'Job Type', items: [['Full Time/Permanent', '12'], ['Contract', '33'], ['Part Time', '18'], ['Internship', '11'], ['Freelance', '9']] },
  { title: 'Location', items: [['Fairbanks', '8'], ['Bessemer', '6'], ['Barrington', '4'], ['Durant', '3'], ['Blaine', '2']] },
  { title: 'Industry', items: [['Information Technology', '22'], ['Advertising/PR', '15'], ['Media & Comms', '13'], ['Fashion', '9']] },
  { title: 'Salary Range', items: [['$2k - $4k', '12'], ['$4k - $6k', '9'], ['$6k - $10k', '6'], ['$10k+', '4']] },
];

export default function JobsListPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await jobApi.getJobs();
        if (isMounted) setJobs(data.map(transformJob));
      } catch (err) {
        if (isMounted) setError('Failed to load jobs');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return <div className={styles.stateCenter}>Loading jobs...</div>;
  }

  if (error) {
    return <div className={styles.stateError}>Error: {error}</div>;
  }

  if (jobs.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3 className={styles.emptyTitle}>No jobs found</h3>
        <p className={styles.emptyText}>Check back later or sign up as an employer to post a job.</p>
        <button
          onClick={() => router.push(ROUTES.AUTH.SIGNUP)}
          className="btn btn-primary"
        >
          Create Account
        </button>
      </div>
    );
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroEyebrow}>Browse Opportunities</span>
          <h1 className={styles.heroTitle}>Find a role that matches your ambition</h1>
          <p className={styles.heroSubtitle}>Search thousands of curated openings across industries, experience levels, and locations.</p>
          <div className={styles.searchPanel}>
            <div className={styles.searchGrid}>
              {[
                { icon: 'fa-search', placeholder: 'Job title, keyword or company', type: 'text' },
                { icon: 'fa-map-marker', type: 'select', opts: ['Location', 'Fairbanks', 'Bessemer', 'Barrington', 'Durant'] },
                { icon: 'fa-briefcase', type: 'select', opts: ['Category', 'Design', 'Technology', 'Marketing', 'Finance'] },
              ].map((f, i) => (
                <label key={i} className={styles.searchField}>
                  <i className={`fa ${f.icon} ${styles.searchIcon}`} />
                  {f.type === 'text'
                    ? <input type="text" placeholder={f.placeholder} className={styles.searchInput} />
                    : <select className={styles.searchSelect}>{f.opts.map((o, j) => <option key={j}>{o}</option>)}</select>}
                </label>
              ))}
              <button className={styles.searchBtn}><i className="fa fa-search" /></button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.listSection}>
        <div className={styles.listInner}>
          <div className={styles.layout}>
            <aside>
              {FILTERS.map((card, i) => (
                <div key={i} className={styles.filterCard}>
                  <h5 className={styles.filterTitle}>{card.title}</h5>
                  <ul className={styles.filterList}>
                    {card.items.map(([label, count], j) => (
                      <li key={j} className={styles.filterItem}>
                        <label className={styles.filterLabel}>
                          <span><input type="checkbox" className={styles.filterCheckbox} />{label}</span>
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
                  <h2 className={styles.resultsCount}>{jobs.length} Jobs Found</h2>
                  <span className={styles.resultsRange}>Showing 1 - {jobs.length} of {jobs.length} results</span>
                </div>
                <div className={styles.resultsControls}>
                  <div className={styles.viewToggle}>
                    {['fa-th-large', 'fa-bars'].map((icon, i) => (
                      <button key={i} className={`${styles.viewBtn} ${i === 1 ? styles.viewBtnActive : ''}`}>
                        <i className={`fa ${icon}`} />
                      </button>
                    ))}
                  </div>
                  <select className={styles.sortSelect}>
                    <option>Most recent</option><option>Salary (High to Low)</option><option>Featured</option>
                  </select>
                </div>
              </div>

              <div className={styles.jobList}>
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className={`job-card${job.featured ? ' job-card--featured' : ''}`}
                  >
                    <div className={styles.badgeWrap}>
                      <JobBadge type={job.type} />
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.logoBox}>
                        {job.logo ? (
                          <img src={job.logo} alt={job.company} className={styles.logoImg} onError={(e) => { e.target.src = 'https://via.placeholder.com/70?text=Logo'; }} />
                        ) : (
                          <div className={styles.logoPlaceholder}>No Logo</div>
                        )}
                      </div>
                      <div className={styles.jobMain}>
                        <h4 className={styles.jobTitle}>
                          <a onClick={() => router.push(ROUTES.JOBS.DETAIL(job.id))} className={styles.jobLink}>{job.title}</a>
                        </h4>
                        <div className={styles.metaRow}>
                          {[['fa-briefcase', job.company], ['fa-map-marker', job.location], ['fa-money', job.salary]].map(([icon, text], j) => (
                            <span key={j} className={styles.metaItem}>
                              <i className={`fa ${icon} ${styles.metaIcon}`} />{text}
                            </span>
                          ))}
                        </div>
                        <p className={styles.jobSummary}>{job.summary}</p>
                      </div>
                      <div className={styles.jobActions}>
                        <button onClick={() => router.push(ROUTES.JOBS.DETAIL(job.id))} className={styles.viewBtnOutline}>View Details</button>
                        <button className={styles.saveBtn}>☆</button>
                      </div>
                    </div>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardFooterText}>Posted Mar 07, 2025</span>
                      <span className={styles.cardFooterText}>ID: {job.id}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.pagination}>
                {['Previous', '1', '2', '3', 'Next'].map((p, i) => {
                  const cls = [styles.pageBtn];
                  if (p === '1') cls.push(styles.pageBtnActive);
                  else if (p === 'Previous') cls.push(styles.pageBtnMuted);
                  return <button key={i} className={cls.join(' ')}>{p}</button>;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
