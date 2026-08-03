import './globals.css';
import Preloader from '@/components/Preloader';

export const metadata = {
  title: 'Shivam Dental Care & Implant Centre — Premium Dental Care Clinic',
  description: 'Shivam Dental Care & Implant Centre provides world-class dental care with experienced specialists, advanced technology, and patient-centered solutions. Book your appointment today.',
  keywords: 'shivam dental, dental clinic, dental implant centre, dentist, teeth whitening, dental implants, orthodontics, oral health',
  openGraph: {
    title: 'Shivam Dental Care & Implant Centre — Premium Dental Care',
    description: 'Premium dental care — comfort meets modern dentistry at Shivam Dental Care & Implant Centre.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
