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
  src: "/assets/bgp-section/playbook-brought-to-life-v1.webp",
  width: 1254,
  height: 1254,
  zoom: 1.04,
  alt: "An open playbook with three photos: friends laughing over lunch on a terrace above the sea, a young woman shaping clay in a bright studio, and a young man with a notebook smiling out of a train window at the coast",
};
const STEPS = [
  { text: "The life I actually want", x: 15, y: 12.1, w: 60 },
  { text: "Who I need to become", x: 9.3, y: 51, w: 39 },
  { text: "How I’ll get there", x: 52.8, y: 51.5, w: 39 },
];

export function BigGamePlaybookSection({ onOpen }) {
  const picture = useRef(null);

  // Enhancement only: the tags render in place. With motion allowed, they pop in one after
  // another the first time the picture comes into view.
  useEffect(() => {
    const el = picture.current;
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
      <div className={styles.scene}>
        <h2 id="bgp-product-title" className={styles.head}><span className={styles.srOnly}>Big Game Playbook. </span>The life you want.<br />A plan to build it.</h2>
        <AnimatedCartridge
          className={styles.cartridge}
          src={CARTRIDGE.src}
          motion={CARTRIDGE.motion}
          width={CARTRIDGE.width}
          height={CARTRIDGE.height}
          alt="The Big Game Playbook cartridge"
        />
        <p className={styles.lede}>
          <strong>No idea what you want to do with your life? That’s the best place to start.</strong>
          Design the life you’d love, discover who you’ll need to become and what it really takes, then get a plan you can start on this week.
        </p>
        <figure ref={picture} className={styles.picture} style={{ "--pic-ratio": PICTURE.width / PICTURE.height, "--pic-zoom": PICTURE.zoom }}>
          <div className={styles.pictureInner}>
            <Image src={PICTURE.src} alt={PICTURE.alt} width={PICTURE.width} height={PICTURE.height} unoptimized />
            <ol className={styles.tags}>
              {STEPS.map((step, i) => (
                <li key={step.text} style={{ "--x": `${step.x}%`, "--y": `${step.y}%`, "--w": `${step.w}%`, "--d": `${i * 180}ms` }}>
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
