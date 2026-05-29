'use client';
import { useState, useEffect, useRef } from 'react';
import CandidateSidebar from '../../../../components/layout/sidebars/CandidateSidebar';
import api from '../../../../lib/api';

// ─── Shared styles ─────────────────────────────────────────────────────────
const fieldStyle = {
  width: '100%', height: 42, padding: '9px 13px',
  border: '1px solid #d7e1ed', borderRadius: 10,
  background: '#f8fafc', color: '#0f172a',
  fontSize: 13, boxSizing: 'border-box', outline: 'none',
};
const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 700,
  color: '#0f172a', marginBottom: 7,
};
const btnPrimary = {
  padding: '10px 20px', border: '1px solid #2563eb', borderRadius: 10,
  background: '#2563eb', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 13,
};
const btnSecondary = {
  padding: '10px 20px', border: '1px solid #94a3b8', borderRadius: 10,
  background: '#fff', color: '#475569', fontWeight: 700, cursor: 'pointer', fontSize: 13,
};
const btnDanger = {
  padding: '6px 12px', border: '1px solid #fecaca', borderRadius: 8,
  background: '#fef2f2', color: '#dc2626', fontWeight: 600, cursor: 'pointer', fontSize: 12,
};

// ─── Reusable UI ───────────────────────────────────────────────────────────
function Modal({ title, children, open, onClose, onSave, saving, error }) {
  if (!open) return null;
  return (
    <div onMouseDown={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(15,23,42,.65)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, backdropFilter: 'blur(3px)' }}>
      <div onMouseDown={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 560, background: '#fff',
          borderRadius: 18, boxShadow: '0 30px 80px rgba(15,23,42,.32)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #edf2f7',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ margin: '0 0 3px', color: '#2563eb', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: .4 }}>Candidate Profile</p>
            <h3 style={{ margin: 0, fontSize: 20, color: '#0f172a', fontWeight: 800 }}>{title}</h3>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, border: 0, borderRadius: '50%', background: '#f1f5f9', color: '#475569', cursor: 'pointer' }}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div style={{ padding: 24 }}>
          {children}
          {error && <p style={{ margin: '14px 0 0', color: '#dc2626', fontSize: 13, fontWeight: 700 }}>{error}</p>}
        </div>
        <div style={{ padding: '16px 24px 22px', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button onClick={onClose} style={btnSecondary}>Cancel</button>
          <button onClick={onSave} disabled={saving} style={{ ...btnPrimary, opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, span = 1 }) {
  return (
    <label style={{ display: 'block', gridColumn: `span ${span}` }}>
      <span style={labelStyle}>{label}</span>
      {children}
    </label>
  );
}

function Section({ eyebrow, title, subtitle, action, children }) {
  return (
    <section style={{ background: '#fff', border: '1px solid #e8eef6', borderRadius: 20, padding: 26, marginBottom: 28, boxShadow: '0 16px 40px rgba(15,23,42,.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 18 }}>
        <div>
          <p style={{ margin: '0 0 5px', fontSize: 10, letterSpacing: .5, textTransform: 'uppercase', color: '#475569', fontWeight: 700 }}>{eyebrow}</p>
          <h2 style={{ margin: '0 0 2px', fontSize: 18, color: '#0f172a', fontWeight: 800 }}>{title}</h2>
          <p style={{ margin: 0, fontSize: 14, color: '#475569' }}>{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Toast({ msg, type }) {
  if (!msg) return null;
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200, padding: '14px 20px', borderRadius: 12,
      fontWeight: 700, fontSize: 14, color: '#fff', background: type === 'error' ? '#dc2626' : '#16a34a',
      boxShadow: '0 8px 24px rgba(0,0,0,.2)', display: 'flex', alignItems: 'center', gap: 10 }}>
      <i className={`fa-solid ${type === 'error' ? 'fa-circle-xmark' : 'fa-circle-check'}`} />
      {msg}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function EditProfilePage() {
  const fileInputRef = useRef(null);

  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [modalSaving, setModalSaving] = useState(false);
  const [toast, setToast]             = useState({ msg: '', type: 'success' });

  const [profile, setProfile] = useState({
    full_name: '', email: '', phone_number: '',
    resume_headline: '', profile_summary: '',
    current_location: '', preferred_location: '',
    total_experience: '', current_ctc: '', expected_ctc: '',
    notice_period: '', willing_to_relocate: false,
    preferred_shift: '', employment_type_preference: '',
    linkedin_url: '', github_url: '', portfolio_url: '',
    public_username: '', visibility: 'public',
    profile_picture: null,
  });

  const [education, setEducation]   = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills]         = useState([]);
  const [projects, setProjects]     = useState([]);

  const [modal, setModal]           = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [modalError, setModalError] = useState('');

  const [skillForm, setSkillForm] = useState({ name: '', proficiency: 'Intermediate', years_of_experience: '' });
  const [expForm, setExpForm]     = useState({ company_name: '', role: '', start_date: '', end_date: '', is_current: false, description: '' });
  const [eduForm, setEduForm]     = useState({ institution: '', degree: '', field_of_study: '', start_year: '', end_year: '', grade: '' });
  const [projForm, setProjForm]   = useState({ title: '', description: '', technologies_used: '', project_url: '', start_date: '', end_date: '' });

  useEffect(() => { loadFullProfile(); }, []);

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3500);
  }

  async function loadFullProfile() {
    setLoading(true);
    try {
      const data = await api.candidateApi.getFullProfile();
      setProfile({
        full_name:                  data.full_name || '',
        email:                      data.email || '',
        phone_number:               data.phone_number || '',
        resume_headline:            data.resume_headline || '',
        profile_summary:            data.profile_summary || '',
        current_location:           data.current_location || '',
        preferred_location:         data.preferred_location || '',
        total_experience:           data.total_experience ?? '',
        current_ctc:                data.current_ctc ?? '',
        expected_ctc:               data.expected_ctc ?? '',
        notice_period:              data.notice_period || '',
        willing_to_relocate:        data.willing_to_relocate || false,
        preferred_shift:            data.preferred_shift || '',
        employment_type_preference: data.employment_type_preference || '',
        linkedin_url:               data.linkedin_url || '',
        github_url:                 data.github_url || '',
        portfolio_url:              data.portfolio_url || '',
        public_username:            data.public_username || '',
        visibility:                 data.visibility || 'public',
        profile_picture:            data.profile_picture || null,
      });
      setEducation(data.education   || []);
      setExperience(data.experience || []);
      setSkills(data.skills         || []);
      setProjects(data.projects     || []);
    } catch {
      showToast('Failed to load profile. Please refresh.', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveProfile() {
    setSaving(true);
    try {
      await api.candidateApi.updateProfile({
        resume_headline:            profile.resume_headline || null,
        profile_summary:            profile.profile_summary || null,
        current_location:           profile.current_location || null,
        preferred_location:         profile.preferred_location || null,
        total_experience:           profile.total_experience !== '' ? parseFloat(profile.total_experience) : null,
        current_ctc:                profile.current_ctc !== ''      ? parseFloat(profile.current_ctc)      : null,
        expected_ctc:               profile.expected_ctc !== ''     ? parseFloat(profile.expected_ctc)     : null,
        notice_period:              profile.notice_period || null,
        willing_to_relocate:        profile.willing_to_relocate,
        preferred_shift:            profile.preferred_shift || null,
        employment_type_preference: profile.employment_type_preference || null,
        linkedin_url:               profile.linkedin_url || null,
        github_url:                 profile.github_url || null,
        portfolio_url:              profile.portfolio_url || null,
        public_username:            profile.public_username || null,
        visibility:                 profile.visibility,
        phone_number:               profile.phone_number || null,
      });
      showToast('Profile saved successfully!');
    } catch (err) {
      showToast(err.response?.data?.detail || 'Failed to save profile.', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handlePhotoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await api.candidateApi.uploadProfilePicture(fd);
      setProfile(p => ({ ...p, profile_picture: res.s3_key }));
      showToast('Photo updated!');
    } catch {
      showToast('Failed to upload photo.', 'error');
    }
  }

  function openAddModal(type) {
    setModalError(''); setEditTarget(null);
    if (type === 'skill')      setSkillForm({ name: '', proficiency: 'Intermediate', years_of_experience: '' });
    if (type === 'experience') setExpForm({ company_name: '', role: '', start_date: '', end_date: '', is_current: false, description: '' });
    if (type === 'education')  setEduForm({ institution: '', degree: '', field_of_study: '', start_year: '', end_year: '', grade: '' });
    if (type === 'project')    setProjForm({ title: '', description: '', technologies_used: '', project_url: '', start_date: '', end_date: '' });
    setModal(type);
  }

  function openEditModal(type, item) {
    setModalError(''); setEditTarget(item);
    if (type === 'experience') setExpForm({
      company_name: item.company_name || '', role: item.role || '',
      start_date: item.start_date ? item.start_date.slice(0,10) : '',
      end_date:   item.end_date   ? item.end_date.slice(0,10)   : '',
      is_current: item.is_current || false, description: item.description || '',
    });
    if (type === 'education') setEduForm({
      institution: item.institution || '', degree: item.degree || '',
      field_of_study: item.field_of_study || '', start_year: item.start_year || '',
      end_year: item.end_year || '', grade: item.grade || '',
    });
    if (type === 'project') setProjForm({
      title: item.title || '', description: item.description || '',
      technologies_used: item.technologies_used || '', project_url: item.project_url || '',
      start_date: item.start_date ? item.start_date.slice(0,10) : '',
      end_date:   item.end_date   ? item.end_date.slice(0,10)   : '',
    });
    setModal(type);
  }

  // Skills
  async function handleSaveSkill() {
    if (!skillForm.name.trim()) { setModalError('Skill name is required.'); return; }
    setModalSaving(true);
    try {
      const updatedSkills = [
        ...skills.filter(s => s.name.toLowerCase() !== skillForm.name.trim().toLowerCase())
                 .map(s => ({ name: s.name, proficiency: s.proficiency, years_of_experience: s.years_of_experience })),
        { name: skillForm.name.trim(), proficiency: skillForm.proficiency || null,
          years_of_experience: skillForm.years_of_experience ? parseFloat(skillForm.years_of_experience) : null },
      ];
      const res = await api.candidateApi.updateSkills(updatedSkills);
      setSkills(res.skills?.map(s => ({ id: s.skill?.id, name: s.skill?.name, proficiency: s.proficiency, years_of_experience: s.years_of_experience })) || updatedSkills);
      setModal(null); showToast('Skill saved!');
    } catch (err) { setModalError(err.response?.data?.detail || 'Failed to save skill.'); }
    finally { setModalSaving(false); }
  }

  async function handleDeleteSkill(skillName) {
    try {
      const updated = skills.filter(s => s.name !== skillName).map(s => ({ name: s.name, proficiency: s.proficiency, years_of_experience: s.years_of_experience }));
      await api.candidateApi.updateSkills(updated);
      setSkills(prev => prev.filter(s => s.name !== skillName));
      showToast('Skill removed.');
    } catch { showToast('Failed to remove skill.', 'error'); }
  }

  // Experience
  async function handleSaveExperience() {
    if (!expForm.company_name.trim() || !expForm.role.trim()) { setModalError('Company and role are required.'); return; }
    setModalSaving(true);
    try {
      const payload = { company_name: expForm.company_name, role: expForm.role,
        start_date: expForm.start_date || null,
        end_date: expForm.is_current ? null : (expForm.end_date || null),
        is_current: expForm.is_current, description: expForm.description || null };
      if (editTarget) {
        await api.candidateApi.updateExperience(editTarget.id, payload);
        setExperience(prev => prev.map(e => e.id === editTarget.id ? { ...e, ...payload } : e));
        showToast('Experience updated!');
      } else {
        const res = await api.candidateApi.addExperience(payload);
        setExperience(prev => [...prev, { id: res.id, ...payload }]);
        showToast('Experience added!');
      }
      setModal(null);
    } catch (err) { setModalError(err.response?.data?.detail || 'Failed to save experience.'); }
    finally { setModalSaving(false); }
  }

  async function handleDeleteExperience(id) {
    if (!confirm('Delete this experience?')) return;
    try { await api.candidateApi.deleteExperience(id); setExperience(prev => prev.filter(e => e.id !== id)); showToast('Deleted.'); }
    catch { showToast('Failed to delete.', 'error'); }
  }

  // Education
  async function handleSaveEducation() {
    if (!eduForm.institution.trim()) { setModalError('Institution is required.'); return; }
    setModalSaving(true);
    try {
      const payload = { institution: eduForm.institution, degree: eduForm.degree || null,
        field_of_study: eduForm.field_of_study || null,
        start_year: eduForm.start_year ? parseInt(eduForm.start_year) : null,
        end_year:   eduForm.end_year   ? parseInt(eduForm.end_year)   : null,
        grade: eduForm.grade || null };
      if (editTarget) {
        await api.candidateApi.updateEducation(editTarget.id, payload);
        setEducation(prev => prev.map(e => e.id === editTarget.id ? { ...e, ...payload } : e));
        showToast('Education updated!');
      } else {
        const res = await api.candidateApi.addEducation(payload);
        setEducation(prev => [...prev, { id: res.id, ...payload }]);
        showToast('Education added!');
      }
      setModal(null);
    } catch (err) { setModalError(err.response?.data?.detail || 'Failed to save education.'); }
    finally { setModalSaving(false); }
  }

  async function handleDeleteEducation(id) {
    if (!confirm('Delete this education?')) return;
    try { await api.candidateApi.deleteEducation(id); setEducation(prev => prev.filter(e => e.id !== id)); showToast('Deleted.'); }
    catch { showToast('Failed to delete.', 'error'); }
  }

  // Projects
  async function handleSaveProject() {
    if (!projForm.title.trim()) { setModalError('Project title is required.'); return; }
    setModalSaving(true);
    try {
      const payload = { title: projForm.title, description: projForm.description || null,
        technologies_used: projForm.technologies_used || null, project_url: projForm.project_url || null,
        start_date: projForm.start_date || null, end_date: projForm.end_date || null };
      if (editTarget) {
        await api.candidateApi.updateProject(editTarget.id, payload);
        setProjects(prev => prev.map(p => p.id === editTarget.id ? { ...p, ...payload } : p));
        showToast('Project updated!');
      } else {
        const res = await api.candidateApi.addProject(payload);
        setProjects(prev => [...prev, { id: res.id, ...payload }]);
        showToast('Project added!');
      }
      setModal(null);
    } catch (err) { setModalError(err.response?.data?.detail || 'Failed to save project.'); }
    finally { setModalSaving(false); }
  }

  async function handleDeleteProject(id) {
    if (!confirm('Delete this project?')) return;
    try { await api.candidateApi.deleteProject(id); setProjects(prev => prev.filter(p => p.id !== id)); showToast('Deleted.'); }
    catch { showToast('Failed to delete.', 'error'); }
  }

  // Loading
  if (loading) {
    return (
      <section style={{ background: 'linear-gradient(180deg,#f8fbff,#eef5ff)', minHeight: '100vh', padding: '60px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 28 }}>
          <CandidateSidebar currentPath="/candidate/edit-profile" />
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, border: '4px solid #e5e7eb', borderTopColor: '#2563eb',
                borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ color: '#64748b', fontSize: 15 }}>Loading your profile…</p>
            </div>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </section>
    );
  }

  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const avatarSrc = profile.profile_picture
    ? `${apiBase}/candidate/media/profile-picture/${profile.profile_picture}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name || 'U')}&size=96&background=2563eb&color=fff&bold=true`;

  return (
    <section style={{ background: 'linear-gradient(180deg,#f8fbff 0%,#eef5ff 100%)', minHeight: '100vh', padding: '60px 0 72px' }}>
      <style>{`
        input::placeholder, textarea::placeholder { color: #94a3b8; font-weight: 400; }
        input[readonly] { color: #64748b; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 28, alignItems: 'flex-start' }}>
        <CandidateSidebar currentPath="/candidate/edit-profile" />

        <div style={{ flex: 1, minWidth: 0 }}>

          {/* ── Header card ── */}
          <div style={{ background: '#fff', border: '1px solid #e8eef6', borderRadius: 20, padding: 28, marginBottom: 22, boxShadow: '0 16px 40px rgba(15,23,42,.06)' }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>

              {/* Left: photo stacked above upload button */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <img src={avatarSrc} alt={profile.full_name}
                  style={{ width: 96, height: 96, borderRadius: 18, objectFit: 'cover', display: 'block' }} />
                <button onClick={() => fileInputRef.current?.click()}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 14px',
                    border: '1px solid #2563eb', borderRadius: 8, background: '#fff', color: '#2563eb',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  <i className="fa-solid fa-upload" />Update Photo
                </button>
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png"
                  style={{ display: 'none' }} onChange={handlePhotoUpload} />
              </div>

              {/* Right: badge + name + tags */}
              <div style={{ flex: '1 1 360px', paddingTop: 4 }}>
                <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 999,
                  background: '#e8efff', color: '#2563eb', fontSize: 11, fontWeight: 800, marginBottom: 10 }}>
                  Candidate Profile
                </span>
                <h1 style={{ margin: '0 0 5px', fontSize: 28, color: '#0f172a', fontWeight: 800, lineHeight: 1.1 }}>
                  {profile.full_name || 'Your Name'}
                </h1>
                <p style={{ margin: '0 0 14px', color: '#64748b', fontSize: 14, lineHeight: 1.5 }}>
                  {profile.resume_headline || 'No headline yet — add one below'}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {profile.email && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px',
                      borderRadius: 999, background: '#f0fdf4', color: '#166534', fontSize: 12, fontWeight: 700 }}>
                      <i className="fa-solid fa-envelope" />{profile.email}
                    </span>
                  )}
                  {profile.current_location && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px',
                      borderRadius: 999, background: '#eef4ff', color: '#2563eb', fontSize: 12, fontWeight: 700 }}>
                      <i className="fa-solid fa-location-dot" />{profile.current_location}
                    </span>
                  )}
                  {profile.employment_type_preference && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px',
                      borderRadius: 999, background: '#fef3c7', color: '#92400e', fontSize: 12, fontWeight: 700 }}>
                      <i className="fa-solid fa-briefcase" />{profile.employment_type_preference}
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* ── Personal Information ── */}
          <Section eyebrow="Profile" title="Personal Information" subtitle="These details power your public profile and application cards.">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 16 }}>
              <Field label="Full name">
                <input value={profile.full_name} readOnly title="Managed via account settings"
                  style={{ ...fieldStyle, background: '#f1f5f9', cursor: 'not-allowed' }} />
              </Field>
              <Field label="Professional headline">
                <input value={profile.resume_headline} onChange={e => setProfile(p => ({ ...p, resume_headline: e.target.value }))}
                  placeholder="e.g. Lead Product Designer" style={fieldStyle} />
              </Field>
              <Field label="Email address">
                <input value={profile.email} readOnly title="Managed via account settings"
                  style={{ ...fieldStyle, background: '#f1f5f9', cursor: 'not-allowed' }} />
              </Field>
              <Field label="Phone number">
                <input value={profile.phone_number} onChange={e => setProfile(p => ({ ...p, phone_number: e.target.value }))}
                  placeholder="e.g. +1 234 567 890" style={fieldStyle} />
              </Field>
              <Field label="Current location">
                <input value={profile.current_location} onChange={e => setProfile(p => ({ ...p, current_location: e.target.value }))}
                  placeholder="e.g. New York, USA" style={fieldStyle} />
              </Field>
              <Field label="Preferred location">
                <input value={profile.preferred_location} onChange={e => setProfile(p => ({ ...p, preferred_location: e.target.value }))}
                  placeholder="e.g. Remote / San Francisco" style={fieldStyle} />
              </Field>
              <Field label="LinkedIn URL">
                <input value={profile.linkedin_url} onChange={e => setProfile(p => ({ ...p, linkedin_url: e.target.value }))}
                  placeholder="https://linkedin.com/in/yourname" style={fieldStyle} />
              </Field>
              <Field label="GitHub URL">
                <input value={profile.github_url} onChange={e => setProfile(p => ({ ...p, github_url: e.target.value }))}
                  placeholder="https://github.com/yourname" style={fieldStyle} />
              </Field>
              <Field label="Portfolio URL">
                <input value={profile.portfolio_url} onChange={e => setProfile(p => ({ ...p, portfolio_url: e.target.value }))}
                  placeholder="https://yourportfolio.com" style={fieldStyle} />
              </Field>
              <Field label="Public username">
                <input value={profile.public_username} onChange={e => setProfile(p => ({ ...p, public_username: e.target.value }))}
                  placeholder="e.g. johndoe" style={fieldStyle} />
              </Field>
              <Field label="Profile visibility">
                <select value={profile.visibility} onChange={e => setProfile(p => ({ ...p, visibility: e.target.value }))} style={fieldStyle}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="recruiters_only">Recruiters Only</option>
                </select>
              </Field>
              <Field label="Profile summary" span={4}>
                <textarea value={profile.profile_summary} onChange={e => setProfile(p => ({ ...p, profile_summary: e.target.value }))}
                  placeholder="Describe your background, key strengths and what you're looking for next…"
                  style={{ ...fieldStyle, height: 98, resize: 'vertical', lineHeight: 1.55 }} />
              </Field>
            </div>
          </Section>

          {/* ── Professional Snapshot ── */}
          <Section eyebrow="Career" title="Professional Snapshot" subtitle="Availability, compensation and work preferences.">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 16 }}>
              <Field label="Total experience (years)">
                <input type="number" min="0" step="0.5" value={profile.total_experience}
                  onChange={e => setProfile(p => ({ ...p, total_experience: e.target.value }))}
                  placeholder="e.g. 5" style={fieldStyle} />
              </Field>
              <Field label="Current CTC (annual)">
                <input type="number" min="0" value={profile.current_ctc}
                  onChange={e => setProfile(p => ({ ...p, current_ctc: e.target.value }))}
                  placeholder="e.g. 60000" style={fieldStyle} />
              </Field>
              <Field label="Expected CTC (annual)">
                <input type="number" min="0" value={profile.expected_ctc}
                  onChange={e => setProfile(p => ({ ...p, expected_ctc: e.target.value }))}
                  placeholder="e.g. 80000" style={fieldStyle} />
              </Field>
              <Field label="Notice period">
                <input value={profile.notice_period} onChange={e => setProfile(p => ({ ...p, notice_period: e.target.value }))}
                  placeholder="e.g. 2 weeks / Immediate" style={fieldStyle} />
              </Field>
              <Field label="Employment type preference">
                <select value={profile.employment_type_preference} onChange={e => setProfile(p => ({ ...p, employment_type_preference: e.target.value }))} style={fieldStyle}>
                  <option value="">Select…</option>
                  {['Full-time','Part-time','Contract','Freelance','Internship'].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Preferred shift">
                <select value={profile.preferred_shift} onChange={e => setProfile(p => ({ ...p, preferred_shift: e.target.value }))} style={fieldStyle}>
                  <option value="">Select…</option>
                  {['Day','Night','Flexible'].map(o => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Willing to relocate">
                <select value={profile.willing_to_relocate ? 'yes' : 'no'} onChange={e => setProfile(p => ({ ...p, willing_to_relocate: e.target.value === 'yes' }))} style={fieldStyle}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </Field>
            </div>
          </Section>

          {/* ── Skills ── */}
          <Section eyebrow="Skills" title="Skills & Tools" subtitle="Highlight stacks, frameworks and certifications."
            action={<button onClick={() => openAddModal('skill')} style={{ ...btnSecondary, padding: '8px 14px' }}><i className="fa-solid fa-circle-plus" style={{ marginRight: 7 }} />Add skill</button>}>
            {skills.length === 0
              ? <p style={{ color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '12px 0' }}>No skills added yet.</p>
              : <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
                  {skills.map(sk => (
                    <span key={sk.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 11px', borderRadius: 999, background: '#dbeafe', color: '#2563eb', fontSize: 12, fontWeight: 800 }}>
                      {sk.name}
                      {sk.proficiency && <span style={{ opacity: 0.7 }}>· {sk.proficiency}</span>}
                      <button onClick={() => handleDeleteSkill(sk.name)} style={{ border: 0, background: 'transparent', color: '#2563eb', cursor: 'pointer', padding: 0, lineHeight: 1 }}>
                        <i className="fa-solid fa-xmark" />
                      </button>
                    </span>
                  ))}
                </div>}
          </Section>

          {/* ── Experience ── */}
          <Section eyebrow="Experience" title="Work Experience" subtitle="Your professional journey — most recent first."
            action={<button onClick={() => openAddModal('experience')} style={{ ...btnSecondary, padding: '8px 14px' }}><i className="fa-solid fa-circle-plus" style={{ marginRight: 7 }} />Add experience</button>}>
            {experience.length === 0
              ? <p style={{ color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '12px 0' }}>No experience added yet.</p>
              : <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {experience.map(exp => (
                    <div key={exp.id} style={{ padding: 18, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap', gap: 8 }}>
                          <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{exp.role} — <span style={{ color: '#2563eb' }}>{exp.company_name}</span></h4>
                          {exp.is_current && <span style={{ padding: '3px 10px', borderRadius: 20, background: '#dcfce7', color: '#166534', fontSize: 11, fontWeight: 700 }}>Current</span>}
                        </div>
                        <p style={{ margin: '0 0 6px', fontSize: 12, color: '#64748b' }}>
                          {exp.start_date ? exp.start_date.slice(0,10) : ''} — {exp.is_current ? 'Present' : (exp.end_date ? exp.end_date.slice(0,10) : '')}
                        </p>
                        {exp.description && <p style={{ margin: 0, fontSize: 13, color: '#475569', lineHeight: 1.55 }}>{exp.description}</p>}
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                        <button onClick={() => openEditModal('experience', exp)} style={{ ...btnSecondary, padding: '6px 12px', fontSize: 12 }}><i className="fa-solid fa-pen" /></button>
                        <button onClick={() => handleDeleteExperience(exp.id)} style={btnDanger}><i className="fa-solid fa-trash" /></button>
                      </div>
                    </div>
                  ))}
                </div>}
          </Section>

          {/* ── Education ── */}
          <Section eyebrow="Education" title="Education" subtitle="Degrees, certifications and institutions."
            action={<button onClick={() => openAddModal('education')} style={{ ...btnSecondary, padding: '8px 14px' }}><i className="fa-solid fa-circle-plus" style={{ marginRight: 7 }} />Add education</button>}>
            {education.length === 0
              ? <p style={{ color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '12px 0' }}>No education added yet.</p>
              : <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {education.map(edu => (
                    <div key={edu.id} style={{ padding: 18, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{edu.degree}{edu.field_of_study ? ` — ${edu.field_of_study}` : ''}</h4>
                        <p style={{ margin: '0 0 4px', fontSize: 13, color: '#2563eb', fontWeight: 600 }}>{edu.institution}</p>
                        <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{edu.start_year} — {edu.end_year}{edu.grade ? ` · Grade: ${edu.grade}` : ''}</p>
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                        <button onClick={() => openEditModal('education', edu)} style={{ ...btnSecondary, padding: '6px 12px', fontSize: 12 }}><i className="fa-solid fa-pen" /></button>
                        <button onClick={() => handleDeleteEducation(edu.id)} style={btnDanger}><i className="fa-solid fa-trash" /></button>
                      </div>
                    </div>
                  ))}
                </div>}
          </Section>

          {/* ── Projects ── */}
          <Section eyebrow="Projects" title="Projects" subtitle="Showcase your best work and side projects."
            action={<button onClick={() => openAddModal('project')} style={{ ...btnSecondary, padding: '8px 14px' }}><i className="fa-solid fa-circle-plus" style={{ marginRight: 7 }} />Add project</button>}>
            {projects.length === 0
              ? <p style={{ color: '#94a3b8', fontSize: 14, textAlign: 'center', padding: '12px 0' }}>No projects added yet.</p>
              : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
                  {projects.map(proj => (
                    <div key={proj.id} style={{ padding: 18, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{proj.title}</h4>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button onClick={() => openEditModal('project', proj)} style={{ ...btnSecondary, padding: '4px 10px', fontSize: 12 }}><i className="fa-solid fa-pen" /></button>
                          <button onClick={() => handleDeleteProject(proj.id)} style={btnDanger}><i className="fa-solid fa-trash" /></button>
                        </div>
                      </div>
                      {proj.technologies_used && <p style={{ margin: '0 0 6px', fontSize: 12, color: '#2563eb', fontWeight: 600 }}>{proj.technologies_used}</p>}
                      {proj.description && <p style={{ margin: 0, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{proj.description}</p>}
                      {proj.project_url && (
                        <a href={proj.project_url} target="_blank" rel="noopener noreferrer"
                          style={{ display: 'inline-block', marginTop: 8, fontSize: 12, color: '#2563eb', textDecoration: 'none' }}>
                          <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginRight: 5 }} />View project
                        </a>
                      )}
                    </div>
                  ))}
                </div>}
          </Section>

          {/* ── Save / Discard ── */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
            <button onClick={loadFullProfile} style={btnSecondary}>
              <i className="fa-solid fa-rotate-left" style={{ marginRight: 7 }} />Discard changes
            </button>
            <button onClick={handleSaveProfile} disabled={saving}
              style={{ ...btnPrimary, padding: '13px 28px', fontSize: 14, opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving…' : 'Save all changes'}
            </button>
          </div>

        </div>
      </div>

      {/* ═════ MODALS ═════ */}

      <Modal title={editTarget ? 'Edit Skill' : 'Add Skill'} open={modal === 'skill'} onClose={() => setModal(null)} onSave={handleSaveSkill} saving={modalSaving} error={modalError}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Skill Name *"><input value={skillForm.name} onChange={e => setSkillForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. React, Figma, Python" style={fieldStyle} autoFocus /></Field>
          <Field label="Proficiency Level">
            <select value={skillForm.proficiency} onChange={e => setSkillForm(f => ({ ...f, proficiency: e.target.value }))} style={fieldStyle}>
              {['Beginner','Intermediate','Advanced','Expert'].map(o => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Years of Experience" span={2}><input type="number" min="0" step="0.5" value={skillForm.years_of_experience} onChange={e => setSkillForm(f => ({ ...f, years_of_experience: e.target.value }))} placeholder="e.g. 3" style={fieldStyle} /></Field>
        </div>
      </Modal>

      <Modal title={editTarget ? 'Edit Experience' : 'Add Experience'} open={modal === 'experience'} onClose={() => setModal(null)} onSave={handleSaveExperience} saving={modalSaving} error={modalError}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Company *"><input value={expForm.company_name} onChange={e => setExpForm(f => ({ ...f, company_name: e.target.value }))} placeholder="e.g. Acme Corp" style={fieldStyle} autoFocus /></Field>
          <Field label="Role / Title *"><input value={expForm.role} onChange={e => setExpForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Senior Designer" style={fieldStyle} /></Field>
          <Field label="Start Date"><input type="date" value={expForm.start_date} onChange={e => setExpForm(f => ({ ...f, start_date: e.target.value }))} style={fieldStyle} /></Field>
          <Field label="End Date"><input type="date" value={expForm.end_date} onChange={e => setExpForm(f => ({ ...f, end_date: e.target.value }))} disabled={expForm.is_current} style={{ ...fieldStyle, opacity: expForm.is_current ? 0.5 : 1 }} /></Field>
          <Field label="Currently working here" span={2}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginTop: 4 }}>
              <input type="checkbox" checked={expForm.is_current} onChange={e => setExpForm(f => ({ ...f, is_current: e.target.checked, end_date: e.target.checked ? '' : f.end_date }))} />
              <span style={{ fontSize: 13, color: '#475569' }}>I currently work here</span>
            </label>
          </Field>
          <Field label="Description" span={2}><textarea value={expForm.description} onChange={e => setExpForm(f => ({ ...f, description: e.target.value }))} placeholder="Key responsibilities and achievements…" style={{ ...fieldStyle, height: 92, resize: 'vertical', lineHeight: 1.55 }} /></Field>
        </div>
      </Modal>

      <Modal title={editTarget ? 'Edit Education' : 'Add Education'} open={modal === 'education'} onClose={() => setModal(null)} onSave={handleSaveEducation} saving={modalSaving} error={modalError}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Institution *" span={2}><input value={eduForm.institution} onChange={e => setEduForm(f => ({ ...f, institution: e.target.value }))} placeholder="e.g. Stanford University" style={fieldStyle} autoFocus /></Field>
          <Field label="Degree"><input value={eduForm.degree} onChange={e => setEduForm(f => ({ ...f, degree: e.target.value }))} placeholder="e.g. B.Sc. / M.Sc." style={fieldStyle} /></Field>
          <Field label="Field of Study"><input value={eduForm.field_of_study} onChange={e => setEduForm(f => ({ ...f, field_of_study: e.target.value }))} placeholder="e.g. Computer Science" style={fieldStyle} /></Field>
          <Field label="Start Year"><input type="number" value={eduForm.start_year} onChange={e => setEduForm(f => ({ ...f, start_year: e.target.value }))} placeholder="e.g. 2018" style={fieldStyle} /></Field>
          <Field label="End Year"><input type="number" value={eduForm.end_year} onChange={e => setEduForm(f => ({ ...f, end_year: e.target.value }))} placeholder="e.g. 2022" style={fieldStyle} /></Field>
          <Field label="Grade / GPA" span={2}><input value={eduForm.grade} onChange={e => setEduForm(f => ({ ...f, grade: e.target.value }))} placeholder="e.g. 3.8 / 4.0" style={fieldStyle} /></Field>
        </div>
      </Modal>

      <Modal title={editTarget ? 'Edit Project' : 'Add Project'} open={modal === 'project'} onClose={() => setModal(null)} onSave={handleSaveProject} saving={modalSaving} error={modalError}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Project Title *" span={2}><input value={projForm.title} onChange={e => setProjForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Resume Builder App" style={fieldStyle} autoFocus /></Field>
          <Field label="Technologies Used" span={2}><input value={projForm.technologies_used} onChange={e => setProjForm(f => ({ ...f, technologies_used: e.target.value }))} placeholder="e.g. React, Node.js, PostgreSQL" style={fieldStyle} /></Field>
          <Field label="Project URL"><input value={projForm.project_url} onChange={e => setProjForm(f => ({ ...f, project_url: e.target.value }))} placeholder="https://github.com/…" style={fieldStyle} /></Field>
          <Field label="Start Date"><input type="date" value={projForm.start_date} onChange={e => setProjForm(f => ({ ...f, start_date: e.target.value }))} style={fieldStyle} /></Field>
          <Field label="Description" span={2}><textarea value={projForm.description} onChange={e => setProjForm(f => ({ ...f, description: e.target.value }))} placeholder="What did you build and what was the impact?" style={{ ...fieldStyle, height: 88, resize: 'vertical', lineHeight: 1.55 }} /></Field>
        </div>
      </Modal>

      <Toast msg={toast.msg} type={toast.type} />
    </section>
  );
}
