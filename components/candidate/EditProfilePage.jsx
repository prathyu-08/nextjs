'use client';
import { Shell, IMG } from "./_shared";

export default function EditProfilePage() {
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
