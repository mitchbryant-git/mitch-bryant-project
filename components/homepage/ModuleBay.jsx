"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { modules } from "@/config/modules";

export function ModuleBay() {
  const [selectedId, setSelectedId] = useState("dream-life");
  const [loadState, setLoadState] = useState("idle");
  const loadTimer = useRef(null);
  const selected = modules.find((module) => module.id === selectedId) ?? modules[0];

  useEffect(() => {
    setLoadState("idle");
    window.clearTimeout(loadTimer.current);
  }, [selectedId]);

  useEffect(() => () => window.clearTimeout(loadTimer.current), []);

  function loadSelectedModule() {
    setLoadState("loading");
    loadTimer.current = window.setTimeout(() => setLoadState("ready"), 900);
  }

  const previewImage = loadState === "ready" ? selected.image : selected.cartridgeImage;
  const previewAlt =
    loadState === "ready"
      ? `${selected.name} cartridge loaded into the MB-01 Life Console`
      : `${selected.name} cartridge`;

  return (
    <section className="module-section" id="modules">
      <h2 className="visually-hidden">Life Console modules</h2>

      <div className="module-bay">
        <div className="module-selector" role="tablist" aria-label="Life Console modules">
          {modules.map((module, index) => {
            const active = module.id === selectedId;

            return (
              <button
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="module-preview"
                id={`module-tab-${module.id}`}
                className={`module-option module-option--${module.accent}${active ? " is-active" : ""}`}
                key={module.id}
                onClick={() => setSelectedId(module.id)}
              >
                <span className="module-option__visual">
                  <Image
                    src={module.cartridgeImage}
                    alt=""
                    width={1200}
                    height={900}
                    sizes="(max-width: 640px) 46vw, (max-width: 900px) 22vw, 220px"
                    className={`module-option__image${module.cartridgeFit === "contain" ? " module-option__image--contain" : ""}`}
                  />
                </span>

                <span className="module-option__meta">
                  <span className="module-option__number">0{index + 1}</span>
                  <span className={`module-status module-status--${module.statusTone}`}>{module.status}</span>
                  <span className="module-option__copy">
                    <strong>{module.name}</strong>
                    <small>{module.detail}</small>
                  </span>
                </span>
              </button>
            );
          })}

        </div>

        <div
          className={`module-preview module-preview--${selected.accent}`}
          id="module-preview"
          role="tabpanel"
          aria-labelledby={`module-tab-${selected.id}`}
          aria-live="polite"
          tabIndex={0}
        >
          <div className="module-preview__topline">
            <span>{selected.shortCode}</span>
            <span>{loadState === "ready" ? "Module ready" : selected.status}</span>
          </div>

          <div className={`module-preview__image-shell module-preview__image-shell--${loadState}`}>
            <Image
              key={previewImage}
              src={previewImage}
              alt={previewAlt}
              width={1280}
              height={loadState === "ready" ? 653 : 960}
              sizes="(max-width: 900px) 94vw, 58vw"
              priority
              className={`module-preview__image module-preview__image--${loadState}${
                loadState !== "ready" && selected.cartridgeFit === "contain"
                  ? " module-preview__image--contain"
                  : ""
              }`}
            />
            {loadState === "loading" ? (
              <span className="module-preview__loading">Inserting module…</span>
            ) : null}
          </div>

          <div className="module-preview__footer">
            <div>
              <p className="equipment-label equipment-label--dark">Selected module</p>
              <h3>{selected.name}</h3>
              <p>{selected.description}</p>
            </div>

            {selected.href && loadState === "ready" ? (
              <a className="button button--primary" href={selected.href} target="_blank" rel="noreferrer">
                Open module <span aria-hidden="true">↗</span>
              </a>
            ) : selected.href ? (
              <button
                className="button button--primary"
                type="button"
                onClick={loadSelectedModule}
                disabled={loadState === "loading"}
              >
                {loadState === "loading" ? "Loading…" : "Load module"}
              </button>
            ) : (
              <span className="module-preview__unavailable">Not available yet</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
