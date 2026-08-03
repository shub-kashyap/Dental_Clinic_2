'use client';

import { useState } from 'react';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section className={`${styles.contact}`} id="contact">
      {/* CTA Banner */}
      <div className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div className={styles.ctaLeft}>
              <div className="badge badge-white">
                <span />
                PATIENT ASSISTANCE
              </div>
              <h2 className={`heading-lg ${styles.ctaHeading}`}>
                Send Us A<br />
                <span className={styles.ctaAccent}>Direct Message</span>
              </h2>
              <p className={styles.ctaDesc}>
                Fill out the form to request your appointment time, or connect with our receptionists instantly via phone or WhatsApp.
              </p>
              <div className={styles.ctaContact}>
                <a href="tel:+919236118545" className={styles.ctaPhone}>
                  <span className={styles.ctaIcon}>📞</span>
                  <div>
                    <span className={styles.ctaContactLabel}>Call Us Now</span>
                    <span className={styles.ctaContactValue}>+91 9236118545 / 2549250</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919236118545?text=Hello%20Shivam%20Dental%20Care%20%26%20Implant%20Centre,%20I%20would%20like%20to%20inquire%20about%20an%20appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaWhatsapp}
                >
                  <span className={styles.ctaIcon}>💬</span>
                  <div>
                    <span className={styles.ctaContactLabel}>WhatsApp Chat</span>
                    <span className={styles.ctaContactValue}>+91 9236118545</span>
                  </div>
                </a>

                <a href="mailto:info@shivamdental.com" className={styles.ctaEmail}>
                  <span className={styles.ctaIcon}>✉️</span>
                  <div>
                    <span className={styles.ctaContactLabel}>Email Us</span>
                    <span className={styles.ctaContactValue}>info@shivamdental.com</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Form */}
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.successMsg}>
                  <span className={styles.successIcon}>✅</span>
                  <h3>Appointment Requested!</h3>
                  <p>We&apos;ll call or text you within 24 hours to confirm your booking.</p>
                </div>
              ) : (
                <>
                  <h3 className={styles.formTitle}>Book Your Appointment</h3>
                  <form onSubmit={handleSubmit} className={styles.form} id="appointment-form">
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="contact-name">Full Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          placeholder="John Smith"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="contact-phone">Phone Number</label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          placeholder="+1 (555) 000-0000"
                          value={form.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-email">Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-service">Service Required</label>
                      <select
                        id="contact-service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a service...</option>
                        <option value="general">General Dentistry</option>
                        <option value="whitening">Teeth Whitening</option>
                        <option value="implants">Dental Implants</option>
                        <option value="orthodontics">Orthodontics</option>
                        <option value="root-canal">Root Canal</option>
                        <option value="surgery">Oral Surgery</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-message">Additional Notes</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        placeholder="Tell us about your dental concerns or any questions..."
                        rows={3}
                        value={form.message}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} id="form-submit">
                      Book Appointment ↗
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
