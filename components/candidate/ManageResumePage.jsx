'use client';
import { Shell, Card, CardHead } from "./_shared";

export default function ManageResumePage() {
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
