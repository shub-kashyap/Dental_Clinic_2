'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ServiceModal from './ServiceModal';
import styles from './ServicesSection.module.css';

const services = [
  // PREVENTIVE
  {
    id: 'general-dentistry',
    title: 'General Dentistry',
    desc: 'Comprehensive check-ups, digital X-rays, painless cleanings, and tooth-colored composite resin fillings for long-term oral health.',
    img: '/images/dental_service1.png',
    icon: '🩺',
    tag: 'Preventive',
    duration: '45 Minutes',
    anesthesia: 'None required',
    recovery: 'Immediate',
    price: '$99',
    features: [
      'Comprehensive dental check-ups & oral cancer screening',
      'Professional ultrasonic plaque & tartar cleaning',
      'High-resolution intraoral camera diagnostics',
      'Tooth-colored composite resin cavity fillings',
    ],
  },
  {
    id: 'dental-hygiene',
    title: 'Dental Scaling & Polishing',
    desc: 'Deep ultrasonic periodontal scaling and stain removal to protect gums and preserve fresh breath.',
    img: '/images/dental_about_new.jpg',
    icon: '🪥',
    tag: 'Preventive',
    duration: '45 Minutes',
    anesthesia: 'Optional topical gel',
    recovery: 'Immediate',
    price: '$120',
    features: [
      'Deep sub-gingival calculus scaling',
      'Enamel stain removal & air-polishing',
      'Gum health assessment & charting',
      'Fluoride enamel re-mineralization',
    ],
  },

  // COSMETIC
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    desc: 'Advanced UV LED laser whitening treatments that safely brighten your smile up to 8 shades in just 45 minutes.',
    img: '/images/dental_service2.png',
    icon: '✨',
    tag: 'Cosmetic',
    featured: true,
    duration: '60 Minutes',
    anesthesia: 'Sensitivity gel applied',
    recovery: 'Immediate bright smile',
    price: '$299',
    features: [
      'In-office medical-grade UV LED laser activation',
      'Custom-molded take-home maintenance whitening trays',
      'Enamel-safe desensitizing varnish application',
      'Guaranteed multi-shade color lift',
    ],
  },
  {
    id: 'porcelain-veneers',
    title: 'Porcelain Veneers',
    desc: 'Custom ultrathin porcelain shells engineered to mask chips, gaps, and severe discoloration for a flawless Hollywood smile.',
    img: '/images/dental_after.jpg',
    icon: '👑',
    tag: 'Cosmetic',
    duration: '2 Visits (90 Mins each)',
    anesthesia: 'Local anesthesia',
    recovery: '1 - 2 Days',
    price: 'From $650 / tooth',
    features: [
      'Custom digital smile design preview',
      'Minimal enamel preparation technology',
      'Stain-resistant ultra-durable porcelain',
      'Natural translucency & shade matching',
    ],
  },

  // RESTORATIVE
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    desc: 'Permanent, natural-looking tooth replacement using state-of-the-art titanium implant technology and porcelain crowns.',
    img: '/images/dental_service3.png',
    icon: '🦷',
    tag: 'Restorative',
    duration: '90 Minutes',
    anesthesia: 'Local / Sedation options',
    recovery: '2 - 3 Days mild healing',
    price: 'From $799',
    features: [
      '3D CBCT bone density & nerve pathway mapping',
      'Surgically placed medical titanium implant post',
      'Custom handcrafted zirconia porcelain crown',
      'Lifetime structural warranty on implant body',
    ],
  },
  {
    id: 'crowns-bridges',
    title: 'Crowns & Dental Bridges',
    desc: 'Full-coverage ceramic crowns and fixed bridges to restore damaged, weakened, or missing teeth seamlessly.',
    img: '/images/dental_whychooseus.png',
    icon: '🛡️',
    tag: 'Restorative',
    duration: '60 Minutes',
    anesthesia: 'Local anesthesia',
    recovery: 'Immediate',
    price: '$450',
    features: [
      'Digital 3D CAD/CAM optical impressions',
      'High-strength Zirconia & E-max ceramic',
      'Color matched to natural teeth',
      'Restores full chewing power & bite',
    ],
  },

  // ALIGNMENT
  {
    id: 'orthodontics',
    title: 'Orthodontics & Clear Aligners',
    desc: 'Custom Invisalign clear aligners and modern ceramic braces to correct bite alignment comfortably and discreetly.',
    img: '/images/dental_hero.png',
    icon: '😁',
    tag: 'Alignment',
    duration: '45 Minutes per checkup',
    anesthesia: 'None required',
    recovery: 'Seamless daily wear',
    price: 'From $150 / mo',
    features: [
      '3D digital smile simulation before starting',
      'Removable crystal-clear Invisalign aligners',
      'Accelerated alignment monitoring',
      'Retainers included post-treatment',
    ],
  },

  // ENDODONTICS
  {
    id: 'root-canal',
    title: 'Root Canal Therapy',
    desc: 'Gentle, pain-free endodontic procedure to relieve toothache pain and save infected natural teeth from extraction.',
    img: '/images/dental_about2.png',
    icon: '💉',
    tag: 'Endodontics',
    duration: '75 Minutes',
    anesthesia: 'Deep local anesthesia',
    recovery: '24 Hours',
    price: '$450',
    features: [
      'Microscopic canal disinfection & cleaning',
      'Biocompatible root sealing & gutta-percha',
      'Protective temporary or permanent crown placement',
      'Immediate emergency relief from acute pain',
    ],
  },

  // SURGERY
  {
    id: 'oral-surgery',
    title: 'Oral Surgery & Extractions',
    desc: 'Expert surgical care including painless wisdom tooth removal, bone grafting, and gentle surgical extractions.',
    img: '/images/dental_banner_services.jpg',
    icon: '🏥',
    tag: 'Surgery',
    duration: '60 Minutes',
    anesthesia: 'Local / Conscious Sedation',
    recovery: '3 - 5 Days',
    price: '$350',
    features: [
      'Impaction wisdom tooth surgical removal',
      'Bone grafting & ridge preservation',
      'Sedation dentistry options for anxious patients',
      'Comprehensive post-op recovery kit & checkup',
    ],
  },
];

function ServicesSectionContent() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeModalService, setActiveModalService] = useState(null);
  const sectionRef = useRef(null);
  const searchParams = useSearchParams();

  // Read URL query category if present (e.g. ?cat=Cosmetic or ?cat=Alignment)
  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) {
      setSelectedFilter(cat);
    }
  }, [searchParams]);

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

  // Ensure filtered cards are visible when user switches filter pills
  useEffect(() => {
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll(`.${styles.card}`);
      cards.forEach((card) => card.classList.add('visible'));
    }
  }, [selectedFilter]);

  const categories = ['All', 'Preventive', 'Cosmetic', 'Restorative', 'Alignment', 'Endodontics', 'Surgery'];

  const filteredServices = selectedFilter === 'All'
    ? services
    : services.filter((s) => s.tag === selectedFilter);

  return (
    <section className={`section section-white ${styles.services}`} id="services" ref={sectionRef}>
      <div className="container">
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={`${styles.headerLeft} reveal-left`}>
            <div className="badge">
              <span />
              SERVICES AND TREATMENT
            </div>
            <h2 className={`heading-lg ${styles.servicesHeading}`}>
              Complete Care For<br />Every Smile
            </h2>
          </div>
          <div className={`${styles.headerRight} reveal-right`}>
            <p className={styles.servicesDesc}>
              We offer a full spectrum of dental services designed to address every aspect of your oral health —
              from routine check-ups to advanced cosmetic and restorative treatments.
            </p>
            <Link href="/services" className={`btn btn-primary ${styles.viewMoreBtn}`} id="services-view-more">
              Explore All Services ↗
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div className={`${styles.filterRow} reveal`}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${selectedFilter === cat ? styles.filterActive : ''}`}
              onClick={() => setSelectedFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div className={styles.cardsGrid}>
          {filteredServices.map((service, i) => (
            <div
              key={service.id}
              className={`${styles.card} ${service.featured ? styles.cardFeatured : ''} visible`}
              style={{ transitionDelay: `${i * 0.05}s` }}
              id={`service-card-${service.id}`}
            >
              {/* Clickable Image & Badge */}
              <div
                className={styles.cardImage}
                onClick={() => setActiveModalService(service)}
                title={`Click to view ${service.title} details`}
              >
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                {/* Tag */}
                <span className={styles.cardTag}>{service.tag}</span>
                {/* Icon badge */}
                <div className={styles.cardIconBadge}>{service.icon}</div>
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <div className={styles.priceTag}>{service.price}</div>
                <h3
                  className={styles.cardTitle}
                  onClick={() => setActiveModalService(service)}
                  title={`Click to view ${service.title} details`}
                >
                  {service.title}
                </h3>
                <p className={styles.cardDesc}>{service.desc}</p>
                <div className={styles.btnRow}>
                  <button
                    onClick={() => setActiveModalService(service)}
                    className={styles.cardLink}
                  >
                    View Details <span>→</span>
                  </button>
                  <Link
                    href="/contact"
                    className={styles.bookQuickBtn}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Extra services strip */}
        <div className={`${styles.extraServices} reveal`}>
          {[
            { label: 'Preventive Dentistry', tag: 'Preventive', icon: '🩺' },
            { label: 'Teeth Whitening', tag: 'Cosmetic', icon: '✨' },
            { label: 'Dental Implants', tag: 'Restorative', icon: '🦷' },
            { label: 'Clear Aligners & Orthodontics', tag: 'Alignment', icon: '😁' },
            { label: 'Root Canal Therapy', tag: 'Endodontics', icon: '💉' },
            { label: 'Oral Surgery & Extractions', tag: 'Surgery', icon: '🏥' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => setSelectedFilter(item.tag)}
              className={`${styles.extraServiceItem} ${selectedFilter === item.tag ? styles.extraActive : ''}`}
            >
              <span className={styles.extraIcon}>{item.icon}</span>
              {item.label}
              <span className={styles.extraArrow}>↗</span>
            </button>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      <ServiceModal
        service={activeModalService}
        isOpen={!!activeModalService}
        onClose={() => setActiveModalService(null)}
      />
    </section>
  );
}

export default function ServicesSection() {
  return (
    <Suspense fallback={null}>
      <ServicesSectionContent />
    </Suspense>
  );
}
