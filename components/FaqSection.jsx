'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './FaqSection.module.css';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    const elements = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      q: 'How often should I visit Shivam Dental Care & Implant Centre for a check-up?',
      a: 'We recommend visiting every 6 months for a routine check-up and professional dental cleaning. Regular visits prevent plaque build-up, catch early signs of decay, and ensure long-term oral wellness.',
    },
    {
      q: 'Is in-office laser teeth whitening safe for enamel?',
      a: 'Yes, 100%! Our whitening procedure uses dentist-supervised LED/UV laser technology and enamel-safe gel. It effectively lifts stubborn stains without weakening tooth enamel or damaging nerve endings.',
    },
    {
      q: 'What should I expect during a dental implant procedure?',
      a: 'Implant placement is a routine procedure done under local anesthesia or comfortable sedation. A biocompatible titanium post is gently placed into the jawbone, followed by a custom porcelain crown. The process is virtually pain-free.',
    },
    {
      q: 'Do you accept major dental insurance and offers financing options?',
      a: 'Yes, we accept all major PPO insurance providers (Delta Dental, Cigna, MetLife, Aetna, Guardian, etc.) and offer flexible interest-free monthly financing through CareCredit and our internal membership plans.',
    },
    {
      q: 'What steps should I take in a sudden dental emergency?',
      a: 'For urgent issues like severe toothaches, knocked-out teeth, or broken restorations, contact our 24/7 Emergency Line immediately at +1 (555) 987-6543. We prioritize emergency walk-in cases every single day.',
    },
  ];

  return (
    <section className={`section section-light ${styles.faqSection}`} id="faq" ref={sectionRef}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Text */}
          <div className={`${styles.leftCol} reveal-left`}>
            <div className="badge">
              <span />
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className={`heading-lg ${styles.heading}`}>
              Got Questions?<br />We Have Answers.
            </h2>
            <p className={styles.desc}>
              Find quick answers to common questions about dental care, appointments, treatments, and insurance coverage.
            </p>
            <div className={styles.helpBox}>
              <span className={styles.helpIcon}>💡</span>
              <div>
                <strong>Still have questions?</strong>
                <p>Call our patient care team directly at <a href="tel:+15551234567">+1 (555) 123-4567</a></p>
              </div>
            </div>
          </div>

          {/* Right Accordion */}
          <div className={`${styles.rightCol} reveal-right`}>
            <div className={styles.accordionList}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`${styles.item} ${openIdx === i ? styles.itemOpen : ''}`}
                  onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                >
                  <div className={styles.itemHeader}>
                    <h3 className={styles.question}>{faq.q}</h3>
                    <span className={styles.toggleIcon}>{openIdx === i ? '−' : '+'}</span>
                  </div>
                  {openIdx === i && (
                    <div className={styles.itemBody}>
                      <p className={styles.answer}>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
