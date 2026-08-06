import Header from '@/components/Header';
import PageBanner from '@/components/PageBanner';
import AboutSection from '@/components/AboutSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

export const metadata = {
  title: 'About Us — Shivam Dental Care & Implant Centre',
  description: 'Learn about our mission, our expert dental team, and our commitment to providing world-class dental care at Shivam Dental Care & Implant Centre. 15+ years of excellence in patient care.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          badge="ABOUT SHIVAM DENTAL CARE & IMPLANT CENTRE"
          title="Our Commitment"
          titleAccent="To Your Smile"
          desc="We envision a future where every smile reflects confidence and lifelong oral health. Explore our story, our certified team of specialists, and our patient-first approach."
          bgImage="/images/dental_about_new.jpg"
        />

        <AboutSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />

      <FloatingActions />
    </>
  );
}
