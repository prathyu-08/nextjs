'use client';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import CandidateSidebar from "../components/shared/CandidateSidebar";
import EditProfileResumeBuilder from "../components/resume-builder/EditProfileResumeBuilder";

const IMG = "https://www.sharjeelanjum.com/html/jobs-portal/images";

// ─── Shared shell ────────────────────────────────────────────────
function Shell({  path, title, subtitle, children }) {
  return (
    <section style={{ background:"#f8f9fa", minHeight:"100vh", padding:"40px 0 60px" }}>
      <div style={{ maxWidth:1320, margin:"0 auto", padding:"0 24px", display:"flex", gap:28, alignItems:"flex-start" }}>
        <CandidateSidebar currentPath={path} />
        <div style={{ flex:1, minWidth:0 }}>
          {title && (
            <div style={{ marginBottom:24 }}>
              <h1 style={{ fontSize:28, fontWeight:700, color:"#1f2937", margin:"0 0 4px" }}>{title}</h1>
              {subtitle && <p style={{ color:"#6b7280", margin:0 }}>{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

function Card({ children, style={} }) {
  return <div style={{ background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", padding:24, marginBottom:20, ...style }}>{children}</div>;
}

function CardHead({ title, action }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
      <h3 style={{ fontSize:18, fontWeight:700, color:"#1f2937", margin:0 }}>{title}</h3>
      {action}
    </div>
  );
}

function Input({ label, type="text", placeholder="", defaultValue="" }) {
  return (
    <div>
      <label style={{ display:"block", fontSize:13, fontWeight:500, color:"#374151", marginBottom:6 }}>{label}</label>
      <input type={type} placeholder={placeholder} defaultValue={defaultValue}
        style={{ width:"100%", padding:"11px 14px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:13, boxSizing:"border-box", outline:"none" }} />
    </div>
  );
}

function Sel({ label, opts }) {
  return (
    <div>
      <label style={{ display:"block", fontSize:13, fontWeight:500, color:"#374151", marginBottom:6 }}>{label}</label>
      <select style={{ width:"100%", padding:"11px 14px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:13, boxSizing:"border-box", outline:"none", background:"#fff" }}>
        {opts.map((o,i) => <option key={i}>{o}</option>)}
      </select>
    </div>
  );
}

const templateAccent = "#18b870";
const templateBlue = "#12a8c7";
const mutedText = "#6b7280";

function TemplatePanel({ title, children, action, note }) {
  return (
    <section style={{ background:"#fff", border:"1px solid #e6ebef", borderRadius:4, marginBottom:24, boxShadow:"0 2px 10px rgba(15,23,42,.04)" }}>
      <div style={{ padding:"17px 22px", borderBottom:"1px solid #eef2f5", display:"flex", alignItems:"center", justifyContent:"space-between", gap:14, background:"#fcfdff" }}>
        <div>
          <h3 style={{ margin:0, fontSize:18, fontWeight:700, color:"#222" }}>{title}</h3>
          {note && <p style={{ margin:"5px 0 0", fontSize:13, color:mutedText }}>{note}</p>}
        </div>
        {action}
      </div>
      <div style={{ padding:22 }}>{children}</div>
    </section>
  );
}

function TemplateButton({ children, variant="primary", style={}, onClick }) {
  const styles = {
    primary: { background:templateAccent, color:"#fff", border:`1px solid ${templateAccent}` },
    blue: { background:templateBlue, color:"#fff", border:`1px solid ${templateBlue}` },
    ghost: { background:"#fff", color:"#3f4b57", border:"1px solid #dce3e8" },
    danger: { background:"#fff", color:"#dc2626", border:"1px solid #fecaca" },
  };
  return (
    <button onClick={onClick} style={{ padding:"10px 18px", borderRadius:3, fontSize:13, fontWeight:700, cursor:"pointer", ...styles[variant], ...style }}>
      {children}
    </button>
  );
}

function TemplateField({ label, children }) {
  return (
    <label style={{ display:"block" }}>
      <span style={{ display:"block", fontSize:13, fontWeight:700, color:"#35404a", marginBottom:8 }}>{label}</span>
      {children}
    </label>
  );
}

function TextBox({ placeholder="", defaultValue="", type="text" }) {
  return (
    <input type={type} placeholder={placeholder} defaultValue={defaultValue}
      style={{ width:"100%", height:42, padding:"8px 12px", border:"1px solid #dfe7ee", borderRadius:3, color:"#475569", fontSize:13, boxSizing:"border-box", outline:"none", background:"#fff" }} />
  );
}

function SelectBox({ opts, defaultValue }) {
  return (
    <select defaultValue={defaultValue} style={{ width:"100%", height:42, padding:"8px 12px", border:"1px solid #dfe7ee", borderRadius:3, color:"#475569", fontSize:13, boxSizing:"border-box", outline:"none", background:"#fff" }}>
      {opts.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

function TemplateGrid({ children }) {
  return <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:18, marginBottom:18 }}>{children}</div>;
}

// ─── Edit Profile ────────────────────────────────────────────────
function LegacyEditProfilePage() {
  const [skills] = useState(["React","Node.js","TypeScript","Figma","Python"]);
  return (
    <Shell path="/candidate/edit-profile" title="Edit Profile" subtitle="Keep your profile up to date for better job matches">
      {/* Avatar header */}
      <Card>
        <div style={{ display:"flex", gap:24, alignItems:"flex-start" }}>
          <div style={{ position:"relative", width:120, height:120, flexShrink:0 }}>
            <img src={`${IMG}/candidates/01.jpg`} alt="Avatar"
              style={{ width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover", border:"4px solid #fff", boxShadow:"0 4px 12px rgba(0,0,0,.1)" }} />
            <label style={{ position:"absolute", bottom:0, left:0, right:0, display:"flex", alignItems:"center", justifyContent:"center", gap:4,
              padding:8, background:"rgba(0,0,0,0.65)", color:"#fff", fontSize:11, fontWeight:500,
              borderBottomLeftRadius:"50%", borderBottomRightRadius:"50%", cursor:"pointer" }}>
              <i className="fa-solid fa-camera" /> Edit
              <input type="file" style={{ display:"none" }} />
            </label>
          </div>
          <div style={{ flex:1 }}>
            <span style={{ display:"inline-block", padding:"4px 12px", background:"#eff6ff", color:"#2563eb", fontSize:12, fontWeight:600, borderRadius:20, marginBottom:8 }}>Job Seeker</span>
            <h2 style={{ fontSize:26, fontWeight:700, color:"#1f2937", margin:"0 0 6px" }}>Job Seeker</h2>
            <p style={{ color:"#6b7280", fontSize:14, margin:"0 0 14px" }}>Bainbridge Island, Washington, USA</p>
            <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
              {[["fa-phone","+1 234 567 890"],["fa-envelope","seeker@jobsportal.com"],["fa-map-marker","Washington, USA"]].map(([icon,text],i) => (
                <span key={i} style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"#4b5563" }}>
                  <i className={`fa-solid ${icon}`} style={{ color:"#2563eb" }} />{text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Basic Info */}
      <Card>
        <CardHead title="Basic Information" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18 }}>
          <Input label="First Name" defaultValue="Job" />
          <Input label="Last Name" defaultValue="Seeker" />
          <Input label="Email Address" type="email" defaultValue="seeker@jobsportal.com" />
          <Input label="Phone Number" defaultValue="+1 234 567 890" />
          <Input label="Job Title" defaultValue="Full Stack Designer" />
          <Sel label="Experience Level" opts={["Junior (0-2 yrs)","Mid (2-5 yrs)","Senior (5-10 yrs)","Lead (10+ yrs)"]} />
          <Sel label="Job Type Preference" opts={["Full Time","Part Time","Contract","Freelance","Remote"]} />
          <Input label="Expected Salary" defaultValue="$6,000 - $9,000/month" />
          <div style={{ gridColumn:"span 2" }}>
            <label style={{ display:"block", fontSize:13, fontWeight:500, color:"#374151", marginBottom:6 }}>Bio / About Me</label>
            <textarea rows={4} defaultValue="Experienced designer with a passion for creating intuitive user experiences..."
              style={{ width:"100%", padding:"11px 14px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:13, boxSizing:"border-box", outline:"none", resize:"vertical" }} />
          </div>
        </div>
      </Card>

      {/* Location */}
      <Card>
        <CardHead title="Location" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18 }}>
          <Input label="Country" defaultValue="United States" />
          <Input label="State / Province" defaultValue="Washington" />
          <Input label="City" defaultValue="Bainbridge Island" />
          <Input label="Zip Code" defaultValue="98110" />
        </div>
      </Card>

      {/* Skills */}
      <Card>
        <CardHead title="Skills" />
        <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:16 }}>
          {skills.map((s,i) => (
            <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"8px 16px", background:"#eff6ff", color:"#2563eb", fontSize:13, fontWeight:500, borderRadius:20, border:"1px solid #dbeafe" }}>
              {s} <button style={{ background:"none", border:"none", color:"#2563eb", cursor:"pointer", fontSize:14, lineHeight:1 }}>×</button>
            </span>
          ))}
          <button style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"8px 16px", background:"#fff", color:"#2563eb", fontSize:13, fontWeight:500, border:"1px dashed #2563eb", borderRadius:20, cursor:"pointer" }}>
            <i className="fa-solid fa-plus" /> Add Skill
          </button>
        </div>
      </Card>

      {/* Social */}
      <Card>
        <CardHead title="Social Profiles" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18 }}>
          {[["LinkedIn","https://linkedin.com/in/"],["GitHub","https://github.com/"],["Portfolio","https://yourportfolio.com"],["Twitter/X","https://x.com/"]].map(([label,ph],i) => (
            <Input key={i} label={label} placeholder={ph} />
          ))}
        </div>
      </Card>

      <div style={{ display:"flex", justifyContent:"flex-end", gap:12 }}>
        <button style={{ padding:"12px 24px", border:"1px solid #e5e7eb", background:"#f9fafb", color:"#374151", borderRadius:10, fontWeight:600, cursor:"pointer" }}>Cancel</button>
        <button style={{ padding:"12px 28px", background:"#2563eb", color:"#fff", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer", fontSize:14 }}>Save Changes</button>
      </div>
    </Shell>
  );
}

// ─── Build Resume ────────────────────────────────────────────────
function LegacyBuildResumePage() {
  const exp = [
    { title:"Senior UI/UX Designer", company:"Multimedia Design", period:"Jan 2022 – Present", location:"New York, USA", desc:"Led design of core product features serving 500K+ users. Established design system and mentored junior designers." },
    { title:"UI Designer", company:"Creative Studio", period:"Jun 2019 – Dec 2021", location:"Remote", desc:"Designed interfaces for e-commerce and SaaS clients. Conducted user research and usability testing." },
  ];
  const edu = [
    { degree:"B.Sc. in Computer Science", school:"MIT", period:"2015 – 2019", grade:"GPA: 3.8/4.0" },
  ];
  const projects = [
    { name:"Portfolio Website", date:"2023", desc:"Personal portfolio built with React and Framer Motion" },
    { name:"Job Board UI Kit", date:"2022", desc:"Figma component library used by 500+ designers" },
    { name:"E-Commerce Redesign", date:"2022", desc:"Full redesign increasing conversion rate by 32%" },
  ];
  return (
    <Shell path="/candidate/build-resume" title="Build Resume" subtitle="Create a professional resume that stands out to employers">
      {/* Experience */}
      <Card>
        <CardHead title="Work Experience" action={<button style={{ padding:"8px 16px", background:"#eff6ff", color:"#2563eb", border:"none", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600 }}><i className="fa-solid fa-plus" style={{ marginRight:6 }} />Add Experience</button>} />
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {exp.map((e,i) => (
            <div key={i} style={{ padding:20, background:"#f9fafb", borderRadius:12, border:"1px solid #e5e7eb" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div>
                  <h4 style={{ fontSize:16, fontWeight:600, color:"#1f2937", margin:"0 0 4px" }}>{e.title}</h4>
                  <div style={{ display:"flex", gap:16, fontSize:13, color:"#6b7280" }}>
                    <span><i className="fa-solid fa-building" style={{ marginRight:4, color:"#2563eb" }} />{e.company}</span>
                    <span><i className="fa-solid fa-calendar" style={{ marginRight:4, color:"#2563eb" }} />{e.period}</span>
                    <span><i className="fa-solid fa-map-marker" style={{ marginRight:4, color:"#2563eb" }} />{e.location}</span>
                  </div>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  {["fa-pen","fa-trash"].map((icon,j) => (
                    <button key={j} style={{ width:32, height:32, border:"1px solid #e5e7eb", borderRadius:8, background:"#fff", cursor:"pointer", color:j===1?"#dc2626":"#6b7280", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12 }}>
                      <i className={`fa-solid ${icon}`} />
                    </button>
                  ))}
                </div>
              </div>
              <p style={{ fontSize:14, color:"#4b5563", margin:0, lineHeight:1.6 }}>{e.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Education */}
      <Card>
        <CardHead title="Education" action={<button style={{ padding:"8px 16px", background:"#eff6ff", color:"#2563eb", border:"none", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600 }}><i className="fa-solid fa-plus" style={{ marginRight:6 }} />Add Education</button>} />
        {edu.map((e,i) => (
          <div key={i} style={{ padding:20, background:"#f9fafb", borderRadius:12, border:"1px solid #e5e7eb" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <h4 style={{ fontSize:16, fontWeight:600, color:"#1f2937", margin:"0 0 4px" }}>{e.degree}</h4>
                <div style={{ display:"flex", gap:16, fontSize:13, color:"#6b7280" }}>
                  <span><i className="fa-solid fa-school" style={{ marginRight:4, color:"#2563eb" }} />{e.school}</span>
                  <span><i className="fa-solid fa-calendar" style={{ marginRight:4, color:"#2563eb" }} />{e.period}</span>
                  <span style={{ color:"#16a34a", fontWeight:600 }}>{e.grade}</span>
                </div>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {["fa-pen","fa-trash"].map((icon,j) => (
                  <button key={j} style={{ width:32, height:32, border:"1px solid #e5e7eb", borderRadius:8, background:"#fff", cursor:"pointer", color:j===1?"#dc2626":"#6b7280", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12 }}>
                    <i className={`fa-solid ${icon}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Card>

      {/* Projects */}
      <Card>
        <CardHead title="Projects" action={<button style={{ padding:"8px 16px", background:"#eff6ff", color:"#2563eb", border:"none", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600 }}><i className="fa-solid fa-plus" style={{ marginRight:6 }} />Add Project</button>} />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {projects.map((p,i) => (
            <div key={i} style={{ background:"#f9fafb", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
              <div style={{ height:120, background:`linear-gradient(135deg,#667eea,#764ba2)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:36 }}>🎨</div>
              <div style={{ padding:16 }}>
                <h4 style={{ fontSize:15, fontWeight:600, color:"#1f2937", margin:"0 0 4px" }}>{p.name}</h4>
                <div style={{ fontSize:12, color:"#9ca3af", marginBottom:6 }}>{p.date}</div>
                <p style={{ fontSize:13, color:"#4b5563", margin:0, lineHeight:1.5 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display:"flex", justifyContent:"flex-end", gap:12 }}>
        <button style={{ padding:"12px 24px", border:"1px solid #e5e7eb", background:"#f9fafb", color:"#374151", borderRadius:10, fontWeight:600, cursor:"pointer" }}>Preview Resume</button>
        <button style={{ padding:"12px 28px", background:"#2563eb", color:"#fff", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer" }}>Save Resume</button>
      </div>
    </Shell>
  );
}

// ─── Download CV ─────────────────────────────────────────────────
function LegacyDownloadCvPage() {
  return (
    <Shell path="/candidate/download-cv" title="Download CV" subtitle="Generate and download your professional CV">
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
        {[
          { label:"Modern Template", color:"#667eea", icon:"🎨", desc:"Clean, contemporary design with a colored sidebar and skills chart." },
          { label:"Classic Template", color:"#1f2937", icon:"📄", desc:"Traditional professional format preferred by corporate recruiters." },
          { label:"Creative Template", color:"#ec4899", icon:"✨", desc:"Bold layout with infographic elements for creative roles." },
          { label:"Minimal Template", color:"#0d9488", icon:"⚡", desc:"Clean and simple, ATS-optimised with maximum readability." },
        ].map((t,i) => (
          <div key={i} style={{ background:"#fff", borderRadius:16, border:`2px solid ${i===0?"#667eea":"#e5e7eb"}`, overflow:"hidden", position:"relative" }}>
            {i===0 && <div style={{ position:"absolute", top:12, right:12, background:"#667eea", color:"#fff", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>SELECTED</div>}
            <div style={{ height:180, background:`linear-gradient(135deg,${t.color}22,${t.color}11)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:64 }}>{t.icon}</div>
            <div style={{ padding:20 }}>
              <h4 style={{ fontSize:16, fontWeight:700, color:"#1f2937", margin:"0 0 6px" }}>{t.label}</h4>
              <p style={{ fontSize:13, color:"#6b7280", margin:"0 0 14px" }}>{t.desc}</p>
              <div style={{ display:"flex", gap:10 }}>
                <button style={{ flex:1, padding:"9px", border:`1px solid ${t.color}`, color:t.color, background:"transparent", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600 }}>Preview</button>
                <button style={{ flex:1, padding:"9px", background:t.color, color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600 }}>
                  <i className="fa-solid fa-download" style={{ marginRight:6 }} />Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Card style={{ marginTop:24 }}>
        <CardHead title="CV Settings" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18 }}>
          <Sel label="File Format" opts={["PDF (Recommended)","Word (.docx)","Plain Text"]} />
          <Sel label="Paper Size" opts={["A4","Letter (US)","Legal"]} />
          <Sel label="Language" opts={["English","Arabic","Spanish","French"]} />
          <Input label="CV Filename" defaultValue="JobSeeker_CV_2025" />
        </div>
        <div style={{ marginTop:20, display:"flex", justifyContent:"flex-end" }}>
          <button style={{ padding:"12px 28px", background:"#22c55e", color:"#fff", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer", fontSize:14 }}>
            <i className="fa-solid fa-download" style={{ marginRight:8 }} />Download CV
          </button>
        </div>
      </Card>
    </Shell>
  );
}

// ─── My Applications ─────────────────────────────────────────────
export function EditProfilePage() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const sectionCard = { background:"#fff", border:"1px solid #e8eef6", borderRadius:20, padding:26, marginBottom:28, boxShadow:"0 16px 40px rgba(15,23,42,.06)" };
  const label = { display:"block", fontSize:13, fontWeight:700, color:"#0f172a", marginBottom:7 };
  const input = { width:"100%", height:42, padding:"9px 13px", border:"1px solid #d7e1ed", borderRadius:10, background:"#f8fafc", color:"#475569", fontSize:13, boxSizing:"border-box", outline:"none" };
  const textarea = { ...input, height:"auto", minHeight:96, resize:"vertical", lineHeight:1.55 };
  const eyebrow = { margin:"0 0 5px", fontSize:10, letterSpacing:.5, textTransform:"uppercase", color:"#475569", fontWeight:700 };
  const heading = { margin:"0 0 2px", fontSize:18, color:"#0f172a", fontWeight:800 };
  const helper = { margin:"0 0 20px", fontSize:14, color:"#475569" };
  const field = (name, child) => (
    <label key={name} style={{ display:"block" }}>
      <span style={label}>{name}</span>
      {child}
    </label>
  );
  const text = (value, placeholder="", type="text") => <input type={type} defaultValue={value} placeholder={placeholder} style={input} />;
  return (
    <Shell path="/candidate/edit-profile">
      <div style={{ ...sectionCard, padding:28 }}>
        <div style={{ display:"flex", gap:22, alignItems:"center", flexWrap:"wrap" }}>
          <img src={`${IMG}/candidates/01.jpg`} alt="Job Seeker" style={{ width:92, height:92, borderRadius:18, objectFit:"cover" }} />
          <div style={{ flex:"1 1 420px" }}>
            <button style={{ border:0, background:"transparent", color:"#2563eb", fontSize:13, fontWeight:700, cursor:"pointer", padding:0, marginBottom:18 }}>
              <i className="fa-solid fa-upload" style={{ marginRight:7 }} />Update Photo
            </button>
            <div>
              <span style={{ display:"inline-block", padding:"4px 10px", borderRadius:999, background:"#e8efff", color:"#2563eb", fontSize:11, fontWeight:800, marginBottom:8 }}>Candidate Profile</span>
              <h1 style={{ margin:"0 0 5px", fontSize:30, lineHeight:1.1, color:"#0f172a", fontWeight:800 }}>Job Seeker</h1>
              <p style={{ margin:"0 0 14px", color:"#475569", fontSize:15 }}>Keep your information fresh so hiring teams understand your intent, availability and the type of roles you're excited about.</p>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                {[
                  ["fa-briefcase","Product Design Lead"],
                  ["fa-location-dot","Remote - USA"],
                  ["fa-clock","Updated 2 days ago"],
                ].map(([icon, textValue]) => (
                  <span key={textValue} style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 10px", borderRadius:999, background:"#eef4ff", color:"#2563eb", fontSize:12, fontWeight:800 }}>
                    <i className={`fa-solid ${icon}`} />{textValue}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section style={sectionCard}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16, marginBottom:18 }}>
          <div>
            <p style={eyebrow}>Profile</p>
            <h2 style={heading}>Personal Information</h2>
            <p style={helper}>These details power your public profile and application cards.</p>
          </div>
          <button style={{ padding:"8px 12px", border:"1px solid #2563eb", borderRadius:8, background:"#fff", color:"#2563eb", fontSize:13, fontWeight:800, cursor:"pointer" }}>
            <i className="fa-regular fa-file-lines" style={{ marginRight:7 }} />Upload resume
          </button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,minmax(0,1fr))", gap:16 }}>
          {field("Full name", text("Jordan Blake"))}
          {field("Professional title", text("Lead Product Designer"))}
          {field("Email address", text(user?.email || "you@company.com", "", "email"))}
          {field("Phone", text("+1 234 567 890"))}
          {field("Primary location", text("Seattle, USA"))}
          {field("Preferred locations", text("Remote - San Francisco - Boston"))}
          {field("Website", text("https://www.personal-site.com"))}
          {field("Portfolio / Case study", text("https://dribbble.com/jordan"))}
          <label style={{ display:"block", gridColumn:"span 2" }}>
            <span style={label}>About you</span>
            <textarea defaultValue={"Summarize your superpowers, recent wins, and what you're looking for next."} style={textarea} />
          </label>
        </div>
      </section>

      <section style={sectionCard}>
        <p style={eyebrow}>Career</p>
        <h2 style={heading}>Professional Snapshot</h2>
        <p style={helper}>Showcase your current standing and ideal role.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,minmax(0,1fr))", gap:16 }}>
          {field("Experience level", text("10+ years"))}
          {field("Current company", text("Skyline Digital"))}
          {field("Notice period", text("2 weeks"))}
          {field("Desired employment", text("Full-time"))}
          {field("Salary expectation", text("USD 120k - 150k / year"))}
          {field("Work preference", text("Remote friendly"))}
          <label style={{ display:"block", gridColumn:"span 2", gridRow:"span 2" }}>
            <span style={label}>Target roles</span>
            <textarea defaultValue={"Principal Product Designer, Product Design Manager, Design Lead"} style={{ ...textarea, minHeight:96 }} />
          </label>
        </div>
      </section>

      <section style={sectionCard}>
        <p style={eyebrow}>Skills</p>
        <h2 style={heading}>Skills & Tools</h2>
        <p style={helper}>Highlight stacks, frameworks, and certifications.</p>
        <div style={{ display:"flex", gap:9, flexWrap:"wrap", marginBottom:15 }}>
          {["Product Strategy","Design Systems","Figma","React","UX Research"].map((skill) => (
            <span key={skill} style={{ padding:"5px 11px", borderRadius:999, background:"#dbeafe", color:"#2563eb", fontSize:12, fontWeight:800 }}>{skill}</span>
          ))}
        </div>
        <button style={{ width:"100%", height:28, border:"1px dashed #bcccdc", borderRadius:999, background:"#fff", color:"#334155", fontSize:13, fontWeight:700, cursor:"pointer" }}>
          <i className="fa-solid fa-plus" style={{ marginRight:7 }} />Add skill
        </button>
      </section>

      <section style={sectionCard}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16, marginBottom:18 }}>
          <div>
            <p style={eyebrow}>Experience</p>
            <h2 style={heading}>Experience & Education</h2>
            <p style={helper}>Keep your latest role and flagship education updated.</p>
          </div>
          <button style={{ padding:"8px 12px", border:"1px solid #94a3b8", borderRadius:8, background:"#fff", color:"#475569", fontSize:13, fontWeight:800, cursor:"pointer" }}>
            <i className="fa-solid fa-circle-plus" style={{ marginRight:7 }} />Add entry
          </button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,minmax(0,1fr))", gap:16 }}>
          {field("Company", text("Skyline Digital"))}
          {field("Role", text("Lead Product Designer"))}
          {field("Start date", text("", "", "month"))}
          {field("End date", text("", "", "month"))}
          <label style={{ display:"block", gridColumn:"span 2" }}>
            <span style={label}>Key highlights</span>
            <textarea defaultValue={"Scaled design system, mentored 6 designers, partnered with research to ship 4 product lines."} style={{ ...textarea, minHeight:98 }} />
          </label>
          {field("Education", text("Stanford - BSc Human Computer Interaction"))}
          {field("Graduation year", text("2014"))}
        </div>
      </section>

      <section style={sectionCard}>
        <p style={eyebrow}>Links</p>
        <h2 style={heading}>Social & Contact Links</h2>
        <p style={helper}>Share channels where hiring teams can follow your work.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,minmax(0,1fr))", gap:16 }}>
          {field("LinkedIn", text("https://www.linkedin.com/"))}
          {field("Dribbble", text("https://dribbble.com/username"))}
          {field("GitHub / Code", text("https://github.com/username"))}
          {field("Twitter / X", text("https://twitter.com/username"))}
        </div>
      </section>

      <div style={{ display:"flex", justifyContent:"flex-end", gap:12, flexWrap:"wrap", marginTop:4 }}>
        <button style={{ padding:"13px 25px", border:"1px solid #64748b", borderRadius:10, background:"#fff", color:"#475569", fontSize:14, fontWeight:800, cursor:"pointer" }}>Cancel</button>
        <button style={{ padding:"13px 25px", border:"1px solid #2563eb", borderRadius:10, background:"#2563eb", color:"#fff", fontSize:14, fontWeight:800, cursor:"pointer" }}>Save changes</button>
      </div>
    </Shell>
  );
}

export function BuildResumePage() {
  return (
    <Shell path="/candidate/build-resume" title="Build Resume" subtitle="Create a professional resume that stands out to employers">
      <EditProfileResumeBuilder />
    </Shell>
  );
}

export function DownloadCvPage() {
  const templates = [
    ["Professional CV","One-page clean resume with strong recruiter readability.","fa-file-lines",templateAccent,true],
    ["Modern CV","Sidebar profile format with skill blocks and clear sections.","fa-id-card",templateBlue,false],
    ["Classic CV","Traditional corporate resume with simple headings.","fa-file-word","#334155",false],
  ];
  return (
    <Shell path="/candidate/download-cv" title="Download CV" subtitle="Choose a CV style and export your resume">
      <TemplatePanel title="Select CV Template" note="Pick a layout similar to the reference download CV page.">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:18 }}>
          {templates.map(([name,desc,icon,color,selected]) => (
            <article key={name} style={{ border:`2px solid ${selected ? color : "#e4ebf1"}`, borderRadius:4, overflow:"hidden", background:"#fff", position:"relative" }}>
              {selected && <span style={{ position:"absolute", top:12, right:12, background:color, color:"#fff", fontSize:10, fontWeight:800, padding:"4px 9px", borderRadius:2 }}>SELECTED</span>}
              <div style={{ height:160, display:"flex", alignItems:"center", justifyContent:"center", background:"#f7fafc" }}>
                <div style={{ width:92, height:120, background:"#fff", border:"1px solid #dfe7ee", boxShadow:"0 8px 18px rgba(15,23,42,.08)", padding:10 }}>
                  <i className={`fa-solid ${icon}`} style={{ color, fontSize:24, marginBottom:12 }} />
                  <span style={{ display:"block", height:6, background:color, width:"70%", marginBottom:8 }} />
                  <span style={{ display:"block", height:5, background:"#d7e0e8", width:"100%", marginBottom:6 }} />
                  <span style={{ display:"block", height:5, background:"#d7e0e8", width:"82%", marginBottom:14 }} />
                  <span style={{ display:"block", height:5, background:"#d7e0e8", width:"95%", marginBottom:6 }} />
                  <span style={{ display:"block", height:5, background:"#d7e0e8", width:"64%" }} />
                </div>
              </div>
              <div style={{ padding:17 }}>
                <h4 style={{ margin:"0 0 7px", fontSize:16, color:"#222" }}>{name}</h4>
                <p style={{ margin:"0 0 14px", color:mutedText, fontSize:13, lineHeight:1.55 }}>{desc}</p>
                <div style={{ display:"flex", gap:8 }}>
                  <TemplateButton variant="ghost" style={{ flex:1 }}>Preview</TemplateButton>
                  <TemplateButton variant={selected ? "primary" : "blue"} style={{ flex:1 }}>Use</TemplateButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </TemplatePanel>

      <div style={{ display:"grid", gridTemplateColumns:"minmax(280px,1fr) minmax(300px,420px)", gap:24, alignItems:"start" }}>
        <TemplatePanel title="Download Settings">
          <TemplateGrid>
            <TemplateField label="File Format"><SelectBox opts={["PDF","DOCX","Plain Text"]} defaultValue="PDF" /></TemplateField>
            <TemplateField label="Paper Size"><SelectBox opts={["A4","Letter","Legal"]} defaultValue="A4" /></TemplateField>
            <TemplateField label="Language"><SelectBox opts={["English","Arabic","Spanish","French"]} defaultValue="English" /></TemplateField>
            <TemplateField label="Filename"><TextBox defaultValue="JobSeeker_CV_2026" /></TemplateField>
          </TemplateGrid>
          <div style={{ marginTop:20, display:"flex", gap:10, flexWrap:"wrap" }}>
            <TemplateButton><i className="fa-solid fa-download" style={{ marginRight:8 }} />Download CV</TemplateButton>
            <TemplateButton variant="ghost"><i className="fa-solid fa-print" style={{ marginRight:8 }} />Print</TemplateButton>
          </div>
        </TemplatePanel>

        <TemplatePanel title="CV Preview">
          <div style={{ border:"1px solid #dfe7ee", borderRadius:3, background:"#fff", padding:22, minHeight:430, boxShadow:"0 10px 30px rgba(15,23,42,.08)" }}>
            <div style={{ display:"flex", gap:14, alignItems:"center", borderBottom:`3px solid ${templateAccent}`, paddingBottom:14, marginBottom:16 }}>
              <img src={`${IMG}/candidates/01.jpg`} alt="Job Seeker" style={{ width:58, height:58, borderRadius:3, objectFit:"cover" }} />
              <div>
                <h3 style={{ margin:"0 0 4px", fontSize:20, color:"#222" }}>Job Seeker</h3>
                <p style={{ margin:0, color:templateBlue, fontSize:13, fontWeight:700 }}>Full Stack Designer</p>
              </div>
            </div>
            {["Profile Summary","Work Experience","Education","Skills"].map((title, i) => (
              <div key={title} style={{ marginBottom:16 }}>
                <h4 style={{ margin:"0 0 8px", fontSize:13, color:"#222", textTransform:"uppercase" }}>{title}</h4>
                <div style={{ height:i===0 ? 42 : 32, background:"#f1f5f9", borderRadius:2 }} />
              </div>
            ))}
          </div>
        </TemplatePanel>
      </div>
    </Shell>
  );
}

export function MyApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const apps = [
    { company:"Multimedia Design", logo:`${IMG}/employers/emplogo1.jpg`, title:"Senior UI/UX Designer", type:"Full Time", location:"New York, USA", salary:"$6,000 - $9,000", applied:"Oct 31, 2025", status:"pending" },
    { company:"Connect People", logo:`${IMG}/employers/emplogo7.jpg`, title:"Full Stack Designer", type:"Full Time", location:"Barrington", salary:"$6,000 - $8,000", applied:"Oct 29, 2025", status:"interview" },
    { company:"Power Wave", logo:`${IMG}/employers/emplogo2.jpg`, title:"Product Manager", type:"Full Time", location:"San Francisco", salary:"$8,000 - $12,000", applied:"Oct 25, 2025", status:"rejected" },
    { company:"Net Design", logo:`${IMG}/employers/emplogo5.jpg`, title:"Front-end Developer", type:"Contract", location:"Remote", salary:"$5,000 - $7,000", applied:"Oct 20, 2025", status:"accepted" },
  ];
  const statusStyle = { pending:["#ffedd5","#ea580c"], interview:["#dbeafe","#2563eb"], rejected:["#fee2e2","#dc2626"], accepted:["#dcfce7","#16a34a"] };
  const tabs = [["all","All",apps.length],["pending","Pending",1],["interview","Interview",1],["accepted","Accepted",1],["rejected","Rejected",1]];
  const shown = activeTab==="all" ? apps : apps.filter(a => a.status===activeTab);
  return (
    <Shell path="/candidate/my-applications" title="My Applications" subtitle="Track all your job applications in one place">
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        {[["fa-paper-plane","Total Applied",apps.length,"#e0e7ff","#4f46e5"],["fa-clock","Pending",1,"#ffedd5","#ea580c"],["fa-comments","Interviews",1,"#dbeafe","#2563eb"],["fa-check-circle","Accepted",1,"#dcfce7","#16a34a"]].map(([icon,label,val,bg,color],i) => (
          <div key={i} style={{ background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", padding:20, display:"flex", gap:14, alignItems:"center" }}>
            <div style={{ width:48, height:48, borderRadius:10, background:bg, display:"flex", alignItems:"center", justifyContent:"center", color, fontSize:20 }}><i className={`fa-solid ${icon}`} /></div>
            <div><div style={{ fontSize:22, fontWeight:700, color:"#1f2937" }}>{val}</div><div style={{ fontSize:12, color:"#6b7280" }}>{label}</div></div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {tabs.map(([key,label,count]) => (
          <button key={key} onClick={() => setActiveTab(key)}
            style={{ padding:"8px 16px", background:activeTab===key?"#2563eb":"#fff", border:"1px solid", borderColor:activeTab===key?"#2563eb":"#e5e7eb", borderRadius:8, fontSize:13, fontWeight:500, color:activeTab===key?"#fff":"#6b7280", cursor:"pointer" }}>
            {label} <span style={{ marginLeft:4, padding:"1px 6px", background: activeTab===key?"rgba(255,255,255,.2)":"#f3f4f6", borderRadius:10, fontSize:11 }}>{count}</span>
          </button>
        ))}
      </div>

      {shown.map((app,i) => {
        const [bg,color] = statusStyle[app.status];
        return (
          <div key={i} style={{ background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", padding:20, marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
              <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                <img src={app.logo} alt={app.company} style={{ width:48, height:48, borderRadius:10, objectFit:"cover" }} />
                <div>
                  <h3 style={{ fontSize:16, fontWeight:600, color:"#1f2937", margin:"0 0 2px" }}>{app.title}</h3>
                  <div style={{ fontSize:13, color:"#6b7280" }}>{app.company}</div>
                </div>
              </div>
              <span style={{ padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:600, background:bg, color, textTransform:"capitalize" }}>{app.status}</span>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:16, marginBottom:14 }}>
              {[["fa-map-marker",app.location],["fa-briefcase",app.type],["fa-money-bill",app.salary],["fa-calendar",`Applied: ${app.applied}`]].map(([icon,text],j) => (
                <span key={j} style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"#6b7280" }}>
                  <i className={`fa-solid ${icon}`} style={{ color:"#2563eb" }} />{text}
                </span>
              ))}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => router.push("/jobs/job-single")} style={{ padding:"8px 16px", border:"1px solid #2563eb", color:"#2563eb", background:"transparent", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:500 }}>View Job</button>
              <button style={{ padding:"8px 16px", border:"1px solid #e5e7eb", color:"#374151", background:"transparent", borderRadius:8, cursor:"pointer", fontSize:13 }}>Withdraw</button>
            </div>
          </div>
        );
      })}
    </Shell>
  );
}

// ─── My Favourites ───────────────────────────────────────────────
export function MyFavouritesPage() {
  const jobs = [
    { company:"Multimedia Design", logo:`${IMG}/employers/emplogo1.jpg`, title:"UI UX Designer Required", type:"Full Time", location:"Fairbanks", salary:"$2,500 - $3,000", posted:"Mar 07, 2025", desc:"We are seeking a multi-disciplinary designer to ship intuitive product experiences for our SaaS platform." },
    { company:"Connect People", logo:`${IMG}/employers/emplogo7.jpg`, title:"Full Stack Designer", type:"Full Time", location:"Barrington", salary:"$6,000 - $8,000", posted:"Mar 10, 2025", desc:"Lead design systems powering mobile & web apps for our fast-growing HR solutions suite." },
    { company:"Power Wave", logo:`${IMG}/employers/emplogo2.jpg`, title:"Marketing Specialist", type:"Part Time", location:"New York", salary:"$3,000 - $4,500", posted:"Mar 12, 2025", desc:"Drive digital marketing campaigns and grow our brand across social and paid channels." },
    { company:"Net Design", logo:`${IMG}/employers/emplogo5.jpg`, title:"Web Developer", type:"Contract", location:"Remote", salary:"$5,000 - $7,000", posted:"Mar 14, 2025", desc:"Build and maintain client-facing web applications using modern JavaScript frameworks." },
  ];
  const typeColor = { "Full Time":["#dcfce7","#166534"], "Part Time":["#dbeafe","#1e40af"], "Contract":["#fee2e2","#dc2626"] };
  return (
    <Shell path="/candidate/favourites" title="My Favourite Jobs" subtitle={`${jobs.length} saved jobs`}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
        {jobs.map((job,i) => {
          const [bg,color] = typeColor[job.type]||["#f3f4f6","#374151"];
          return (
            <div key={i} style={{ background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:16 }}>
                <img src={job.logo} alt={job.company} style={{ width:48, height:48, borderRadius:10, objectFit:"cover" }} />
                <button style={{ width:32, height:32, borderRadius:8, border:"1px solid #fecaca", background:"#fee2e2", color:"#dc2626", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>♥</button>
              </div>
              <div style={{ padding:"0 16px 16px" }}>
                <h3 style={{ fontSize:16, fontWeight:600, color:"#1f2937", margin:"0 0 4px" }}>{job.title}</h3>
                <div style={{ fontSize:13, color:"#6b7280", marginBottom:12 }}>{job.company}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:12 }}>
                  {[["fa-map-marker",job.location],["fa-money-bill",job.salary]].map(([icon,text],j) => (
                    <span key={j} style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:"#6b7280" }}>
                      <i className={`fa-solid ${icon}`} style={{ color:"#2563eb" }} />{text}
                    </span>
                  ))}
                  <span style={{ padding:"2px 10px", borderRadius:20, fontSize:11, fontWeight:600, background:bg, color }}>{job.type}</span>
                </div>
                <p style={{ fontSize:13, color:"#4b5563", lineHeight:1.5, marginBottom:14 }}>{job.desc}</p>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px", borderTop:"1px solid #e5e7eb" }}>
                <span style={{ fontSize:12, color:"#9ca3af" }}>Posted {job.posted}</span>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={() => router.push("/jobs/job-single")} style={{ padding:"7px 14px", border:"1px solid #e5e7eb", background:"#f9fafb", color:"#374151", borderRadius:8, cursor:"pointer", fontSize:12 }}>Details</button>
                  <button style={{ padding:"7px 14px", background:"#2563eb", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:600 }}>Apply Now</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}

// ─── My Messages ─────────────────────────────────────────────────
export function MyMessagesPage() {
  const [selected, setSelected] = useState(0);
  const convs = [
    { name:"Multimedia Design", logo:`${IMG}/employers/emplogo1.jpg`, subject:"Re: UI/UX Designer Position", preview:"Thank you for your application...", time:"2h ago", unread:2 },
    { name:"Connect People", logo:`${IMG}/employers/emplogo7.jpg`, subject:"Interview Invitation", preview:"We'd like to invite you for...", time:"5h ago", unread:0 },
    { name:"Power Wave", logo:`${IMG}/employers/emplogo2.jpg`, subject:"Application Update", preview:"Your application is under review...", time:"1d ago", unread:1 },
  ];
  const messages = [
    { from:"company", text:"Hi! Thank you for applying for our UI/UX Designer position. We were impressed by your portfolio.", time:"10:00 AM" },
    { from:"me", text:"Thank you so much! I'm very excited about this opportunity and would love to learn more about the role.", time:"10:15 AM" },
    { from:"company", text:"Great! We'd like to schedule a 30-minute call this week. Are you available Thursday or Friday afternoon?", time:"10:30 AM" },
    { from:"me", text:"I'm available both days! Thursday 2-5 PM or Friday anytime works for me.", time:"10:35 AM" },
  ];
  return (
    <Shell path="/candidate/my-messages" title="My Messages">
      <div style={{ display:"grid", gridTemplateColumns:"300px 1fr", background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden", minHeight:600 }}>
        {/* Conversation list */}
        <div style={{ borderRight:"1px solid #e5e7eb" }}>
          <div style={{ padding:16, borderBottom:"1px solid #e5e7eb", display:"flex", alignItems:"center", gap:8 }}>
            <i className="fa-solid fa-search" style={{ color:"#9ca3af" }} />
            <input placeholder="Search messages..." style={{ border:"none", background:"transparent", outline:"none", fontSize:14, flex:1 }} />
          </div>
          {convs.map((c,i) => (
            <div key={i} onClick={() => setSelected(i)}
              style={{ display:"flex", alignItems:"center", gap:12, padding:16, borderBottom:"1px solid #f3f4f6", cursor:"pointer", background:selected===i?"#eff6ff":"transparent" }}>
              <img src={c.logo} alt={c.name} style={{ width:42, height:42, borderRadius:8, objectFit:"cover", flexShrink:0 }} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                  <span style={{ fontSize:14, fontWeight:600, color:"#1f2937" }}>{c.name}</span>
                  <span style={{ fontSize:11, color:"#9ca3af" }}>{c.time}</span>
                </div>
                <div style={{ fontSize:12, color:"#4b5563", marginBottom:2 }}>{c.subject}</div>
                <div style={{ fontSize:11, color:"#9ca3af", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.preview}</div>
              </div>
              {c.unread > 0 && <span style={{ width:20, height:20, borderRadius:"50%", background:"#2563eb", color:"#fff", fontSize:11, fontWeight:600, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{c.unread}</span>}
            </div>
          ))}
        </div>

        {/* Chat area */}
        <div style={{ display:"flex", flexDirection:"column" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, padding:16, borderBottom:"1px solid #e5e7eb" }}>
            <img src={convs[selected].logo} alt="" style={{ width:40, height:40, borderRadius:8, objectFit:"cover" }} />
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:"#1f2937" }}>{convs[selected].name}</div>
              <div style={{ fontSize:12, color:"#6b7280" }}>{convs[selected].subject}</div>
            </div>
          </div>
          <div style={{ flex:1, padding:16, display:"flex", flexDirection:"column", gap:14 }}>
            {messages.map((m,i) => (
              <div key={i} style={{ display:"flex", justifyContent:m.from==="me"?"flex-end":"flex-start" }}>
                <div style={{ maxWidth:"70%" }}>
                  <div style={{ padding:"12px 16px", borderRadius:12, fontSize:14, background:m.from==="me"?"#2563eb":"#f3f4f6", color:m.from==="me"?"#fff":"#1f2937" }}>{m.text}</div>
                  <span style={{ fontSize:11, color:"#9ca3af", marginTop:4, display:"block", textAlign:m.from==="me"?"right":"left" }}>{m.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding:16, borderTop:"1px solid #e5e7eb", display:"flex", gap:12 }}>
            <textarea placeholder="Type your message..." rows={2} style={{ flex:1, padding:"10px 14px", border:"1px solid #e5e7eb", borderRadius:8, fontSize:14, resize:"none", outline:"none" }} />
            <button style={{ padding:"12px 20px", background:"#2563eb", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:14, alignSelf:"flex-end" }}>
              <i className="fa-solid fa-paper-plane" />
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ─── My Followings ───────────────────────────────────────────────
export function MyFollowingsPage() {
  const companies = [
    { name:"Web Design Studio", industry:"Information Technology", location:"New York, USA", jobs:8, size:"50-200", logo:`${IMG}/employers/emplogo1.jpg`, desc:"Award-winning digital design agency crafting experiences for global brands." },
    { name:"Multimedia Design", industry:"Manufacturing", location:"Chicago, USA", jobs:5, size:"200-500", logo:`${IMG}/employers/emplogo5.jpg`, desc:"Industrial design and manufacturing solutions for Fortune 500 clients." },
    { name:"Connect People", industry:"Technology Services", location:"San Francisco, USA", jobs:5, size:"10-50", logo:`${IMG}/employers/emplogo7.jpg`, desc:"HR tech startup revolutionising talent acquisition with AI-powered tools." },
    { name:"Power Wave", industry:"Cloud Infrastructure", location:"Austin, USA", jobs:3, size:"50-200", logo:`${IMG}/employers/emplogo2.jpg`, desc:"Building scalable cloud solutions and developer tools for modern teams." },
  ];
  return (
    <Shell path="/candidate/my-followings" title="My Followings" subtitle={`Following ${companies.length} companies`}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
        {companies.map((c,i) => (
          <div key={i} style={{ background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", padding:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
              <img src={c.logo} alt={c.name} style={{ width:56, height:56, borderRadius:12, objectFit:"cover" }} />
              <button style={{ padding:"6px 14px", borderRadius:8, border:"1px solid #fecaca", background:"#fee2e2", color:"#dc2626", fontSize:12, fontWeight:500, cursor:"pointer" }}>Unfollow</button>
            </div>
            <h3 style={{ fontSize:16, fontWeight:600, color:"#1f2937", margin:"0 0 4px" }}>{c.name}</h3>
            <div style={{ fontSize:13, color:"#6b7280", marginBottom:10 }}>{c.industry}</div>
            <div style={{ display:"flex", gap:16, marginBottom:12 }}>
              {[["fa-map-marker",c.location],["fa-briefcase",`${c.jobs} open jobs`],["fa-users",`${c.size} employees`]].map(([icon,text],j) => (
                <span key={j} style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:"#6b7280" }}>
                  <i className={`fa-solid ${icon}`} style={{ color:"#2563eb" }} />{text}
                </span>
              ))}
            </div>
            <p style={{ fontSize:13, color:"#4b5563", lineHeight:1.5, marginBottom:16 }}>{c.desc}</p>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => router.push("/employer/single")} style={{ flex:1, padding:"9px", border:"1px solid #2563eb", color:"#2563eb", background:"transparent", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:500 }}>View Company</button>
              <button onClick={() => router.push("/jobs-list")} style={{ flex:1, padding:"9px", background:"#2563eb", color:"#fff", border:"none", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600 }}>View Jobs</button>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

// ─── Packages ────────────────────────────────────────────────────
export function PackagesPage() {
  const plans = [
    { name:"Free", price:0, desc:"Get started with basic job searching.", features:["5 job applications/month","Basic profile","Job search access","Email alerts"], popular:false, current:false },
    { name:"Basic", price:10, desc:"Perfect for active job seekers.", features:["20 job applications/month","Full profile","Priority in search","Job alerts","Resume download"], popular:false, current:true },
    { name:"Pro", price:29, desc:"Unlock everything for serious seekers.", features:["Unlimited applications","Featured profile","Top search placement","AI job matching","Interview prep tools","Dedicated support"], popular:true, current:false },
  ];
  return (
    <Shell path="/candidate/packages" title="Packages" subtitle="Choose the plan that fits your job search">
      {/* Current plan */}
      <div style={{ background:"linear-gradient(135deg,#667eea,#764ba2)", borderRadius:12, padding:24, color:"#fff", marginBottom:28, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:16, right:16, background:"rgba(255,255,255,.2)", padding:"4px 14px", borderRadius:20, fontSize:12, fontWeight:500 }}>Active</div>
        <h3 style={{ fontSize:24, fontWeight:700, margin:"0 0 6px" }}>Basic Jobs View</h3>
        <p style={{ opacity:0.9, margin:"0 0 16px" }}>Your current plan — renews Dec 31, 2025</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12 }}>
          {[["Package","Basic Jobs View"],["Price","USD 10"],["Applications","02 / 20"],["Started","N/A"],["Expires","31 Dec, 2025"]].map(([label,val],i) => (
            <div key={i} style={{ background:"rgba(255,255,255,.15)", borderRadius:10, padding:"12px 16px", textAlign:"center" }}>
              <div style={{ fontSize:11, opacity:.8, marginBottom:4 }}>{label}</div>
              <div style={{ fontSize:14, fontWeight:700 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
        {plans.map((plan,i) => (
          <div key={i} style={{ background:"#fff", borderRadius:16, border:`2px solid ${plan.popular?"#2563eb":plan.current?"#22c55e":"#e5e7eb"}`, padding:28, position:"relative" }}>
            {plan.popular && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:"#2563eb", color:"#fff", padding:"4px 18px", borderRadius:20, fontSize:12, fontWeight:600, whiteSpace:"nowrap" }}>Most Popular</div>}
            {plan.current && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:"#22c55e", color:"#fff", padding:"4px 18px", borderRadius:20, fontSize:12, fontWeight:600, whiteSpace:"nowrap" }}>Current Plan</div>}
            <h3 style={{ fontSize:20, fontWeight:700, color:"#1f2937", marginBottom:14 }}>{plan.name}</h3>
            <div style={{ marginBottom:12 }}>
              <span style={{ fontSize:22, color:"#2563eb" }}>$</span>
              <span style={{ fontSize:44, fontWeight:700, color:"#1f2937" }}>{plan.price}</span>
              <span style={{ fontSize:14, color:"#6b7280" }}>/month</span>
            </div>
            <p style={{ fontSize:14, color:"#6b7280", marginBottom:20 }}>{plan.desc}</p>
            <ul style={{ listStyle:"none", padding:0, margin:"0 0 24px" }}>
              {plan.features.map((f,j) => (
                <li key={j} style={{ display:"flex", alignItems:"center", gap:10, fontSize:14, color:"#4b5563", marginBottom:10 }}>
                  <i className="fa-solid fa-check" style={{ color:"#16a34a", fontSize:12 }} />{f}
                </li>
              ))}
            </ul>
            <button style={{ width:"100%", padding:"12px", background:plan.popular?"#2563eb":plan.current?"#f9fafb":"#f9fafb", color:plan.popular?"#fff":plan.current?"#6b7280":"#374151", border:`1px solid ${plan.popular?"#2563eb":"#e5e7eb"}`, borderRadius:10, fontWeight:600, cursor:"pointer", fontSize:14 }}>
              {plan.current ? "Current Plan" : plan.popular ? "Upgrade Now" : "Select Plan"}
            </button>
          </div>
        ))}
      </div>
    </Shell>
  );
}

// ─── Payment History ─────────────────────────────────────────────
export function PaymentHistoryPage() {
  const payments = [
    { id:"PAY-001", desc:"Basic Jobs View", period:"Nov 2025", date:"Nov 1, 2025", amount:"$10.00", method:"Visa •••• 4242", status:"paid" },
    { id:"PAY-002", desc:"Basic Jobs View", period:"Oct 2025", date:"Oct 1, 2025", amount:"$10.00", method:"Visa •••• 4242", status:"paid" },
    { id:"PAY-003", desc:"Pro Plan (1 month)", period:"Sep 2025", date:"Sep 1, 2025", amount:"$29.00", method:"Visa •••• 4242", status:"paid" },
    { id:"PAY-004", desc:"Basic Jobs View", period:"Aug 2025", date:"Aug 1, 2025", amount:"$10.00", method:"PayPal", status:"paid" },
  ];
  return (
    <Shell path="/candidate/payment-history" title="Payment History" subtitle="View all your subscription payments">
      {/* Summary cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
        {[["Total Spent","$59.00","#eff6ff","#2563eb"],["Active Plan","Basic Jobs View","#dcfce7","#16a34a"],["Renews On","Dec 31, 2025","#fef3c7","#d97706"]].map(([label,val,bg,color],i) => (
          <div key={i} style={{ background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", padding:20 }}>
            <div style={{ fontSize:12, color:"#6b7280", marginBottom:6 }}>{label}</div>
            <div style={{ fontSize:i===0?28:18, fontWeight:700, color }}>{val}</div>
          </div>
        ))}
      </div>

      <div style={{ background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
        <div style={{ padding:"16px 20px", borderBottom:"1px solid #e5e7eb", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h3 style={{ fontSize:16, fontWeight:600, color:"#1f2937", margin:0 }}>Transaction History</h3>
          <button style={{ padding:"8px 16px", border:"1px solid #e5e7eb", borderRadius:8, background:"#f9fafb", cursor:"pointer", fontSize:13 }}>
            <i className="fa-solid fa-download" style={{ marginRight:6 }} />Export
          </button>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:"#f9fafb" }}>
              {["ID","Description","Period","Date","Amount","Method","Status",""].map(th => (
                <th key={th} style={{ textAlign:"left", padding:"12px 16px", fontSize:11, fontWeight:700, color:"#6b7280", textTransform:"uppercase", borderBottom:"1px solid #e5e7eb" }}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((p,i) => (
              <tr key={i} style={{ borderBottom:"1px solid #f3f4f6" }}>
                <td style={{ padding:"14px 16px", fontSize:13, color:"#6b7280" }}>{p.id}</td>
                <td style={{ padding:"14px 16px", fontSize:14, fontWeight:500, color:"#1f2937" }}>{p.desc}</td>
                <td style={{ padding:"14px 16px", fontSize:13, color:"#6b7280" }}>{p.period}</td>
                <td style={{ padding:"14px 16px", fontSize:13, color:"#6b7280" }}>{p.date}</td>
                <td style={{ padding:"14px 16px", fontSize:14, fontWeight:700, color:"#1f2937" }}>{p.amount}</td>
                <td style={{ padding:"14px 16px", fontSize:13, color:"#6b7280" }}>{p.method}</td>
                <td style={{ padding:"14px 16px" }}><span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600, background:"#dcfce7", color:"#166534", textTransform:"capitalize" }}>{p.status}</span></td>
                <td style={{ padding:"14px 16px" }}><button style={{ padding:"5px 12px", border:"1px solid #e5e7eb", borderRadius:6, background:"#f9fafb", cursor:"pointer", fontSize:12 }}>Receipt</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}

// ─── Public Profile ──────────────────────────────────────────────
export function PublicProfilePage() {
  const skills = ["React","TypeScript","Node.js","Figma","Python","PostgreSQL","AWS","Docker"];
  const langs = [["English","Native"],["Arabic","Intermediate"],["Spanish","Basic"]];
  return (
    <div style={{ background:"#f9fafb", minHeight:"100vh" }}>
      {/* Cover */}
      <div style={{ height:280, overflow:"hidden" }}>
        <img src={`${IMG}/user-cover.jpg`} alt="Cover" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
      </div>

      <div style={{ maxWidth:1200, margin:"-80px auto 0", padding:"0 24px", position:"relative", zIndex:1 }}>
        {/* Header card */}
        <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:32, display:"flex", alignItems:"flex-start", gap:24, marginBottom:24, boxShadow:"0 10px 40px rgba(0,0,0,.08)" }}>
          <div style={{ position:"relative", width:150, height:150, borderRadius:"50%", border:"4px solid #fff", boxShadow:"0 4px 12px rgba(0,0,0,.1)", flexShrink:0 }}>
            <img src={`${IMG}/candidates/01.jpg`} alt="" style={{ width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover" }} />
            <span style={{ position:"absolute", bottom:8, right:8, width:24, height:24, borderRadius:"50%", background:"#22c55e", border:"3px solid #fff" }} />
          </div>
          <div style={{ flex:1 }}>
            <h1 style={{ fontSize:28, fontWeight:700, color:"#1f2937", margin:"0 0 4px" }}>Job Seeker</h1>
            <div style={{ fontSize:18, color:"#2563eb", marginBottom:12 }}>Senior UI/UX Designer</div>
            <div style={{ display:"flex", gap:20, flexWrap:"wrap", marginBottom:14 }}>
              {[["fa-map-marker","Washington, USA"],["fa-briefcase","5 years exp"],["fa-money-bill","$6k–$9k/mo"]].map(([icon,text],i) => (
                <span key={i} style={{ display:"flex", alignItems:"center", gap:6, fontSize:14, color:"#6b7280" }}>
                  <i className={`fa-solid ${icon}`} style={{ color:"#2563eb" }} />{text}
                </span>
              ))}
            </div>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {[["Open to Work","#dcfce7","#166534"],["5 Years Exp","#dbeafe","#1e40af"],["$6k–$9k Salary","#fef3c7","#92400e"]].map(([label,bg,color],i) => (
                <span key={i} style={{ padding:"6px 16px", background:bg, color, borderRadius:20, fontSize:13, fontWeight:500 }}>{label}</span>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", gap:10, flexShrink:0 }}>
            <button style={{ padding:"10px 20px", border:"1px solid #2563eb", color:"#2563eb", background:"transparent", borderRadius:10, cursor:"pointer", fontWeight:600 }}>Message</button>
            <button style={{ padding:"10px 20px", background:"#2563eb", color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontWeight:600 }}>Download CV</button>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:24, paddingBottom:40 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {[
              { title:"About Me", body:<p style={{ fontSize:15, color:"#4b5563", lineHeight:1.7, margin:0 }}>I'm a multi-disciplinary designer with 5 years of experience shipping products used by millions. I bridge the gap between design thinking and engineering, leading teams from research to production.</p> },
              { title:"Work Experience", body:
                <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                  {[["Senior UI/UX Designer","Multimedia Design","Jan 2022 – Present","Led design of core product features serving 500K+ users. Established design system."],["UI Designer","Creative Studio","Jun 2019 – Dec 2021","Designed interfaces for e-commerce and SaaS clients."]].map(([title,company,period,desc],i) => (
                    <div key={i} style={{ paddingBottom:20, borderBottom:i===0?"1px solid #f3f4f6":"none" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                        <h4 style={{ fontSize:16, fontWeight:600, color:"#1f2937", margin:0 }}>{title}</h4>
                        <span style={{ fontSize:13, color:"#6b7280" }}>{period}</span>
                      </div>
                      <div style={{ fontSize:14, color:"#2563eb", marginBottom:8 }}>{company}</div>
                      <p style={{ fontSize:14, color:"#4b5563", margin:0, lineHeight:1.6 }}>{desc}</p>
                    </div>
                  ))}
                </div>
              },
              { title:"Education", body:
                <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                  <div style={{ width:48, height:48, borderRadius:10, background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", color:"#2563eb", fontSize:20 }}><i className="fa-solid fa-graduation-cap" /></div>
                  <div>
                    <h4 style={{ fontSize:15, fontWeight:600, color:"#1f2937", margin:"0 0 4px" }}>B.Sc. Computer Science — MIT</h4>
                    <p style={{ fontSize:13, color:"#6b7280", margin:0 }}>2015 – 2019 · GPA: 3.8/4.0</p>
                  </div>
                </div>
              },
            ].map((sec,i) => (
              <div key={i} style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:24 }}>
                <h3 style={{ fontSize:18, fontWeight:600, color:"#1f2937", marginBottom:16 }}>{sec.title}</h3>
                {sec.body}
              </div>
            ))}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {/* Skills */}
            <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:24 }}>
              <h3 style={{ fontSize:16, fontWeight:600, color:"#1f2937", marginBottom:14 }}>Skills</h3>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {skills.map((s,i) => <span key={i} style={{ padding:"6px 14px", background:"#f3f4f6", borderRadius:20, fontSize:13, color:"#4b5563" }}>{s}</span>)}
              </div>
            </div>
            {/* Languages */}
            <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:24 }}>
              <h3 style={{ fontSize:16, fontWeight:600, color:"#1f2937", marginBottom:14 }}>Languages</h3>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {langs.map(([lang,level],i) => (
                  <li key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:i<langs.length-1?"1px solid #f3f4f6":"none", fontSize:14, color:"#4b5563" }}>
                    <span><i className="fa-solid fa-language" style={{ marginRight:8, color:"#2563eb" }} />{lang}</span>
                    <span style={{ fontSize:12, color:"#6b7280" }}>{level}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:24 }}>
              <h3 style={{ fontSize:16, fontWeight:600, color:"#1f2937", marginBottom:14 }}>Contact</h3>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {[["fa-envelope","seeker@jobsportal.com"],["fa-phone","+1 234 567 890"],["fa-map-marker","Washington, USA"]].map(([icon,text],i) => (
                  <li key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom:i<2?"1px solid #f3f4f6":"none", fontSize:14, color:"#4b5563" }}>
                    <i className={`fa-solid ${icon}`} style={{ color:"#2563eb", width:16 }} />{text}
                  </li>
                ))}
              </ul>
              <div style={{ display:"flex", gap:8, marginTop:16 }}>
                {["in","𝕏","◎","f"].map((icon,i) => (
                  <a key={i} href="#" style={{ width:40, height:40, borderRadius:10, background:"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", color:"#4b5563", fontSize:14, fontWeight:700 }}>{icon}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Job Alert ───────────────────────────────────────────────────
export function JobAlertPage() {
  const [alerts] = useState([
    { title:"UI/UX Designer Jobs", keywords:"UI Designer, UX Designer", location:"New York, USA", frequency:"Daily", type:"Full Time", active:true },
    { title:"React Developer Roles", keywords:"React, Frontend, JavaScript", location:"Remote", frequency:"Weekly", type:"Contract", active:true },
    { title:"Product Manager Positions", keywords:"Product Manager, PM", location:"San Francisco", frequency:"Instant", type:"Full Time", active:false },
  ]);
  return (
    <Shell path="/candidate/job-alert" title="Job Alerts" subtitle="Get notified when new matching jobs are posted">
      {/* Create alert form */}
      <Card>
        <CardHead title="Create New Alert" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18 }}>
          <Input label="Alert Name" placeholder="e.g. Senior Designer Jobs" />
          <Input label="Keywords" placeholder="e.g. UI Designer, Figma, React" />
          <Input label="Location" placeholder="e.g. New York, USA or Remote" />
          <Sel label="Job Type" opts={["Any Type","Full Time","Part Time","Contract","Freelance"]} />
          <Sel label="Salary Range" opts={["Any Salary","$2k-$4k","$4k-$6k","$6k-$10k","$10k+"]} />
          <Sel label="Alert Frequency" opts={["Instant","Daily Digest","Weekly Summary"]} />
          <div style={{ gridColumn:"span 2", display:"flex", justifyContent:"flex-end", gap:12 }}>
            <button style={{ padding:"11px 24px", border:"1px solid #e5e7eb", background:"#f9fafb", color:"#374151", borderRadius:10, fontWeight:600, cursor:"pointer" }}>Cancel</button>
            <button style={{ padding:"11px 28px", background:"#2563eb", color:"#fff", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer" }}>Create Alert</button>
          </div>
        </div>
      </Card>

      {/* Existing alerts */}
      <h3 style={{ fontSize:18, fontWeight:700, color:"#1f2937", marginBottom:16 }}>Your Alerts ({alerts.length})</h3>
      {alerts.map((alert,i) => (
        <div key={i} style={{ background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", padding:20, marginBottom:14, display:"flex", alignItems:"center", gap:20 }}>
          <div style={{ width:44, height:44, borderRadius:10, background:alert.active?"#dbeafe":"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:alert.active?"#2563eb":"#9ca3af", flexShrink:0 }}>
            <i className="fa-solid fa-bell" />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
              <h4 style={{ fontSize:15, fontWeight:600, color:"#1f2937", margin:0 }}>{alert.title}</h4>
              <span style={{ fontSize:12, fontWeight:600, padding:"3px 10px", borderRadius:20, background:alert.active?"#dcfce7":"#f3f4f6", color:alert.active?"#166534":"#6b7280" }}>{alert.active?"Active":"Paused"}</span>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:14, fontSize:13, color:"#6b7280" }}>
              {[["fa-search",alert.keywords],["fa-map-marker",alert.location],["fa-briefcase",alert.type],["fa-clock",alert.frequency]].map(([icon,text],j) => (
                <span key={j} style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <i className={`fa-solid ${icon}`} style={{ color:"#2563eb" }} />{text}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", gap:8, flexShrink:0 }}>
            <button style={{ width:36, height:36, border:"1px solid #e5e7eb", borderRadius:8, background:"#fff", cursor:"pointer", color:"#6b7280", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <i className="fa-solid fa-pen" style={{ fontSize:12 }} />
            </button>
            <button style={{ width:36, height:36, border:"1px solid #fecaca", borderRadius:8, background:"#fff", cursor:"pointer", color:"#dc2626", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <i className="fa-solid fa-trash" style={{ fontSize:12 }} />
            </button>
          </div>
        </div>
      ))}
    </Shell>
  );
}

// ─── Manage Resume ───────────────────────────────────────────────
export function ManageResumePage() {
  const resumes = [
    { name:"JobSeeker_Resume_2025.pdf", size:"245 KB", uploaded:"Nov 15, 2025", isDefault:true },
    { name:"Portfolio_CV.pdf", size:"1.2 MB", uploaded:"Oct 3, 2025", isDefault:false },
  ];
  return (
    <Shell path="/candidate/manage-resume" title="Manage Resume" subtitle="Upload and manage your resume files">
      {/* Upload area */}
      <div style={{ background:"#fff", borderRadius:16, border:"2px dashed #e5e7eb", padding:48, textAlign:"center", marginBottom:24 }}>
        <div style={{ width:80, height:80, borderRadius:"50%", background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:32, color:"#2563eb" }}>
          <i className="fa-solid fa-cloud-arrow-up" />
        </div>
        <h3 style={{ fontSize:20, fontWeight:600, color:"#1f2937", marginBottom:8 }}>Upload Your Resume</h3>
        <p style={{ fontSize:14, color:"#6b7280", marginBottom:24 }}>Drag & drop your file here, or click to browse. PDF, DOC, or DOCX up to 5MB.</p>
        <button style={{ padding:"12px 28px", background:"#2563eb", color:"#fff", border:"none", borderRadius:10, fontWeight:600, cursor:"pointer", fontSize:14 }}>
          <i className="fa-solid fa-upload" style={{ marginRight:8 }} />Choose File
        </button>
      </div>

      {/* Resume list */}
      <Card>
        <CardHead title={`Your Resumes (${resumes.length})`} />
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {resumes.map((r,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:16, padding:20, background:"#f9fafb", borderRadius:12, border:`1px solid ${r.isDefault?"#2563eb":"#e5e7eb"}` }}>
              <div style={{ width:48, height:48, borderRadius:10, background:"#fee2e2", color:"#dc2626", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>
                <i className="fa-solid fa-file-pdf" />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:600, color:"#1f2937", marginBottom:6 }}>
                  {r.name}
                  {r.isDefault && <span style={{ marginLeft:10, padding:"2px 10px", background:"#2563eb", color:"#fff", borderRadius:20, fontSize:11, fontWeight:500 }}>Default</span>}
                </div>
                <div style={{ display:"flex", gap:16, fontSize:13, color:"#6b7280" }}>
                  {[["fa-file","Size: "+r.size],["fa-calendar","Uploaded: "+r.uploaded]].map(([icon,text],j) => (
                    <span key={j}><i className={`fa-solid ${icon}`} style={{ marginRight:6, color:"#2563eb" }} />{text}</span>
                  ))}
                </div>
              </div>
              <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                <button style={{ padding:"7px 14px", border:"1px solid #e5e7eb", background:"#fff", borderRadius:8, cursor:"pointer", fontSize:13, color:"#374151" }}>Preview</button>
                <button style={{ padding:"7px 14px", border:"1px solid #2563eb", color:"#2563eb", background:"transparent", borderRadius:8, cursor:"pointer", fontSize:13 }}>Download</button>
                {!r.isDefault && <button style={{ padding:"7px 14px", border:"1px solid #dc2626", color:"#dc2626", background:"transparent", borderRadius:8, cursor:"pointer", fontSize:13 }}>Delete</button>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 style={{ fontSize:16, fontWeight:600, color:"#1f2937", marginBottom:14 }}>
          <i className="fa-solid fa-lightbulb" style={{ color:"#f59e0b", marginRight:8 }} />Resume Tips
        </h3>
        <ul style={{ listStyle:"none", padding:0, margin:0 }}>
          {["Keep your resume to 1-2 pages for best results","Use keywords from the job description","Quantify achievements where possible (e.g. 'increased sales by 32%')","Save as PDF to preserve formatting","Update regularly with new skills and experience"].map((tip,i) => (
            <li key={i} style={{ padding:"9px 0", fontSize:14, color:"#4b5563", borderBottom:i<4?"1px solid #f3f4f6":"none" }}>
              <span style={{ color:"#16a34a", marginRight:8 }}>•</span>{tip}
            </li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}
