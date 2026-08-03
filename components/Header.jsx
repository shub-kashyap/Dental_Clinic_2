'use client';

import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import Navbar from './Navbar';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.headerWrapper} ${scrolled ? styles.isScrolled : ''}`}>
      <div className={styles.topBarHolder}>
        <TopBar />
      </div>
      <Navbar scrolled={scrolled} />
    </header>
  );
}
