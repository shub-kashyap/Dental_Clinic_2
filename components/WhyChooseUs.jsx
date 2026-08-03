'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './WhyChooseUs.module.css';

const features = [
  {
    num: '01',
    title: 'Expert Dental Team',
    desc: 'Our board-certified specialists bring decades of combined experience, ensuring you receive the highest standard of care possible.',
  },
  {
    num: '02',
    title: 'Advanced Technology',
    desc: 'We use state-of-the-art digital X-rays, 3D imaging, and laser dentistry to provide accurate diagnoses and minimally invasive treatments.',
  },
  {
    num: '03',
    title: 'Flexible Scheduling',
    desc: 'We offer early morning, evening, and weekend appointments to fit your busy lifestyle — because your oral health should never be inconvenient.',
  },
];

export default function WhyChooseUs() {
  const [activeFeature, setActiveFeature] = useState(0);
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

  return (
    <section className={`${styles.whySection}`} id="why-choose-us" ref={sectionRef}>
      <div className={`container ${styles.whyGrid}`}>
        {/* LEFT — Image */}
        <div className={`${styles.whyLeft} reveal-left`}>
          <div className={styles.whyImageWrap}>
            <Image
              src="/images/dental_whychooseus.png"
              alt="Expert dental specialists at work"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              style={{ objectFit: 'cover' }}
            />
            {/* Stats badge */}
            <div className={styles.statsBadge}>
              <span className={styles.statsNum}>15 <span className={styles.statsAccent}>K+</span></span>
              <span className={styles.statsLabel}>Client Satisfaction</span>
            </div>
          </div>

          {/* Small secondary images */}
          <div className={styles.secondaryImages}>
            <div className={styles.secondaryImg}>
              <Image
                src="/images/dental_about2.png"
                alt="Patient consultation"
                fill
                sizes="(max-width: 768px) 50vw, 250px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.secondaryImg}>
              <Image
                src="/images/dental_service1.png"
                alt="Dental treatment"
                fill
                sizes="(max-width: 768px) 50vw, 250px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT — Content */}
        <div className={`${styles.whyRight} reveal-right`}>
          <div className="badge badge-white">
            <span />
            WHY CHOOSE US
          </div>

          <h2 className={`heading-lg ${styles.whyHeading}`}>
            Why Patients<br />Choose Us
          </h2>

          <p className={styles.whyIntro}>
            We combine cutting-edge dental technology with compassionate patient care
            to deliver results that are both beautiful and long-lasting.
          </p>

          {/* Feature List */}
          <div className={styles.featureList}>
            {features.map((feature, i) => (
              <div
                key={i}
                className={`${styles.featureItem} ${activeFeature === i ? styles.featureActive : ''}`}
                onMouseEnter={() => setActiveFeature(i)}
                onClick={() => setActiveFeature(i)}
              >
                <div className={styles.featureHeader}>
                  <div className={styles.featureNum}>{feature.num}</div>
                  <div className={styles.featureLine}>
                    <div
                      className={styles.featureLineProgress}
                      style={{ width: activeFeature === i ? '100%' : '0%' }}
                    />
                  </div>
                  <span className={styles.featureArrow}>→</span>
                </div>
                <div className={`${styles.featureBody} ${activeFeature === i ? styles.featureBodyOpen : ''}`}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
