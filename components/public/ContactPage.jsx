'use client';
import { useState } from 'react';
import styles from './ContactPage.module.css';

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
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>Get in Touch</h1>
          <p className={styles.heroLead}>Have questions? We're here to help. Reach out to our team.</p>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            {/* Info */}
            <div className={styles.infoCol}>
              {info.map(([icon,title,text],i) => (
                <div key={i} className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className={`fa-solid ${icon}`} />
                  </div>
                  <div>
                    <h4 className={styles.infoTitle}>{title}</h4>
                    <p className={styles.infoText}>{text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Send us a Message</h2>
              {sent ? (
                <div className={styles.sentBox}>
                  <div className={styles.sentIcon}>✅</div>
                  <h3 className={styles.sentTitle}>Message Sent!</h3>
                  <p className={styles.sentText}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <div className={styles.formBody}>
                  <div className={styles.formRow}>
                    <div><label className={styles.label}>First Name</label><input className={styles.input} /></div>
                    <div><label className={styles.label}>Last Name</label><input className={styles.input} /></div>
                  </div>
                  <div className={styles.formRow}>
                    <div><label className={styles.label}>Email</label><input type="email" className={styles.input} /></div>
                    <div><label className={styles.label}>Phone</label><input type="tel" className={styles.input} /></div>
                  </div>
                  <div>
                    <label className={styles.label}>Subject</label>
                    <select className={`${styles.input} ${styles.select}`}>
                      <option value="">Select a subject</option>
                      {["General Inquiry","Technical Support","Careers","Partnerships","Other"].map((o,i) => <option key={i}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={styles.label}>Message</label>
                    <textarea rows={5} className={`${styles.input} ${styles.textarea}`} />
                  </div>
                  <button onClick={() => setSent(true)} className={styles.submitBtn}>Send Message</button>
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
          className={styles.mapFrame}
          allowFullScreen loading="lazy" />
      </section>
    </>
  );
}
