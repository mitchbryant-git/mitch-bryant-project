"use client";
import React, { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

export const Hero = () => {
  const [btnHover, setBtnHover] = useState(false);

  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6vh 1.5rem 8vh",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Floating geometric shapes */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* Top-right rounded square */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "15%",
            width: 80,
            height: 80,
            border: "1px solid rgba(106,60,255,0.13)",
            borderRadius: 16,
            "--r": "15deg",
            transform: "rotate(15deg)",
            animation: "shapeFloat 12s ease-in-out infinite",
          }}
        />
        {/* Bottom-left circle */}
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "12%",
            width: 60,
            height: 60,
            border: "1px solid rgba(0,129,203,0.13)",
            borderRadius: "50%",
            "--r": "0deg",
            animation: "shapeFloat 15s ease-in-out infinite reverse",
          }}
        />
        {/* Left diamond */}
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: "8%",
            width: 40,
            height: 40,
            border: "1px solid rgba(98,255,218,0.08)",
            "--r": "45deg",
            transform: "rotate(45deg)",
            animation: "shapeFloat 18s ease-in-out infinite",
          }}
        />
        {/* Bottom-right rounded rectangle */}
        <div
          style={{
            position: "absolute",
            bottom: "30%",
            right: "8%",
            width: 100,
            height: 100,
            border: "1px solid rgba(106,60,255,0.08)",
            borderRadius: 24,
            "--r": "-10deg",
            transform: "rotate(-10deg)",
            animation: "shapeFloat 22s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Text content */}
      <div
        style={{
          maxWidth: "56rem",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Element 1 — Subtitle */}
        <div
          style={{
            opacity: 0,
            animation:
              "heroLineIn 800ms cubic-bezier(0.34,1.56,0.64,1) 200ms forwards",
          }}
        >
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "rgba(207,207,207,0.5)",
              marginBottom: 32,
            }}
          >
            Life strategy for 16–19 year olds
          </p>
        </div>

        {/* Element 2 — DON'T JUST */}
        <div
          style={{
            opacity: 0,
            animation:
              "heroLineIn 800ms cubic-bezier(0.34,1.56,0.64,1) 400ms forwards",
          }}
        >
          <h1
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(36px, 7vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "white",
              display: "block",
            }}
          >
            DON&apos;T JUST
          </h1>
        </div>

        {/* Element 3 — PLAY THE GAME. */}
        <div
          style={{
            opacity: 0,
            animation:
              "heroLineIn 800ms cubic-bezier(0.34,1.56,0.64,1) 550ms forwards",
          }}
        >
          <h1
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(36px, 7vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "white",
              display: "block",
            }}
          >
            PLAY THE GAME.
          </h1>
        </div>

        {/* Element 4 — REWRITE THE RULES. marquee */}
        <div
          style={{
            opacity: 0,
            animation:
              "heroLineIn 800ms cubic-bezier(0.34,1.56,0.64,1) 700ms forwards",
            overflow: "hidden",
            margin: "12px 0 40px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "max-content",
              animation: "marquee 20s linear infinite",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(36px, 7vw, 72px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  whiteSpace: "nowrap",
                  paddingRight: "clamp(20px, 4vw, 48px)",
                  background:
                    "linear-gradient(135deg, #62FFDA, #0081CB, #6A3CFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                REWRITE THE RULES.
              </span>
            ))}
          </div>
        </div>

        {/* Element 5 — Subtitle line */}
        <div
          style={{
            opacity: 0,
            animation:
              "heroLineIn 800ms cubic-bezier(0.34,1.56,0.64,1) 900ms forwards",
          }}
        >
          <p
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "#CFCFCF",
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "0 auto 48px",
            }}
          >
            Tools to level up, master your money, and own your future.
          </p>
        </div>

        {/* Element 6 — Explore Tools button */}
        <div
          style={{
            opacity: 0,
            animation:
              "heroLineIn 800ms cubic-bezier(0.34,1.56,0.64,1) 1100ms forwards",
          }}
        >
          <a
            href="#tools"
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "1rem 2rem",
              borderRadius: 9999,
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              background: "linear-gradient(145deg, #62FFDA, #0081CB)",
              color: "#020617",
              boxShadow: btnHover
                ? "0 14px 30px rgba(0,129,203,0.33)"
                : "0 4px 20px rgba(0,129,203,0.27)",
              transform: btnHover ? "translateY(-2px)" : "translateY(0)",
              transition: "transform 200ms ease, box-shadow 200ms ease",
            }}
          >
            Explore Tools
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Element 7 — Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0,
            animation: "heroLineIn 800ms ease 1500ms forwards",
          }}
        >
          <div style={{ animation: "scrollBounce 2s ease-in-out infinite" }}>
            <ChevronDown size={20} color="rgba(207,207,207,0.3)" />
          </div>
        </div>
      </div>
    </section>
  );
};
