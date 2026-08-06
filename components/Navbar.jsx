'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
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
        {/* Official Logo */}
        <Link href="/" onClick={handleLogoClick} aria-label="Shivam Dental Care & Implant Centre Home">
          <Logo variant={isScrolled ? 'dark' : 'light'} height={52} />
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

            <li>
              <Link
                href="/doctors"
                onClick={(e) => handleLinkClick('/doctors', e)}
                className={`${styles.navLink} ${pathname === '/doctors' ? styles.active : ''}`}
              >
                Doctors
              </Link>
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
