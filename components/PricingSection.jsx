'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './PricingSection.module.css';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState('one-time');
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

  const plans = [
    {
      id: 'essential',
      title: 'Essential Care',
      tagline: 'Perfect for routine maintenance & preventive health',
      price: billingCycle === 'one-time' ? '$99' : '$89',
      period: 'per visit',
      features: [
        'Comprehensive Oral Exam',
        'Digital HD X-Rays & 3D Diagnostics',
        'Professional Deep Cleaning',
        'Fluoride Enamel Strengthening',
        'Personalized Care Plan',
      ],
      popular: false,
    },
    {
      id: 'whitening',
      title: 'Smile Whitening Package',
      tagline: 'Instant 8-shade radiant smile transformation',
      price: billingCycle === 'one-time' ? '$299' : '$259',
      period: 'per treatment',
      features: [
        'In-Office Laser UV Whitening',
        'Custom Take-Home Maintenance Trays',
        'Sensitivity Shield Application',
        'Color Shade Matching Guarantee',
        '15% Off All Future Hygiene Visits',
      ],
      popular: true,
    },
    {
      id: 'restoration',
      title: 'Premium Implant & Surgery',
      tagline: 'Complete tooth restoration with lifetime durability',
      price: billingCycle === 'one-time' ? '$799' : '$699',
      period: 'starting price',
      features: [
        '3D CBCT Imaging & Surgical Plan',
        'Medical-Grade Titanium Implant',
        'Custom Zirconia Porcelain Crown',
        'Sedation / Pain-Free Anesthesia',
        'Lifetime Structural Warranty',
      ],
      popular: false,
    },
  ];

  return (
    <section className={`section section-white ${styles.pricingSection}`} id="pricing" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <div className="badge">
            <span />
            TRANSPARENT PRICING
          </div>
          <h2 className={`heading-lg ${styles.heading}`}>
            Affordable Dental Care Plans
          </h2>
          <p className={styles.subheading}>
            Clear, upfront pricing with no hidden fees. Flexible payment plans and insurance accepted.
          </p>

          {/* Toggle */}
          <div className={styles.toggleWrap}>
            <span className={billingCycle === 'one-time' ? styles.activeLabel : ''}>Single Visit</span>
            <button
              className={styles.toggleBtn}
              onClick={() => setBillingCycle(billingCycle === 'one-time' ? 'membership' : 'one-time')}
              aria-label="Toggle pricing membership discount"
            >
              <div className={`${styles.toggleThumb} ${billingCycle === 'membership' ? styles.thumbRight : ''}`} />
            </button>
            <span className={billingCycle === 'membership' ? styles.activeLabel : ''}>
              Member Plan <span className={styles.saveBadge}>SAVE 15%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className={styles.cardsGrid}>
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className={`${styles.card} ${plan.popular ? styles.cardPopular : ''} reveal`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {plan.popular && <div className={styles.popularBadge}>MOST POPULAR</div>}
              
              <h3 className={styles.planTitle}>{plan.title}</h3>
              <p className={styles.planTagline}>{plan.tagline}</p>
              
              <div className={styles.priceRow}>
                <span className={styles.priceVal}>{plan.price}</span>
                <span className={styles.pricePeriod}>/ {plan.period}</span>
              </div>

              <ul className={styles.featureList}>
                {plan.features.map((feat, j) => (
                  <li key={j} className={styles.featureItem}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} ${styles.cardBtn}`}
              >
                Choose {plan.title} ↗
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
