"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimatedCartridge } from "./AnimatedCartridge";
import styles from "./BigGamePlaybookSection.module.css";

const CARTRIDGE = {
  src: "/assets/cartridges/big-game-playbook-cartridge-atn-cutout-v1.webp",
  motion: "/assets/cartridges/motion/big-game-playbook-label-motion-v1.json",
  width: 772,
  height: 1121,
};

// The playbook picture. Swapping the image means updating its file, size, alt text and the tag
// positions below (percent of the picture, measured from its top left corner). On desktop the
// picture fills the right of the card edge to edge; `zoom` crops into the desk around the book.
const PICTURE = {
  src: "/assets/bgp-section/playbook-brought-to-life-v2.webp",
  width: 1254,
  height: 1254,
  zoom: 1.04,
  alt: "An open playbook of photos: friends laughing over lunch on a terrace above the sea, relaxing at home, hiking the coast, a young man pitching his idea to an engaged team, and the same young man focused on his laptop in a city apartment",
};
// `y` places a tag from the top of the picture; `yb` places it from the bottom instead.
const STEPS = [
  { text: "The life I actually want", x: 19.5, y: 11.4, w: 60 },
  { text: "Who I need to become", x: 9.2, yb: 13.6, w: 39 },
  { text: "How I’ll get there", x: 52.6, yb: 13.3, w: 39 },
];

export function BigGamePlaybookSection({ onOpen }) {
  const scene = useRef(null);

  // Enhancement only: everything renders in place. With motion allowed, the brand bars rise and
  // the tags pop in one after another the first time the section comes into view.
  useEffect(() => {
    const el = scene.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = el.getBoundingClientRect();
    if (box.top < innerHeight && box.bottom > 0) return;
    el.dataset.anim = "ready";
    const seen = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      el.dataset.anim = "play";
      seen.disconnect();
    }, { threshold: 0.3 });
    seen.observe(el);
    return () => seen.disconnect();
  }, []);

  return (
    <section className={styles.section} aria-labelledby="bgp-product-title" data-bgp-review-section>
      <div ref={scene} className={styles.scene}>
        <h2 id="bgp-product-title" className={styles.head}><span className={styles.srOnly}>Big Game Playbook. </span>No idea what you want to do with your life?<br /><span className={styles.accent}>This is for you.</span></h2>
        <div className={styles.hero}>
          <div className={styles.flag} aria-hidden="true"><i /><i /><i /><i /></div>
          <AnimatedCartridge
            className={styles.cartridge}
            src={CARTRIDGE.src}
            motion={CARTRIDGE.motion}
            width={CARTRIDGE.width}
            height={CARTRIDGE.height}
            alt="The Big Game Playbook cartridge"
          />
        </div>
        <div className={styles.lede}>
          <p className={styles.sub}>The life you want.<br />A plan to build it.</p>
          <p>Design the life you’d love, discover who you’ll need to become and what it really takes, then go and get it.</p>
        </div>
        <figure className={styles.picture} style={{ "--pic-ratio": PICTURE.width / PICTURE.height, "--pic-zoom": PICTURE.zoom }}>
          <div className={styles.pictureInner}>
            <Image src={PICTURE.src} alt={PICTURE.alt} width={PICTURE.width} height={PICTURE.height} unoptimized />
            <ol className={styles.tags}>
              {STEPS.map((step, i) => (
                <li key={step.text} style={{ "--x": `${step.x}%`, "--w": `${step.w}%`, "--d": `${i * 180}ms`, ...(step.yb === undefined ? { "--y": `${step.y}%` } : { "--yb": `${step.yb}%` }) }}>
                  <span className={styles.tagNo} aria-hidden="true">{`0${i + 1}`}</span>
                  {step.text}
                </li>
              ))}
            </ol>
          </div>
        </figure>
        <div className={styles.cta}>
          <button type="button" className={styles.button} onClick={onOpen} aria-haspopup="dialog" aria-controls="loaded-module" data-bgp-open>Explore the Playbook <span aria-hidden="true">&#8594;</span></button>
          <noscript><a href="/big-game-playbook">Open Big Game Playbook private preview</a></noscript>
        </div>
      </div>
    </section>
  );
}
