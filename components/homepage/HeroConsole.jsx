"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./HeroConsole.module.css";

const source = "/assets/motion/hero/front-console-atn-lettering-v3.png";
const plateSource = "/assets/motion/hero/clean-plate.png";
const contour = "M 139 20 L 1132 20 C 1201 20 1236 60 1238 118 L 1240 507 C 1240 570 1201 608 1136 608 L 136 608 C 71 608 35 574 35 510 L 35 118 C 35 58 74 20 139 20 Z";

export function HeroConsole({ className }) {
  const frame = useRef(null);
  const device = useRef(null);
  const [prepared, setPrepared] = useState(false);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const root = frame.current;
    const hero = root.closest("section");
    const eligible = matchMedia("(min-width: 1000px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const listeners = new AbortController();
    const options = { signal: listeners.signal };
    let ready = false, preparing = false, disposed = false, raf = 0, previous = 0;
    let x = 0, y = 0, targetX = 0, targetY = 0;
    const clamp = (value) => Math.max(-1, Math.min(1, value));
    async function prepare() {
      if (!eligible.matches || ready || preparing) return;
      preparing = true;
      const plate = new window.Image();
      plate.src = plateSource;
      try { await Promise.all([root.querySelector("img").decode(), plate.decode()]); }
      catch { preparing = false; return; }
      if (disposed) return;
      ready = true;
      setPrepared(true);
    }
    function reset(immediate = false) {
      targetX = targetY = 0;
      if (immediate) {
        cancelAnimationFrame(raf); raf = 0; previous = 0; x = y = 0;
        root.removeAttribute("data-depth-active");
        if (device.current) device.current.style.transform = "none";
      } else schedule();
    }
    function tick(now) {
      raf = 0;
      if (!ready || !device.current || !eligible.matches || document.hidden) { reset(true); return; }
      const elapsed = previous ? Math.min(now - previous, 50) : 16.67;
      previous = now;
      const ease = 1 - Math.exp(-elapsed / 150);
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      if (Math.abs(x - targetX) + Math.abs(y - targetY) < .0002) { x = targetX; y = targetY; }
      if (x === 0 && y === 0) {
        root.removeAttribute("data-depth-active");
        device.current.style.transform = "none";
      } else {
        root.setAttribute("data-depth-active", "");
        device.current.style.transform = `translate3d(${(x * 4).toFixed(5)}px, ${(y * 3).toFixed(5)}px, 0) rotateY(${(x * .85).toFixed(5)}deg) rotateX(${(-y * .5).toFixed(5)}deg)`;
      }
      if (x !== targetX || y !== targetY) schedule(); else previous = 0;
    }
    function schedule() { if (ready && !raf) raf = requestAnimationFrame(tick); }
    hero.addEventListener("pointermove", (event) => {
      if (!eligible.matches || !ready || event.pointerType !== "mouse") return;
      const rect = hero.getBoundingClientRect();
      targetX = clamp((event.clientX - rect.left) / rect.width * 2 - 1);
      targetY = clamp((event.clientY - rect.top) / rect.height * 2 - 1);
      schedule();
    }, { ...options, passive: true });
    for (const name of ["pointerleave", "pointercancel"]) hero.addEventListener(name, () => reset(), options);
    window.addEventListener("blur", () => reset(), options);
    window.addEventListener("scroll", () => reset(), { ...options, passive: true });
    window.addEventListener("resize", () => reset(true), { ...options, passive: true });
    document.addEventListener("visibilitychange", () => { if (document.hidden) reset(true); }, options);
    eligible.addEventListener("change", () => { reset(true); prepare(); }, options);
    prepare();
    return () => { disposed = true; listeners.abort(); reset(true); };
  }, []);

  return (
    <div ref={frame} className={`${className} ${styles.frame}`} data-hero-console>
      <Image src={source} unoptimized alt="Front view of the cream ATN-01 Life Console ready for a module" width={1280} height={653} priority sizes="(max-width: 999px) 94vw, (max-width: 1600px) 60vw, 860px" />
      {prepared && <div className={styles.scene} aria-hidden="true">
        <div className={styles.background}>
          <svg viewBox="0 0 1280 653" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`${id}-tone`} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#17150f" stopOpacity="0" /><stop offset=".42" stopColor="#17150f" stopOpacity=".88" /><stop offset=".7" stopColor="#17150f" stopOpacity=".94" /><stop offset="1" stopColor="#17150f" stopOpacity="0" /></linearGradient>
              <mask id={`${id}-hole`} maskUnits="userSpaceOnUse" x="0" y="0" width="1280" height="653"><rect width="1280" height="653" fill="white" /><path d={contour} fill="black" stroke="black" strokeWidth="7" /></mask>
            </defs>
            <image href={plateSource} width="1280" height="653" preserveAspectRatio="none" />
            <rect x="0" y="570" width="1280" height="83" fill={`url(#${id}-tone)`} />
            <image href={source} width="1280" height="653" mask={`url(#${id}-hole)`} />
          </svg>
        </div>
        <div ref={device} className={styles.device} data-hero-device>
          <svg viewBox="0 0 1280 653" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id={`${id}-shell`}><path d={contour} /></clipPath></defs><image href={source} width="1280" height="653" clipPath={`url(#${id}-shell)`} /></svg>
        </div>
      </div>}
    </div>
  );
}
