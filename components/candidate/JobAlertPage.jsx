'use client';
import { useState } from "react";
import { Shell, Card, CardHead, Input, Sel } from "./_shared";

export default function JobAlertPage() {
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
