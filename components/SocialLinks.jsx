"use client";
import React from 'react';
import { Card } from './Card';

// Custom TikTok icon (Lucide doesn't have TikTok)
const TikTokIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Custom Instagram icon
const InstagramIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export const SocialLinks = () => {
  const socials = [
    {
      name: 'TikTok',
      handle: '@itsmitchbryant',
      url: 'https://www.tiktok.com/@itsmitchbryant',
      icon: TikTokIcon,
      color: 'from-[#62FFDA] to-[#0081CB]',
    },
    {
      name: 'Instagram',
      handle: '@itsmitchbryant',
      url: 'https://www.instagram.com/itsmitchbryant',
      icon: InstagramIcon,
      color: 'from-[#6A3CFF] to-[#0081CB]',
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 relative z-10" id="connect">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-3xl md:text-4xl font-black font-['Montserrat'] text-white">
          Want More?
        </h2>
        <p className="text-base md:text-lg text-[#CFCFCF] max-w-2xl mx-auto font-['Lato']">
          Follow for everything I wish I knew at your age.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {socials.map((social) => {
          const IconComponent = social.icon;
          return (
            <Card 
              key={social.name} 
              hover={true} 
              className="cursor-pointer social-glow group"
              noPadding={false}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block space-y-4"
              >
                {/* Icon with gradient background */}
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${social.color} bg-opacity-20 border border-white/20 inline-block`}>
                  <IconComponent size={40} className="text-white" />
                </div>

                {/* Platform name */}
                <h3 className="text-2xl font-bold font-['Montserrat'] text-white">
                  {social.name}
                </h3>

                {/* Handle */}
                <p className="text-lg text-[#62FFDA] font-['Lato'] font-semibold">
                  {social.handle}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-['Montserrat'] font-bold uppercase tracking-wider text-[#CFCFCF] group-hover:text-[#62FFDA] transition-colors">
                  <span>Follow</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </div>
              </a>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
