"use client";

import { useCallback, useEffect, useRef } from "react";
import { createCartridgeMedia } from "@/lib/cartridge-media.mjs";

export function useCartridgeSound() {
  const controller = useRef(null);
  const cancel = useCallback(() => controller.current?.cancel(), []);
  const arm = useCallback((event) => {
    controller.current ??= createCartridgeMedia();
    controller.current.arm(event);
  }, []);
  const sync = useCallback((...animations) => controller.current?.sync(...animations), []);

  useEffect(() => {
    controller.current ??= createCartridgeMedia();
    controller.current.prepare();
    try { localStorage.removeItem("atn-cartridge-sound"); } catch {}
    const listeners = new AbortController();
    const options = { signal: listeners.signal };
    for (const event of ["pagehide", "popstate", "hashchange", "blur"]) window.addEventListener(event, cancel, options);
    document.addEventListener("visibilitychange", () => { if (document.hidden) cancel(); }, options);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    reduced.addEventListener("change", () => { if (reduced.matches) cancel(); }, options);
    return () => {
      listeners.abort();
      controller.current?.dispose();
      controller.current = null;
    };
  }, [cancel]);

  return { arm, sync, cancel };
}
