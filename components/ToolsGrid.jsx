"use client";
import React from 'react';
import { ToolCard } from './ToolCard';
import { tools } from '@/config/tools';

export const ToolsGrid = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative z-10" id="tools">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black font-['Montserrat'] text-white">
          Tools & Resources
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
};
