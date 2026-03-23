"use client";
import React from 'react';

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/5 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center text-xs uppercase tracking-widest font-['Montserrat'] text-[#CFCFCF]/40">
          <div>
            © 2025 Mitch Bryant
          </div>
          <div>
            <a 
              href="mailto:hello@mitchbryant.com" 
              className="hover:text-[#62FFDA] transition-colors"
            >
              hello@mitchbryant.com
            </a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-2 text-center text-xs uppercase tracking-widest font-['Montserrat'] text-[#CFCFCF]/40">
          <div>
            © 2025 Mitch Bryant
          </div>
          <div>
            <a 
              href="mailto:hello@mitchbryant.com" 
              className="hover:text-[#62FFDA] transition-colors"
            >
              hello@mitchbryant.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
