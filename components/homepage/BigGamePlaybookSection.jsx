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

const LIFE_PICTURE = ["coastal-home", "people-life", "craft-life"];

// An example playbook, in the app's own language. Illustrative, not a real person's plan.
function ExamplePlaybook({ board }) {
  return (
    <figure ref={board} className={styles.board} aria-labelledby="bgp-example-title">
      <figcaption className={styles.boardHead}>
        <span id="bgp-example-title">Example playbook</span>
        <span className={styles.boardTag}>Room to change</span>
      </figcaption>
      <ol className={styles.steps}>
        <li className={styles.step}>
          <span className={styles.stepNo} aria-hidden="true">01</span>
          <h4>My life picture</h4>
          <p>A place, people, work you’re proud of.</p>
          <div className={styles.thumbs} aria-hidden="true">
            {LIFE_PICTURE.map((name) => (
              <Image key={name} src={`/assets/bgp-section/life-picture-${name}-v1.webp`} alt="" width={360} height={240} unoptimized />
            ))}
          </div>
        </li>
        <li className={styles.step}>
          <span className={styles.stepNo} aria-hidden="true">02</span>
          <h4>Who I’m becoming</h4>
          <p>Practise becoming more like yourself.</p>
          <ul className={styles.chips}>
            <li>Share my ideas</li>
            <li>Back my work</li>
            <li>Ask for help</li>
          </ul>
        </li>
        <li className={styles.step}>
          <span className={styles.stepNo} aria-hidden="true">03</span>
          <h4>What it would take</h4>
          <p>The money, time and skills it needs.</p>
          <ul className={styles.meters} aria-hidden="true">
            <li style={{ "--v": 0.72, "--d": "0ms" }}><span>Money</span><i /></li>
            <li style={{ "--v": 0.56, "--d": "140ms" }}><span>Time</span><i /></li>
            <li style={{ "--v": 0.4, "--d": "280ms" }}><span>Skills</span><i /></li>
          </ul>
        </li>
        <li className={styles.step}>
          <span className={styles.stepNo} aria-hidden="true">04</span>
          <h4>My direction</h4>
          <p>A 90-day focus that keeps you moving.</p>
          <ul className={styles.moves}>
            <li data-done style={{ "--d": "500ms" }}><span className={styles.srOnly}>Done: </span>Try a one-day creative workshop</li>
            <li data-done style={{ "--d": "900ms" }}><span className={styles.srOnly}>Done: </span>Ask a designer about their week</li>
            <li><span className={styles.srOnly}>Next: </span>Share an idea before it’s perfect</li>
          </ul>
        </li>
      </ol>
    </figure>
  );
}

export function BigGamePlaybookSection({ onOpen }) {
  const board = useRef(null);

  // Enhancement only: the board renders complete. With motion allowed, the meters fill and the
  // ticks land once, the first time the board comes into view.
  useEffect(() => {
    const el = board.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = el.getBoundingClientRect();
    if (box.top < innerHeight && box.bottom > 0) return;
    el.dataset.anim = "ready";
    const seen = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      el.dataset.anim = "play";
      seen.disconnect();
    }, { threshold: 0.35 });
    seen.observe(el);
    return () => seen.disconnect();
  }, []);

  return (
    <section className={styles.section} aria-labelledby="bgp-product-title" data-bgp-review-section>
      <div className={styles.scene}>
        <div className={styles.top}>
          <div className={styles.bars} aria-hidden="true"><span /><span /><span /><span /></div>
          <h2 id="bgp-product-title" className={styles.product}>Big Game Playbook</h2>
          <h3>The life you want.<br />A plan to build it.</h3>
          <p>Explore the life you truly want, find out what it takes and who you’ll need to become, then start moving in the right direction.</p>
        </div>
        <div className={styles.visual}>
          <ExamplePlaybook board={board} />
          <AnimatedCartridge
            className={styles.cartridge}
            src={CARTRIDGE.src}
            motion={CARTRIDGE.motion}
            width={CARTRIDGE.width}
            height={CARTRIDGE.height}
            alt="The Big Game Playbook cartridge"
          />
        </div>
        <div className={styles.cta}>
          <button type="button" className={styles.button} onClick={onOpen} aria-haspopup="dialog" aria-controls="loaded-module" data-bgp-open>Explore the Playbook <span aria-hidden="true">&#8594;</span></button>
          <p className={styles.access}>Private preview. Access is for invited ATN accounts.</p>
          <noscript><a href="/big-game-playbook">Open Big Game Playbook private preview</a></noscript>
        </div>
      </div>
    </section>
  );
}
