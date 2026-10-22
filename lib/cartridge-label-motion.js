// Label art motion for the homepage cartridges (Your Number, Tuesday Type, Growth Lab, HECS).
//
// Each motion file in public/assets/cartridges/motion describes one label region of a standard
// cartridge photo, in photo pixels. A scene draws one frame of that region: the caller hands it
// the plate (the label with the moving pieces cleaned out) and the scene draws the pieces on top.
// Frames are pure functions of time, so any frame can be drawn in any order.

const TAU = Math.PI * 2;

function loadImages(list) {
  const imgs = {};
  const ready = Promise.all(list.map(([key, src]) => new Promise((resolve) => {
    if (!src) { resolve(); return; }
    const im = new Image();
    im.onload = () => { imgs[key] = im; resolve(); };
    im.onerror = () => resolve();
    im.src = src;
  })));
  return { imgs, ready };
}

function makeCanvas(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function begin(ctx, w, h, plate) {
  ctx.clearRect(0, 0, w, h);
  if (plate) ctx.drawImage(plate, 0, 0);
}

function drawScaled(ctx, im, s, sc) {
  const cx = s.x + s.w / 2, cy = s.y + s.h / 2;
  ctx.drawImage(im, cx - s.w * sc / 2, cy - s.h * sc / 2, s.w * sc, s.h * sc);
}

// Your Number: a 96 x 61 pixel grid, recomposed every frame and scaled onto the label.
function yourNumber(D, W, H) {
  const GW = D.W, GH = D.H, N = GW * GH, LOOP = 6000;
  const ALPH = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const base = new Int16Array(N);
  for (let i = 0; i < N; i++) base[i] = ALPH.indexOf(D.base[i]);
  const bits = (s) => { const a = new Uint8Array(N); for (let i = 0; i < N; i++) a[i] = s.charCodeAt(i) === 49 ? 1 : 0; return a; };
  const ocean = bits(D.ocean), win = bits(D.win), liquid = bits(D.liquid), bush = bits(D.bush);
  const PAL = D.pal.map((h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]);
  const PY = D.pivot[1];
  const L = new Int16Array(N);
  const put = (c, r, i) => { if (c >= 0 && c < GW && r >= 0 && r < GH) L[r * GW + c] = i; };
  const grid = makeCanvas(GW, GH);
  const gctx = grid.getContext("2d");
  const pixels = gctx.createImageData(GW, GH);

  function compose(t, out) {
    L.set(base);

    // Sun rays: two alternating sets push out one pixel
    const fr = (t % 1500) / 1500;
    for (const ray of D.rays) {
      const isOut = ray.g === 0 ? fr < 0.5 : fr >= 0.5;
      const ox = isOut ? ray.d[0] : 0, oy = isOut ? ray.d[1] : 0;
      for (const [c, r, i] of ray.cells) put(c + ox, r + oy, i);
    }

    // Cloud drifts two pixels each way over the loop
    const cdx = Math.round(2 * Math.sin(TAU * t / 6000));
    for (const [c, r, i] of D.cloud) put(c + cdx, r, i);

    // Sparkles twinkle out of step
    for (const [sc, sr, off] of D.spark) {
      const f = ((t + off) % 2000) / 2000;
      const arm = f < .5 ? 2 : f < .6 ? 1 : f < .7 ? 0 : f < .8 ? -1 : f < .9 ? 0 : 1;
      if (arm < 0) continue;
      put(sc, sr, 27);
      for (let k = 1; k <= arm; k++) {
        const col = (arm === 2 && k === 2) ? 25 : 6;
        put(sc + k, sr, col); put(sc - k, sr, col); put(sc, sr + k, col); put(sc, sr - k, col);
      }
    }

    // Sea streaks drift, kept inside the water
    for (const s of D.streaks) {
      const dx = Math.round(1.4 * Math.sin(TAU * t / 2000 + s.ph));
      for (const [c, r, i] of s.cells) {
        const x = c + dx;
        if (x >= 0 && x < GW && ocean[r * GW + x]) L[r * GW + x] = i;
      }
    }

    // Window glint sweeps once per loop
    if (t >= 3600 && t < 4500) {
      const k = 36 + ((t - 3600) / 900) * 52;
      for (let j = 0; j < N; j++) {
        if (!win[j]) continue;
        const v = (j % GW) + 0.7 * Math.floor(j / GW);
        if (Math.abs(v - k) < 1.0 || Math.abs(v - (k - 2.6)) < 0.45) L[j] = D.GLINT;
      }
    }

    // A bubble rises through the drink every two seconds
    const cyc = Math.floor(t / 2000), p = (t % 2000) / 2000;
    if (p < 0.6) {
      const row = 52 - Math.floor((p / 0.6) * 6);
      const col = [60, 61, 60][cyc % 3];
      const j = row * GW + col;
      if (liquid[j]) L[j] = D.BUBBLE;
    }

    // Flowers nod, kept inside their bushes
    for (const f of D.flowers) {
      const dx = Math.round(Math.sin(TAU * t / 3000 + f.ph));
      for (const [c, r, i] of f.cells) {
        const x = c + dx;
        if (x >= 0 && x < GW && (dx === 0 || bush[r * GW + x])) L[r * GW + x] = i;
      }
    }

    // Palm crown leans row by row: most at the top, a little flutter on the drooping fronds
    const sw = Math.sin(TAU * t / 3000);
    for (const [c, r, i] of D.crown) {
      const w = r <= PY ? Math.min(1, (PY + 2 - r) / 10) : 0.3 * Math.min(1, (r - PY) / 7);
      put(c + Math.round(sw * 2 * w), r, i);
    }

    for (let j = 0; j < N; j++) {
      const v = L[j], o = j * 4;
      if (v === 0) { out[o] = 0; out[o + 1] = 0; out[o + 2] = 0; out[o + 3] = 0; continue; }
      const c = PAL[v];
      out[o] = c[0]; out[o + 1] = c[1]; out[o + 2] = c[2]; out[o + 3] = 255;
    }
  }

  function draw(ctx, time, plate) {
    const t = ((time % LOOP) + LOOP) % LOOP;
    begin(ctx, W, H, plate);
    compose(t, pixels.data);
    gctx.putImageData(pixels, 0, 0);
    const [gx, gy, gw, gh] = D.grid;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(grid, gx, gy, gw, gh);
    ctx.imageSmoothingEnabled = true;
  }
  return { W, H, LOOP, ready: Promise.resolve(), draw };
}

// Tuesday Type: spinning globe, sunset dashes, sea streaks, boats, beacon, trail and palm.
function tuesdayType(D) {
  const W = D.W, H = D.H, LOOP = 6000;
  const list = [["crown", D.crown.src], ["sunL", D.sunL.src], ["sunR", D.sunR.src], ["sea", D.seaMask], ["pathClip", D.path.clip]];
  D.boats.forEach((b, i) => list.push(["boat" + i, b.src]));
  D.streaks.forEach((s, i) => list.push(["streak" + i, s.src]));
  D.beacon.forEach((b, i) => list.push(["beacon" + i, b.src]));
  const { imgs, ready } = loadImages(list);
  const off = makeCanvas(W, H);
  const octx = off.getContext("2d");

  const G = D.globe;
  const prof = (dy) => {
    const a = Math.abs(dy), xs = G.pdy, ys = G.poff, n = G.norm || 30;
    if (a <= xs[0]) return ys[0] / n;
    for (let i = 1; i < xs.length; i++) {
      if (a <= xs[i]) { const k = (a - xs[i - 1]) / (xs[i] - xs[i - 1]); return (ys[i - 1] + k * (ys[i] - ys[i - 1])) / n; }
    }
    return ys[ys.length - 1] / n;
  };
  const mix = (a, b, k) => "rgb(" + a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(",") + ")";

  function drawGlobe(ctx, t) {
    const cx = G.cx + 0.5, cy = G.cy + 0.5;
    ctx.save();
    ctx.beginPath(); ctx.ellipse(cx, cy, G.rx + 0.6, G.ry + 0.6, 0, 0, TAU); ctx.clip();
    ctx.lineWidth = G.lw; ctx.lineCap = "butt"; ctx.lineJoin = "round";
    const phi0 = (t / LOOP) * (Math.PI / 2); // 90 degrees per loop, 30 degree line spacing
    for (let k = -4; k <= 4; k++) {
      const phi = phi0 + k * Math.PI / 6;
      if (Math.cos(phi) <= 0) continue;
      const s = Math.sin(phi), as = Math.abs(s);
      if (as > 0.82) continue;
      const fade = as < 0.62 ? 0 : (as - 0.62) / 0.2;
      ctx.strokeStyle = mix(G.ink, G.fill, fade);
      ctx.beginPath();
      const SP = G.span || 59;
      for (let dy = -SP; dy <= SP; dy += 1) {
        const x = cx + G.amp * s * prof(dy), y = cy + dy;
        if (dy === -SP) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawSprite(ctx, key, s, dx, dy) { const im = imgs[key]; if (im) ctx.drawImage(im, s.x + dx, s.y + dy); }

  function drawPalm(ctx, t) {
    const im = imgs.crown; if (!im) return;
    const c = D.crown, pivot = D.crownPivot;
    const sw = Math.sin(TAU * t / 3000);
    for (let r = 0; r < c.h; r++) {
      const y = c.y + r;
      const w = y <= pivot ? Math.min(1, (pivot + 2 - y) / (D.swayH || 24)) : 0.35 * Math.min(1, (y - pivot) / 8);
      ctx.drawImage(im, 0, r, c.w, 1, c.x + sw * (D.sway || 2.6) * w, y, c.w, 1);
    }
  }

  function drawStreaks(t) {
    octx.clearRect(0, 0, W, H);
    D.streaks.forEach((s, i) => {
      const dx = (D.streakShift || 2.2) * Math.sin(TAU * t / 2000 + i * 1.7);
      drawSprite(octx, "streak" + i, s, dx, 0);
    });
    octx.globalCompositeOperation = "destination-in";
    if (imgs.sea) octx.drawImage(imgs.sea, 0, 0);
    octx.globalCompositeOperation = "source-over";
  }

  function drawPath(t) {
    const P = D.path;
    octx.clearRect(0, 0, W, H);
    const dash = P.dash || 6.5, gap = P.gap || 4.5, period = dash + gap;
    const shift = (t / 2000) * period;
    octx.strokeStyle = P.col; octx.lineWidth = P.w || 2.6; octx.lineCap = "round";
    P.lines.forEach((ln, li) => {
      const ox = P.c[0] + P.n[0] * ln.off + 0.5, oy = P.c[1] + P.n[1] * ln.off + 0.5;
      const start = ln.t0 - period + ((shift + li * 4.0) % period);
      octx.beginPath();
      for (let u = start; u < ln.t1; u += period) {
        const a = Math.max(u, ln.t0), b = Math.min(u + dash, ln.t1);
        if (b <= a) continue;
        octx.moveTo(ox + P.d[0] * a, oy + P.d[1] * a);
        octx.lineTo(ox + P.d[0] * b, oy + P.d[1] * b);
      }
      octx.stroke();
    });
    octx.globalCompositeOperation = "destination-in";
    if (imgs.pathClip) octx.drawImage(imgs.pathClip, 0, 0);
    octx.globalCompositeOperation = "source-over";
  }

  function draw(ctx, time, plate) {
    const t = ((time % LOOP) + LOOP) % LOOP;
    begin(ctx, W, H, plate);
    drawGlobe(ctx, t);
    // sun horizon dashes shimmer outwards and back
    const sh = 0.5 - 0.5 * Math.cos(TAU * t / 2000);
    const sa = D.sunShift || 2.4;
    drawSprite(ctx, "sunL", D.sunL, -sa * sh, 0);
    drawSprite(ctx, "sunR", D.sunR, sa * sh, 0);
    // sea light streaks drift, kept inside the water
    drawStreaks(t); ctx.drawImage(off, 0, 0);
    // boats bob
    D.boats.forEach((b, i) => drawSprite(ctx, "boat" + i, b, 0, Math.round(Math.sin(TAU * t / 3000 + i * 2.1) * (D.bob || 1.0))));
    // beacon above the mast: both on at rest, then blink in turn
    const p = (t % 1500) / 1500;
    if (D.beacon[0] && (p < 0.45 || p > 0.9)) drawSprite(ctx, "beacon0", D.beacon[0], 0, 0);
    if (D.beacon[1] && (p < 0.2 || p > 0.55)) drawSprite(ctx, "beacon1", D.beacon[1], 0, 0);
    // trail marches uphill
    drawPath(t); ctx.drawImage(off, 0, 0);
    drawPalm(ctx, t);
  }
  return { W, H, LOOP, ready, draw };
}

// Growth Lab: the last progress segments fill, the bars stretch up, the arrow pops, the flag waves.
function growthLab(D) {
  const W = D.W, H = D.H, LOOP = D.loop || 3000;
  const list = [["arrow", D.arrow.src], ["flag", D.flag.src]];
  D.bars.forEach((b, i) => list.push(["bar" + i, b.src]));
  D.sparks.forEach((s, i) => list.push(["spark" + i, s.src]));
  D.segs.forEach((s, i) => list.push(["seg" + i, s.src]));
  const { imgs, ready } = loadImages(list);
  const off = makeCanvas(W, H);
  const octx = off.getContext("2d");
  const bump = (t, start, dur) => { const p = (t - start) / dur; return p > 0 && p < 1 ? Math.sin(Math.PI * p) : 0; };

  // Starts at the artwork's lit segments, fills the last two, levels up, then drops back.
  const FULL = D.full || 11, BASE = D.segs.length, HIT = 700;
  function level(t) {
    if (t < 350) return BASE;
    if (t < 700) return Math.min(FULL, BASE + 1);
    if (t < 2550) return FULL;
    if (t < 2780) return Math.min(FULL, BASE + 1);
    return BASE;
  }

  function drawSegments(ctx, t) {
    const n = level(t);
    if (!n) return;
    const [sx0, sy0, sx1, sy1] = D.slot;
    octx.clearRect(0, 0, W, H);
    for (let i = 0; i < n; i++) {
      const src = i < D.segs.length ? i : D.segs.length - 1 - ((i - D.segs.length) % 2);
      const s = D.segs[src];
      const x = i < D.segs.length ? s.x : D.segX[D.segX.length - 1] + (i - D.segs.length) * D.pitch;
      if (imgs["seg" + src]) octx.drawImage(imgs["seg" + src], x, s.y);
    }
    // clip to the slot so the last segment stops at the end cap
    octx.globalCompositeOperation = "destination-in";
    octx.fillStyle = "#000";
    octx.fillRect(sx0, sy0, sx1 - sx0, sy1 - sy0);
    octx.globalCompositeOperation = "source-over";
    // level-up flash
    const flash = (t >= HIT && t < HIT + 140) || (t >= HIT + 300 && t < HIT + 440);
    if (flash) {
      octx.globalCompositeOperation = "source-atop";
      octx.fillStyle = "rgba(255,255,255,0.26)";
      octx.fillRect(sx0, sy0, sx1 - sx0, sy1 - sy0);
      octx.globalCompositeOperation = "source-over";
    }
    ctx.drawImage(off, 0, 0);
  }

  function drawBars(ctx, t) {
    D.bars.forEach((b, i) => {
      const d = Math.round((D.barLift || 7) * bump(t, HIT + i * 110, 420));
      const im = imgs["bar" + i];
      if (!d || !im) return;
      // three-slice stretch: top cap rises, bottom cap stays, the body stretches between
      const cap = 8, bodyH = b.h - 2 * cap;
      ctx.drawImage(im, 0, 0, b.w, cap, b.x, b.y - d, b.w, cap);
      ctx.drawImage(im, 0, cap, b.w, bodyH, b.x, b.y - d + cap, b.w, bodyH + d);
      ctx.drawImage(im, 0, b.h - cap, b.w, cap, b.x, b.y + b.h - cap, b.w, cap);
    });
  }

  function drawFlag(ctx, t) {
    const f = D.flag, im = imgs.flag; if (!im) return;
    for (let c = 0; c < f.w; c++) {
      const k = c / f.w;
      const dy = (D.wave || 1.6) * k * (Math.sin(TAU * t / 1000 - c * 0.35) - Math.sin(-c * 0.35));
      ctx.drawImage(im, c, 0, 1, f.h, f.x + c, f.y + dy, 1, f.h);
    }
  }

  function drawSparks(ctx, t) {
    D.sparks.forEach((s, i) => {
      const im = imgs["spark" + i]; if (!im) return;
      const ph = ((t + i * 610) % 1500) / 1500;
      // twinkle: shrink to a point, blink off, grow back
      const sc = ph < 0.6 ? 1 : ph < 0.72 ? 1 - (ph - 0.6) / 0.12 * 0.7 : ph < 0.8 ? 0 : ph < 0.92 ? 0.3 + (ph - 0.8) / 0.12 * 0.7 : 1;
      if (sc > 0) drawScaled(ctx, im, s, sc);
    });
  }

  function draw(ctx, time, plate) {
    const t = ((time % LOOP) + LOOP) % LOOP;
    begin(ctx, W, H, plate);
    drawFlag(ctx, t);
    drawSparks(ctx, t);
    drawBars(ctx, t);
    const hover = -(D.hover || 2) * (0.5 - 0.5 * Math.cos(TAU * t / 1500));
    const pop = -(D.pop || 4) * bump(t, HIT + 50, 480);
    if (imgs.arrow) ctx.drawImage(imgs.arrow, D.arrow.x, D.arrow.y + Math.round(hover + pop));
    drawSegments(ctx, t);
  }
  return { W, H, LOOP, ready, draw };
}

// HECS Debt Calculator: keys type a number, it flashes on equals, the skyline lights flicker.
function hecs(D) {
  const W = D.W, H = D.H, LOOP = 4000;
  const list = [];
  D.sparks.forEach((s, i) => list.push(["spark" + i, s.src]));
  D.keys.forEach((k, i) => list.push(["key" + i, k.src]));
  const { imgs, ready } = loadImages(list);
  // 3 x 5 pixel digits
  const FONT = {
    "0": ["111", "101", "101", "101", "111"], "1": ["010", "110", "010", "010", "111"], "2": ["111", "001", "111", "100", "111"],
    "3": ["111", "001", "111", "001", "111"], "4": ["101", "101", "111", "001", "001"], "5": ["111", "100", "111", "001", "111"],
    "6": ["111", "100", "111", "101", "111"], "7": ["111", "001", "010", "010", "010"], "8": ["111", "101", "111", "101", "111"],
    "9": ["111", "101", "111", "001", "111"],
  };
  // key index on the 3 x 3 pad (row major) and the digit it types, laid out like a calculator: 7 8 9 / 4 5 6 / 1 2 3
  const PADDIGIT = [7, 8, 9, 4, 5, 6, 1, 2, 3];
  const PRESSES = [[400, 6], [800, 7], [1200, 4], [1600, 4]]; // 1, 2, 5, 5
  const EQUALS = [2050, 8]; // bottom right key
  function typed(t) {
    if (t >= 3450) return "";
    let s = "";
    for (const [at, k] of PRESSES) if (t >= at + 60) s += String(PADDIGIT[k]);
    return s;
  }
  function drawDigits(ctx, s, alpha) {
    if (!s) return;
    const [x0, y0, w, h] = D.display, u = 2, cw = 3 * u, gap = 2;
    const total = s.length * cw + (s.length - 1) * gap;
    let x = x0 + w - 4 - total;
    const y = y0 + Math.round((h - 5 * u) / 2);
    ctx.globalAlpha = alpha; ctx.fillStyle = D.ink;
    for (const ch of s) {
      const g = FONT[ch];
      for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) if (g[r][c] === "1") ctx.fillRect(x + c * u, y + r * u, u, u);
      x += cw + gap;
    }
    ctx.globalAlpha = 1;
  }
  function pressAmount(t, at) { const p = (t - at) / 220; return p > 0 && p < 1 ? (p < 0.35 ? p / 0.35 : 1 - (p - 0.35) / 0.65) : 0; }
  function drawKeys(ctx, t) {
    const all = PRESSES.concat([EQUALS]);
    D.keys.forEach((k, i) => {
      let a = 0;
      for (const [at, idx] of all) if (idx === i) a = Math.max(a, pressAmount(t, at));
      if (a <= 0 || !imgs["key" + i]) return;
      const d = Math.round(2 * a);
      ctx.fillStyle = D.bodyCol; ctx.fillRect(k.x, k.y, k.w, d + 1);
      ctx.drawImage(imgs["key" + i], k.x, k.y + d);
      ctx.globalAlpha = a; ctx.fillStyle = D.lit;
      ctx.fillRect(k.cx, k.cy + d, k.cw, k.ch);
      ctx.globalAlpha = 1;
    });
  }
  function drawDisplay(ctx, t) {
    const s = typed(t);
    // after equals, the number blinks twice, then holds, then clears
    let alpha = 1;
    if (t >= 2120 && t < 2780) {
      alpha = Math.floor((t - 2120) / 165) % 2 === 0 ? 0.15 : 1;
      const [x0, y0, w, h] = D.display;
      ctx.globalAlpha = 0.35; ctx.fillStyle = D.lit; ctx.fillRect(x0, y0, w, h); ctx.globalAlpha = 1;
    }
    drawDigits(ctx, s, alpha);
    // blinking cursor while the display is empty
    if (!s && t > 250 && Math.floor(t / 400) % 2 === 1) {
      const [x0, y0, w, h] = D.display;
      ctx.fillStyle = D.ink; ctx.fillRect(x0 + w - 10, y0 + h - 4, 6, 2);
    }
  }
  function drawSparks(ctx, t) {
    D.sparks.forEach((s, i) => {
      const im = imgs["spark" + i]; if (!im) return;
      const ph = ((t + i * 530) % 2000) / 2000;
      const sc = ph < 0.55 ? 1 : ph < 0.68 ? 1 - (ph - 0.55) / 0.13 * 0.7 : ph < 0.78 ? 0 : ph < 0.9 ? 0.3 + (ph - 0.78) / 0.12 * 0.7 : 1;
      if (sc > 0) drawScaled(ctx, im, s, sc);
    });
  }
  function drawCity(ctx, t) {
    // window lights flick on and off on their own rhythm
    D.windows.forEach(([x, y], i) => {
      const per = [2000, 4000, 1000][i % 3], ph = ((t + i * 373) % per) / per;
      if (ph < 0.5) return;
      ctx.globalAlpha = 0.85; ctx.fillStyle = "#E9FFF9"; ctx.fillRect(x, y, 4, 5);
    });
    ctx.globalAlpha = 1;
    // antenna beacons blink in turn
    D.beacons.forEach(([x, y], i) => {
      const ph = ((t + i * 500) % 1000) / 1000;
      if (ph > 0.35) return;
      ctx.fillStyle = "#F84878"; ctx.fillRect(x - 1, y - 1, 3, 3);
      ctx.globalAlpha = 0.35; ctx.fillRect(x - 2, y - 2, 5, 5); ctx.globalAlpha = 1;
    });
  }
  function draw(ctx, time, plate) {
    const t = ((time % LOOP) + LOOP) % LOOP;
    begin(ctx, W, H, plate);
    drawCity(ctx, t);
    drawSparks(ctx, t);
    drawKeys(ctx, t);
    drawDisplay(ctx, t);
  }
  return { W, H, LOOP, ready, draw };
}

const ENGINES = { "your-number": yourNumber, "tuesday-type": tuesdayType, "growth-lab": growthLab, hecs };

// Builds the scene for one motion file. Returns null for an engine this build does not know.
export function createLabelMotion(file) {
  const make = ENGINES[file.engine];
  if (!make) return null;
  const [, , w, h] = file.region;
  return make(file.data, w, h);
}
