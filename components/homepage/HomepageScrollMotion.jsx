"use client";

import { useEffect } from "react";

// Enhancement only: the server-rendered cards and connector are complete.
export function HomepageScrollMotion() {
  useEffect(() => {
    const cards = [...document.querySelectorAll("[data-scroll-card]")];
    const approach = document.querySelector("[data-scroll-approach]");
    const segments = [...document.querySelectorAll("[data-connector-segment]")];
    if (!approach || !cards.length) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 701px)");
    const active = new Map();
    const listeners = new AbortController();
    const options = { signal: listeners.signal };
    let ready = false, disposed = false, frame = 0, armFrame = 0;
    let lastY = scrollY, navigating = true, navigationTimer;
    const clamp = (value) => Math.max(0, Math.min(1, value));

    function settle(card, animate = false) {
      const pending = card.dataset.scrollState === "pending";
      active.get(card)?.cancel();
      active.delete(card);
      card.dataset.scrollState = "settled";
      if (!animate || !pending || reduced.matches || !card.animate) return;
      const animation = card.animate(
        [{ transform: "translateY(10px)" }, { transform: "translateY(0)" }],
        { duration: 320, delay: desktop.matches ? (cards.indexOf(card) % 2) * 45 : 0,
          easing: "cubic-bezier(.2,.75,.3,1)", fill: "backwards" }
      );
      active.set(card, animation);
      animation.onfinish = () => { if (active.get(card) === animation) active.delete(card); };
    }

    function updateConnector() {
      const rect = approach.getBoundingClientRect();
      const progress = reduced.matches ? 1 : clamp((innerHeight * .82 - rect.top) / (rect.height + innerHeight * .27));
      const boxes = segments.map((segment) => segment.getBoundingClientRect());
      if (!boxes.length) return;
      const start = desktop.matches ? boxes[0].left : boxes[0].top;
      const end = desktop.matches ? boxes.at(-1).right : boxes.at(-1).bottom;
      const filledTo = start + (end - start) * progress;
      segments.forEach((segment, index) => {
        const box = boxes[index];
        const position = desktop.matches ? box.left : box.top;
        const length = desktop.matches ? box.width : box.height;
        segment.style.setProperty("--segment-progress", `${clamp((filledTo - position) / length) * 100}%`);
      });
    }

    function update() {
      frame = 0;
      const delta = scrollY - lastY;
      const jump = Math.abs(delta) > innerHeight * .5;
      const reverse = delta < -1;
      if (jump || reverse || navigating || reduced.matches) {
        for (const card of active.keys()) settle(card);
      }
      for (const card of cards) {
        if (card.dataset.scrollState !== "pending") continue;
        const rect = card.getBoundingClientRect();
        if (rect.top < innerHeight) settle(card, ready && !navigating && !jump && !reverse && rect.bottom > 0);
      }
      lastY = scrollY;
      updateConnector();
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    function navigation() {
      navigating = true;
      clearTimeout(navigationTimer);
      for (const card of active.keys()) settle(card);
      schedule();
      // Covers delayed browser scroll restoration after history/pageshow.
      navigationTimer = setTimeout(() => { schedule(); navigating = false; }, 180);
    }
    document.addEventListener("focusin", (event) => {
      const card = event.target.closest("[data-scroll-card]");
      if (card) settle(card);
      navigation();
    }, options);
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");
      if (!link) return;
      const url = new URL(link.href, location.href);
      if (url.origin === location.origin && url.pathname === location.pathname && url.hash) navigation();
    }, { ...options, capture: true });
    window.addEventListener("scroll", schedule, { ...options, passive: true });
    window.addEventListener("resize", navigation, { ...options, passive: true });
    for (const name of ["hashchange", "popstate", "pageshow"]) window.addEventListener(name, navigation, options);
    window.addEventListener("pagehide", () => cards.forEach((card) => settle(card)), options);
    reduced.addEventListener("change", () => {
      if (reduced.matches) cards.forEach((card) => settle(card));
      navigation();
    }, options);
    const observer = new ResizeObserver(schedule);
    observer.observe(approach);
    updateConnector();
    document.fonts.ready.then(() => {
      if (disposed) return;
      armFrame = requestAnimationFrame(() => {
        for (const card of cards) {
          if (!card.dataset.scrollState) card.dataset.scrollState = reduced.matches || card.getBoundingClientRect().top < innerHeight ? "settled" : "pending";
        }
        ready = true;
        navigation();
      });
    });
    return () => {
      disposed = true;
      listeners.abort();
      observer.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(armFrame);
      clearTimeout(navigationTimer);
      cards.forEach((card) => { settle(card); delete card.dataset.scrollState; });
      segments.forEach((segment) => segment.style.removeProperty("--segment-progress"));
    };
  }, []);
  return null;
}
