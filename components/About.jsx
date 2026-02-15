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
            <p className="font-semibold text-white text-lg md:text-xl">
              You're being asked to decide your future<br />
              before you've even figured out who you are.
            </p>

            <p>
              Pick subjects. Pick a degree. Pick a career.<br />
              Act like you know where it all leads.
            </p>

            <p>
              Maybe you feel completely lost.<br />
              Maybe you know exactly what you want<br />
              but have no idea what the smartest path is.
            </p>

            <p className="font-bold text-white text-lg">
              Either way, no one shows you how to design a life.<br />
              They just tell you to pick something and hope it works.
            </p>

            <p className="font-bold text-[#62FFDA] text-xl pt-2">
              I know, because I did exactly that.
            </p>

            <p>
              I chose what looked smart.<br />
              <span className="font-semibold text-white">Wasted years on a degree I didn't love and a job I hated</span><br />
              then had to start over.
            </p>

            <p className="font-bold text-white text-xl pt-2">
              So I'm building the tools I wish existed when I was 16.
            </p>

            <p>
              Tools to help you figure out the life you want<br />
              and the path that actually gets you there.
            </p>

            <p className="text-[#62FFDA] font-bold text-lg pt-2">
              I won't tell you what to do.<br />
              I'll give you the map. You make the moves.
            </p>

            <p>
              Some are live. Some are coming.<br />
              <span className="font-bold text-white">Build this with me.</span>
            </p>

            <p className="font-semibold text-white pt-4">
              No guessing. No drifting. No wasted years.
            </p>

            <p className="font-black text-white text-xl md:text-2xl pt-6 uppercase tracking-tight font-['Montserrat']">
              Design your life. Then build it.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};
