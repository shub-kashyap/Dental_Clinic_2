'use client';

import { useState, useEffect } from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Animate progress bar from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15 + 10);
      });
    }, 80);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 500); // 500ms fade out transition
    }, 1100);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!mounted || !loading) return null;

  return (
    <div className={`${styles.preloader} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.loaderContent}>
        {/* Animated Logo */}
        <div className={styles.logoRing}>
          <div className={styles.pulseRing} />
          <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="#0D1B2A" />
            <path
              d="M20 8C16 8 13 11 13 14c0 2 1 4 1.5 6s0.5 5-1.5 8c3-1 4-4 5-4s2 4 5 4c-2-3-2-6-1.5-8s1.5-4 1.5-6c0-3-3-6-7-6z"
              fill="#2D7DD2"
              stroke="#29B6F6"
              strokeWidth="0.5"
            />
            <circle cx="17" cy="15" r="1.5" fill="white" opacity="0.8" />
          </svg>
        </div>

        {/* Brand Text */}
        <div className={styles.brandTitle}>
          <span className={styles.brandName}>SHIVAM DENTAL</span>
          <span className={styles.brandSub}>Care & Implant Centre</span>
        </div>

        {/* Progress Bar & Percentage */}
        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className={styles.progressInfo}>
          <span className={styles.statusText}>Comfort Meets Modern Dentistry</span>
          <span className={styles.percentText}>{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </div>
  );
}
