"use client";

import { AnimatedCartridge } from "./AnimatedCartridge";
import styles from "./BigGamePlaybookSection.module.css";

const CARTRIDGE = {
  src: "/assets/cartridges/big-game-playbook-cartridge-atn-cutout-v1.webp",
  motion: "/assets/cartridges/motion/big-game-playbook-label-motion-v1.json",
  width: 772,
  height: 1121,
};

export function BigGamePlaybookSection({ onOpen }) {
  return (
    <section className={styles.section} aria-labelledby="bgp-product-title" data-bgp-review-section>
      <div className={styles.scene}>
        <div className={styles.copy}>
          <h2 id="bgp-product-title" className={styles.head}>
            <span className={styles.srOnly}>Big Game Playbook. </span>
            No idea what<br className={styles.mobileBreak} />{" "}you want<br className={styles.desktopBreak} />{" "}to do<br className={styles.mobileBreak} />{" "}with your life?
            <span className={styles.accent}>This is for you.</span>
          </h2>
          <p className={styles.sub}>The life you want.<br />A plan to build it.</p>
          <p className={styles.teaser}>Pick the life you&rsquo;d love. Work out what it could cost. Find work you&rsquo;d enjoy that could pay for it, and build your plan to get there.</p>
          <div className={styles.cta}>
            <a className={styles.button} href="/big-game-playbook" aria-haspopup="dialog" aria-controls="loaded-module" onClick={(event) => {
              if (!onOpen || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
              event.preventDefault();
              onOpen(event);
            }}>See how it works <span aria-hidden="true">&#8594;</span></a>
          </div>
        </div>
        <div className={styles.hero}>
          <AnimatedCartridge
            className={styles.cartridge}
            src={CARTRIDGE.src}
            motion={CARTRIDGE.motion}
            width={CARTRIDGE.width}
            height={CARTRIDGE.height}
            alt="The Big Game Playbook cartridge"
          />
        </div>
      </div>
    </section>
  );
}
