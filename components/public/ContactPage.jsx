'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const info = [
    ["fa-location-dot","Our Location","123 Business Avenue, Suite 500\nNew York, NY 10001"],
    ["fa-envelope","Email Us","support@jobsportal.com\ncareers@jobsportal.com"],
    ["fa-phone","Call Us","+1 (555) 123-4567\n+1 (555) 987-6543"],
    ["fa-clock","Working Hours","Mon - Fri: 9:00 AM - 6:00 PM\nSat - Sun: Closed"],
  ];
  return (
    <>
      {/* Hero */}
      <section style={{ background:"linear-gradient(135deg,#667eea,#764ba2)", padding:"100px 0", color:"#fff" }}>
        <div style={{ maxWidth:600, margin:"0 auto", padding:"0 24px", textAlign:"center" }}>
          <h1 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:800, margin:"0 0 16px" }}>Get in Touch</h1>
          <p style={{ fontSize:18, opacity:0.9, margin:0 }}>Have questions? We're here to help. Reach out to our team.</p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding:"80px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:48 }}>
            {/* Info */}
            <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
              {info.map(([icon,title,text],i) => (
                <div key={i} style={{ display:"flex", gap:16 }}>
                  <div style={{ width:52, height:52, borderRadius:12, background:"#eff6ff", color:"#2563eb", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>
                    <i className={`fa-solid ${icon}`} />
                  </div>
                  <div>
                    <h4 style={{ fontSize:16, fontWeight:600, color:"#1f2937", margin:"0 0 6px" }}>{title}</h4>
                    <p style={{ fontSize:14, color:"#6b7280", margin:0, lineHeight:1.6, whiteSpace:"pre-line" }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div style={{ background:"#fff", borderRadius:16, border:"1px solid #e5e7eb", padding:36 }}>
              <h2 style={{ fontSize:24, fontWeight:700, color:"#1f2937", marginBottom:24 }}>Send us a Message</h2>
              {sent ? (
                <div style={{ textAlign:"center", padding:"40px 0" }}>
                  <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
                  <h3 style={{ fontSize:22, fontWeight:700, color:"#1f2937", marginBottom:8 }}>Message Sent!</h3>
                  <p style={{ color:"#6b7280" }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
                    <div><label style={{ display:"block", fontSize:13, fontWeight:500, color:"#374151", marginBottom:6 }}>First Name</label><input style={{ width:"100%", padding:"11px 14px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:13, boxSizing:"border-box", outline:"none" }} /></div>
                    <div><label style={{ display:"block", fontSize:13, fontWeight:500, color:"#374151", marginBottom:6 }}>Last Name</label><input style={{ width:"100%", padding:"11px 14px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:13, boxSizing:"border-box", outline:"none" }} /></div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
                    <div><label style={{ display:"block", fontSize:13, fontWeight:500, color:"#374151", marginBottom:6 }}>Email</label><input type="email" style={{ width:"100%", padding:"11px 14px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:13, boxSizing:"border-box", outline:"none" }} /></div>
                    <div><label style={{ display:"block", fontSize:13, fontWeight:500, color:"#374151", marginBottom:6 }}>Phone</label><input type="tel" style={{ width:"100%", padding:"11px 14px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:13, boxSizing:"border-box", outline:"none" }} /></div>
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:13, fontWeight:500, color:"#374151", marginBottom:6 }}>Subject</label>
                    <select style={{ width:"100%", padding:"11px 14px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:13, boxSizing:"border-box", outline:"none", background:"#fff" }}>
                      <option value="">Select a subject</option>
                      {["General Inquiry","Technical Support","Careers","Partnerships","Other"].map((o,i) => <option key={i}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:13, fontWeight:500, color:"#374151", marginBottom:6 }}>Message</label>
                    <textarea rows={5} style={{ width:"100%", padding:"11px 14px", border:"1px solid #e5e7eb", borderRadius:10, fontSize:13, boxSizing:"border-box", outline:"none", resize:"vertical" }} />
                  </div>
                  <button onClick={() => setSent(true)} style={{ padding:"13px", background:"#2563eb", color:"#fff", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer", fontSize:15 }}>Send Message</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.183593059918!2d-74.00425878459365!3d40.74881737932785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
          style={{ width:"100%", height:420, border:"none", display:"block" }}
          allowFullScreen loading="lazy" />
      </section>
    </>
  );
}
