'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const featureCards = [
    { icon: '⚡', title: '24/7 Emergency Care', desc: 'Instant same-day care for severe pain & dental emergencies.' },
    { icon: '🔬', title: 'State-of-the-Art Tech', desc: '3D CBCT scanners & ultra-precise laser treatment tools.' },
    { icon: '🕊️', title: 'Painless Procedures', desc: 'Gentle dentistry with advanced sedation & micro-anesthesia.' },
    { icon: '🏆', title: 'Certified Specialists', desc: 'Board-certified orthodontists, surgeons & cosmetic dentists.' },
  ];

  return (
    <section className={styles.hero} ref={heroRef} id="home">
      {/* Background Image */}
      <div className={styles.heroBg}>
        <Image
          src="/images/dental_hero.png"
          alt="Shivam Dental Care & Implant Centre - World Class Dental Care"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          quality={90}
        />
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroLeft}>
          {/* Badge */}
          <div className={`badge badge-white reveal ${styles.heroBadge}`}>
            <span className={styles.greenDot} />
            SHIVAM DENTAL CARE & IMPLANT CENTRE
          </div>

          {/* Heading */}
          <h1 className={`heading-xl ${styles.heroHeading} reveal delay-1`}>
            Comfort Meets<br />
            <span className={styles.heroHeadingAccent}>Modern Dentistry</span>
          </h1>

          {/* Description */}
          <p className={`${styles.heroDesc} reveal delay-2`}>
            Experience world-class dental care with our team of elite specialists.<br />
            Transforming smiles with precision, warmth, and cutting-edge technology.
          </p>

          {/* CTAs */}
          <div className={`${styles.heroCtas} reveal delay-3`}>
            <Link
              href="/contact"
              className={`btn btn-primary ${styles.heroBtnPrimary}`}
              id="hero-cta-book"
            >
              Book Appointment
              <span className={styles.arrowCircle}>↗</span>
            </Link>
            <Link href="/services" className={`btn ${styles.heroBtnSecondary}`} id="hero-cta-services">
              Our Services
            </Link>
          </div>

          {/* Social Proof */}
          <div className={`${styles.socialProof} reveal delay-4`}>
            <div className={styles.avatarGroup}>
              <div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>😊</div>
              <div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}>😁</div>
              <div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)' }}>😃</div>
              <div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #43e97b, #38f9d7)' }}>🦷</div>
            </div>
            <div className={styles.proofText}>
              <strong>Over 5,000+</strong>
              <span>Happy Smiles Restored (4.9 ★)</span>
            </div>
          </div>
        </div>

        {/* Floating Card - Right */}
        <div className={`${styles.heroRight} reveal-right delay-2`}>
          {/* Doctor Card */}
          <div className={`${styles.doctorCard} animate-float`}>
            <div className={styles.doctorInfo}>
              <div className={styles.doctorAvatar}>
                <Image
                  src="/images/dental_team1.png"
                  alt="Dr. RAJESH — Lead Oral Implantologist"
                  width={56}
                  height={56}
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>
              <div>
                <p className={styles.doctorName}>Dr. RAJESH</p>
                <p className={styles.doctorRole}>Lead Oral Implantologist</p>
                <div className={styles.starRow}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className={styles.star}>★</span>
                  ))}
                  <span className={styles.ratingNum}>5.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className={styles.statsCard}>
            <div className={styles.statsCardHeader}>
              <span className={styles.statsIcon}>🦷</span>
              <span className={styles.statsTitle}>Monthly Patient Care</span>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <p className={styles.statLabel}>Routine Care</p>
                <div className={styles.statValue}>
                  <strong>720</strong>
                  <span className={styles.statUp}>↑ 316</span>
                </div>
                <p className={styles.statSub}>vs last month</p>
                <div className={styles.statBar}>
                  <div className={styles.statBarFill} style={{ width: '85%', background: '#2D7DD2' }} />
                </div>
              </div>
              <div className={styles.statItem}>
                <p className={styles.statLabel}>Cosmetic & Implants</p>
                <div className={styles.statValue}>
                  <strong>480</strong>
                  <span className={styles.statUp}>↑ 140</span>
                </div>
                <p className={styles.statSub}>vs last month</p>
                <div className={styles.statBar}>
                  <div className={styles.statBarFill} style={{ width: '70%', background: '#29B6F6' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Strip Overlay at Bottom */}
      <div className={`container ${styles.featuresStripWrap}`}>
        <div className={styles.featuresStrip}>
          {featureCards.map((feat, i) => (
            <div key={i} className={styles.featureBox}>
              <span className={styles.featIcon}>{feat.icon}</span>
              <div>
                <h4 className={styles.featTitle}>{feat.title}</h4>
                <p className={styles.featDesc}>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
