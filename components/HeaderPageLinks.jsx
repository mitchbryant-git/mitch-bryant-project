"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./HeaderPageLinks.module.css";

export function HeaderPageLinks({ currentPage }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const root = useRef(null);
  const trigger = useRef(null);

  useEffect(() => {
    if (!expanded) return;
    const closeAndReturnFocus = () => {
      setExpanded(false);
      trigger.current?.focus();
    };
    const onOutsideClick = (event) => {
      if (!root.current?.contains(event.target)) closeAndReturnFocus();
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAndReturnFocus();
      }
    };
    document.addEventListener("click", onOutsideClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onOutsideClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  return (
    <div className={styles.root} ref={root} onBlur={(event) => {
      if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
    }}>
      <button
        type="button"
        ref={trigger}
        className={styles.trigger}
        aria-label="About and life after school navigation"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((value) => !value)}
      >
        <span className="colour-bars colour-bars--compact" aria-hidden="true">
          {["blue", "mint", "pink", "yellow"].map((colour) => <span key={colour} className={`colour-bar colour-bar--${colour}`} />)}
        </span>
      </button>
      <nav id={panelId} className={styles.panel} aria-label="About and life after school" hidden={!expanded}>
        <a href="/about" aria-current={currentPage === "about" ? "page" : undefined} onClick={() => setExpanded(false)}>About</a>
        <a href="/life-after-school" aria-current={currentPage === "life-after-school" ? "page" : undefined} onClick={() => setExpanded(false)}>Life after school</a>
      </nav>
    </div>
  );
}
