import { useCountUp } from "../lib/hooks";
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

function Slate() {
  const rows: [string, string][] = [
    ["prod.", "KK · 2026"],
    ["sc. 01", "“The Origin”"],
    ["take", "05 / ∞"],
    ["roll", "HYD → ROUEN → HYD"],
  ];
  return (
    <div className="rounded-xl overflow-hidden border border-ink/25 shadow-[0_16px_44px_rgba(13,59,64,0.2)] bg-abyss/95 text-mist font-mono w-60 select-none transition-transform duration-500 hover:-rotate-1">
      <div className="flex h-9">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`flex-1 ${i % 2 ? "bg-ink" : "bg-shell"} ${i === 3 ? "bg-coral animate-clap" : ""}`}
          />
        ))}
      </div>
      <div className="p-4 space-y-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline gap-3 text-[11px]">
            <span className="w-12 shrink-0 uppercase tracking-[0.18em] text-mist/45">{k}</span>
            <span className="tracking-[0.06em] text-mist/90">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* film sprockets along the very top */}
      <div className="film-strip absolute top-0 inset-x-0 z-20" aria-hidden />

      {/* opening credits */}
      <div className="relative z-10 pt-24 sm:pt-32 text-center font-mono uppercase tracking-[0.34em] text-ink/60 text-[10.5px] sm:text-xs">
        <Reveal>
          <p className="anim-fade-up">Kousthubhee Krishna Kotte presents</p>
        </Reveal>
      </div>

      {/* title card */}
      <div className="relative z-10 px-6 sm:px-12 text-center -mt-6 sm:-mt-10">
        <h1 className="font-display font-extrabold tracking-[-0.025em] leading-[0.98] text-ink select-none">
          <span className="anim-defocus block text-[clamp(2.5rem,7.2vw,6.4rem)]">From Systems to Data.</span>
          <span className="anim-defocus anim-d2 block text-[clamp(2.5rem,7.2vw,6.4rem)] text-teal">
            From Data to <span className="text-coral">Possibilities.</span>
          </span>
        </h1>

        <Reveal delay={900}>
          <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-ink/75">
            A career moving across <em className="font-medium not-italic mark-aqua">technology, enterprise systems and business analytics</em> —
            from Infosys server rooms to NEOMA classrooms in Rouen, now exploring how{" "}
            <em className="font-medium not-italic mark-coral">AI and automation</em> turn data into practical business outcomes.
          </p>
        </Reveal>

        <Reveal delay={1150}>
          <p className="mt-7 font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.24em] text-ink/55">
            starring <span className="text-teal">Python · SQL · Tableau</span> &{" "}
            <span className="text-coral">n8n</span>
            <span className="mx-3 text-ink/30">—</span>
            from the enterprises of <span className="text-teal">Infosys</span> & the classrooms of{" "}
            <span className="text-teal">NEOMA</span>
            <span className="mx-3 text-ink/30">—</span>
            directed by <span className="text-coral">curiosity</span>
          </p>
        </Reveal>

        <Reveal delay={1300}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="btn-wave inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 font-display font-semibold text-shell"
            >
              See the field work
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

      {/* slate + coordinates + stat chips */}
      <div className="relative z-10 px-6 sm:px-12 pb-20 sm:pb-24 pt-10 grid lg:grid-cols-[auto_1fr] items-end gap-8">
        <Reveal delay={1000} variant="pop" className="hidden lg:block">
          <Slate />
        </Reveal>
        <div>
          <Reveal delay={700}>
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-ink/55 mb-4">
              <p>
                17.3850° N — 78.4867° E · <span className="text-teal">Hyderabad</span>
              </p>
              <p>
                status <span className="text-coral">open to relocation</span> · India &amp; internationally
              </p>
            </div>
          </Reveal>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <StatChip value={13.3} decimals={1} suffix="M+" label="transactions analyzed" delay={800} />
            <StatChip value={240} suffix="+" label="students researched" delay={920} />
            <StatChip value={40} suffix="%" label="reporting automated" delay={1040} />
            <StatChip value={93} suffix="%" label="model accuracy" delay={1160} />
            <Reveal delay={1280} className="ml-auto hidden sm:block">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
                <span>roll the journey</span>
                <span className="relative block h-12 w-[2px] bg-ink/15 overflow-hidden">
                  <span className="dive-line absolute inset-0 bg-coral" />
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
