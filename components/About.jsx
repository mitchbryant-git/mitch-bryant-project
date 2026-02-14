"use client";
import React from 'react';
import { Card } from './Card';

export const About = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 py-6 md:py-10 relative z-10" id="about">
      <Card hover={false}>
        <div className="space-y-6 text-left">
          <h2 className="text-3xl md:text-4xl font-black font-['Montserrat'] text-white uppercase tracking-tight">
            My Mission
          </h2>

          <div className="space-y-5 text-base md:text-lg text-[#CFCFCF] font-['Lato'] leading-relaxed">
            <p>
              At 16, you're told to decide your future.<br />
              Pick subjects. Pick a degree. Pick a career.
            </p>

            <p className="font-semibold text-white">
              All before you've even figured out who you are.
            </p>

            <p>
              No one teaches you how to design a life.<br />
              They just tell you to pick a job and hope it works out.
            </p>

            <p>
              The real question isn't<br />
              <span className="text-[#CFCFCF]">"What job do you want?"</span><br />
              It's<br />
              <span className="text-[#62FFDA] font-bold text-xl">"How do you want to live?"</span>
            </p>

            <p className="font-bold text-white text-xl pt-2">
              That's why I'm building this.
            </p>

            <p>
              Whether you're lost… or you know exactly what you want but don't know the smartest path…
            </p>

            <div className="pt-4 space-y-2">
              <p className="text-[#62FFDA] font-bold text-lg">
                Design the life first.
              </p>
              <p className="text-[#62FFDA] font-bold text-lg">
                Build the path to fund it.
              </p>
              <p className="text-[#62FFDA] font-bold text-lg">
                Become the person who can achieve it.
              </p>
            </div>

            <p className="font-black text-white text-xl md:text-2xl pt-6 uppercase tracking-tight font-['Montserrat']">
              It's time to level up.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};
