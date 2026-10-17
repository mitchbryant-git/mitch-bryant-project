"use client";

import { useCallback, useEffect, useRef } from "react";
import { moduleMotion } from "@/config/module-motion";

export function useModuleInsertion(dialog, art, status, seatSound, cancelSound) {
  const decoded = useRef(new Set());
  const animations = useRef([]);
  const run = useRef(0);
  const activeModule = useRef(null);
  const stop = useCallback((reason = "still", preserveArmedSound = false) => {
    if (!preserveArmedSound) cancelSound();
    run.current++;
    activeModule.current = null;
    animations.current.forEach((animation) => animation.cancel());
    animations.current = [];
    if (art.current) {
      delete art.current.dataset.hasMotion;
      art.current.querySelectorAll("[data-active-motion]").forEach((group) => { delete group.dataset.activeMotion; });
      art.current.dataset.motionState = reason;
    }
    dialog.current?.style.removeProperty("--descent-clearance");
  }, [art, dialog, cancelSound]);

  const fit = useCallback(() => {
    const config = moduleMotion[activeModule.current];
    if (!config) return;
    const panel = dialog.current;
    panel.style.setProperty("--descent-clearance", "0px");
    const box = art.current.getBoundingClientRect();
    const scale = box.width / config.canvas.width;
    const left = box.left + config.cartridge.x * scale, right = left + config.cartridge.width * scale;
    let safeTop = panel.getBoundingClientRect().top + 12;
    for (const control of panel.querySelectorAll("[data-viewer-controls] button")) {
      const bounds = control.getBoundingClientRect();
      if (right > bounds.left - 8 && left < bounds.right + 8) safeTop = Math.max(safeTop, bounds.bottom + 8);
    }
    const startY = config.cartridge.y - config.cartridge.travelY;
    const clearance = Math.max(0, Math.ceil(safeTop - (box.top + startY * scale)));
    panel.style.setProperty("--descent-clearance", `${clearance}px`);
  }, [art, dialog]);

  useEffect(() => {
    let disposed = false;
    const readyModules = decoded.current;
    const listeners = new AbortController();
    const options = { signal: listeners.signal };
    const groups = [...art.current.querySelectorAll("[data-module-motion]")];
    groups.forEach((group) => {
      const key = group.dataset.moduleMotion;
      const layers = [...group.querySelectorAll("img")];
      Promise.all(layers.map((image) => image.decode())).then(() => {
        if (!disposed) readyModules.add(key);
      }).catch(() => { readyModules.delete(key); });
      layers.forEach((image) => image.addEventListener("error", () => {
        readyModules.delete(key);
        if (group.hasAttribute("data-active-motion")) stop("image-fallback");
      }, options));
    });
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    reduced.addEventListener("change", () => { if (reduced.matches) stop("reduced-motion"); }, options);
    document.addEventListener("visibilitychange", () => { if (document.hidden) stop("hidden-fallback"); }, options);
    window.addEventListener("resize", () => { if (dialog.current?.open && art.current?.hasAttribute("data-has-motion")) fit(); }, options);
    return () => { disposed = true; readyModules.clear(); listeners.abort(); stop("closed"); };
  }, [art, dialog, fit, stop]);

  const start = useCallback((moduleId, moduleName) => {
    stop("starting", true);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return stop("reduced-motion");
    if (!decoded.current.has(moduleId)) return stop("decoding-fallback");
    const group = [...art.current.querySelectorAll("[data-module-motion]")].find((element) => element.dataset.moduleMotion === moduleId);
    const config = moduleMotion[moduleId];
    if (!group || !config) return stop("asset-fallback");
    const id = run.current;
    activeModule.current = moduleId;
    art.current.dataset.hasMotion = "";
    group.dataset.activeMotion = "";
    fit();
    art.current.dataset.motionState = "inserting";
    try {
      const cartridge = group.querySelector('[data-console-layer="cartridge"]');
      const screen = group.querySelector('[data-console-layer="screen"]');
      const insertion = cartridge.animate([{ transform: `translateY(${-100 * config.cartridge.travelY / config.canvas.height}%)` }, { transform: "translateY(0)" }], { duration: 420, easing: "cubic-bezier(.28,.72,.24,1)", fill: "both" });
      const wake = screen.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 140, delay: 360, easing: "ease-out", fill: "both" });
      animations.current = [insertion, wake];
      insertion.finished.then(() => {
        if (id === run.current && dialog.current?.open) seatSound();
      }).catch(() => {});
      Promise.all(animations.current.map((animation) => animation.finished)).then(() => {
        if (id !== run.current || !dialog.current?.open) return;
        art.current.dataset.motionState = "loaded";
        status.current.textContent = `${moduleName} console preview ready.`;
      }).catch(() => {});
    } catch { stop("animation-fallback"); }
  }, [art, dialog, fit, status, stop, seatSound]);
  return { start, stop };
}
