'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BeforeAfterSlider.module.css';

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState('whitening');
  const containerRef = useRef(null);
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

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e) => {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  const tabsData = {
    whitening: {
      title: 'Professional Teeth Whitening',
      desc: 'See the remarkable difference 45 minutes of laser whitening can make for your confidence.',
      beforeImg: '/images/dental_before.jpg',
      afterImg: '/images/dental_after.jpg',
      stat1: '8 Shades',
      stat1Label: 'Whiter in 1 Visit',
      stat2: '100%',
      stat2Label: 'Enamel Safe',
    },
    implants: {
      title: 'Full-Arch Dental Implants',
      desc: 'Restoring natural appearance, bite function, and structural facial support seamlessly.',
      beforeImg: '/images/dental_before.jpg',
      afterImg: '/images/dental_after.jpg',
      stat1: '99.8%',
      stat1Label: 'Implant Success Rate',
      stat2: 'Lifetime',
      stat2Label: 'Durability Warranty',
    },
    aligners: {
      title: 'Invisalign Clear Aligners',
      desc: 'Discreet, removable aligners that gently guide teeth into flawless alignment without metal braces.',
      beforeImg: '/images/dental_before.jpg',
      afterImg: '/images/dental_after.jpg',
      stat1: '6 Months',
      stat1Label: 'Average Treatment Time',
      stat2: 'Invisible',
      stat2Label: 'Daily Wear Comfort',
    },
  };

  const currentTab = tabsData[activeTab];

  return (
    <section className={`section section-light ${styles.sliderSection}`} id="transformation" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <div className="badge">
            <span />
            REAL PATIENT RESULTS
          </div>
          <h2 className={`heading-lg ${styles.heading}`}>
            See The Transformation
          </h2>
          <p className={styles.subheading}>
            Drag the slider to compare before and after results from our advanced dental procedures.
          </p>

          {/* Filter Tabs */}
          <div className={styles.tabGroup}>
            <button
              className={`${styles.tabBtn} ${activeTab === 'whitening' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('whitening')}
            >
              ✨ Teeth Whitening
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'implants' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('implants')}
            >
              🦷 Dental Implants
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'aligners' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('aligners')}
            >
              😁 Clear Aligners
            </button>
          </div>
        </div>

        {/* Interactive Comparison Widget */}
        <div className={`${styles.widgetWrap} reveal delay-1`}>
          <div
            className={styles.comparisonContainer}
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* After Image (Background) */}
            <div className={styles.afterLayer}>
              <Image
                src={currentTab.afterImg}
                alt="After Dental Treatment - Bright Smile"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
              />
              <span className={`${styles.label} ${styles.labelAfter}`}>AFTER</span>
            </div>

            {/* Before Image (Clipped Foreground) */}
            <div
              className={styles.beforeLayer}
              style={{ width: `${sliderPos}%` }}
            >
              <Image
                src={currentTab.beforeImg}
                alt="Before Dental Treatment"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
              />
              <span className={`${styles.label} ${styles.labelBefore}`}>BEFORE</span>
            </div>

            {/* Slider Divider Bar & Knob */}
            <div
              className={styles.dividerBar}
              style={{ left: `${sliderPos}%` }}
            >
              <div className={styles.dividerHandle}>
                <span className={styles.handleIcon}>◄ ►</span>
              </div>
            </div>
          </div>

          {/* Info Card Below Widget */}
          <div className={styles.infoFooter}>
            <div className={styles.infoText}>
              <h3 className={styles.infoTitle}>{currentTab.title}</h3>
              <p className={styles.infoDesc}>{currentTab.desc}</p>
            </div>
            <div className={styles.statsGroup}>
              <div className={styles.statBox}>
                <span className={styles.statVal}>{currentTab.stat1}</span>
                <span className={styles.statLbl}>{currentTab.stat1Label}</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statVal}>{currentTab.stat2}</span>
                <span className={styles.statLbl}>{currentTab.stat2Label}</span>
              </div>
            </div>
            <Link
              href="/contact"
              className="btn btn-primary"
            >
              Get Similar Results ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
