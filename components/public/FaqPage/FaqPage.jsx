'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './FaqPage.module.css';

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
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
          <p className={styles.heroLead}>Find answers to common questions about JobsPortal.</p>
        </div>
      </section>

      <section className="section">
        <div className={styles.faqWrap}>
          {/* Category tabs */}
          <div className={styles.tabs}>
            {categories.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setOpenIndex(0); }}
                className={`${styles.tab} ${activeCategory===cat ? styles.tabActive : ''}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ accordion */}
          <div>
            {(faqs[activeCategory]||[]).map((item,i) => (
              <div key={i} className={styles.faqItem}>
                <button onClick={() => setOpenIndex(openIndex===i ? -1 : i)} className={styles.faqQuestion}>
                  {item.q}
                  <i className={`fa-solid fa-chevron-${openIndex===i?"up":"down"} ${styles.faqChevron}`} />
                </button>
                {openIndex===i && (
                  <div className={styles.faqAnswerWrap}>
                    <p className={styles.faqAnswer}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Still have questions?</h3>
            <p className={styles.ctaText}>Can't find what you're looking for? Our support team is happy to help.</p>
            <button onClick={() => router.push("/public/contact")} className={styles.ctaBtn}>Contact Support</button>
          </div>
        </div>
      </section>
    </>
  );
}
