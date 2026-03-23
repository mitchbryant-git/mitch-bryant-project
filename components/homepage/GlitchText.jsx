"use client";
import React from 'react';

export const GlitchText = ({ children, className = "" }) => (
  <span className={`relative inline-block group ${className}`}>
    {/* Main Text */}
    <span className="relative z-10">{children}</span>

    {/* Glitch Layer 1 - Purple */}
    <span
      className="absolute top-0 left-0 z-0 opacity-0 group-hover:opacity-70 translate-x-[2px] animate-pulse transition-opacity duration-200"
      style={{ color: '#6A3CFF' }}
      aria-hidden="true"
    >
      {children}
    </span>

    {/* Glitch Layer 2 - Blue */}
    <span
      className="absolute top-0 left-0 z-0 opacity-0 group-hover:opacity-70 -translate-x-[2px] animate-pulse transition-opacity duration-200 delay-75"
      style={{ color: '#0081CB' }}
      aria-hidden="true"
    >
      {children}
    </span>
  </span>
);
