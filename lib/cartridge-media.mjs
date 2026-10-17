import { cartridgeClickSamples } from './cartridge-click.mjs';

export const SEAT_MS = 840;
export const WAKE_DELAY_MS = 720;
export const WAKE_MS = 280;
export const START_LIMIT_MS = 120;

// One finite soundtrack: the insertion's lead-in, then the original 65ms click.
// This is the actual effect, not a silent track used to unlock another audio API.
export function cartridgeWave(leadMs = SEAT_MS) {
  const rate = 48000;
  const click = cartridgeClickSamples(rate);
  const lead = Math.round(rate * leadMs / 1000);
  const bytes = new ArrayBuffer(44 + (lead + click.length) * 2);
  const view = new DataView(bytes);
  const word = (offset, text) => [...text].forEach((c, i) => view.setUint8(offset + i, c.charCodeAt(0)));
  word(0, 'RIFF'); view.setUint32(4, bytes.byteLength - 8, true); word(8, 'WAVE');
  word(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true);
  view.setUint16(22, 1, true); view.setUint32(24, rate, true); view.setUint32(28, rate * 2, true);
  view.setUint16(32, 2, true); view.setUint16(34, 16, true); word(36, 'data');
  view.setUint32(40, (lead + click.length) * 2, true);
  click.forEach((sample, i) => view.setInt16(44 + (lead + i) * 2, Math.round(sample * 32767), true));
  return new Blob([bytes], { type: 'audio/wav' });
}

export function createCartridgeMedia(report = () => {}, source = '/assets/audio/cartridge-insertion.wav') {
  let media, active;
  let disposed = false;
  const emit = (event, detail = {}) => report({event, at: performance.now(), ...detail});
  const prepare = () => {
    if (disposed || media) return;
    media = new Audio(source);
    media.preload = 'auto';
    media.load();
  };
  const release = (run, reason) => {
    if (active !== run) return;
    active = null;
    clearTimeout(run.deadline);
    cancelAnimationFrame(run.frame);
    run.listeners.abort();
    // A cancelled/blocked sound cannot hold the otherwise independent animation.
    if (run.following) for (const animation of run.animations) {
      if (reason === 'ended' && animation.playState !== 'finished') {
        const end = animation.effect.getComputedTiming().endTime;
        animation.currentTime = Math.min(media.currentTime * 1000, end);
        if (media.currentTime * 1000 >= end) animation.finish();
      }
      if (animation.playState === 'paused') animation.play();
    }
    emit(reason, {mediaTime: media.currentTime});
  };
  const cancel = () => {
    if (active) release(active, 'cancelled');
    if (media) { media.pause(); try { media.currentTime = 0; } catch {} }
  };
  const follow = (run) => {
    if (active !== run || !run.started || !run.animations.length || run.following) return;
    run.following = true;
    run.animations.forEach(animation => animation.pause());
    let lastClock = media.currentTime, lastAdvance = performance.now();
    const frame = () => {
      if (active !== run) return;
      const clock = media.currentTime;
      if (clock !== lastClock) { lastClock = clock; lastAdvance = performance.now(); }
      if (performance.now() - lastAdvance > START_LIMIT_MS) { cancel(); return; }
      const time = clock * 1000;
      run.animations.forEach(animation => {
        const end = animation.effect.getComputedTiming().endTime;
        if (animation.playState === 'finished') return;
        if (time >= end) animation.finish();
        else animation.currentTime = time;
      });
      emit('frame', {mediaMs: time, animationMs: run.animations[0].currentTime});
      run.frame = requestAnimationFrame(frame);
    };
    frame();
  };
  const arm = (event) => {
    cancel();
    if (disposed || !event?.isTrusted || document.hidden || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      prepare();
      const run = {listeners: new AbortController(), animations: [], following: false, started: false};
      active = run;
      const options = {signal: run.listeners.signal};
      const started = () => {
        if (active !== run || run.started) return;
        run.started = true;
        clearTimeout(run.deadline);
        emit('playing', {mediaTime: media.currentTime});
        follow(run);
      };
      media.addEventListener('playing', started, options);
      media.addEventListener('ended', () => release(run, 'ended'), options);
      media.addEventListener('error', cancel, options);
      media.addEventListener('pause', () => { if (active === run && media.paused && !media.ended) cancel(); }, options);
      for (const name of ['waiting', 'stalled']) media.addEventListener(name, () => { if (run.started && media.readyState < 3) cancel(); }, options);
      run.deadline = setTimeout(() => { if (active === run && !run.started) cancel(); }, START_LIMIT_MS);
      // Call play synchronously in the same trusted activation that opens the modal.
      emit('play-request', {trusted: event.isTrusted, userActivation: navigator.userActivation?.isActive});
      const playback = media.play();
      playback?.then(started).catch(() => { if (active === run) cancel(); });
    } catch { cancel(); }
  };
  const sync = (...animations) => {
    if (!active) return;
    active.animations = animations;
    follow(active);
  };
  const dispose = () => {
    cancel(); disposed = true;
    if (media) { media.removeAttribute('src'); media.load(); }
    media = null;
  };
  return {prepare, arm, sync, cancel, dispose};
}
