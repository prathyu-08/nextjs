'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FaqPage() {
  const router = useRouter();
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
