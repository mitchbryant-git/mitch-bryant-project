"use client";
import React, { useState, useEffect } from 'react';

export const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`
      sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300
      ${isScrolled ? 'border-white/10 bg-[#0D0D0D]/90' : 'border-white/5 bg-[#0D0D0D]/70'}
    `}>
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#0081CB]/30 border border-white/20 overflow-hidden transition-transform hover:scale-105 active:scale-95">
            <img
              src="/apple-touch-icon.png"
              alt="MB Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-sm md:text-lg tracking-tight uppercase font-['Montserrat'] text-white">
            Mitch Bryant
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => scrollToSection('about')}
            className="btn-soft text-xs md:text-sm font-bold uppercase tracking-wider font-['Montserrat'] text-[#CFCFCF]"
          >
            Mission
          </button>
          <button
            onClick={() => scrollToSection('tools')}
            className="btn-soft text-xs md:text-sm font-bold uppercase tracking-wider font-['Montserrat'] text-[#CFCFCF]"
          >
            Tools
          </button>
          <button
            onClick={() => scrollToSection('connect')}
            className="btn-soft text-xs md:text-sm font-bold uppercase tracking-wider font-['Montserrat'] text-[#CFCFCF]"
          >
            Socials
          </button>
        </nav>
      </div>
    </header>
  );
};
