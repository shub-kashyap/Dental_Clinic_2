'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  const handleHomeClick = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand */}
          <div className={styles.brandCol}>
            <Link href="/" onClick={handleHomeClick} className={styles.footerLogo}>
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="rgba(45,125,210,0.15)" />
                <path
                  d="M20 8C16 8 13 11 13 14c0 2 1 4 1.5 6s0.5 5-1.5 8c3-1 4-4 5-4s2 4 5 4c-2-3-2-6-1.5-8s1.5-4 1.5-6c0-3-3-6-7-6z"
                  fill="#2D7DD2"
                  stroke="#29B6F6"
                  strokeWidth="0.5"
                />
                <circle cx="17" cy="15" r="1.5" fill="white" opacity="0.8" />
              </svg>
              <div>
                <span className={styles.footerLogoName}>SHIVAM DENTAL</span>
                <span className={styles.footerLogoSub}>Care & Implant Centre</span>
              </div>
            </Link>
            <p className={styles.brandDesc}>
              Delivering world-class dental care with compassion, technology, and expertise.
              Your perfect smile is our life&apos;s work.
            </p>
            <div className={styles.socialIcons}>
              {['FB', 'TW', 'IG', 'YT', 'LN'].map((icon, i) => (
                <a key={i} href="#" className={styles.socialIcon} aria-label="Social media link">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/doctors', label: 'Doctors' },
                { href: '/services', label: 'Services' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={link.href === '/' ? handleHomeClick : undefined}
                    className={styles.footerLink}
                  >
                    <span className={styles.linkArrow}>→</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Our Services</h4>
            <ul className={styles.linkList}>
              {[
                { name: 'General Dentistry', cat: 'Preventive' },
                { name: 'Teeth Whitening', cat: 'Cosmetic' },
                { name: 'Dental Implants', cat: 'Restorative' },
                { name: 'Orthodontics & Aligners', cat: 'Alignment' },
                { name: 'Root Canal Therapy', cat: 'Endodontics' },
                { name: 'Oral Surgery', cat: 'Surgery' },
              ].map((service) => (
                <li key={service.name}>
                  <Link href={`/services?cat=${service.cat}`} className={styles.footerLink}>
                    <span className={styles.linkArrow}>→</span> {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Contact Info</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span>📍</span>
                <span>123 Dental Avenue, Suite 400<br />New York, NY 10001</span>
              </li>
              <li className={styles.contactItem}>
                <span>📞</span>
                <a href="tel:+919236118545">+91 9236118545 / 2549250</a>
              </li>
              <li className={styles.contactItem}>
                <span>💬</span>
                <a href="https://wa.me/919236118545" target="_blank" rel="noopener noreferrer">WhatsApp: +91 9236118545</a>
              </li>
              <li className={styles.contactItem}>
                <span>✉️</span>
                <a href="mailto:info@shivamdental.com">info@shivamdental.com</a>
              </li>
              <li className={styles.contactItem}>
                <span>🕐</span>
                <span>Mon–Sat: 8AM–7PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} Shivam Dental Care & Implant Centre. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Privacy Policy</a>
            <a href="#" className={styles.bottomLink}>Terms of Service</a>
            <a href="#" className={styles.bottomLink}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
