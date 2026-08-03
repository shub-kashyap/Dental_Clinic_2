'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar({ scrolled: externalScrolled }) {
  const [internalScrolled, setInternalScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [doctorsDropdownOpen, setDoctorsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setInternalScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = externalScrolled !== undefined ? externalScrolled : internalScrolled;

  const handleLogoClick = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLinkClick = (href, e) => {
    if (href === '/' && pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
    setDoctorsDropdownOpen(false);
  };

  const doctorSpecialties = [
    {
      title: 'Oral Implantology & Implant Surgery',
      desc: 'Dr. RAJESH — PG Manipal & Master Stony Brook NY...',
      category: 'Implantology',
    },
    {
      title: 'General & Cosmetic Dentistry',
      desc: 'Dr. (Maj) GEETIKA — Smile makeovers, veneers & laser care...',
      category: 'GeneralCosmetic',
    },
  ];

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo & Company Name */}
        <Link href="/" onClick={handleLogoClick} className={styles.logo}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill={isScrolled ? '#0D1B2A' : 'rgba(255,255,255,0.15)'} />
            <path
              d="M20 8C16 8 13 11 13 14c0 2 1 4 1.5 6s0.5 5-1.5 8c3-1 4-4 5-4s2 4 5 4c-2-3-2-6-1.5-8s1.5-4 1.5-6c0-3-3-6-7-6z"
              fill="#2D7DD2"
              stroke="#29B6F6"
              strokeWidth="0.5"
            />
            <circle cx="17" cy="15" r="1.5" fill="white" opacity="0.8" />
          </svg>
          <div className={styles.logoText}>
            <span className={styles.logoName}>SHIVAM DENTAL</span>
            <span className={styles.logoSub}>Care & Implant Centre</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className={styles.navMenu} aria-label="Main navigation">
          <ul className={styles.navList}>
            <li>
              <Link
                href="/"
                onClick={(e) => handleLinkClick('/', e)}
                className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                onClick={(e) => handleLinkClick('/about', e)}
                className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}
              >
                About Us
              </Link>
            </li>

            {/* Doctors Mega-Menu Item */}
            <li
              className={styles.hasMegaMenu}
              onMouseEnter={() => setDoctorsDropdownOpen(true)}
              onMouseLeave={() => setDoctorsDropdownOpen(false)}
            >
              <Link
                href="/doctors"
                onClick={(e) => handleLinkClick('/doctors', e)}
                className={`${styles.navLink} ${pathname === '/doctors' ? styles.active : ''}`}
              >
                Doctors <span className={styles.dropdownArrow}>{doctorsDropdownOpen ? '▲' : '▼'}</span>
              </Link>

              {/* Mega-Menu Dropdown Panel */}
              <div className={`${styles.megaMenu} ${doctorsDropdownOpen ? styles.megaMenuVisible : ''}`}>
                <div className={styles.megaHeader}>
                  <span className={styles.megaIcon}>⚡</span>
                  <span>DOCTOR SPECIALTIES</span>
                </div>

                <div className={styles.megaGrid}>
                  {doctorSpecialties.map((spec, i) => (
                    <Link
                      key={i}
                      href={`/doctors?cat=${spec.category}`}
                      onClick={() => {
                        setDoctorsDropdownOpen(false);
                        setMenuOpen(false);
                      }}
                      className={styles.megaItem}
                    >
                      <h4 className={styles.megaTitle}>{spec.title}</h4>
                      <p className={styles.megaDesc}>{spec.desc}</p>
                    </Link>
                  ))}
                </div>

                <div className={styles.megaFooter}>
                  <span className={styles.megaQuality}>ISO 9001:2015 Quality Standards</span>
                  <Link
                    href="/doctors"
                    onClick={() => {
                      setDoctorsDropdownOpen(false);
                      setMenuOpen(false);
                    }}
                    className={styles.megaCatalogueLink}
                  >
                    View All Doctors ↗
                  </Link>
                </div>
              </div>
            </li>

            <li>
              <Link
                href="/services"
                onClick={(e) => handleLinkClick('/services', e)}
                className={`${styles.navLink} ${pathname === '/services' ? styles.active : ''}`}
              >
                Services
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                onClick={(e) => handleLinkClick('/contact', e)}
                className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className={styles.navActions}>
          <Link
            href="/contact"
            className={`btn ${styles.ctaBtn}`}
            id="navbar-cta"
          >
            Book Appointment
            <span className={styles.arrowIcon}>↗</span>
          </Link>

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileNavList}>
          <li>
            <Link href="/" className={`${styles.mobileNavLink} ${pathname === '/' ? styles.mobileActive : ''}`} onClick={(e) => handleLinkClick('/', e)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={`${styles.mobileNavLink} ${pathname === '/about' ? styles.mobileActive : ''}`} onClick={(e) => handleLinkClick('/about', e)}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="/doctors" className={`${styles.mobileNavLink} ${pathname === '/doctors' ? styles.mobileActive : ''}`} onClick={(e) => handleLinkClick('/doctors', e)}>
              Doctors
            </Link>
          </li>
          <li>
            <Link href="/services" className={`${styles.mobileNavLink} ${pathname === '/services' ? styles.mobileActive : ''}`} onClick={(e) => handleLinkClick('/services', e)}>
              Services
            </Link>
          </li>
          <li>
            <Link href="/contact" className={`${styles.mobileNavLink} ${pathname === '/contact' ? styles.mobileActive : ''}`} onClick={(e) => handleLinkClick('/contact', e)}>
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`btn ${styles.mobileCta}`}
              onClick={() => setMenuOpen(false)}
            >
              Book Appointment ↗
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
