import { useRouter } from 'next/router';
const IMG = "https://www.sharjeelanjum.com/html/jobs-portal/images";

// ─── About Page ──────────────────────────────────────────────────
export function AboutPage() {
  const stats = [["50K+","Active Jobs"],["120K+","Companies"],["1M+","Job Seekers"],["25K+","Placements"]];
  const team = [
    { name:"Sarah Johnson", role:"CEO & Founder", img:`${IMG}/team1.jpg` },
    { name:"Michael Chen", role:"Head of Operations", img:`${IMG}/team2.jpg` },
    { name:"Emily Davis", role:"Head of Product", img:`${IMG}/team3.jpg` },
    { name:"James Wilson", role:"Lead Engineer", img:`${IMG}/team4.jpg` },
  ];
  return (
    <>
      {/* Hero */}
      <section style={{ background:"linear-gradient(135deg,#667eea,#764ba2)", padding:"100px 0", color:"#fff" }}>
        <div style={{ maxWidth:700, margin:"0 auto", padding:"0 24px", textAlign:"center" }}>
          <h1 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:800, margin:"0 0 18px" }}>Connecting Talent with Opportunity</h1>
          <p style={{ fontSize:18, opacity:0.9, margin:0, lineHeight:1.6 }}>We're building the future of job recruitment, making it easier for candidates and employers to find their perfect match.</p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding:"60px 0", background:"#f9fafb" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24, textAlign:"center" }}>
            {stats.map(([val,label],i) => (
              <div key={i}>
                <div style={{ fontSize:48, fontWeight:800, color:"#2563eb", marginBottom:8 }}>{val}</div>
                <div style={{ fontSize:16, color:"#6b7280" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding:"80px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
            <div>
              <img src={`${IMG}/about.jpg`} alt="Our Mission" style={{ width:"100%", borderRadius:16 }} onError={e => e.target.style.display="none"} />
              {/* Fallback placeholder */}
              <div style={{ width:"100%", height:360, borderRadius:16, background:"linear-gradient(135deg,#667eea22,#764ba222)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:80 }}>🎯</div>
            </div>
            <div>
              <h2 style={{ fontSize:36, fontWeight:700, color:"#1f2937", marginBottom:18 }}>Our Mission</h2>
              <p style={{ fontSize:15, color:"#4b5563", marginBottom:14, lineHeight:1.7 }}>We believe that finding the right job shouldn't be a challenge. Our platform connects talented individuals with world-class companies, creating meaningful careers and building stronger teams.</p>
              <p style={{ fontSize:15, color:"#4b5563", marginBottom:24, lineHeight:1.7 }}>Since our founding, we've helped thousands of people find their dream jobs and assisted companies in building high-performing teams.</p>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {["Smart job matching algorithm","Verified company listings","Resume builder tools","Job alerts & notifications"].map((item,i) => (
                  <li key={i} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12, fontSize:15, color:"#4b5563" }}>
                    <i className="fa-solid fa-check" style={{ color:"#22c55e", fontSize:16 }} />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding:"80px 0", background:"#f9fafb" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ textAlign:"center", maxWidth:600, margin:"0 auto 48px" }}>
            <h2 style={{ fontSize:36, fontWeight:700, color:"#1f2937", marginBottom:10 }}>Meet Our Team</h2>
            <p style={{ fontSize:16, color:"#6b7280", margin:0 }}>The people behind your career success</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:32 }}>
            {team.map((member,i) => (
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ width:200, height:200, borderRadius:"50%", overflow:"hidden", margin:"0 auto 20px", background:"#e0e7ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:60 }}>
                  {["👩","👨","👩","👨"][i]}
                </div>
                <h4 style={{ fontSize:18, fontWeight:600, color:"#1f2937", marginBottom:4 }}>{member.name}</h4>
                <p style={{ fontSize:14, color:"#6b7280", margin:0 }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"80px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ background:"linear-gradient(135deg,#eff6ff,#f0fdf4)", borderRadius:20, border:"1px solid #e5e7eb", padding:60, textAlign:"center" }}>
            <h2 style={{ fontSize:32, fontWeight:700, color:"#1f2937", marginBottom:12 }}>Ready to Get Started?</h2>
            <p style={{ fontSize:16, color:"#6b7280", marginBottom:28 }}>Join thousands of job seekers and employers on our platform</p>
            <div style={{ display:"flex", gap:16, justifyContent:"center" }}>
              <button onClick={() => router.push("/auth/signup")} style={{ padding:"14px 32px", background:"#2563eb", color:"#fff", border:"none", borderRadius:12, fontWeight:700, cursor:"pointer", fontSize:15 }}>Find a Job</button>
              <button onClick={() => router.push("/employer/list")} style={{ padding:"14px 32px", border:"2px solid #2563eb", color:"#2563eb", background:"transparent", borderRadius:12, fontWeight:700, cursor:"pointer", fontSize:15 }}>Post a Job</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Contact Page ────────────────────────────────────────────────
export function ContactPage() {
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

// ─── FAQ Page ─────────────────────────────────────────────────────
export function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openIndex, setOpenIndex] = useState(0);
  const categories = ["general","candidates","employers","payments","technical"];
  const faqs = {
    general: [
      { q:"What is JobsPortal?", a:"JobsPortal is a comprehensive job marketplace connecting talented professionals with top employers across various industries and locations globally." },
      { q:"Is JobsPortal free to use?", a:"Yes! Job seekers can create a free account, browse jobs, and apply for positions. Employers have both free and premium plans available." },
      { q:"How do I create an account?", a:"Click the 'Register' button in the navigation, choose whether you're a candidate or employer, and fill in your details. It takes less than 2 minutes!" },
    ],
    candidates: [
      { q:"How do I apply for a job?", a:"Find a job you're interested in, click 'Apply Now', and submit your resume and cover letter. You can track your application status in your dashboard." },
      { q:"Can I set up job alerts?", a:"Absolutely! Go to Job Alerts in your dashboard, set your preferences (keywords, location, job type), and choose how often you want notifications." },
      { q:"How do I make my profile stand out?", a:"Complete all profile sections, upload a professional photo, list your skills, add work experience, and keep your profile updated regularly." },
    ],
    employers: [
      { q:"How do I post a job?", a:"After creating an employer account, navigate to 'Post a Job' in your dashboard, fill in the job details, and publish. Your listing will be visible immediately." },
      { q:"How many jobs can I post?", a:"This depends on your plan. Free accounts can post up to 2 jobs. Premium plans offer unlimited postings with enhanced visibility." },
      { q:"How do I manage applications?", a:"All applications are visible in your Employer Dashboard under 'Applications'. You can filter, sort, and update candidate statuses from there." },
    ],
    payments: [
      { q:"What payment methods are accepted?", a:"We accept all major credit/debit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise plans." },
      { q:"Can I cancel my subscription?", a:"Yes, you can cancel anytime from your account settings. You'll continue to have access until the end of your current billing period." },
      { q:"Is there a refund policy?", a:"We offer a 7-day money-back guarantee for new paid subscriptions. Contact support within 7 days of your purchase to request a refund." },
    ],
    technical: [
      { q:"Is my data secure?", a:"Yes. We use industry-standard encryption (SSL/TLS), and your personal data is never sold to third parties. Read our Privacy Policy for full details." },
      { q:"What browsers are supported?", a:"JobsPortal works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience." },
      { q:"Is there a mobile app?", a:"A mobile app is coming soon! For now, our website is fully responsive and works great on mobile devices through your browser." },
    ],
  };

  return (
    <>
      {/* Hero */}
      <section style={{ background:"linear-gradient(135deg,#667eea,#764ba2)", padding:"100px 0", color:"#fff" }}>
        <div style={{ maxWidth:600, margin:"0 auto", padding:"0 24px", textAlign:"center" }}>
          <h1 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:800, margin:"0 0 16px" }}>Frequently Asked Questions</h1>
          <p style={{ fontSize:18, opacity:0.9, margin:0 }}>Find answers to common questions about JobsPortal.</p>
        </div>
      </section>

      <section style={{ padding:"80px 0" }}>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px" }}>
          {/* Category tabs */}
          <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:48, flexWrap:"wrap" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setOpenIndex(0); }}
                style={{ padding:"10px 22px", borderRadius:30, border:"1px solid", borderColor:activeCategory===cat?"#2563eb":"#e5e7eb", background:activeCategory===cat?"#2563eb":"#fff", color:activeCategory===cat?"#fff":"#6b7280", fontSize:14, fontWeight:500, cursor:"pointer", textTransform:"capitalize" }}>
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ accordion */}
          <div>
            {(faqs[activeCategory]||[]).map((item,i) => (
              <div key={i} style={{ background:"#fff", borderRadius:12, border:"1px solid #e5e7eb", marginBottom:12, overflow:"hidden" }}>
                <button onClick={() => setOpenIndex(openIndex===i ? -1 : i)}
                  style={{ width:"100%", padding:"20px 24px", background:"transparent", border:"none", display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:16, fontWeight:600, color:"#1f2937", cursor:"pointer", textAlign:"left" }}>
                  {item.q}
                  <i className={`fa-solid fa-chevron-${openIndex===i?"up":"down"}`} style={{ color:"#6b7280", fontSize:14, flexShrink:0 }} />
                </button>
                {openIndex===i && (
                  <div style={{ padding:"0 24px 20px" }}>
                    <p style={{ fontSize:14, color:"#4b5563", lineHeight:1.7, margin:0 }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign:"center", marginTop:60, background:"#f9fafb", borderRadius:16, padding:40 }}>
            <h3 style={{ fontSize:22, fontWeight:700, color:"#1f2937", marginBottom:8 }}>Still have questions?</h3>
            <p style={{ fontSize:14, color:"#6b7280", marginBottom:20 }}>Can't find what you're looking for? Our support team is happy to help.</p>
            <button onClick={() => router.push("/public/contact")} style={{ padding:"12px 28px", background:"#2563eb", color:"#fff", border:"none", borderRadius:10, fontWeight:700, cursor:"pointer", fontSize:15 }}>Contact Support</button>
          </div>
        </div>
      </section>
    </>
  );
}

import { useState, useEffect } from "react";
