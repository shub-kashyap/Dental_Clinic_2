import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BeforeAfterSlider />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Floating Action Bar */}
      <FloatingActions />
    </>
  );
}

