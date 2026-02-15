"use client";
import React from 'react';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { ToolsGrid } from '@/components/ToolsGrid';
import { SocialLinks } from '@/components/SocialLinks';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div 
      className="min-h-screen font-sans selection:bg-[#0081CB] selection:text-white pb-20 transition-colors duration-500 relative overflow-x-hidden text-white bg-[#0D0D0D]"
      style={{ fontFamily: 'Lato, sans-serif' }}
    >
      {/* GLOBAL NOISE & GRADIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-[#6A3CFF] rounded-full mix-blend-screen filter blur-[120px] opacity-20 pulse-slow"></div>
        <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-[#0081CB] rounded-full mix-blend-screen filter blur-[130px] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#62FFDA] rounded-full mix-blend-overlay filter blur-[150px] opacity-5"></div>
        
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-10 mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <ToolsGrid />
        <About />
        <SocialLinks />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
