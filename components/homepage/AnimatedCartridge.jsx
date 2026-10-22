"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./AnimatedCartridge.module.css";

// The label art runs at 12 frames a second, like a sprite.
const STEP = 1000 / 12;

function makeCanvas(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const im = new window.Image();
    im.onload = () => resolve(im);
    im.onerror = () => reject(new Error("Label motion image failed to load"));
    im.src = src;
  });
}

function photoReady(img) {
  if (img.complete) {
    if (!img.naturalWidth) return Promise.reject(new Error("Cartridge photo failed to load"));
    return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    img.addEventListener("load", () => resolve(), { once: true });
    img.addEventListener("error", () => reject(new Error("Cartridge photo failed to load")), { once: true });
  });
}

const percent = (part, whole) => `${(part / whole) * 100}%`;

// Enhancement only: the photo is the complete cartridge. When motion is allowed and the card is
// near the screen, a canvas over the label region plays the label art. The canvas copies its
// background from the photo itself, so its edges always match.
// `className` must position and size the frame (the canvas is placed inside it).
export function AnimatedCartridge({ src, motion, width, height, alt, className = "", loading }) {
  const box = useRef(null);
  const photo = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const wrap = box.current;
    const img = photo.current;
    const view = canvas.current;
    if (!motion || !wrap || !img || !view || typeof IntersectionObserver === "undefined") return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const vctx = view.getContext("2d");
    if (!vctx) return;
    let disposed = false, loading = null, scene = null, plate = null, frame = null, fctx = null;
    let onScreen = false, raf = 0, last = 0, clock = 0, shown = -1, deviceSize = null;

    function load() {
      loading ??= Promise.all([
        fetch(motion).then((response) => {
          if (!response.ok) throw new Error(`Label motion request failed: ${response.status}`);
          return response.json();
        }),
        import("@/lib/cartridge-label-motion"),
        photoReady(img),
      ]).then(async ([file, engines]) => {
        const next = engines.createLabelMotion(file);
        if (!next) throw new Error(`Unknown label motion: ${file.engine}`);
        const patch = await loadImage(file.patch.src);
        await next.ready;
        if (disposed) return;
        const [x, y, w, h] = file.region;
        const [pw, ph] = file.photo;
        const kx = img.naturalWidth / pw, ky = img.naturalHeight / ph;
        plate = makeCanvas(w, h);
        const pctx = plate.getContext("2d");
        pctx.drawImage(img, x * kx, y * ky, w * kx, h * ky, 0, 0, w, h);
        pctx.drawImage(patch, file.patch.x, file.patch.y);
        frame = makeCanvas(w, h);
        fctx = frame.getContext("2d");
        Object.assign(view.style, { left: percent(x, pw), top: percent(y, ph), width: percent(w, pw), height: percent(h, ph) });
        scene = next;
        fit();
      });
      return loading;
    }

    // Size the canvas to the screen pixels it covers (never above the art's own resolution)
    // and scale each frame down with high quality, so it matches the photo around it.
    function fit() {
      if (!scene) return;
      const dpr = window.devicePixelRatio || 1;
      const [dw, dh] = deviceSize ?? [view.clientWidth * dpr, view.clientHeight * dpr];
      if (!dw || !dh) return;
      const k = Math.min(1, scene.W / dw, scene.H / dh);
      const bw = Math.max(1, Math.round(dw * k)), bh = Math.max(1, Math.round(dh * k));
      if (view.width !== bw || view.height !== bh) {
        view.width = bw;
        view.height = bh;
        shown = -1;
      }
      paint();
    }

    function paint() {
      if (!scene || reduced.matches) return;
      const f = Math.floor(clock / STEP);
      if (f === shown) return;
      shown = f;
      scene.draw(fctx, f * STEP, plate);
      vctx.imageSmoothingEnabled = true;
      vctx.imageSmoothingQuality = "high";
      vctx.clearRect(0, 0, view.width, view.height);
      vctx.drawImage(frame, 0, 0, view.width, view.height);
      wrap.dataset.motion = "on";
    }

    function tick(now) {
      raf = 0;
      if (disposed || !scene || !onScreen || reduced.matches) return;
      clock = (clock + (last ? Math.min(64, now - last) : 0)) % scene.LOOP;
      last = now;
      paint();
      raf = requestAnimationFrame(tick);
    }

    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    }

    function update() {
      if (reduced.matches) {
        stop();
        delete wrap.dataset.motion;
        return;
      }
      if (!onScreen) {
        stop();
        return;
      }
      load().then(() => {
        if (disposed || !onScreen || reduced.matches || raf) return;
        shown = -1;
        raf = requestAnimationFrame(tick);
      }).catch(() => {
        // The photo already shows the full cartridge, so a failed load just means no motion.
      });
    }

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    }, { rootMargin: "200px 0px" });
    visibility.observe(wrap);

    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(([entry]) => {
      // Prefer exact device pixels, but only when they agree with the CSS size at this pixel ratio.
      const dpr = window.devicePixelRatio || 1;
      const cw = entry.contentRect.width * dpr, ch = entry.contentRect.height * dpr;
      const size = entry.devicePixelContentBoxSize?.[0];
      const exact = size && Math.abs(size.inlineSize - cw) <= 2 && Math.abs(size.blockSize - ch) <= 2;
      deviceSize = exact ? [size.inlineSize, size.blockSize] : [cw, ch];
      fit();
    });
    if (resize) {
      try { resize.observe(view, { box: "device-pixel-content-box" }); } catch { resize.observe(view); }
    }
    reduced.addEventListener("change", update);

    return () => {
      disposed = true;
      stop();
      visibility.disconnect();
      resize?.disconnect();
      reduced.removeEventListener("change", update);
    };
  }, [motion]);

  return (
    <div ref={box} className={`${styles.frame} ${className}`} style={{ "--art-ratio": width / height }}>
      <Image ref={photo} src={src} alt={alt} width={width} height={height} unoptimized loading={loading} />
      {motion ? <canvas ref={canvas} className={styles.motion} aria-hidden="true" /> : null}
    </div>
  );
}
