// Original deterministic synthesis: a dry latch impact with a short chassis tail.
// No recording, external sample, network request or third-party licence required.
export function cartridgeClickSamples(sampleRate) {
  const samples = new Float32Array(Math.ceil(sampleRate * 0.065));
  let seed = 0x4d423031;
  let previousNoise = 0;
  let peak = 0;
  for (let i = 0; i < samples.length; i++) {
    const t = i / sampleRate;
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const noise = seed / 2147483648 - 1;
    const texture = noise - previousNoise * 0.72;
    previousNoise = noise;
    const attack = Math.min(1, t / 0.0007);
    const latch = texture * Math.exp(-t / 0.0034) * 0.56;
    const body = Math.sin(2 * Math.PI * 245 * t) * Math.exp(-t / 0.012) * 0.5;
    const spring = Math.sin(2 * Math.PI * 1780 * t) * Math.exp(-t / 0.005) * 0.13;
    const tail = Math.max(0, Math.min(1, (0.065 - t) / 0.008));
    samples[i] = (latch + body + spring) * attack * tail;
    peak = Math.max(peak, Math.abs(samples[i]));
  }
  for (let i = 0; i < samples.length; i++) samples[i] *= 0.22 / peak;
  return samples;
}
