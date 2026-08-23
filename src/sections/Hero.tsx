import { Reveal } from "../components/Chrome";

const CORNERS = [
  "top-6 left-5 sm:left-8 border-t-2 border-l-2",
  "top-6 right-5 sm:right-8 border-t-2 border-r-2",
  "bottom-8 left-5 sm:left-8 border-b-2 border-l-2",
  "bottom-8 right-5 sm:right-8 border-b-2 border-r-2",
];

function SlateCard() {
  return (
    <div className="hidden sm:block w-56 -rotate-2 rounded-lg overflow-hidden bg-abyss text-shell shadow-[0_18px_44px_rgba(7,35,39,0.4)] transition-transform duration-500 hover:rotate-0 hover:-translate-y-1">
      <div className="clapper h-4" />
      <div className="px-4 py-3 font-mono text-[10px] leading-relaxed tracking-[0.08em]">
        <div className="flex justify-between gap-2 border-b border-shell/15 pb-1.5 mb-1.5">
          <span className="text-shell/55">PROD</span>
          <span>marina.vela</span>
        </div>
        <div className="grid grid-cols-3 gap-1 text-center">
          <div>
            <div className="text-shell/55">SCENE</div>
            <div className="font-semibold text-gold">01</div>
          </div>
          <div>
            <div className="text-shell/55">TAKE</div>
            <div className="font-semibold text-coral">03</div>
          </div>
          <div>
            <div className="text-shell/55">ROLL</div>
            <div className="font-semibold text-aqua">A-007</div>
          </div>
        </div>
        <div className="mt-1.5 pt-1.5 border-t border-shell/15 text-shell/60 text-center">
          the surface · 24 fps · 2.39:1
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* viewfinder corner ticks */}
      {CORNERS.map((c) => (
        <span key={c} className={`absolute z-20 w-6 h-6 border-ink/30 ${c}`} aria-hidden />
      ))}

      {/* ---- the title card ---- */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-12">
        <Reveal delay={200}>
          <p className="flex items-center gap-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.42em] text-ink/70">
            <span className="h-px w-10 sm:w-16 bg-ink/40" />
            marina vela pictures presents
            <span className="h-px w-10 sm:w-16 bg-ink/40" />
          </p>
        </Reveal>

        <h1 className="mt-7 sm:mt-9 font-display font-extrabold leading-[0.9] text-ink select-none title-glow">
          <span className="title-in block text-[clamp(3rem,10.5vw,8.4rem)]" style={{ animationDelay: "0.45s" }}>
            WARM WATERS,
          </span>
          <span className="title-in block text-[clamp(3rem,10.5vw,8.4rem)] text-teal" style={{ animationDelay: "0.85s" }}>
            CLEAR SIGNALS<span className="text-coral">.</span>
          </span>
        </h1>

        <Reveal delay={1350}>
          <p className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed text-ink/75">
            a data analyst in five scenes — starring <span className="font-semibold text-teal">SQL</span>,{" "}
            <span className="font-semibold text-coral">Python</span> and an unreasonable love of clean joins
          </p>
        </Reveal>

        <Reveal delay={1550}>
          <p className="mt-4 font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.26em] text-ink/50 leading-relaxed">
            written by raw data · directed by stakeholders · edited at golden hour
            <br className="hidden sm:block" />
            <span className="hidden sm:inline">shot on location across 4.2M rows a day</span>
            <span className="sm:hidden">shot on location · 4.2M rows / day</span>
          </p>
        </Reveal>

        <Reveal delay={1750}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#expeditions"
              className="btn-wave group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 font-display font-semibold text-shell"
            >
              <svg viewBox="0 0 20 20" className="w-4 h-4 transition-transform duration-300 group-hover:scale-125" aria-hidden>
                <path d="M6 4.5v11l9-5.5z" fill="currentColor" />
              </svg>
              watch the expeditions
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 bg-shell/40 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/70 backdrop-blur-sm hover:border-coral hover:text-coral transition-colors"
            >
              send a signal
            </a>
          </div>
        </Reveal>

        <Reveal delay={1950}>
          <p className="mt-9 font-mono text-[10.5px] uppercase tracking-[0.3em] text-teal">
            starring <span className="text-ink font-semibold">marina vela</span> · data analyst · lisboa
          </p>
        </Reveal>
      </div>

      {/* ---- bottom: slate card + roll cue ---- */}
      <div className="relative z-10 px-6 sm:px-12 pb-14 flex items-end justify-between gap-6">
        <Reveal delay={2100} variant="pop">
          <SlateCard />
        </Reveal>
        <Reveal delay={2200} className="ml-auto">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/60">
            <span>roll the film</span>
            <span className="relative block h-12 w-[2px] bg-ink/15 overflow-hidden">
              <span className="dive-line absolute inset-0 bg-coral" />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
