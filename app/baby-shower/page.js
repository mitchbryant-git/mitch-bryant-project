"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// BABY SHOWER INVITATION
// ============================================================
const WEB3FORMS_KEY = "5b07b4d3-c7b0-43ac-b0d5-5828647c5217";

// ============================================================
// COLORS
// ============================================================
const C = {
  bg: "#d4e6f6",
  bgDeep: "#b8d4ed",
  navy: "#1a2e4a",
  blue: "#4a7fb5",
  blueSoft: "#8bb0d6",
  blueLight: "#c5d9ed",
  blueGlow: "rgba(74, 127, 181, 0.3)",
  white: "#ffffff",
  whiteAlpha: "rgba(255,255,255,0.85)",
  textDark: "#1a2e4a",
  textMed: "#3d5a80",
  textLight: "#6b8ab5",
};

// ============================================================
// HOOKS
// ============================================================
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ============================================================
// CLOUD
// ============================================================
function Cloud({ style, size = 200, opacity = 0.4, speed = 60 }) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size * 0.6,
        opacity,
        ...style,
        animation: `floatCloud ${speed}s linear infinite`,
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        <ellipse cx="70" cy="80" rx="60" ry="35" fill="white" fillOpacity="0.7" />
        <ellipse cx="120" cy="70" rx="50" ry="40" fill="white" fillOpacity="0.6" />
        <ellipse cx="90" cy="60" rx="55" ry="38" fill="white" fillOpacity="0.8" />
        <ellipse cx="55" cy="70" rx="40" ry="30" fill="white" fillOpacity="0.5" />
        <ellipse cx="140" cy="80" rx="35" ry="25" fill="white" fillOpacity="0.6" />
      </svg>
    </div>
  );
}

// ============================================================
// GLOW DOTS
// ============================================================
function GlowDots() {
  const dots = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {dots.map((d) => (
        <div
          key={d.id}
          style={{
            position: "absolute",
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255,255,255,0.9), ${C.blueGlow})`,
            animation: `glowPulse ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// DIVIDER
// ============================================================
function Divider() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "30px 0" }}>
      <svg width="120" height="8" viewBox="0 0 120 8">
        <defs>
          <linearGradient id="divGrad" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={C.blueLight} stopOpacity="0" />
            <stop offset="50%" stopColor={C.blueSoft} stopOpacity="0.8" />
            <stop offset="100%" stopColor={C.blueLight} stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="4" x2="120" y2="4" stroke="url(#divGrad)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ============================================================
// POEM LINE (scroll-triggered)
// ============================================================
function PoemLine({ children, delay = 0 }) {
  const [ref, visible] = useScrollReveal(0.2);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(17px, 3.2vw, 22px)",
        color: C.textMed,
        letterSpacing: "0.06em",
        lineHeight: 2.2,
        textAlign: "center",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

// ============================================================
// ULTRASOUND PHOTO
// ============================================================
function PhotoSection() {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.95)",
        transition: "all 1s ease",
        display: "flex",
        justifyContent: "center",
        padding: "10px 0",
      }}
    >
      <div
        style={{
          width: "clamp(280px, 85vw, 520px)",
          borderRadius: "24px",
          border: `3px solid ${C.whiteAlpha}`,
          boxShadow: `0 8px 32px ${C.blueGlow}`,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/belly2-compressed.jpg"
          alt="Our little man"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

// ============================================================
// RSVP FORM → Web3Forms
// ============================================================
function RSVPForm() {
  const [ref, visible] = useScrollReveal();
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(null);
  const [guests, setGuests] = useState("1");
  const [dietary, setDietary] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!name.trim() || attending === null) return;
    setSaving(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Baby Shower RSVP — ${name.trim()}`,
          from_name: "Baby Shower RSVP",
          name: name.trim(),
          attending: attending ? "Yes" : "No",
          number_of_guests: attending ? guests : "0",
          dietary_requirements: dietary.trim() || "None",
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        console.error("Web3Forms error:", data);
        setSubmitted(true);
      }
    } catch (e) {
      console.error("Submit error:", e);
      setSubmitted(true);
    }
    setSaving(false);
  }, [name, attending, guests, dietary]);

  if (submitted) {
    return (
      <div
        ref={ref}
        style={{
          textAlign: "center",
          padding: "40px 20px",
          opacity: visible ? 1 : 0,
          transition: "all 1s ease",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 16 }}>
          {attending ? "🤍" : "💙"}
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(20px, 4vw, 28px)",
            color: C.navy,
            fontWeight: 500,
          }}
        >
          {attending
            ? "We can't wait to see you there!"
            : "We'll miss you! Thanks for letting us know."}
        </div>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    border: `1.5px solid ${C.blueLight}`,
    borderRadius: 12,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 16,
    color: C.navy,
    background: C.whiteAlpha,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
  };

  const btnBase = {
    flex: 1,
    padding: "14px 0",
    borderRadius: 12,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 15,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: `1.5px solid ${C.blueLight}`,
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s ease",
        maxWidth: 420,
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => setAttending(true)}
            style={{
              ...btnBase,
              background: attending === true ? C.blue : "transparent",
              color: attending === true ? C.white : C.textMed,
            }}
          >
            Joyfully Accept
          </button>
          <button
            onClick={() => setAttending(false)}
            style={{
              ...btnBase,
              background: attending === false ? C.blueSoft : "transparent",
              color: attending === false ? C.white : C.textMed,
            }}
          >
            Regretfully Decline
          </button>
        </div>

        {attending && (
          <>
            <div>
              <label
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 13,
                  color: C.textLight,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                  display: "block",
                }}
              >
                Number of Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Any dietary requirements?"
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </>
        )}

        <button
          onClick={handleSubmit}
          disabled={!name.trim() || attending === null || saving}
          style={{
            padding: "16px 0",
            borderRadius: 12,
            border: "none",
            background:
              !name.trim() || attending === null
                ? C.blueLight
                : `linear-gradient(135deg, ${C.blue}, ${C.blueSoft})`,
            color: C.white,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 16,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor:
              !name.trim() || attending === null ? "default" : "pointer",
            opacity: !name.trim() || attending === null ? 0.5 : 1,
            transition: "all 0.3s ease",
            boxShadow:
              name.trim() && attending !== null
                ? `0 4px 20px ${C.blueGlow}`
                : "none",
          }}
        >
          {saving ? "Sending..." : "Send RSVP"}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// PAGE
// ============================================================
const POEM = [
  "We've been showered with love",
  "and blessed along the way",
  "With thoughtful gifts and treasures",
  "we've gathered day by day",
  "Baby boy is almost sorted",
  "with plenty in his nest",
  "So if you'd like to help us",
  "in ticking off the rest",
  "A wishing well will be there",
  "for his car seat and pram",
  "We can't wait to toast with you all",
  "to our little man!",
];

export default function BabyShowerPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300);
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Great+Vibes&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes floatCloud {
          0% { transform: translateX(-300px); }
          100% { transform: translateX(calc(100vw + 300px)); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(74, 127, 181, 0.2), 0 0 40px rgba(74, 127, 181, 0.1); }
          50% { text-shadow: 0 0 30px rgba(74, 127, 181, 0.35), 0 0 60px rgba(74, 127, 181, 0.15); }
        }
        @keyframes subtleBreathe {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          background: `linear-gradient(180deg, #c5ddf0 0%, ${C.bg} 30%, #b8d4ed 60%, #c5ddf0 100%)`,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          color: C.textDark,
          position: "relative",
          overflow: "hidden",
        }}
      >
      {/* Watercolour wash overlays */}
      <div
        style={{
          position: "fixed",
          top: -100,
          left: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(197, 217, 237, 0.4), transparent 70%)",
          filter: "blur(60px)",
          animation: "subtleBreathe 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: -150,
          right: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139, 176, 214, 0.3), transparent 70%)",
          filter: "blur(80px)",
          animation: "subtleBreathe 10s ease-in-out 2s infinite",
          pointerEvents: "none",
        }}
      />

      {/* Floating Clouds */}
      <Cloud style={{ top: "5%" }} size={260} opacity={0.6} speed={80} />
      <Cloud style={{ top: "20%" }} size={200} opacity={0.5} speed={60} />
      <Cloud style={{ top: "45%" }} size={240} opacity={0.45} speed={90} />
      <Cloud style={{ top: "70%" }} size={220} opacity={0.55} speed={70} />
      <Cloud style={{ top: "85%" }} size={280} opacity={0.5} speed={100} />

      {/* Soft glow dots */}
      <GlowDots />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 680,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* ===== HERO ===== */}
        <div
          style={{
            padding: "80px 0 30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 8,
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.5s ease",
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(15px, 3vw, 20px)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: C.textLight,
              animation: loaded ? "fadeInUp 1s ease 0.3s both" : "none",
            }}
          >
            In Celebration of Our
          </div>

          <div
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "clamp(52px, 14vw, 110px)",
              color: C.navy,
              lineHeight: 1.1,
              animation: loaded
                ? "fadeInUp 1s ease 0.6s both, titleGlow 4s ease-in-out infinite"
                : "none",
              padding: "10px 0",
            }}
          >
            Baby Shower
          </div>

          <div style={{ animation: loaded ? "fadeInUp 1s ease 0.9s both" : "none" }}>
            <Divider />
          </div>

          <div style={{ animation: loaded ? "fadeInUp 1s ease 1.1s both" : "none" }}>
            <div
              style={{
                fontSize: "clamp(22px, 5vw, 34px)",
                fontWeight: 500,
                color: C.navy,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Saturday April 11<sup style={{ fontSize: "0.6em" }}>th</sup> 2026
            </div>
            <div
              style={{
                fontSize: "clamp(30px, 7vw, 48px)",
                fontWeight: 300,
                color: C.blue,
                marginTop: 4,
              }}
            >
              11:00 AM
            </div>
          </div>

          <div style={{ animation: loaded ? "fadeInUp 1s ease 1.3s both" : "none", marginTop: 8 }}>
            <div
              style={{
                fontSize: "clamp(20px, 4vw, 28px)",
                fontWeight: 600,
                color: C.navy,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Rivello
            </div>
            <div
              style={{
                fontSize: "clamp(17px, 3vw, 22px)",
                color: C.textMed,
                letterSpacing: "0.06em",
                marginTop: 4,
              }}
            >
              15 Wharf Street, Hamilton QLD
            </div>
          </div>

          <div style={{ animation: loaded ? "fadeInUp 1s ease 1.6s both" : "none", marginTop: 16 }}>
            <div
              style={{
                fontSize: "clamp(18px, 3.5vw, 24px)",
                color: C.textMed,
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Grazing, good company and a little bubbly
            </div>
            <div
              style={{
                fontSize: "clamp(15px, 2.5vw, 18px)",
                color: C.textLight,
                letterSpacing: "0.06em",
                marginTop: 8,
              }}
            >
              (Please notify of any dietary requirements)
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{ animation: loaded ? "fadeInUp 1s ease 2s both" : "none", marginTop: 16 }}>
            <div
              style={{
                width: 1,
                height: 50,
                background: `linear-gradient(to bottom, transparent, ${C.blueSoft})`,
                margin: "0 auto",
                animation: "subtleBreathe 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* ===== PHOTO ===== */}
        <div style={{ padding: "10px 0" }}>
          <PhotoSection />
        </div>

        {/* ===== POEM ===== */}
        <div style={{ padding: "40px 0 20px" }}>
          {POEM.map((line, i) => (
            <PoemLine key={i} delay={i * 0.08}>
              {line}
            </PoemLine>
          ))}
        </div>

        <Divider />

        {/* ===== RSVP ===== */}
        <div style={{ padding: "20px 0 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(28px, 6vw, 44px)",
                color: C.navy,
              }}
            >
              Kindly Respond
            </div>
            <div
              style={{
                fontSize: "clamp(16px, 3vw, 20px)",
                color: C.textLight,
                letterSpacing: "0.08em",
                marginTop: 8,
                fontStyle: "italic",
              }}
            >
              We&apos;d love to know if you can make it
            </div>
          </div>
          <RSVPForm />
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "30px 0 60px", opacity: 0.5 }}>
          <div
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 20,
              color: C.blueSoft,
            }}
          >
            With love
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
