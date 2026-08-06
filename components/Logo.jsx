'use client';

import Image from 'next/image';

export default function Logo({ variant = 'dark', className = '', height = 48 }) {
  // Dark variant  → dark logo (navy text) for light/white backgrounds
  // Light variant → light logo (white text) for dark backgrounds
  const src = variant === 'light' ? '/images/logo_light.png' : '/images/logo.png';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <Image
        src={src}
        alt="Shivam Dental Care & Implant Centre Logo"
        width={742}
        height={207}
        style={{
          height: `${height}px`,
          width: 'auto',
          objectFit: 'contain',
        }}
        priority
      />
    </div>
  );
}

