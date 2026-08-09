"use client";

import Image from "next/image";
import { useState } from "react";
import { modules } from "@/config/modules";

export function ModuleBay() {
  const [selectedId, setSelectedId] = useState("help");
  const selected = modules.find((module) => module.id === selectedId) ?? modules[0];

  return (
    <section className="module-section" id="modules">
      <div className="section-intro">
        <p className="equipment-label equipment-label--dark">Module library</p>
        <h2>Pick a cartridge. Make a move.</h2>
        <p>
          Each module tackles one part of the future. Some are ready now. The others stay honestly labelled
          until they are worth using.
        </p>
      </div>

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
                <span className="module-option__number">0{index + 1}</span>
                <span className="module-option__copy">
                  <strong>{module.name}</strong>
                  <small>{module.detail}</small>
                </span>
                <span className={`module-status module-status--${module.statusTone}`}>{module.status}</span>
              </button>
            );
          })}

          <a className="built-in-utility" href="/dream-life-calculator">
            <span className="built-in-utility__icon" aria-hidden="true">⌁</span>
            <span>
              <small>Built-in utility // Live</small>
              <strong>Dream Life Calculator</strong>
              <span>Price the lifestyle before you pick the career.</span>
            </span>
            <span aria-hidden="true">→</span>
          </a>
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
            <span>{selected.status}</span>
          </div>

          <div className="module-preview__image-shell">
            <Image
              key={selected.image}
              src={selected.image}
              alt={`${selected.name} cartridge loaded into the MB-01 Life Console`}
              width={1280}
              height={653}
              sizes="(max-width: 900px) 94vw, 58vw"
              className="module-preview__image"
            />
          </div>

          <div className="module-preview__footer">
            <div>
              <p className="equipment-label equipment-label--dark">Selected module</p>
              <h3>{selected.name}</h3>
              <p>{selected.description}</p>
            </div>

            {selected.href ? (
              <a className="button button--primary" href={selected.href}>
                {selected.action} <span aria-hidden="true">→</span>
              </a>
            ) : (
              <span className="module-preview__unavailable">Not available yet</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
