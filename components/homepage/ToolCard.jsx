"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import * as LucideIcons from 'lucide-react';

export const ToolCard = ({ tool }) => {
  const router = useRouter();
  const Icon = LucideIcons[tool.icon] || LucideIcons.HelpCircle;
  const isInternal = tool.url?.startsWith('/');

  const handleLaunch = (e) => {
    e.preventDefault();
    if (!tool.url) return;
    if (isInternal) {
      router.push(tool.url);
    } else {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    }
  };

  // A) "LIVE" CARDS
  if (tool.status === 'live') {
    return (
      <div 
        className="rounded-3xl p-6 h-full flex flex-col relative group"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 18px 45px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(0, 0, 0, 0.5) inset',
          backdropFilter: 'blur(22px)',
          transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.borderColor = 'rgba(98, 255, 218, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
        }}
      >
        {/* Specular Highlight */}
        <div className="absolute top-0 left-10 right-10 h-px pointer-events-none" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)', opacity: 0.7 }} />
        
        {/* Top Row: Icon & Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(0,129,203,0.08)' }}>
            <Icon size={20} color="#0081CB" />
          </div>
          <div className="px-3 py-1 rounded-full font-['Montserrat'] text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: '#62FFDA', background: 'rgba(98,255,218,0.08)', border: '1px solid rgba(98,255,218,0.2)', boxShadow: '0 0 12px rgba(98,255,218,0.13)' }}>
            ● Live
          </div>
        </div>

        {/* Content */}
        <h3 className="font-['Montserrat'] font-bold text-[17px] tracking-[-0.01em] mb-2 text-white">
          {tool.name}
        </h3>
        <p className="font-['Lato'] text-[13px] text-[#CFCFCF] leading-[1.6] mb-4 flex-1">
          {tool.description}
        </p>

        {/* Action Button */}
        <a 
          href={tool.url} 
          onClick={handleLaunch}
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-['Montserrat'] font-bold text-sm tracking-[0.06em] uppercase text-[#020617] transition-all duration-200" 
          style={{ 
            background: 'linear-gradient(145deg, #62FFDA, #0081CB)', 
            boxShadow: '0 4px 20px rgba(0,129,203,0.27)',
            textDecoration: 'none'
          }} 
          onMouseEnter={(e) => { 
            e.currentTarget.style.transform = 'translateY(-2px)'; 
            e.currentTarget.style.boxShadow = '0 14px 30px rgba(0,129,203,0.33)'; 
          }} 
          onMouseLeave={(e) => { 
            e.currentTarget.style.transform = 'none'; 
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,129,203,0.27)'; 
          }}
        >
          Launch Tool <LucideIcons.ExternalLink size={14} />
        </a>
      </div>
    );
  }

  // B) "BUILDING" CARDS
  if (tool.status === 'building') {
    return (
      <div 
        className="rounded-3xl p-6 h-full flex flex-col relative overflow-hidden"
        style={{
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Shimmer Sweep Background */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-3xl" 
          style={{ 
            background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 55%, transparent 70%)', 
            backgroundSize: '200% 100%', 
            animation: 'cardShimmer 3s ease-in-out infinite' 
          }} 
        />
        
        {/* Top Row: Icon & Badge */}
        <div className="flex items-center justify-between mb-5 relative z-10">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <Icon size={20} color="rgba(255,255,255,0.3)" />
          </div>
          <div className="px-3 py-1 rounded-full font-['Montserrat'] text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', animation: 'shimmer 2s ease-in-out infinite' }}>
            Building
          </div>
        </div>

        {/* Content */}
        <h3 className="font-['Montserrat'] font-bold text-[17px] tracking-[-0.01em] mb-2 text-white relative z-10">
          {tool.name}
        </h3>
        <p className="font-['Lato'] text-[13px] text-[#CFCFCF] leading-[1.6] mb-4 flex-1 relative z-10">
          {tool.description}
        </p>

        {/* Action Button Placeholder */}
        <div 
          className="inline-flex items-center justify-center w-full py-3 px-5 rounded-xl font-['Montserrat'] font-bold text-sm tracking-[0.06em] uppercase cursor-not-allowed relative z-10" 
          style={{ 
            background: 'rgba(255, 255, 255, 0.03)', 
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: 'rgba(255, 255, 255, 0.3)'
          }}
        >
          Coming Soon
        </div>
      </div>
    );
  }

  // C) "YOU DECIDE" CARDS
  return (
    <div 
      className="rounded-3xl p-6 h-full flex flex-col relative group"
      style={{
        background: 'linear-gradient(135deg, rgba(106, 60, 255, 0.08), rgba(106, 60, 255, 0.02))',
        border: '1px solid rgba(106, 60, 255, 0.25)',
        boxShadow: '0 18px 45px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(0, 0, 0, 0.5) inset',
        backdropFilter: 'blur(22px)',
        transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'rgba(106, 60, 255, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.borderColor = 'rgba(106, 60, 255, 0.25)';
      }}
    >
      {/* Specular Highlight */}
      <div className="absolute top-0 left-10 right-10 h-px pointer-events-none" style={{ background: 'linear-gradient(to right, transparent, rgba(106,60,255,0.15), transparent)', opacity: 0.7 }} />
      
      {/* Top Row: Icon & Badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(106,60,255,0.08)' }}>
          <Icon size={20} color="#6A3CFF" />
        </div>
        <div className="px-3 py-1 rounded-full font-['Montserrat'] text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: '#6A3CFF', background: 'rgba(106,60,255,0.08)', border: '1px solid rgba(106,60,255,0.2)' }}>
          Your Call
        </div>
      </div>

      {/* Content */}
      <h3 className="font-['Montserrat'] font-bold text-[17px] tracking-[-0.01em] mb-2 text-white">
        {tool.name}
      </h3>
      <p className="font-['Lato'] text-[13px] text-[#CFCFCF] leading-[1.6] mb-4 flex-1">
        {tool.description}
      </p>

      {/* Action Button */}
      <a 
        href="mailto:hello@mitchbryant.com"
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-['Montserrat'] font-bold text-sm tracking-[0.04em] transition-all duration-200" 
        style={{ 
          background: 'rgba(255, 255, 255, 0.04)', 
          border: '1px solid rgba(255, 255, 255, 0.1)', 
          color: '#CFCFCF',
          textDecoration: 'none'
        }} 
        onMouseEnter={(e) => { 
          e.currentTarget.style.background = 'rgba(106, 60, 255, 0.12)'; 
          e.currentTarget.style.borderColor = 'rgba(106, 60, 255, 0.4)'; 
          e.currentTarget.style.color = '#6A3CFF'; 
        }} 
        onMouseLeave={(e) => { 
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'; 
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; 
          e.currentTarget.style.color = '#CFCFCF'; 
        }}
      >
        Send a Message <LucideIcons.MessageCircle size={14} />
      </a>
    </div>
  );
};
