import Header from '@/components/Header';
import PageBanner from '@/components/PageBanner';
import ContactSection from '@/components/ContactSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

export const metadata = {
  title: 'Contact & Book Appointment — Shivam Dental Care & Implant Centre',
  description: 'Book your dental appointment at Shivam Dental Care & Implant Centre. Contact us by phone, email or visit our clinic. Emergency dental care available 24/7.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Top Banner with Dark Background Image to ensure Navbar is 100% visible */}
        <PageBanner
          badge="GET IN TOUCH"
          title="Contact & Schedule"
          titleAccent="Your Visit Today"
          desc="Have a question or ready to book your consultation? Our friendly patient care team at Shivam Dental Care & Implant Centre is available by phone, WhatsApp, or direct message below."
          bgImage="/images/dental_banner_contact.jpg"
        />

        <ContactSection />
        <FaqSection />
      </main>
      <Footer />

      <FloatingActions />
    </>
  );
}
