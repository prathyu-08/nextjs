'use client';
import CandidateSidebar from "../layout/sidebars/CandidateSidebar";

export const IMG = "https://www.sharjeelanjum.com/html/jobs-portal/images";

// ─── Theme tokens ────────────────────────────────────────────────
export const templateAccent = "#18b870";
export const templateBlue = "#12a8c7";
export const mutedText = "#6b7280";

// ─── Shared shell ────────────────────────────────────────────────
export function Shell({ path, title, subtitle, children }) {
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

// ─── Card primitives ─────────────────────────────────────────────
export function Card({ children, style={} }) {
  return <div style={{ background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", padding:24, marginBottom:20, ...style }}>{children}</div>;
}

export function CardHead({ title, action }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
      <h3 style={{ fontSize:18, fontWeight:700, color:"#1f2937", margin:0 }}>{title}</h3>
      {action}
    </div>
  );
}

export function Input({ label, type="text", placeholder="", defaultValue="" }) {
  return (
    <div>
      <label style={{ display:"block", fontSize:13, fontWeight:500, color:"#374151", marginBottom:6 }}>{label}</label>
      <input type={type} placeholder={placeholder} defaultValue={defaultValue}
        style={{ width:"100%", padding:"11px 14px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:13, boxSizing:"border-box", outline:"none" }} />
    </div>
  );
}

export function Sel({ label, opts }) {
  return (
    <div>
      <label style={{ display:"block", fontSize:13, fontWeight:500, color:"#374151", marginBottom:6 }}>{label}</label>
      <select style={{ width:"100%", padding:"11px 14px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:13, boxSizing:"border-box", outline:"none", background:"#fff" }}>
        {opts.map((o,i) => <option key={i}>{o}</option>)}
      </select>
    </div>
  );
}

// ─── Template helpers (Download CV) ──────────────────────────────
export function TemplatePanel({ title, children, action, note }) {
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

export function TemplateButton({ children, variant="primary", style={}, onClick }) {
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

export function TemplateField({ label, children }) {
  return (
    <label style={{ display:"block" }}>
      <span style={{ display:"block", fontSize:13, fontWeight:700, color:"#35404a", marginBottom:8 }}>{label}</span>
      {children}
    </label>
  );
}

export function TextBox({ placeholder="", defaultValue="", type="text" }) {
  return (
    <input type={type} placeholder={placeholder} defaultValue={defaultValue}
      style={{ width:"100%", height:42, padding:"8px 12px", border:"1px solid #dfe7ee", borderRadius:3, color:"#475569", fontSize:13, boxSizing:"border-box", outline:"none", background:"#fff" }} />
  );
}

export function SelectBox({ opts, defaultValue }) {
  return (
    <select defaultValue={defaultValue} style={{ width:"100%", height:42, padding:"8px 12px", border:"1px solid #dfe7ee", borderRadius:3, color:"#475569", fontSize:13, boxSizing:"border-box", outline:"none", background:"#fff" }}>
      {opts.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

export function TemplateGrid({ children }) {
  return <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:18, marginBottom:18 }}>{children}</div>;
}
