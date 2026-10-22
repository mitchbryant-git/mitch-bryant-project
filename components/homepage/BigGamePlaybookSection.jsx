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
// positions below (percent of the picture, measured from its top left corner).
const PICTURE = {
  src: "/assets/bgp-section/playbook-interim-v1.webp",
  width: 1200,
  height: 1200,
  alt: "A playbook brought to life: friends sharing a long lunch, someone building at a workbench, and a train trip along the coast",
};
const STEPS = [
  { text: "The life I actually want", x: 3, y: 3.5, w: 90 },
  { text: "Who I need to become", x: 2.6, y: 61.4, w: 45 },
  { text: "How I’ll get there", x: 52.2, y: 61.4, w: 45 },
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
        <AnimatedCartridge
          className={styles.cartridge}
          src={CARTRIDGE.src}
          motion={CARTRIDGE.motion}
          width={CARTRIDGE.width}
          height={CARTRIDGE.height}
          alt="The Big Game Playbook cartridge"
        />
        <div className={styles.copy}>
          <h2 id="bgp-product-title"><span className={styles.srOnly}>Big Game Playbook. </span>The life you want.<br />A plan to build it.</h2>
          <p>Explore the life you truly want, find out what it takes and who you’ll need to become, then start moving in the right direction.</p>
        </div>
        <figure ref={picture} className={styles.picture}>
          <Image src={PICTURE.src} alt={PICTURE.alt} width={PICTURE.width} height={PICTURE.height} unoptimized />
          <ol className={styles.tags}>
            {STEPS.map((step, i) => (
              <li key={step.text} style={{ "--x": `${step.x}%`, "--y": `${step.y}%`, "--w": `${step.w}%`, "--d": `${i * 180}ms` }}>
                <span className={styles.tagNo} aria-hidden="true">{`0${i + 1}`}</span>
                {step.text}
              </li>
            ))}
          </ol>
        </figure>
        <div className={styles.cta}>
          <button type="button" className={styles.button} onClick={onOpen} aria-haspopup="dialog" aria-controls="loaded-module" data-bgp-open>Explore the Playbook <span aria-hidden="true">&#8594;</span></button>
          <p className={styles.access}>Private preview. Access is for invited ATN accounts.</p>
          <noscript><a href="/big-game-playbook">Open Big Game Playbook private preview</a></noscript>
        </div>
      </div>
    </section>
  );
}
