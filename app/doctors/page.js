'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import PageBanner from '@/components/PageBanner';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import styles from './doctors.module.css';

const categoriesData = [
  {
    id: 'All',
    label: 'All Doctors',
    title: 'Our Specialist Doctors',
    desc: 'Meet our lead doctors, Dr. RAJESH and Dr. (Maj) GEETIKA, providing world-class oral implantology, clinical implant dentistry, and general & cosmetic dental care.',
    applications: ['Oral Implantology', 'Clinical Implant Dentistry', 'General & Cosmetic Dentistry', 'Full Mouth Rehabilitation'],
    features: ['Board-Certified Specialists', 'Advanced 3D CBCT Imaging', 'Stony Brook NY & Manipal Fellowships', 'Painless Laser Technology'],
  },
  {
    id: 'Implantology',
    label: 'Oral Implantology',
    title: 'Oral Implantology & Clinical Implant Dentistry',
    desc: 'Headed by Dr. RAJESH (Master in Clinical Implant Dentistry, Stony Brook University, NY & PG-Oral Implantology, Manipal), specializing in single/multiple dental implants, full-arch restorations, and advanced bone grafting.',
    applications: ['Single & Multiple Dental Implants', 'Full-Arch Dental Restorations', '3D CBCT Bone Density Mapping', 'Sinus Lift & Bone Grafting'],
    features: ['Stony Brook University NY Mastership', 'Manipal University PG Specialty', 'Titanium Medical Posts', 'Lifetime Structural Warranty'],
  },
  {
    id: 'GeneralCosmetic',
    label: 'General & Cosmetic Dentistry',
    title: 'General & Cosmetic Dentistry',
    desc: 'Headed by Dr. (Maj) GEETIKA (B.D.S., F.A.G.E.), offering comprehensive dental care, cosmetic smile makeovers, teeth whitening, clear aligners, and painless dental treatments.',
    applications: ['Porcelain Veneers & Smile Makeovers', 'UV LED Laser Teeth Whitening', 'Comprehensive Dental Care', 'Orthodontic Braces & Aligners'],
    features: ['B.D.S., F.A.G.E. Certified Specialist', 'Digital Smile Design Preview', 'Enamel-Safe Desensitization', 'Painless Treatment Protocols'],
  },
];

const doctorsData = [
  {
    id: 'dr-rajesh',
    name: 'Dr. RAJESH',
    degree: 'B.D.S., F.A.G.E. | PG-Oral Implantology (Manipal) | Master in Clinical Implant Dentistry (Stony Brook University, New York)',
    role: 'Lead Oral Implantologist & Dental Surgeon',
    category: 'Implantology',
    experience: '18+ Years Clinical Experience',
    rating: '5.0 ★',
    education: 'Stony Brook University (New York) & Manipal University',
    expertise: ['Oral Implantology', 'Clinical Implant Dentistry', 'Full Mouth Rehabilitation', '3D Guided Implant Surgery'],
    schedule: 'Mon - Sat (9:30 AM - 1:30 PM, 5:00 PM - 8:30 PM)',
    bio: 'Dr. Rajesh is a distinguished Oral Implantologist and Senior Dental Surgeon with over 18 years of clinical excellence. After graduating with a Bachelor of Dental Surgery (B.D.S.) and Fellowship in Academy of General Education (F.A.G.E.), he completed a specialized Post-Graduate program in Oral Implantology at the renowned Manipal University. To master international surgical techniques, Dr. Rajesh earned his Mastership in Clinical Implant Dentistry from Stony Brook University School of Dental Medicine in New York, USA. He specializes in 3D computer-guided implant placement, full-arch restorations, sinus elevations, and advanced bone grafting at Shivam Dental Care & Implant Centre.',
    img: '/images/dental_team1.png',
  },
  {
    id: 'dr-geetika',
    name: 'Dr. (Maj) GEETIKA',
    degree: 'B.D.S., F.A.G.E.',
    role: 'Senior Dental Specialist & Cosmetic Surgeon',
    category: 'GeneralCosmetic',
    experience: '15+ Years Clinical Experience',
    rating: '5.0 ★',
    education: 'Manipal College of Dental Sciences & Armed Forces Dental Service',
    expertise: ['General & Cosmetic Dentistry', 'Digital Smile Design', 'Porcelain Veneers & Whitening', 'Orthodontic Braces & Aligners'],
    schedule: 'Mon - Sat (10:00 AM - 2:00 PM, 5:00 PM - 8:00 PM)',
    bio: 'Dr. (Maj) Geetika is an accomplished Senior Dental Specialist and Cosmetic Surgeon with over 15 years of clinical practice, having served as a Major in the Army Dental Corps. Holding a B.D.S. degree and Fellowship in Academy of General Education (F.A.G.E.), she combines military precision with aesthetic artistry. Dr. Geetika excels in digital smile makeovers, porcelain veneers, laser teeth whitening, orthodontic clear aligner therapy, and gentle child dentistry, maintaining hospital-grade 7-stage autoclaving sterilization protocols.',
    img: '/images/dental_team_female.jpg',
  },
];

function DoctorsContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Handle URL category search parameter e.g. /doctors?cat=Implantology
  useEffect(() => {
    const catParam = searchParams.get('cat');
    if (catParam) {
      const match = categoriesData.find((c) => c.id === catParam || c.id.toLowerCase() === catParam.toLowerCase());
      if (match) setSelectedCategory(match.id);
    }
  }, [searchParams]);

  const activeCategoryObj = categoriesData.find((c) => c.id === selectedCategory) || categoriesData[0];

  // Filter doctors by selected category
  const filteredDoctors = doctorsData.filter((doc) => {
    return selectedCategory === 'All' || doc.category === selectedCategory;
  });

  return (
    <>
      <Header />
      <main>
        {/* Top Banner */}
        <PageBanner
          badge="MEET OUR SPECIALISTS"
          title="Board-Certified Doctors"
          titleAccent="& Dental Surgeons"
          desc="Our world-class team of specialists brings together over 33+ cumulative years of clinical experience, international university masterships, and compassionate patient care."
          bgImage="/images/dental_about_new.jpg"
        />

        {/* Doctors Main Interactive Section */}
        <section className={styles.doctorsSection}>
          <div className="container">
            <div className={styles.mainLayout}>
              {/* Left Sidebar Category Tabs */}
              <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                  <span className={styles.sidebarIcon}>⚙️</span>
                  <span>CATEGORIES</span>
                </div>

                <div className={styles.categoryList}>
                  {categoriesData.map((cat) => (
                    <button
                      key={cat.id}
                      className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.categoryActive : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      <span>{cat.label}</span>
                      {selectedCategory === cat.id && <span className={styles.activeDot} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Content Area */}
              <div className={styles.contentArea}>
                {/* Specialty Overview Header Card */}
                <div className={styles.specialtyCard}>
                  <h2 className={styles.cardCategoryTitle}>{activeCategoryObj.title}</h2>
                  <p className={styles.cardCategoryDesc}>{activeCategoryObj.desc}</p>
                </div>

                {/* Doctor Cards Grid */}
                <div className={styles.doctorsGrid}>
                  {filteredDoctors.map((doc) => (
                    <div key={doc.id} className={styles.doctorCard}>
                      {/* Top Photo */}
                      <div className={styles.cardImageWrap}>
                        <Image
                          src={doc.img}
                          alt={doc.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 400px"
                          style={{ objectFit: 'cover', objectPosition: 'top' }}
                        />
                        <span className={styles.expBadge}>{doc.experience}</span>
                        <span className={styles.ratingBadge}>{doc.rating}</span>
                      </div>

                      {/* Content Details */}
                      <div className={styles.cardContent}>
                        <div className={styles.doctorHeader}>
                          <span className={styles.doctorDegree}>{doc.degree}</span>
                          <h3 className={styles.doctorName}>{doc.name}</h3>
                          <span className={styles.doctorRole}>{doc.role}</span>
                        </div>

                        {/* Biography Box */}
                        <div className={styles.doctorBio}>
                          <span className={styles.bioTitle}>Doctor Biography & Clinical Background</span>
                          <p className={styles.bioText}>{doc.bio}</p>
                        </div>

                        {/* Specifications */}
                        <div className={styles.specList}>
                          <div className={styles.specItem}>
                            <span className={styles.specIcon}>🎓</span>
                            <div>
                              <span className={styles.specLabel}>Education & Fellowship</span>
                              <span className={styles.specValue}>{doc.education}</span>
                            </div>
                          </div>

                          <div className={styles.specItem}>
                            <span className={styles.specIcon}>🔬</span>
                            <div>
                              <span className={styles.specLabel}>Clinical Expertise</span>
                              <div className={styles.focusTags}>
                                {doc.expertise.map((item, idx) => (
                                  <span key={idx} className={styles.focusTag}>
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Footer / Schedule */}
                        <div className={styles.cardFooter}>
                          <div className={styles.scheduleText}>
                            <span className={styles.specLabel}>Consultation Hours</span>
                            <strong>{doc.schedule}</strong>
                          </div>
                          <Link href="/contact" className={`btn btn-primary ${styles.bookBtn}`}>
                            Consultation ↗
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quality Assurance Highlight */}
                <div className={styles.qualityBox}>
                  <div className={styles.qualityItem}>
                    <div className={styles.qualityIcon}>🏅</div>
                    <h4 className={styles.qualityTitle}>100% Board Certified</h4>
                    <p className={styles.qualityDesc}>
                      Every dental specialist at Shivam Dental Care & Implant Centre holds advanced master’s degrees and international clinical fellowships.
                    </p>
                  </div>

                  <div className={styles.qualityItem}>
                    <div className={styles.qualityIcon}>🔬</div>
                    <h4 className={styles.qualityTitle}>3D Digital Diagnostics</h4>
                    <p className={styles.qualityDesc}>
                      Equipped with ultra-low radiation 3D CBCT imaging, intraoral 3D scanners, and painless laser technology.
                    </p>
                  </div>

                  <div className={styles.qualityItem}>
                    <div className={styles.qualityIcon}>🛡️</div>
                    <h4 className={styles.qualityTitle}>Hospital-Grade Sterilization</h4>
                    <p className={styles.qualityDesc}>
                      Strict 7-stage autoclaving protocols ensure 100% sterile instruments and complete patient safety.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <FloatingActions />
    </>
  );
}

export default function DoctorsPage() {
  return (
    <Suspense fallback={null}>
      <DoctorsContent />
    </Suspense>
  );
}
