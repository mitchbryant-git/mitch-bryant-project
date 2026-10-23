"use client";

import Image from "next/image";
import { BigGameInsertion } from "./BigGameInsertion";
import { useEffect, useRef, useState } from "react";
import { modules } from "@/config/modules";
import { moduleMotion } from "@/config/module-motion";
import { moduleFraming } from "@/config/module-framing";
import { useModuleInsertion } from "./useModuleInsertion";
import { useCartridgeSound } from "./useCartridgeSound";
import { BigGamePlaybookSection } from "./BigGamePlaybookSection";
import { AnimatedCartridge } from "./AnimatedCartridge";
import styles from "./ModuleBay.module.css";

const presentation = [
  { id: "tuesday-type", colour: "blue", question: ["What kind of life", "feels like me?"], description: ["Picture your ideal days. Discover your natural edge", "and find a direction to test."], action: "Find my direction", open: "Open Tuesday Type", width: 1208, height: 1302 },
  { id: "dream-life", colour: "purple", question: ["What could", "my life cost?"], description: ["Build the life you want. See what it could cost", "and the income that could support it."], action: "Work out my number", open: "Open Your Number", width: 1208, height: 1302 },
  { id: "help", colour: "mint", question: ["When could", "my debt be gone?"], description: ["See how income and life changes could shift", "your HECS repayment date."], action: "Explore my repayments", open: "Open HECS Debt Calculator", width: 1187, height: 1280 },
  { id: "growth-lab", colour: "orange", question: ["How do I turn a plan", "into progress?"], description: ["Choose one useful move today.", "Build evidence that you’re moving forward."], action: "Invited? Open your lab", open: "Sign in to Growth Lab", width: 1208, height: 1302 },
  { id: "big-game", colour: "yellow", question: ["The life you want.", "A plan to build it."], description: ["Your life. Your choices. Your next move.", "Connect your whole life with a practical plan."], action: "Explore the Playbook", open: "Open Big Game Playbook", width: 1200, height: 900 },
].map((item) => ({ ...modules.find((module) => module.id === item.id), ...item }));

export function ModuleBay() {
  const [selectedId, setSelectedId] = useState(null);
  const dialog = useRef(null);
  const backButton = useRef(null);
  const originButton = useRef(null);
  const opening = useRef(false);
  const pointerOpening = useRef(false);
  const openedAt = useRef(0);
  const art = useRef(null);
  const status = useRef(null);
  const sound = useCartridgeSound();
  const { start: startInsertion, stop: stopInsertion } = useModuleInsertion(dialog, art, status, sound.sync, sound.cancel);
  const selected = presentation.find((module) => module.id === selectedId) ?? presentation[0];
  const frame = moduleFraming.modules[selected.id];

  useEffect(() => {
    if (!selectedId) return;
    const panel = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.dataset.inputModality = pointerOpening.current ? "pointer" : "keyboard";
    if (!panel.open) panel.showModal();
    panel.scrollTop = 0;
    backButton.current?.focus({ preventScroll: true });
    status.current.textContent = `${presentation.find((module) => module.id === selectedId).name} console preview selected.`;
    if (selectedId !== "big-game") startInsertion(selectedId, presentation.find((module) => module.id === selectedId).name);
    return () => {
      stopInsertion("closed");
      document.body.style.overflow = previousOverflow;
      if (panel.open) panel.close();
    };
  }, [selectedId, startInsertion, stopInsertion]);

  function selectModule(module, event) {
    if (opening.current || dialog.current.open) return;
    opening.current = true;
    openedAt.current = performance.now();
    pointerOpening.current = event.detail > 0;
    originButton.current = event.currentTarget;
    sound.arm(event.nativeEvent);
    setSelectedId(module.id);
  }

  function returnToCartridges() {
    // Ignore a queued close event from a previous run after an immediate reopen.
    if (dialog.current?.open) return;
    stopInsertion("closed");
    opening.current = false;
    setSelectedId(null);
    originButton.current?.focus({ preventScroll: true });
    status.current.textContent = "Cartridges ready. Choose your next move.";
  }

  function closePreview() {
    dialog.current?.close();
    returnToCartridges();
  }

  function keepFocusInside(event) {
    if (["Tab", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      dialog.current.dataset.inputModality = "keyboard";
    }
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
      <BigGamePlaybookSection onOpen={(event) => selectModule(presentation.find((item) => item.id === "big-game"), event)} />
      <svg width="0" height="0" className={styles.clipDefinitions} aria-hidden="true" focusable="false">
        <defs>{Object.entries(moduleMotion).filter(([,config])=>config.enabled!==false).map(([id, config]) => (
          <clipPath key={id} id={`module-internal-${id}`} clipPathUnits="objectBoundingBox">
            <path d={config.occlusion.corridor} transform={`scale(${1 / config.canvas.width} ${1 / config.canvas.height})`} />
            <path d={config.occlusion.screen} transform={`scale(${1 / config.canvas.width} ${1 / config.canvas.height})`} />
          </clipPath>
        ))}</defs>
      </svg>
      <h2 className={styles.sectionLabel} id="module-heading">Choose your next move</h2>
      <div className={styles.grid}>
        {presentation.filter((module)=>module.id!=="big-game").map((module) => (
          <article
            className={styles.card}
            style={{ "--accent": `var(--${module.colour})` }}
            key={module.id}
            data-scroll-card
          >
            <div className={styles.artStage} data-module={module.id}>
              <AnimatedCartridge className={styles.cartridgeArt} src={module.cartridgeImage} motion={module.cartridgeMotion} alt={`Original ${module.name} cartridge`} width={module.width} height={module.height} />
            </div>
            <div className={styles.copy}>
              <h3>{module.question[0]}<br />{module.question[1]}</h3>
              <p>{module.description[0]}<br className={styles.desktopBreak} />{" "}{module.description[1]}</p>
              <button
                type="button"
                className={`${styles.selectButton} ${module.colour === "blue" || module.colour === "purple" ? styles.lightText : ""}`}
                data-module={module.id}
                data-module-select
                aria-haspopup="dialog"
                aria-controls="loaded-module"
                onClick={(event) => selectModule(module, event)}
              >{module.action}</button>
              <noscript><a className={`${styles.selectButton} ${module.colour === "blue" || module.colour === "purple" ? styles.lightText : ""}`} href={module.href}>{module.action}</a></noscript>
            </div>
          </article>
        ))}
      </div>
      <noscript><style>{"[data-module-select] { display: none !important; }"}</style></noscript>
      <span ref={status} className={styles.status} role="status" aria-live="polite" />
      <dialog
        ref={dialog}
        id="loaded-module"
        className={styles.dialog}
        style={{ "--accent": `var(--${selected.colour})` }}
        aria-labelledby="loaded-question"
        aria-describedby={["growth-lab","big-game"].includes(selected.id) ? "loaded-description access-note" : "loaded-description"}
        onClose={returnToCartridges}
        onCancel={(event) => { event.preventDefault(); closePreview(); }}
        onKeyDown={keepFocusInside}
        onPointerDown={() => { dialog.current.dataset.inputModality = "pointer"; }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          // A rapid second activation can land on the newly opened backdrop.
          // Keep that same opening gesture from immediately dismissing BGP.
          if (selected.id === "big-game" && performance.now() - openedAt.current < 350) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closePreview();
        }}
      >
        <div className={styles.viewerTop} data-viewer-controls>
          <button ref={backButton} className={styles.backButton} type="button" onClick={closePreview}><span aria-hidden="true">&#8592;</span> Back to Modules</button>
          <button className={styles.closeButton} type="button" aria-label="Close loaded console preview" onClick={closePreview}>&#215;</button>
        </div>
        <div className={styles.viewerBody}>
          <div ref={art} className={styles.loadedArt} data-module-stage data-preview-module={selected.id}>
            {selectedId === "big-game" ? <BigGameInsertion dialog={dialog} art={art} status={status} syncSound={sound.sync} cancelSound={sound.cancel} /> : <>
            <Image id="loaded-image" className={styles.loadedStill} src={moduleMotion[selected.id].fallback} alt={`${selected.name} cartridge loaded into the ATN-01 Life Console`} width={1280} height={960} unoptimized />
            <div className={styles.sourcePlane} data-source-plane style={{
              width: `${frame.scale * 100}%`,
              aspectRatio: `${frame.sourceCanvas.width} / ${frame.sourceCanvas.height}`,
              left: `${frame.translateX / moduleFraming.stage.width * 100}%`,
              top: `calc((${frame.translateY} - var(--stage-crop, 0)) * var(--stage-unit, 0px))`,
              "--internal-clip": `url(#module-internal-${selected.id})`,
            }}>
              {Object.entries(moduleMotion).filter(([,config])=>config.enabled!==false).map(([moduleId, config]) => <div key={moduleId} className={styles.consoleMotion} data-module-motion={moduleId} aria-hidden="true">
                {Object.entries(config.layers).map(([layer, source]) => {
                  const generated = ["base", "foreground", "foregroundBack"].includes(layer);
                  const transform = config.generatedBaseTransform;
                  const image = <Image key={layer} src={source} data-console-layer={layer} alt="" width={generated ? 1448 : config.canvas.width} height={generated ? 1086 : config.canvas.height} unoptimized draggable={false} loading="eager" style={generated ? {
                    inset: "auto",
                    left: `${transform.x / config.canvas.width * 100}%`,
                    top: `${transform.y / config.canvas.height * 100}%`,
                    width: `${transform.scale * 100}%`,
                    height: `${transform.height / config.canvas.height * transform.scale * 100}%`,
                  } : undefined} />;
                  return layer === "foreground" || layer === "foregroundBack" ? <div key={layer} className={styles.internalOcclusion}>{image}</div> : image;
                })}
              </div>)}
            </div>
            </>}
          </div>
          <div className={styles.loadedCopy}>
            <h3 id="loaded-question">{selected.question.join(" ")}</h3>
            <p id="loaded-description">{selected.description.join(" ")}</p>
            {selected.id === "growth-lab" ? <p id="access-note" className={styles.accessNote}>Private beta. Access is for invited accounts.</p> : selected.id === "big-game" ? <p id="access-note" className={styles.accessNote}>Private preview. Access is for invited ATN accounts.</p> : null}
            <a id="open-module" className={`${styles.openButton} ${selected.colour === "blue" || selected.colour === "purple" ? styles.lightText : ""}`} href={selected.href} target="_blank" rel="noopener noreferrer" onClick={sound.cancel}>{selected.open} <span aria-hidden="true">&#8599;</span></a>
          </div>
        </div>
      </dialog>
    </section>
  );
}
