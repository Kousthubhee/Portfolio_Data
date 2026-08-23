import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../lib/hooks";

const pad = (n: number) => String(n).padStart(2, "0");

const SCENES: [string, string][] = [
  ["top", "SC.01 — THE SURFACE"],
  ["about", "SC.02 — THE DESCENT"],
  ["currents", "SC.03 — THE CURRENTS"],
  ["expeditions", "SC.04 — THE EXPEDITIONS"],
  ["numbers", "SC.05 — THE LEDGER"],
  ["process", "SC.06 — THE METHOD"],
  ["notes", "SC.07 — POSTCARDS FROM THE FIELD"],
  ["contact", "SC.08 — THE FINAL SIGNAL"],
];

/* Live SMPTE-style timecode + letterbox bars that retract once the film rolls */
export function CinemaChrome() {
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
    if (!reduced) tick();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const barH = barsOpen ? "h-[7vh] min-h-10" : "h-0";
  const label = barsOpen ? "opacity-100" : "opacity-0";

  return (
    <>
      {/* top letterbox bar */}
      <div
        className={`fixed top-0 inset-x-0 z-[65] overflow-hidden bg-abyss transition-all duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${barH}`}
        aria-hidden
      >
        <div className={`h-full px-5 sm:px-8 flex items-center justify-between font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-seafoam/80 transition-opacity duration-300 ${label}`}>
          <span className="flex items-center gap-2.5">
            <span className="rec-dot inline-block w-2 h-2 rounded-full bg-coral" />
            REC <span className="text-shell/90 tabular-nums">{tc}</span>
          </span>
          <span className="hidden sm:block text-shell/70">marina vela — a portfolio in five scenes</span>
          <span className="text-gold">2.39:1 · warm grade</span>
        </div>
      </div>

      {/* bottom letterbox bar */}
      <div
        className={`fixed bottom-0 inset-x-0 z-[65] overflow-hidden bg-abyss transition-all duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${barH}`}
        aria-hidden
      >
        <div className={`h-full px-5 sm:px-8 flex items-center justify-between font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-seafoam/80 transition-opacity duration-300 ${label}`}>
          <span>shot on location — the atlantic dataset</span>
          <span className="hidden sm:block text-shell/70">colour: sunrise coral / glacier aqua</span>
          <span>cam A · 24 fps</span>
        </div>
      </div>

      {/* persistent timecode once bars retract */}
      <div
        className={`fixed left-4 sm:left-6 z-40 flex items-center gap-2 rounded-full bg-abyss/85 px-3.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-seafoam backdrop-blur-sm transition-all duration-700 ${
          barsOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ bottom: barsOpen ? "calc(7vh + 12px)" : "14px" }}
        aria-hidden
      >
        <span className="rec-dot inline-block w-1.5 h-1.5 rounded-full bg-coral" />
        <span className="tabular-nums text-shell/90">{tc}</span>
        <span className="text-seafoam/60">· 24fps</span>
      </div>
    </>
  );
}

/* Scene stamp — crossfades as you scroll through the film */
export function SceneStamp() {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const els = SCENES.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = SCENES.findIndex(([id]) => id === e.target.id);
            if (idx >= 0) setScene(idx);
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none" aria-hidden>
      <div
        key={scene}
        className="stamp-swap flex items-center gap-3 rounded-full border border-shell/25 bg-abyss/80 px-5 py-2 font-mono text-[9.5px] sm:text-[10.5px] uppercase text-shell/90 backdrop-blur-sm shadow-[0_10px_30px_rgba(7,35,39,0.35)] whitespace-nowrap"
      >
        <span className="text-coral">◉</span>
        {SCENES[scene][1]}
        <span className="text-seafoam/50 tabular-nums">{pad(scene + 1)}/08</span>
      </div>
    </div>
  );
}

/* Lens vignette + projector flicker + sprockets */
export function Vignette() {
  return <div className="vignette fixed inset-0 z-[55] pointer-events-none" aria-hidden />;
}

export function FilmFlicker() {
  return <div className="film-flicker fixed inset-0 z-[54] pointer-events-none" aria-hidden />;
}

export function Sprockets() {
  return <div className="sprockets relative z-10" aria-hidden />;
}
