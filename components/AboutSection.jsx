'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './AboutSection.module.css';

function CountUp({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    // Ensure initial visibility
    elements?.forEach((el) => el.classList.add('visible'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section section-light ${styles.about}`} id="about" ref={sectionRef}>
      <div className="container">
        <div className={styles.aboutGrid}>
          {/* LEFT */}
          <div className={`${styles.aboutLeft} reveal-left`}>
            {/* Badge pills */}
            <div className={styles.badgePills}>
              <span className={styles.pill}>
                <span className={styles.pillIcon}>🩺</span> Health Services
              </span>
              <span className={styles.pill}>
                <span className={styles.pillIcon}>🦷</span> Dental Clinic
              </span>
            </div>

            {/* Heading */}
            <h2 className={`heading-lg ${styles.aboutHeading}`}>
              15 Years of Dental<br />Excellence & Care
            </h2>

            {/* Photo grid */}
            <div className={styles.photoGrid}>
              {/* Large photo */}
              <div className={styles.photoCardLarge}>
                <div className={styles.photoYear}>
                  <span className={styles.yearDot} />
                  <span>2026</span>
                </div>
                <Image
                  src="/images/dental_about_new.jpg"
                  alt="Dental doctor consulting patient"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.photoOverlay}>
                  <Link href="/about" className={styles.photoViewMore}>
                    Learn More ↗
                  </Link>
                </div>
              </div>

              {/* Small photo */}
              <div className={styles.photoCardSmall}>
                <Image
                  src="/images/dental_about2.png"
                  alt="Patient smiling after treatment"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.photoLabel}>Digital Diagnostics</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className={`${styles.aboutRight} reveal-right`}>
            {/* Mission text */}
            <p className={styles.missionText}>
              At Shivam Dental Care & Implant Centre, we combine advanced 3D imaging, painless laser technology, and compassionate patient care
              to deliver healthy, radiant smiles in a comfortable state-of-the-art environment.
            </p>

            {/* Lead doctor */}
            <div className={styles.leadDoctorBox}>
              <div className={styles.leadDoctorPhoto}>
                <Image
                  src="/images/dental_team1.png"
                  alt="Dr. RAJESH"
                  width={90}
                  height={90}
                  style={{ objectFit: 'cover', borderRadius: '12px' }}
                />
              </div>
              <div className={styles.leadDoctorInfo}>
                <h3 className={styles.leadDoctorName}>Dr. RAJESH & Dr. (Maj) GEETIKA</h3>
                <p className={styles.leadDoctorRole}>Lead Implantologist & Senior Dental Specialists</p>
                <div className={styles.starRow}>
                  {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                  <strong>5.0</strong>
                </div>
                <p className={styles.leadDoctorDesc}>
                  With advanced qualifications from Stony Brook University (New York) and Manipal University, Dr. Rajesh and Dr. (Maj) Geetika provide world-class implantology, cosmetic dentistry, and comprehensive oral care.
                </p>
                <Link href="/doctors" className={`btn btn-primary ${styles.learnMoreBtn}`}>
                  Meet Our Doctors ↗
                </Link>
              </div>
            </div>

            {/* Staying informed */}
            <div className={styles.stayingInfo}>
              <p className={styles.stayingText}>Schedule your comprehensive<br />dental check-up today</p>
              <Link href="/contact" className={styles.arrowBtn} aria-label="Book appointment">
                →
              </Link>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className={`${styles.statsRow} reveal`}>
          {[
            { num: 15, suffix: '+', label: 'Years of Excellence' },
            { num: 99, suffix: '%', label: 'Patient Satisfaction' },
            { num: 25, suffix: '+', label: 'Dental Specialists' },
            { num: 120, suffix: '+', label: 'Awards Won' },
          ].map((stat, i) => (
            <div key={i} className={styles.statBox}>
              <div className={styles.statNumber}>
                <CountUp end={stat.num} suffix={stat.suffix} />
              </div>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
