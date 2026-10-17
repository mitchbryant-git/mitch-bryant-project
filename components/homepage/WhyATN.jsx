import styles from "./WhyATN.module.css";

export function WhyATN() {
  return (
    <section className={styles.section} id="why" aria-labelledby="why-heading">
      <span id="founder" className={styles.anchor} aria-hidden="true" />
      <div className={styles.definitionBand}>
        <div className={styles.definitionLayout}>
          <h2 id="why-heading">Why<br /> All That’s Next?</h2>
          <p>“All that’s next” means <strong>everything still ahead:</strong> the choices you’ll make, the experiences you’ll have, the person you’ll become and the life you’ll build.</p>
        </div>
      </div>
      <div className={styles.missionContent}>
        <div className={styles.philosophy}>
          <h3>Your future is more<br /> than a job title.</h3>
          <p>You’re choosing how you’ll spend your days, what matters to you and who you want to become. You deserve a way to explore that before committing years to a path.</p>
        </div>
        <div className={styles.approach} id="method" aria-labelledby="approach-heading" data-scroll-approach>
          <h3 id="approach-heading">Start with the life.<br /> Work backwards.</h3>
          <div className={styles.principles}>
            <article className={styles.picture}><span className={styles.connectorSegment} data-connector-segment aria-hidden="true"><span /></span><span className={styles.marker} data-approach-marker aria-hidden="true" /><h4>Picture it.</h4><p>What would a great ordinary Tuesday look like for you?</p></article>
            <article className={styles.price}><span className={styles.connectorSegment} data-connector-segment aria-hidden="true"><span /></span><span className={styles.marker} data-approach-marker aria-hidden="true" /><h4>Price it.</h4><p>What would that life cost, and what could support it?</p></article>
            <article className={styles.test}><span className={styles.connectorSegment} data-connector-segment aria-hidden="true"><span /></span><span className={styles.marker} data-approach-marker aria-hidden="true" /><h4>Test it.</h4><p>Try a direction in real life. Use what you learn to choose your next move.</p></article>
          </div>
        </div>
        <div className={styles.personalNote}>
          <p>I built this because I chose a career before asking what the life would feel like. These are the tools I wish I’d had at 17.</p>
          <a href="/about">My story <span aria-hidden="true">&#8599;</span></a>
        </div>
      </div>
    </section>
  );
}
