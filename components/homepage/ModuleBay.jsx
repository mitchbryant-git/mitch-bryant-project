"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { modules } from "@/config/modules";
import styles from "./ModuleBay.module.css";

const presentation = [
  { id: "tuesday-type", colour: "blue", question: ["What kind of life", "feels like me?"], description: ["Picture your ideal days. Discover your natural edge", "and find a direction to test."], action: "Find my direction", open: "Open Tuesday Type", width: 1200, height: 900 },
  { id: "dream-life", colour: "purple", question: ["What could", "my life cost?"], description: ["Build the life you want. See what it could cost", "and the income that could support it."], action: "Work out my number", open: "Open Your Number", width: 1280, height: 960 },
  { id: "help", colour: "mint", question: ["When could", "my debt be gone?"], description: ["See how income and life changes could shift", "your HECS repayment date."], action: "Explore my repayments", open: "Open HECS Debt Calculator", width: 1187, height: 1280 },
  { id: "growth-lab", colour: "orange", question: ["How do I turn a plan", "into progress?"], description: ["Choose one useful move today.", "Build evidence that you’re moving forward."], action: "Invited? Open your lab", open: "Sign in to Growth Lab", width: 1280, height: 853 },
].map((item) => ({ ...modules.find((module) => module.id === item.id), ...item }));

export function ModuleBay() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectingId, setSelectingId] = useState(null);
  const dialog = useRef(null);
  const backButton = useRef(null);
  const originButton = useRef(null);
  const timer = useRef(null);
  const selected = presentation.find((module) => module.id === selectedId) ?? presentation[0];

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (!selectedId) return;
    const panel = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!panel.open) panel.showModal();
    backButton.current?.focus();
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selectedId]);

  function selectModule(module, button) {
    window.clearTimeout(timer.current);
    originButton.current = button;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSelectedId(module.id);
      return;
    }
    setSelectingId(module.id);
    timer.current = window.setTimeout(() => {
      setSelectedId(module.id);
      setSelectingId(null);
    }, 160);
  }

  function returnToCartridges() {
    setSelectedId(null);
    originButton.current?.focus({ preventScroll: true });
  }

  function keepFocusInside(event) {
    if (event.key !== "Tab") return;
    const controls = [...dialog.current.querySelectorAll("button:not([disabled]),a[href]")];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <section className={styles.modules} id="modules" aria-labelledby="module-heading">
      <h2 className={styles.sectionLabel} id="module-heading">Choose your next move</h2>
      <div className={styles.grid}>
        {presentation.map((module) => (
          <article
            className={`${styles.card} ${selectingId === module.id ? styles.selecting : ""}`}
            style={{ "--accent": `var(--${module.colour})` }}
            key={module.id}
          >
            <div className={styles.artStage} data-module={module.id}>
              <Image src={module.cartridgeImage} alt={`Original ${module.name} cartridge`} width={module.width} height={module.height} unoptimized className={styles.cartridge} />
            </div>
            <div className={styles.copy}>
              <h3>{module.question[0]}<br />{module.question[1]}</h3>
              <p>{module.description[0]}<br className={styles.desktopBreak} />{" "}{module.description[1]}</p>
              <button
                type="button"
                className={`${styles.selectButton} ${module.colour === "blue" || module.colour === "purple" ? styles.lightText : ""}`}
                data-module={module.id}
                aria-haspopup="dialog"
                aria-controls="loaded-module"
                onClick={(event) => selectModule(module, event.currentTarget)}
              >{module.action}</button>
            </div>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        id="loaded-module"
        className={styles.dialog}
        style={{ "--accent": `var(--${selected.colour})` }}
        aria-labelledby="loaded-question"
        aria-describedby={selected.id === "growth-lab" ? "loaded-description access-note" : "loaded-description"}
        onClose={returnToCartridges}
        onKeyDown={keepFocusInside}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.current.close();
        }}
      >
        <div className={styles.viewerTop}>
          <button ref={backButton} className={styles.backButton} type="button" onClick={() => dialog.current.close()}><span aria-hidden="true">&#8592;</span> Back to cartridges</button>
          <button className={styles.closeButton} type="button" aria-label="Close loaded console preview" onClick={() => dialog.current.close()}>&#215;</button>
        </div>
        <div className={styles.viewerBody}>
          <div className={styles.loadedArt}>
            <Image id="loaded-image" src={selected.image} alt={`${selected.name} cartridge loaded into the original MB-01 Life Console`} width={1280} height={selected.imageHeight ?? 653} unoptimized />
          </div>
          <div className={styles.loadedCopy}>
            <h3 id="loaded-question">{selected.question.join(" ")}</h3>
            <p id="loaded-description">{selected.description.join(" ")}</p>
            {selected.id === "growth-lab" ? <p id="access-note" className={styles.accessNote}>Private beta. Access is for invited accounts.</p> : null}
            <a id="open-module" className={`${styles.openButton} ${selected.colour === "blue" || selected.colour === "purple" ? styles.lightText : ""}`} href={selected.href} target="_blank" rel="noopener noreferrer">{selected.open} <span aria-hidden="true">&#8599;</span></a>
          </div>
        </div>
      </dialog>
    </section>
  );
}
