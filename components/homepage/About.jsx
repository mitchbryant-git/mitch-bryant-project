"use client";
import React from 'react';
import Reveal from '@/components/shared/Reveal';

export const About = () => {
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-12 py-6 md:py-10 relative z-10" id="about">
      {/* Section Label */}
      <Reveal>
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: '13px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#0081CB',
          textAlign: 'center',
          marginBottom: '3rem',
        }}>
          My Mission
        </p>
      </Reveal>

      {/* Block 1 — The Problem */}
      <Reveal delay={100}>
        <div style={{
          textAlign: 'center',
          fontFamily: 'Lato, sans-serif',
          fontSize: 'clamp(16px, 2.2vw, 20px)',
          color: 'rgba(241,245,249,0.85)',
          lineHeight: 1.8,
          marginBottom: '3rem',
        }}>
          <p>
            You're being asked to decide your future<br />
            before you've even figured out who you are.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Pick subjects. Pick a degree. Pick a career.<br />
            <span style={{ color: 'rgba(241,245,249,0.45)' }}>
              Act like you know where it all leads.
            </span>
          </p>
        </div>
      </Reveal>

      {/* Block 2 — The Relatable Struggle */}
      <Reveal delay={200}>
        <div style={{
          borderLeft: '3px solid #6A3CFF',
          background: 'rgba(106,60,255,0.03)',
          padding: '1.5rem 2rem',
          borderRadius: '1rem',
          fontFamily: 'Lato, sans-serif',
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: '#CFCFCF',
          lineHeight: 1.8,
          marginBottom: '3rem',
        }}>
          <p>
            Maybe you feel completely lost.<br />
            Maybe you know exactly what you want<br />
            but have no idea what the smartest path is.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Either way, <strong style={{ color: 'white' }}>no one shows you how to design a life</strong>.<br />
            They just tell you to pick something and hope it works.
          </p>
        </div>
      </Reveal>

      {/* Block 3 — The Personal Story */}
      <Reveal delay={300}>
        <div style={{
          textAlign: 'center',
          fontFamily: 'Lato, sans-serif',
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: 'rgba(241,245,249,0.55)',
          lineHeight: 1.8,
          marginBottom: '3rem',
        }}>
          <p>I know, because I did exactly that.</p>
          <p style={{ marginTop: '1rem' }}>
            I chose what looked smart.<br />
            Wasted years on a degree I didn't love<br />
            and a job I hated — then had to start over.
          </p>
        </div>
      </Reveal>

      {/* Block 4 — The Solution */}
      <Reveal delay={400}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
        }}>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(17px, 2.4vw, 22px)',
            color: '#0081CB',
            lineHeight: 1.8,
          }}>
            So I'm building the tools I wish existed when I was 16.
          </p>
          <p style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#CFCFCF',
            lineHeight: 1.8,
            marginTop: '1rem',
          }}>
            Tools to help you figure out the life you want —<br />
            and the path that actually gets you there.
          </p>
        </div>
      </Reveal>

      {/* Block 5 — The Promise */}
      <Reveal delay={500}>
        <div style={{
          textAlign: 'center',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '3rem',
        }}>
          <p style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#CFCFCF',
            lineHeight: 1.8,
          }}>
            I won't tell you what to do.<br />
            <strong style={{ color: 'white' }}>I'll give you the map. You make the moves.</strong>
          </p>
          <p style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: '14px',
            color: 'rgba(241,245,249,0.4)',
            lineHeight: 1.8,
            marginTop: '1rem',
          }}>
            Some are live. Some are coming. Build this with me.
          </p>
        </div>
      </Reveal>

      {/* Block 6 — The Tagline */}
      <Reveal delay={600}>
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: 'Lato, sans-serif',
            fontSize: '15px',
            color: 'rgba(241,245,249,0.4)',
            lineHeight: 1.8,
          }}>
            No guessing. No drifting. No wasted years.
          </p>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(24px, 4vw, 36px)',
            background: 'linear-gradient(135deg, #62FFDA, #0081CB, #6A3CFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginTop: '1rem',
          }}>
            Design your life. Then build it.
          </p>
        </div>
      </Reveal>
    </section>
  );
};
