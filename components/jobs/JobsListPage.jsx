'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { jobApi } from '../../lib/api';
import { ROUTES } from '../../lib/constants/routes';
import JobBadge from './JobBadge';

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
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading jobs...</div>;
  }

  if (error) {
    return <div style={{ padding: 40, color: '#dc2626', textAlign: 'center' }}>Error: {error}</div>;
  }

  if (jobs.length === 0) {
    return (
      <div style={{ padding: 80, textAlign: 'center' }}>
        <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1f2937', marginBottom: 12 }}>No jobs found</h3>
        <p style={{ color: '#6b7280', marginBottom: 24 }}>Check back later or sign up as an employer to post a job.</p>
        <button
          onClick={() => router.push(ROUTES.AUTH.SIGNUP)}
          style={{ padding: '12px 24px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}
        >
          Create Account
        </button>
      </div>
    );
  }

  return (
    <>
      <section style={{ background: 'linear-gradient(120deg,#dbeafe,#e0e7ff,#dcfce7)', padding: '60px 0', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', borderRadius: 30, fontSize: 12, fontWeight: 600, color: '#2563eb', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 20 }}>Browse Opportunities</span>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: '#1f2937', margin: '0 0 12px', lineHeight: 1.2 }}>Find a role that matches your ambition</h1>
          <p style={{ fontSize: 16, color: '#6b7280', marginBottom: 28 }}>Search thousands of curated openings across industries, experience levels, and locations.</p>
          <div style={{ background: '#fff', padding: 20, borderRadius: 16, boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '5fr 3fr 3fr 1fr', gap: 12 }}>
              {[
                { icon: 'fa-search', placeholder: 'Job title, keyword or company', type: 'text' },
                { icon: 'fa-map-marker', type: 'select', opts: ['Location', 'Fairbanks', 'Bessemer', 'Barrington', 'Durant'] },
                { icon: 'fa-briefcase', type: 'select', opts: ['Category', 'Design', 'Technology', 'Marketing', 'Finance'] },
              ].map((f, i) => (
                <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10, padding: '0 14px', height: 50 }}>
                  <i className={`fa ${f.icon}`} style={{ color: '#2563eb', fontSize: 15 }} />
                  {f.type === 'text'
                    ? <input type="text" placeholder={f.placeholder} style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, flex: 1 }} />
                    : <select style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, flex: 1 }}>{f.opts.map((o, j) => <option key={j}>{o}</option>)}</select>}
                </label>
              ))}
              <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, height: 50, fontSize: 18, cursor: 'pointer' }}><i className="fa fa-search" /></button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#f9fafb', padding: '40px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
            <aside>
              {FILTERS.map((card, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', padding: 24, marginBottom: 20 }}>
                  <h5 style={{ fontSize: 16, fontWeight: 700, color: '#1f2937', marginBottom: 16 }}>{card.title}</h5>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {card.items.map(([label, count], j) => (
                      <li key={j} style={{ marginBottom: 10 }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: '#4b5563', fontSize: 14 }}>
                          <span><input type="checkbox" style={{ marginRight: 10, accentColor: '#2563eb' }} />{label}</span>
                          <span style={{ fontSize: 11, color: '#9ca3af', background: '#f3f4f6', padding: '2px 8px', borderRadius: 10 }}>{count}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </aside>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1f2937', marginBottom: 4 }}>{jobs.length} Jobs Found</h2>
                  <span style={{ fontSize: 14, color: '#6b7280' }}>Showing 1 - {jobs.length} of {jobs.length} results</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
                    {['fa-th-large', 'fa-bars'].map((icon, i) => (
                      <button key={i} style={{ padding: '10px 14px', border: 'none', background: i === 1 ? '#2563eb' : '#fff', color: i === 1 ? '#fff' : '#6b7280', cursor: 'pointer', fontSize: 14 }}>
                        <i className={`fa ${icon}`} />
                      </button>
                    ))}
                  </div>
                  <select style={{ padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 14, color: '#4b5563', outline: 'none' }}>
                    <option>Most recent</option><option>Salary (High to Low)</option><option>Featured</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="job-card"
                    style={{ background: job.featured ? '#f0f7ff' : '#fff', borderRadius: 16, border: `1px solid ${job.featured ? '#2563eb' : '#e5e7eb'}`, padding: 24, transition: 'all 0.3s' }}
                  >
                    <div style={{ marginBottom: 14 }}>
                      <JobBadge type={job.type} />
                    </div>
                    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                      <div style={{ width: 70, height: 70, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                        {job.logo ? (
                          <img src={job.logo} alt={job.company} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/70?text=Logo'; }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 12 }}>No Logo</div>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: 18, fontWeight: 700, color: '#1f2937', marginBottom: 8 }}>
                          <a onClick={() => router.push(ROUTES.JOBS.DETAIL(job.id))} style={{ color: 'inherit', cursor: 'pointer', textDecoration: 'none' }}>{job.title}</a>
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 10 }}>
                          {[['fa-briefcase', job.company], ['fa-map-marker', job.location], ['fa-money', job.salary]].map(([icon, text], j) => (
                            <span key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#6b7280' }}>
                              <i className={`fa ${icon}`} style={{ color: '#2563eb' }} />{text}
                            </span>
                          ))}
                        </div>
                        <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{job.summary}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end', flexShrink: 0 }}>
                        <button onClick={() => router.push(ROUTES.JOBS.DETAIL(job.id))} style={{ padding: '10px 20px', border: '1px solid #17d27c', color: '#17d27c', background: 'transparent', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>View Details</button>
                        <button style={{ width: 40, height: 40, border: '1px solid #e5e7eb', background: '#fff', borderRadius: 10, cursor: 'pointer', fontSize: 14, color: '#6b7280' }}>☆</button>
                      </div>
                    </div>
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: '#9ca3af' }}>Posted Mar 07, 2025</span>
                      <span style={{ fontSize: 13, color: '#9ca3af' }}>ID: {job.id}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', gap: 8 }}>
                {['Previous', '1', '2', '3', 'Next'].map((p, i) => (
                  <button key={i} style={{ padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: 10, background: p === '1' ? '#2563eb' : '#fff', color: p === '1' ? '#fff' : p === 'Previous' ? '#9ca3af' : '#4b5563', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
