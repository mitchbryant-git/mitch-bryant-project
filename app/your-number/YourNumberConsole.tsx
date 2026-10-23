'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { attachHeroDepth } from './heroDepth';
import styles from './DreamLifeCalculator.module.css';

export default function YourNumberConsole() {
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const image = imageRef.current;
    const hero = image?.closest('section');
    if (!image || !(hero instanceof HTMLElement)) return;
    return attachHeroDepth(hero, image);
  }, []);
  return (
    <div className={styles.depthStage}>
      <Image ref={imageRef} className={styles.depthConsole}
        src="/assets/console/your-number-header/atn01-your-number-console-transparent-2026-10-23.png"
        data-fallback="/assets/console/your-number-header/atn01-your-number-console-transparent-2026-10-23.png"
        alt="Your Number cartridge loaded into the ATN-01 Life Console"
        width={1536} height={1152} priority unoptimized draggable={false} />
    </div>
  );
}
