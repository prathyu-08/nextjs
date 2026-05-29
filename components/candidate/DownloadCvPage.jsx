'use client';
import {
  Shell, IMG,
  TemplatePanel, TemplateButton, TemplateField, TextBox, SelectBox, TemplateGrid,
  templateAccent, templateBlue, mutedText,
} from "./_shared";

export default function DownloadCvPage() {
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
