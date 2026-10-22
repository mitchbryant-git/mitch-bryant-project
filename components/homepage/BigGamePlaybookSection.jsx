"use client";

import styles from "./BigGamePlaybookSection.module.css";

// Review-only: a verified corrected scene path must be supplied explicitly.
// Never silently pick the old MB scene from Downloads or display flattened UI.
export function BigGamePlaybookSection({ onOpen, artwork = null }) {
  return <section className={styles.section} aria-labelledby="bgp-product-title" data-bgp-review-section>
    <div className={styles.scene}>
      {artwork ? <img className={styles.artwork} src={artwork} alt="Illustrative playbook connecting life choices, money, time and a next action" width="1586" height="992" /> :
        <div className={styles.missingArt} role="note"><strong>Local review: artwork pending</strong><p>The corrected ATN scene has not been supplied. The old MB artwork is deliberately excluded.</p></div>}
      <div className={styles.copy}>
        <div className={styles.bars} aria-hidden="true"><span/><span/><span/><span/></div>
        <h2 id="bgp-product-title" className={styles.product}>Big Game Playbook</h2>
        <h3>The life you want.<br/>A plan to build it.</h3>
        <p>Your life. Your choices. Your next move.</p>
        <button type="button" className={styles.button} onClick={onOpen} aria-haspopup="dialog" aria-controls="loaded-module" data-bgp-open>Explore the Playbook <span aria-hidden="true">&#8594;</span></button>
        <p className={styles.access}>Private preview. Access is for invited ATN accounts.</p>
        <noscript><a href="/big-game-playbook">Open Big Game Playbook private preview</a></noscript>
      </div>
    </div>
  </section>;
}
