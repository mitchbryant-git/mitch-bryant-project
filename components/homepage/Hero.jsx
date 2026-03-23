"use client";
import React from 'react';
import { GlitchText } from './GlitchText';

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-6 md:px-12 py-20 md:py-32">
      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full">
        {/* Main Headline */}
        <div className="space-y-2 md:space-y-4 mb-12 md:mb-16">
          {/* Line 1 - White */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight font-['Montserrat'] text-white leading-none uppercase">
            DON'T JUST
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight font-['Montserrat'] text-white leading-none uppercase">
            PLAY THE GAME.
          </h1>

          {/* Line 2 - Blue Gradient with Glitch */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight font-['Montserrat'] leading-none uppercase bg-gradient-to-r from-[#0081CB] to-[#62FFDA] bg-clip-text text-transparent"
          >
            <GlitchText>REWRITE THE RULES.</GlitchText>
          </h1>
        </div>

        {/* Subtext with Border */}
        <div className="border-l-4 border-gradient pl-6 md:pl-8 space-y-2" style={{
          borderImage: 'linear-gradient(to bottom, #0081CB, #62FFDA) 1'
        }}>
          <p className="text-lg md:text-xl font-['Lato'] text-[#CFCFCF]/80 leading-relaxed">
            Life strategy for 16-19 year olds.
          </p>
          <p className="text-lg md:text-xl font-['Lato'] text-[#CFCFCF]/80 leading-relaxed">
            Tools to level up, master your money, and own your future.
          </p>
        </div>
      </div>
    </section>
  );
};
