"use client";
import { useRef, useState, useEffect } from 'react';

const useReveal = (threshold = 0.12) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
};

export default function Reveal({ children, delay = 0, className = "", from = "bottom" }) {
  const [ref, vis] = useReveal(0.1);
  const transforms = {
    bottom: 'translateY(30px)',
    left: 'translateX(-30px)',
    right: 'translateX(30px)',
    scale: 'scale(0.95)',
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : transforms[from] || transforms.bottom,
      transition: `opacity 700ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}
