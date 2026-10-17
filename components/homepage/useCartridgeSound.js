"use client";

import { useCallback, useEffect, useRef } from "react";
import { cartridgeClickSamples } from "@/lib/cartridge-click.mjs";

export function useCartridgeSound() {
  const context = useRef(null);
  const buffer = useRef(null);
  const source = useRef(null);
  const warmup = useRef(null);
  const armed = useRef(false);

  const cancel = useCallback(() => {
    armed.current = false;
    for (const ref of [source, warmup]) {
      if (!ref.current) continue;
      try { ref.current.stop(); } catch {}
      ref.current.disconnect();
      ref.current = null;
    }
  }, []);

  useEffect(() => {
    // Retire the old toggle without letting an old saved mute suppress the click.
    try { localStorage.removeItem("atn-cartridge-sound"); } catch {}
    const listeners = new AbortController();
    const options = { signal: listeners.signal };
    for (const event of ["pagehide", "popstate", "hashchange", "blur"]) window.addEventListener(event, cancel, options);
    document.addEventListener("visibilitychange", () => { if (document.hidden) cancel(); }, options);
    return () => {
      listeners.abort();
      cancel();
      context.current?.close().catch(() => {});
      context.current = null;
      buffer.current = null;
    };
  }, [cancel]);

  // Called synchronously inside the real click/keyboard activation, never an effect.
  const arm = useCallback((event) => {
    cancel();
    if (!event.isTrusted || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!context.current || context.current.state === "closed") {
        context.current = new AudioContext({ latencyHint: "interactive" });
        const samples = cartridgeClickSamples(context.current.sampleRate);
        buffer.current = context.current.createBuffer(1, samples.length, context.current.sampleRate);
        buffer.current.getChannelData(0).set(samples);
      }
      armed.current = true;
      // A denied or slow resume is silent. It must never delay or replay the click.
      if (context.current.state !== "running") context.current.resume().catch(() => {});
      // Start the Web Audio path while this trusted activation is still on-stack.
      // One zero-valued sample is inaudible; it does not override OS audio policy.
      const unlock = context.current.createBufferSource();
      unlock.buffer = context.current.createBuffer(1, 1, context.current.sampleRate);
      unlock.connect(context.current.destination);
      warmup.current = unlock;
      unlock.onended = () => { unlock.disconnect(); if (warmup.current === unlock) warmup.current = null; };
      unlock.start();
    } catch { armed.current = false; }
  }, [cancel]);

  const seat = useCallback(() => {
    const wasArmed = armed.current;
    armed.current = false;
    const audio = context.current;
    if (!wasArmed || document.hidden || audio?.state !== "running" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      const click = audio.createBufferSource();
      click.buffer = buffer.current;
      click.connect(audio.destination);
      source.current = click;
      click.onended = () => { click.disconnect(); if (source.current === click) source.current = null; };
      click.start();
    } catch { cancel(); }
  }, [cancel]);

  return { arm, seat, cancel };
}
