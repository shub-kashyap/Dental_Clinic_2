'use client';

import styles from './TopBar.module.css';

export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <div className={`container ${styles.inner}`}>
        {/* Left Info items */}
        <div className={styles.infoLeft}>
          <a href="tel:+919236118545" className={styles.infoItem}>
            <span className={styles.icon}>⚡</span>
            <span>Call/Emergency: <strong>+91 9236118545</strong></span>
          </a>
          <span className={styles.divider}>|</span>
          <a
            href="https://wa.me/919236118545?text=Hello%20Shivam%20Dental%20Care%20%26%20Implant%20Centre,%20I%20would%20like%20to%20inquire%20about%20a%20dental%20appointment"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.infoItem} ${styles.waLink}`}
          >
            <span className={styles.waIcon}>💬</span>
            <span>WhatsApp: <strong>+91 9236118545</strong></span>
          </a>
          <span className={styles.divider}>|</span>
          <a href="mailto:info@shivamdental.com" className={styles.infoItem}>
            <span className={styles.icon}>✉</span>
            <span>info@shivamdental.com</span>
          </a>
        </div>

        {/* Right Info items */}
        <div className={styles.infoRight}>
          <div className={styles.hoursItem}>
            <span className={styles.icon}>🕒</span>
            <span>Mon - Sat: 8:00 AM - 7:00 PM</span>
          </div>
          <div className={styles.socialGroup}>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">FB</a>
            <a href="#" className={styles.socialIcon} aria-label="Twitter">TW</a>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">IG</a>
            <a href="#" className={styles.socialIcon} aria-label="LinkedIn">LN</a>
          </div>
        </div>
      </div>
    </div>
  );
}
