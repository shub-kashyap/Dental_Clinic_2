'use client';

import Image from 'next/image';
import styles from './PageBanner.module.css';

export default function PageBanner({ badge, title, titleAccent, desc, bgImage = '/images/dental_hero.png' }) {
  return (
    <div className={styles.pageBanner}>
      {/* Background Image */}
      <div className={styles.bannerBg}>
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          quality={90}
        />
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={`container ${styles.bannerContainer}`}>
        <div className={styles.bannerContent}>
          {badge && (
            <div className="badge badge-white">
              <span />
              {badge}
            </div>
          )}
          <h1 className="heading-xl">
            {title}<br />
            {titleAccent && <span className={styles.accent}>{titleAccent}</span>}
          </h1>
          {desc && <p className={styles.bannerDesc}>{desc}</p>}
        </div>
      </div>
    </div>
  );
}
