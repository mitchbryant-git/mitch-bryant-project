"use client";

import { useCallback, useEffect, useRef } from "react";
import { moduleMotion } from "@/config/module-motion";
import { moduleFraming } from "@/config/module-framing";
import { SEAT_MS, WAKE_DELAY_MS, WAKE_MS } from "@/lib/cartridge-media.mjs";

export function useModuleInsertion(dialog, art, status, syncSound, cancelSound) {
  const decoded = useRef(new Set());
  const animations = useRef([]);
  const run = useRef(0);
  const fit = useCallback(() => {
    const panel = dialog.current;
    if (!panel?.open || !art.current) return;
    const selectedMotion=moduleMotion[art.current.dataset.previewModule];
    if(selectedMotion?.enabled===false){
      const unit=art.current.getBoundingClientRect().width / selectedMotion.canvas.width;
      panel.dataset.previewLayout="static";
      art.current.style.setProperty("--stage-unit",`${unit}px`);
      art.current.style.setProperty("--stage-crop","0");
      art.current.style.height=`${selectedMotion.canvas.height*unit}px`;
      const clearance=art.current.dataset.motionState==="inserting"?285*unit:0;
      panel.style.setProperty("--descent-clearance",`${clearance}px`);
      art.current.parentElement.style.paddingTop=`${clearance}px`;
      return;
    }
    const inserting = art.current.dataset.motionState === "inserting";
    const unit = art.current.getBoundingClientRect().width / moduleFraming.stage.width;
    const trim = inserting ? 0 : moduleFraming.settledTopTrim;
    panel.dataset.previewLayout = inserting ? "inserting" : art.current.dataset.motionState === "loaded" ? "settled" : "static";
    art.current.style.setProperty("--stage-unit", `${unit}px`);
    art.current.style.setProperty("--stage-crop", trim);
    art.current.style.height = `${(moduleFraming.stage.height - trim) * unit}px`;
    if (!inserting) {
      panel.style.setProperty("--descent-clearance", "0px");
      art.current.parentElement.style.paddingTop = "0px";
      return;
    }
    const box = art.current.getBoundingClientRect();
    const currentPadding = parseFloat(getComputedStyle(art.current.parentElement).paddingTop) || 0;
    const scale = box.width / moduleFraming.stage.width;
    const left = box.left + moduleFraming.commonLeft * scale, right = box.left + moduleFraming.commonRight * scale;
    let safeTop = panel.getBoundingClientRect().top + 12;
    for (const control of panel.querySelectorAll("[data-viewer-controls] button")) {
      const bounds = control.getBoundingClientRect();
      if (right > bounds.left - 8 && left < bounds.right + 8) safeTop = Math.max(safeTop, bounds.bottom + 8);
    }
    const clearance = Math.max(0, Math.ceil(currentPadding + safeTop - (box.top + moduleFraming.commonStartTop * scale)));
    if (panel.style.getPropertyValue("--descent-clearance") !== `${clearance}px`) panel.style.setProperty("--descent-clearance", `${clearance}px`);
    art.current.parentElement.style.paddingTop = `${clearance}px`;
  }, [art, dialog]);
  const stop = useCallback((reason = "still", preserveArmedSound = false) => {
    if (!preserveArmedSound) cancelSound();
    run.current++;
    animations.current.forEach((animation) => animation.cancel());
    animations.current = [];
    if (art.current) {
      delete art.current.dataset.hasMotion;
      art.current.querySelectorAll("[data-active-motion]").forEach((group) => { delete group.dataset.activeMotion; });
      art.current.dataset.motionState = reason;
    }
    if (dialog.current?.open) fit();
    else {
      dialog.current?.style.removeProperty("--descent-clearance");
      if (art.current) art.current.parentElement.style.removeProperty("padding-top");
    }
  }, [art, dialog, cancelSound, fit]);

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
    window.addEventListener("resize", fit, options);
    return () => { disposed = true; readyModules.clear(); listeners.abort(); stop("closed"); };
  }, [art, dialog, fit, stop]);

  const start = useCallback((moduleId, moduleName) => {
    stop("starting", true);
    if(moduleMotion[moduleId]?.enabled===false)return stop("asset-fallback");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return stop("reduced-motion");
    if (!decoded.current.has(moduleId)) return stop("decoding-fallback");
    const group = [...art.current.querySelectorAll("[data-module-motion]")].find((element) => element.dataset.moduleMotion === moduleId);
    const config = moduleMotion[moduleId];
    if (!group || !config) return stop("asset-fallback");
    const id = run.current;
    art.current.dataset.hasMotion = "";
    group.dataset.activeMotion = "";
    art.current.dataset.motionState = "inserting";
    fit();
    try {
      const cartridge = group.querySelector('[data-console-layer="cartridge"]');
      const screen = group.querySelector('[data-console-layer="screen"]');
      const insertion = cartridge.animate([{ transform: `translateY(${-100 * config.cartridge.travelY / config.canvas.height}%)` }, { transform: "translateY(0)" }], { duration: SEAT_MS, easing: "cubic-bezier(.28,.72,.24,1)", fill: "both" });
      const wake = screen.animate([{ opacity: 0 }, { opacity: 1 }], { duration: WAKE_MS, delay: WAKE_DELAY_MS, easing: "ease-out", fill: "both" });
      animations.current = [insertion, wake];
      syncSound(insertion, wake);
      Promise.all(animations.current.map((animation) => animation.finished)).then(() => {
        if (id !== run.current || !dialog.current?.open) return;
        art.current.dataset.motionState = "loaded";
        fit();
        status.current.textContent = `${moduleName} console preview ready.`;
      }).catch(() => {});
    } catch { stop("animation-fallback"); }
  }, [art, dialog, fit, status, stop, syncSound]);
  return { start, stop };
}
