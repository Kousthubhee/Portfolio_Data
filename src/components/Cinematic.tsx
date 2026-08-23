import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../lib/hooks";

const pad = (n: number) => String(n).padStart(2, "0");

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

/* Live SMPTE-style timecode + letterbox bars that retract once the film rolls */
export function Letterbox() {
  const reduced = usePrefersReducedMotion();
  const [barsOpen, setBarsOpen] = useState(true);
  const [tc, setTc] = useState("00:00:00:00");

  useEffect(() => {
    const onScroll = () => setBarsOpen(window.scrollY < 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    let frame = 0;
    const t0 = performance.now();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (++frame % 2 === 0) return;
      const el = (performance.now() - t0) / 1000;
      const h = Math.floor(el / 3600);
      const m = Math.floor(el / 60) % 60;
      const s = Math.floor(el) % 60;
      const f = Math.floor((el % 1) * 24);
      setTc(`${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`);
    };
    if (!reduced) raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const barCls =
    "transition-transform duration-[1100ms] ease-[cubic-bezier(0.76,0,0.24,1)] " +
    (barsOpen ? "translate-y-0" : "-translate-y-full");
  const barClsB =
    "transition-transform duration-[1100ms] ease-[cubic-bezier(0.76,0,0.24,1)] " +
    (barsOpen ? "translate-y-0" : "translate-y-full");

  return (
    <>
      <div aria-hidden className={`fixed top-0 inset-x-0 z-[60] h-[7vh] min-h-[44px] bg-abyss ${barCls}`}>
        <div className="h-full flex items-center justify-between px-4 sm:px-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.26em] text-mist/50">
          <span>shot on location — hyderabad · rouen · everywhere</span>
          <span className="hidden md:inline text-mist/35">an open-to-relocation picture</span>
        </div>
      </div>
      <div aria-hidden className={`fixed bottom-0 inset-x-0 z-[60] h-[7vh] min-h-[44px] bg-abyss ${barClsB}`}>
        <div className="h-full flex items-center justify-between px-4 sm:px-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.26em] text-mist/50">
          <span className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-coral animate-blink" />
            rec · {reduced ? "00:00:00:00" : tc}
          </span>
          <span className="hidden sm:inline">kousthubhee krishna kotte — a data &amp; BI analyst picture</span>
        </div>
      </div>
      {/* persistent mini timecode chip once the bars retract */}
      {!barsOpen && (
        <div className="fixed bottom-4 right-4 z-[60] flex items-center gap-2 rounded-full bg-abyss/80 backdrop-blur px-3.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-mist/70 border border-mist/10">
          <span className="w-1.5 h-1.5 rounded-full bg-coral animate-blink" />
          {reduced ? "still" : tc}
        </div>
      )}
    </>
  );
}

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
