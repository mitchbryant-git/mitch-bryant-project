"use client";

import { useEffect, useRef, useState } from "react";

const root = "/assets/motion/tuesday-type/approved-2026-10-23/";

export function TuesdayTypeInsertion({ dialog, art, status, syncSound, cancelSound }) {
  const canvas = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const surface = canvas.current;
    const context = surface.getContext("2d");
    if (!context) return;
    const consoleImage = new window.Image();
    const cartridge = new window.Image();
    consoleImage.src = `${root}console.png`;
    cartridge.src = `${root}cartridge.png`;
    let disposed = false, frame = 0, clock;
    const listeners = new AbortController();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const cut = new Path2D("M590 122 L905 143 Q925 148 925 184 L918 315 L590 283 Z");
    const empty = new Path2D(); empty.rect(0, 0, 1536, 1152); empty.addPath(cut);
    const screen = new Path2D("M431 381 L1015 447 Q1033 450 1028 474 L1001 800 Q998 818 981 813 L420 729 Q405 726 409 704 L425 401 Q427 383 431 381 Z");
    const base = () => { context.save(); context.clip(empty, "evenodd"); context.drawImage(consoleImage, 0, 0); context.restore(); };
    const draw = (ms) => {
      const t = Math.max(0, Math.min(1, ms / 840));
      const eased = 1 - Math.pow(1 - t, 3);
      context.clearRect(0, 0, 1280, 1180);
      context.save(); context.scale(1280 / 1536, 1280 / 1536); context.translate(0, 300);
      base();
      context.save(); context.translate(565, 93 - 300 * (1 - eased)); context.scale(.38, .38); context.drawImage(cartridge, 0, 0); context.restore();
      context.save(); context.beginPath(); context.moveTo(0, 220); context.lineTo(555, 278); context.lineTo(960, 323); context.lineTo(1536, 360); context.lineTo(1536, 1152); context.lineTo(0, 1152); context.closePath(); context.clip(); base(); context.restore();
      const wake = Math.max(0, Math.min(1, (ms - 720) / 280));
      if (wake < 1) { context.save(); context.clip(screen); context.fillStyle = `rgba(0,9,9,${1 - wake})`; context.fillRect(380, 360, 680, 490); context.restore(); }
      context.restore();
    };
    const settle = (reason = "loaded") => {
      cancelAnimationFrame(frame); clock?.cancel(); cancelSound();
      if (!disposed && consoleImage.complete && cartridge.complete) {
        draw(1000); surface.dataset.motionState = reason;
        art.current.dataset.motionState = reason;
        status.current.textContent = "Tuesday Type console preview ready.";
      }
    };
    const tick = () => {
      if (disposed || !dialog.current?.open) return;
      const ms = Number(clock.currentTime ?? 0);
      draw(ms);
      if (ms >= 1000) { surface.dataset.motionState = "loaded"; art.current.dataset.motionState = "loaded"; status.current.textContent = "Tuesday Type console preview ready."; }
      else frame = requestAnimationFrame(tick);
    };
    Promise.all([consoleImage.decode(), cartridge.decode()]).then(() => {
      if (disposed) return;
      setReady(true);
      if (reduced.matches || document.hidden || !dialog.current?.open) return settle(reduced.matches ? "reduced-motion" : "still");
      // The existing finite soundtrack drives this clock when playback is available.
      clock = surface.animate([{ opacity: 1 }, { opacity: 1 }], { duration: 1000, fill: "both" });
      surface.dataset.motionState = "inserting"; art.current.dataset.motionState = "inserting";
      syncSound(clock); frame = requestAnimationFrame(tick);
    }).catch(() => { cancelSound(); status.current.textContent = "Tuesday Type console preview ready."; });
    reduced.addEventListener("change", () => { if (reduced.matches) settle("reduced-motion"); }, { signal: listeners.signal });
    document.addEventListener("visibilitychange", () => { if (document.hidden) settle("hidden-fallback"); }, { signal: listeners.signal });
    return () => { disposed = true; listeners.abort(); cancelAnimationFrame(frame); clock?.cancel(); cancelSound(); };
  }, [art, cancelSound, dialog, status, syncSound]);

  return <>
    {/* This unchanged source image remains a usable fallback if canvas or decoding fails. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`${root}console.png`} alt="Tuesday Type cartridge loaded into the ATN-01 Life Console" style={{ display: ready ? "none" : "block" }} />
    <canvas ref={canvas} width={1280} height={1180} role="img" aria-label="Tuesday Type cartridge loading into the ATN-01 Life Console" style={{ display: ready ? "block" : "none", width: "100%", height: "auto" }} />
  </>;
}

