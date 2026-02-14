"use client";
import React from 'react';
import { Card } from './Card';
import { Calculator, Gamepad2, Users, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';

// Map icon names to components
const iconMap = {
  Calculator,
  Gamepad2,
  Users,
  MessageSquare,
  Sparkles,
};

export const ToolCard = ({ tool }) => {
  const Icon = iconMap[tool.icon] || Calculator;
  const isLive = tool.status === 'live';
  const isBuilding = tool.status === 'building';
  const isRequested = tool.status === 'requested';

  const handleClick = () => {
    if (tool.url) {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card 
      hover={isLive || isRequested} 
      className={`
        ${isLive || isRequested ? 'cursor-pointer' : 'cursor-default'}
        ${isBuilding ? 'shimmer' : ''}
        ${isLive ? 'social-glow' : ''}
        ${isRequested ? 'border-[#6A3CFF]/30' : ''}
        transition-all duration-300
      `}
      noPadding={false}
    >
      <div onClick={isLive || isRequested ? handleClick : undefined} className="space-y-4">
        {/* Icon and Status */}
        <div className="flex items-start justify-between">
          <div className={`
            p-4 rounded-2xl 
            ${isLive ? 'bg-gradient-to-br from-[#62FFDA]/20 to-[#0081CB]/20 border border-[#62FFDA]/30' : ''}
            ${isBuilding ? 'bg-white/5 border border-white/10' : ''}
            ${isRequested ? 'bg-gradient-to-br from-[#6A3CFF]/20 to-[#0081CB]/20 border border-[#6A3CFF]/30' : ''}
          `}>
            <Icon size={32} className={`
              ${isLive ? 'text-[#62FFDA]' : ''}
              ${isBuilding ? 'text-[#CFCFCF]/50' : ''}
              ${isRequested ? 'text-[#6A3CFF]' : ''}
            `} />
          </div>

          {/* Status Badge */}
          <div className={`
            px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-['Montserrat']
            ${isLive ? 'bg-[#62FFDA]/20 text-[#62FFDA] border border-[#62FFDA]/30' : ''}
            ${isBuilding ? 'bg-white/5 text-[#CFCFCF]/70 border border-white/10' : ''}
            ${isRequested ? 'bg-[#6A3CFF]/20 text-[#6A3CFF] border border-[#6A3CFF]/30' : ''}
          `}>
            {isLive && 'Live'}
            {isBuilding && (
              <div className="flex items-center gap-1.5">
                <span>Building</span>
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-current buffering-dot"></div>
                  <div className="w-1 h-1 rounded-full bg-current buffering-dot"></div>
                  <div className="w-1 h-1 rounded-full bg-current buffering-dot"></div>
                </div>
              </div>
            )}
            {isRequested && 'Your Call'}
          </div>
        </div>

        {/* Tool Name */}
        <h3 className="text-xl md:text-2xl font-bold font-['Montserrat'] text-white">
          {tool.name}
        </h3>

        {/* Description */}
        <p className={`
          text-sm md:text-base font-['Lato'] leading-relaxed
          ${isLive ? 'text-[#CFCFCF]' : ''}
          ${isBuilding ? 'text-[#CFCFCF]/60' : ''}
          ${isRequested ? 'text-[#CFCFCF]' : ''}
        `}>
          {tool.description}
        </p>

        {/* Action Indicator */}
        {(isLive || isRequested) && (
          <div className="flex items-center gap-2 text-sm font-['Montserrat'] font-bold uppercase tracking-wider">
            <span className={isLive ? 'text-[#62FFDA]' : 'text-[#6A3CFF]'}>
              {isLive ? 'Launch Tool' : 'Send Message'}
            </span>
            <ExternalLink size={16} className={isLive ? 'text-[#62FFDA]' : 'text-[#6A3CFF]'} />
          </div>
        )}

        {isBuilding && (
          <div className="text-xs font-['Lato'] text-[#CFCFCF]/50 italic">
            Be the first to know when it launches
          </div>
        )}
      </div>
    </Card>
  );
};
