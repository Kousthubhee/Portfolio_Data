import { useEffect, useState } from "react";

const SCENES: [string, string][] = [
  ["top", "SC.01 — THE ORIGIN · HYD"],
  ["about", "SC.02 — A NON-LINEAR JOURNEY"],
  ["journey", "SC.03 — INDIA → FRANCE → INDIA"],
  ["experience", "SC.04 — THE LOGBOOK"],
  ["projects", "SC.05 — FIELD WORK · 5 PROJECTS"],
  ["skills", "SC.06 — INSTRUMENTS & AUTOMATIONS"],
  ["next", "SC.07 — THE NEXT CHAPTER"],
  ["contact", "SC.08 — THE FINAL SIGNAL"],
];

/* Scene slate stamp that crossfades as you scroll through the acts */
export function SceneStamp() {
  const [idx, setIdx] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const measure = () =>
      SCENES.map(([id]) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top : Infinity;
      });
    const onScroll = () => {
      const tops = measure();
      let cur = 0;
      for (let i = 0; i < tops.length; i++) if (tops[i] < window.innerHeight * 0.55) cur = i;
      setIdx((prev) => {
        if (prev !== cur) {
          setKey((k) => k + 1);
          return cur;
        }
        return prev;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      key={key}
      className="anim-stamp fixed bottom-16 sm:bottom-20 left-4 sm:left-7 z-[55] pointer-events-none font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.28em] text-ink/55 bg-shell/70 backdrop-blur-sm border border-ink/10 rounded-md px-3 py-1.5 shadow-sm"
    >
      {SCENES[idx][1]}
    </div>
  );
}

/* lens vignette + faint projector flicker */
export function Vignette() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[62] anim-flicker" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[61]"
        style={{ background: "radial-gradient(120% 92% at 50% 40%, transparent 58%, rgba(7,35,39,0.22) 100%)" }}
      />
    </>
  );
}
