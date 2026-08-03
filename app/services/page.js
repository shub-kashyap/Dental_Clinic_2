import Header from '@/components/Header';
import PageBanner from '@/components/PageBanner';
import ServicesSection from '@/components/ServicesSection';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

export const metadata = {
  title: 'Services — Shivam Dental Care & Implant Centre',
  description: 'Explore our full range of dental services at Shivam Dental Care & Implant Centre including general dentistry, teeth whitening, dental implants, orthodontics, root canals, and more.',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          badge="OUR SERVICES & PROCEDURES"
          title="Clinical Excellence"
          titleAccent="& Treatment Directory"
          desc="Browse our specialized treatment procedures below. Click on any category pill or procedure card to view comprehensive treatment steps, anesthesia options, and recovery timelines."
          bgImage="/images/dental_banner_services.jpg"
        />

        <ServicesSection />
        <BeforeAfterSlider />
        <FaqSection />
      </main>
      <Footer />

      <FloatingActions />
    </>
  );
}
