import React from 'react';

export const Card = ({ children, className = "", noPadding = false, hover = false }) => (
  <div
    className={`rounded-3xl relative overflow-hidden group glass-dark ${hover ? 'card-hover' : ''} ${className}`}
  >
    {/* Specular Edge (Top Highlight) */}
    <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70 pointer-events-none" />

    {/* Inner glow */}
    <div className="absolute inset-0 pointer-events-none rounded-3xl border border-white/5" />

    {/* Content Wrapper */}
    <div className={`relative z-10 w-full h-full flex flex-col ${noPadding ? '' : 'p-6 md:p-8'}`}>
      {children}
    </div>
  </div>
);
