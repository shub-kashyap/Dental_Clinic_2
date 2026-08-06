'use client';

import { useState, useEffect } from 'react';
import styles from './FloatingActions.module.css';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.floatingBar}>
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={styles.scrollTopBtn}
          aria-label="Scroll to top"
          title="Back to Top"
        >
          ↑
        </button>
      )}

      {/* Call Button */}
      <a
        href="tel:+919236118545"
        className={styles.emergencyBtn}
        aria-label="Call Us: +91 9236118545"
        title="Call Us: +91 9236118545"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919236118545?text=Hello%20Shivam%20Dental%20Care%20%26%20Implant%20Centre,%20I%20would%20like%20to%20inquire%20about%20a%20dental%20appointment"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappBtn}
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.854 0-3.593-.497-5.092-1.363l-.365-.213-3.784.992 1.01-3.687-.234-.373a10.87 10.87 0 0 1-1.666-5.836c0-6.007 4.887-10.896 10.897-10.896 2.909 0 5.644 1.133 7.7 3.19 2.056 2.056 3.189 4.792 3.189 7.702 0 6.009-4.887 10.896-10.897 10.896m0-20.082c-5.074 0-9.201 4.127-9.201 9.186 0 1.942.612 3.743 1.656 5.226l.106.151-.659 2.404 2.46-.645.145.086a9.146 9.146 0 0 0 4.808 1.349c5.075 0 9.202-4.127 9.202-9.186.001-5.059-4.126-9.186-9.201-9.186"/>
        </svg>
      </a>
    </div>
  );
}
