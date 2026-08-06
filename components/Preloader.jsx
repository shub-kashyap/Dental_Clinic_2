'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Reset scroll position to top on page refresh / load
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

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
        <div className={styles.logoHolder} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
          <Logo variant="light" height={68} />
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
