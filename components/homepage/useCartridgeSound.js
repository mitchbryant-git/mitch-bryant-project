"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cartridgeClickSamples } from "@/lib/cartridge-click.mjs";

const preferenceKey = "atn-cartridge-sound";

export function useCartridgeSound() {
  const [enabled, setEnabled] = useState(true);
  const allowed = useRef(true);
  const context = useRef(null);
  const buffer = useRef(null);
  const source = useRef(null);
  const armed = useRef(false);

  const cancel = useCallback(() => {
    armed.current = false;
    if (source.current) {
      try { source.current.stop(); } catch {}
      source.current.disconnect();
      source.current = null;
    }
  }, []);

  useEffect(() => {
    function readPreference() {
      try {
        allowed.current = localStorage.getItem(preferenceKey) !== "off";
        setEnabled(allowed.current);
        if (!allowed.current) cancel();
      } catch { /* Storage can be unavailable in private or restricted browsers. */ }
    }
    readPreference();
    const listeners = new AbortController();
    const options = { signal: listeners.signal };
    window.addEventListener("storage", readPreference, options);
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
    if (!event.isTrusted || !allowed.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!context.current || context.current.state === "closed") {
        context.current = new AudioContext({ latencyHint: "interactive" });
        const samples = cartridgeClickSamples(context.current.sampleRate);
        buffer.current = context.current.createBuffer(1, samples.length, context.current.sampleRate);
        buffer.current.copyToChannel(samples, 0);
      }
      armed.current = true;
      // A denied or slow resume is silent. It must never delay or replay the click.
      if (context.current.state !== "running") context.current.resume().catch(() => {});
    } catch { armed.current = false; }
  }, [cancel]);

  const seat = useCallback(() => {
    const wasArmed = armed.current;
    armed.current = false;
    const audio = context.current;
    if (!wasArmed || !allowed.current || document.hidden || audio?.state !== "running" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      const click = audio.createBufferSource();
      click.buffer = buffer.current;
      click.connect(audio.destination);
      source.current = click;
      click.onended = () => { click.disconnect(); if (source.current === click) source.current = null; };
      click.start();
    } catch { cancel(); }
  }, [cancel]);

  const toggle = useCallback(() => {
    allowed.current = !allowed.current;
    setEnabled(allowed.current);
    cancel();
    try { localStorage.setItem(preferenceKey, allowed.current ? "on" : "off"); } catch {}
  }, [cancel]);

  return { enabled, toggle, arm, seat, cancel };
}
