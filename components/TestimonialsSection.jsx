'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TestimonialsSection.module.css';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Teeth Whitening Patient',
    rating: 5,
    text: "I was amazed by the results of my teeth whitening treatment. The staff was incredibly professional and made me feel at ease throughout the entire procedure. My smile has never looked better!",
    initials: 'SJ',
    color: 'linear-gradient(135deg, #667eea, #764ba2)',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Dental Implant Patient',
    rating: 5,
    text: "After losing a tooth in an accident, I was nervous about implants. Dr. Carter explained every step and the result is absolutely perfect. No one can tell it's an implant. Life-changing experience!",
    initials: 'MC',
    color: 'linear-gradient(135deg, #f093fb, #f5576c)',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Orthodontics Patient',
    rating: 5,
    text: "The team at Shivam Dental Care & Implant Centre has been wonderful throughout my 18-month orthodontic treatment. The technology they use is so advanced, and the results exceeded all my expectations.",
    initials: 'ER',
    color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
  },
  {
    id: 4,
    name: 'David Williams',
    role: 'General Dentistry Patient',
    rating: 5,
    text: "I've been a patient here for 5 years and I've never had a negative experience. The clinic is spotlessly clean, the staff is caring, and Dr. Henderson is absolutely the best dentist I've ever had.",
    initials: 'DW',
    color: 'linear-gradient(135deg, #43e97b, #38f9d7)',
  },
  {
    id: 5,
    name: 'Jennifer Park',
    role: 'Root Canal Patient',
    rating: 5,
    text: "I was terrified of getting a root canal but the Shivam Dental Care & Implant Centre team made it completely painless. I can't believe how comfortable I felt. The procedure was quick and I was back to normal the next day!",
    initials: 'JP',
    color: 'linear-gradient(135deg, #fa709a, #fee140)',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  // Show 3 visible at a time (center card is active)
  const visible = [-1, 0, 1].map(
    (offset) => testimonials[(current + offset + testimonials.length) % testimonials.length]
  );

  return (
    <section className={`section section-light ${styles.testimonials}`} id="testimonials" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <div className="badge">
            <span />
            TESTIMONIAL
          </div>
          <div className={styles.headerRow}>
            <h2 className={`heading-lg ${styles.heading}`}>
              Real Experiences,<br />Real Smiles
            </h2>
            <div className={styles.navBtns}>
              <button onClick={prev} className={styles.navBtn} aria-label="Previous testimonial">←</button>
              <button onClick={next} className={styles.navBtn} aria-label="Next testimonial">→</button>
            </div>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className={`${styles.cardsRow} reveal`}>
          {visible.map((t, i) => (
            <div
              key={t.id}
              className={`${styles.card} ${i === 1 ? styles.cardCenter : styles.cardSide}`}
            >
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.testimonialText}>{t.text}</p>
              <div className={styles.cardFooter}>
                <div className={styles.avatar} style={{ background: t.color }}>
                  {t.initials}
                </div>
                <div className={styles.personInfo}>
                  <span className={styles.personName}>{t.name}</span>
                  <span className={styles.personRole}>{t.role}</span>
                </div>
                <div className={styles.stars}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j}>★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
