'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './TeamSection.module.css';

const team = [
  {
    name: 'Dr. RAJESH',
    specialty: 'Oral Implantology & Clinical Implant Dentistry (Stony Brook University, NY)',
    experience: '18+ Years Experience',
    img: '/images/dental_team1.png',
    rating: '5.0 ★',
    socials: ['🔗', '📘', '🐦'],
    featured: true,
  },
  {
    name: 'Dr. (Maj) GEETIKA',
    specialty: 'Senior Dental Specialist & Cosmetic Surgeon (B.D.S., F.A.G.E.)',
    experience: '15+ Years Experience',
    img: '/images/dental_team_female.jpg',
    rating: '5.0 ★',
    socials: ['🔗', '📘', '🐦'],
    featured: true,
  },
];

export default function TeamSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section section-white ${styles.team}`} id="team" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <div className="badge">
            <span />
            OUR SPECIALISTS
          </div>
          <div className={styles.headerRow}>
            <h2 className={`heading-lg ${styles.heading}`}>
              Meet Our Expert<br />Dental Team
            </h2>
            <p className={styles.headerDesc}>
              Our team of board-certified dental specialists brings together expertise across
              all areas of dentistry to provide you with comprehensive, world-class care.
            </p>
          </div>
        </div>

        {/* Team Cards */}
        <div className={styles.teamGrid}>
          {team.map((member, i) => (
            <div
              key={i}
              className={`${styles.teamCard} ${member.featured ? styles.cardFeatured : ''} reveal`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className={styles.cardImage}>
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
                {/* Rating Badge */}
                <div className={styles.ratingBadge}>{member.rating}</div>
                
                {/* Hover overlay */}
                <div className={styles.cardOverlay}>
                  <Link
                    href="/contact"
                    className="btn btn-primary"
                  >
                    Book Consultation ↗
                  </Link>
                  <div className={styles.socialLinks}>
                    {member.socials.map((icon, j) => (
                      <button key={j} className={styles.socialBtn} aria-label="Social link">
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.cardContent}>
                <div>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberSpecialty}>{member.specialty}</p>
                </div>
                <span className={styles.memberExp}>{member.experience}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
