'use client';

import Link from 'next/link';
import styles from './ServiceModal.module.css';

export default function ServiceModal({ service, isOpen, onClose }) {
  if (!isOpen || !service) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.icon}>{service.icon || '🦷'}</span>
            <div>
              <span className={styles.tag}>{service.tag || 'Dental Care'}</span>
              <h2 className={styles.title}>{service.title}</h2>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className={styles.body}>
          <p className={styles.desc}>{service.desc}</p>

          <div className={styles.detailsGrid}>
            <div className={styles.detailBox}>
              <span className={styles.detailLbl}>Typical Duration</span>
              <strong className={styles.detailVal}>⏱ {service.duration || '45 - 60 Minutes'}</strong>
            </div>
            <div className={styles.detailBox}>
              <span className={styles.detailLbl}>Anesthesia Level</span>
              <strong className={styles.detailVal}>🕊️ {service.anesthesia || 'Local / Pain-Free'}</strong>
            </div>
            <div className={styles.detailBox}>
              <span className={styles.detailLbl}>Recovery Time</span>
              <strong className={styles.detailVal}>✨ {service.recovery || 'Immediate / Same Day'}</strong>
            </div>
            <div className={styles.detailBox}>
              <span className={styles.detailLbl}>Price Range</span>
              <strong className={styles.detailVal}>🏷️ {service.price || 'From $99'}</strong>
            </div>
          </div>

          <h3 className={styles.subTitle}>What is Included in This Treatment?</h3>
          <ul className={styles.featureList}>
            {(service.features || [
              'Comprehensive examination & diagnostic consultation',
              'Advanced digital imaging and intra-oral scanning',
              'Gentle treatment executed by certified specialists',
              'Post-treatment care guidelines and follow-up support',
            ]).map((feat, i) => (
              <li key={i} className={styles.featureItem}>
                <span className={styles.check}>✓</span> {feat}
              </li>
            ))}
          </ul>

          <div className={styles.footerAction}>
            <button className="btn btn-outline" onClick={onClose}>
              Close Details
            </button>
            <Link
              href="/contact"
              className="btn btn-primary"
              onClick={onClose}
            >
              Book {service.title} ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
