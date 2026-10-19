import { ATN_LOGO } from '@/config/brand';
import Image from "next/image";
import Link from "next/link";
import styles from "./SiteEnding.module.css";

export function ClosingCTA() {
  return (
    <section className={styles.closing} aria-labelledby="closing-heading">
      <div className={styles.closingLayout}>
        <div><h2 id="closing-heading">You don’t need your<br className={styles.desktopBreak} /> whole life figured out.</h2><p>Just somewhere to start.</p></div>
        <a className={styles.primary} href="#modules">Choose your next move <span aria-hidden="true">&#8593;</span></a>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLayout}>
        <Link className={styles.brand} href="/" aria-label="All That’s Next home"><Image src={ATN_LOGO} unoptimized alt="All That’s Next" width={1651} height={324} sizes="235px" /></Link>
        <nav className={styles.linkGroup} aria-label="Explore"><h2>Explore</h2><a href="/about">About</a><a href="/life-after-school">Life after school</a></nav>
        <nav className={styles.linkGroup} aria-label="Tools"><h2>Tools</h2><a href="/tuesday-type">Tuesday Type</a><a href="/your-number">Your Number</a><a href="/hecs-debt-calculator">HECS Debt Calculator</a><a href="/growth-lab">Growth Lab</a></nav>
        <nav className={styles.linkGroup} aria-label="Keep in touch"><h2>Keep in touch</h2><a href="https://www.tiktok.com/@itsmitchbryant">TikTok</a><a href="https://www.instagram.com/itsmitchbryant">Instagram</a><a href="mailto:hello@mitchbryant.com">Email Mitch</a></nav>
      </div>
      <div className={styles.footerBase}><small>&copy; {new Date().getFullYear()} All That’s Next</small></div>
    </footer>
  );
}
