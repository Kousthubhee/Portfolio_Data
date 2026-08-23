import { useCountUp, useScramble } from "../lib/hooks";
import { Reveal } from "../components/Chrome";

function StatChip({
  value,
  decimals = 0,
  suffix,
  label,
  delay,
}: {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const { ref, text } = useCountUp(value, { decimals, duration: 1900 });
  return (
    <Reveal delay={delay} variant="pop">
      <div className="group flex items-baseline gap-2 rounded-xl border border-ink/10 bg-shell/75 backdrop-blur-sm px-4 py-3 shadow-[0_8px_30px_rgba(13,59,64,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-coral/50 hover:shadow-[0_14px_36px_rgba(255,122,104,0.16)]">
        <span ref={ref} className="font-display font-bold text-2xl sm:text-3xl text-ink tabular-nums">
          {text}
        </span>
        <span className="font-display font-bold text-lg text-coral">{suffix}</span>
        <span className="ml-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-ink/55 leading-tight">
          {label}
        </span>
      </div>
    </Reveal>
  );
}

/* rotating circular badge */
function OrbitBadge() {
  return (
    <div className="relative w-36 h-36 sm:w-44 sm:h-44">
      <svg viewBox="0 0 100 100" className="w-full h-full spin-slow text-teal" aria-hidden>
        <defs>
          <path id="orbit" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="font-mono" fontSize="8.2" letterSpacing="2.6" fill="currentColor">
          <textPath href="#orbit">DATA ANALYST · STORYTELLER · NAVIGATOR ·</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-shell/80 border border-teal/25 shadow-[0_10px_30px_rgba(13,59,64,0.14)] flex items-center justify-center bob">
          <svg viewBox="0 0 40 40" className="w-9 h-9 text-coral" aria-hidden>
            <path d="M4 26c4-6 7-6 10.5 0s6.5 6 10 0 5.5-5 9-1" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M9 17c3-4.5 5.5-4.5 8 0s5 4.5 7.5 0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
            <circle cx="30" cy="10" r="2.4" fill="#f2b544" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SonarPulse() {
  return (
    <div className="relative w-24 h-24" aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-teal/50">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" opacity="0.7" />
      </svg>
      <span className="sonar-ring absolute inset-3 rounded-full border-2 border-coral/70" />
      <span className="sonar-ring r2 absolute inset-3 rounded-full border-2 border-aqua/70" />
      <span className="sonar-ring r3 absolute inset-3 rounded-full border-2 border-gold/70" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-coral" />
    </div>
  );
}

const CORNERS = [
  "top-20 left-5 sm:left-8 border-t-2 border-l-2",
  "top-20 right-5 sm:right-8 border-t-2 border-r-2",
  "bottom-6 left-5 sm:left-8 border-b-2 border-l-2",
  "bottom-6 right-5 sm:right-8 border-b-2 border-r-2",
];

export default function Hero() {
  const line1 = useScramble("MARINA", { delay: 350 });
  const line2 = useScramble("VELA", { delay: 900 });

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* viewfinder corner ticks */}
      {CORNERS.map((c) => (
        <span key={c} className={`absolute z-20 w-6 h-6 border-ink/35 ${c}`} aria-hidden />
      ))}

      {/* top HUD strip */}
      <div className="relative z-10 pt-24 sm:pt-28 px-6 sm:px-12 flex items-start justify-between gap-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-ink/65">
        <Reveal delay={120}>
          <p>
            38.7223° N — 9.1393° W<br />
            <span className="text-teal">Lisboa · surface temp 21.4°C</span>
          </p>
        </Reveal>
        <Reveal delay={240} className="text-right">
          <p>
            visibility <span className="text-coral">excellent</span>
            <br />
            signal <span className="text-teal">strong</span> · clarity 97%
          </p>
        </Reveal>
      </div>

      {/* main title block */}
      <div className="relative z-10 px-6 sm:px-12 mt-6 sm:mt-0 grid lg:grid-cols-[1fr_auto] items-end gap-10">
        <div>
          <Reveal>
            <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-teal mb-5 flex items-center gap-3">
              <span className="inline-block w-10 h-[2px] bg-coral" />
              portfolio · data analytics · est. 2019
            </p>
          </Reveal>
          <h1 className="font-display font-extrabold tracking-[-0.03em] leading-[0.86] text-ink select-none">
            <span className="block text-[clamp(3.4rem,12vw,9.5rem)] tabular-nums">{line1}</span>
            <span className="block text-[clamp(3.4rem,12vw,9.5rem)] text-teal tabular-nums">
              {line2}
              <span className="text-coral">.</span>
            </span>
          </h1>
          <Reveal delay={500}>
            <p className="mt-7 max-w-xl text-lg sm:text-xl leading-relaxed text-ink/75">
              I dive into <em className="font-medium not-italic mark-aqua">raw currents of data</em> and surface with{" "}
              <em className="font-medium not-italic mark-coral">clear, warm-light decisions</em> — dashboards, experiments
              and forecasts that teams actually navigate by.
            </p>
          </Reveal>
          <Reveal delay={650}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#expeditions"
                className="btn-wave inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 font-display font-semibold text-shell transition-colors hover:text-shell"
              >
                See the expeditions
                <svg viewBox="0 0 20 20" className="w-4 h-4" aria-hidden>
                  <path d="M10 3v13M4.5 10.5L10 16l5.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink/70 hover:border-coral hover:text-coral transition-colors"
              >
                send a signal
              </a>
            </div>
          </Reveal>
        </div>

        <div className="hidden lg:flex flex-col items-center gap-8 pb-4">
          <Reveal delay={800} variant="pop">
            <OrbitBadge />
          </Reveal>
          <Reveal delay={950} variant="pop">
            <SonarPulse />
          </Reveal>
        </div>
      </div>

      {/* bottom stat chips + dive cue */}
      <div className="relative z-10 px-6 sm:px-12 pb-8 pt-10">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <StatChip value={4.2} decimals={1} suffix="M" label="rows wrangled / day" delay={700} />
          <StatChip value={38} suffix="" label="dashboards in the wild" delay={820} />
          <StatChip value={12} suffix="" label="experiments shipped / yr" delay={940} />
          <Reveal delay={1100} className="ml-auto hidden sm:block">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              <span>scroll to dive</span>
              <span className="relative block h-12 w-[2px] bg-ink/15 overflow-hidden">
                <span className="dive-line absolute inset-0 bg-coral" />
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
