import { PROJECTS } from "../lib/data";
import { useCountUp } from "../lib/hooks";
import { IconArrow, Reveal, SectionHeading } from "../components/Chrome";

function StackCard({ index }: { index: number }) {
  const p = PROJECTS[index];
  const flip = index % 2 === 1;
  return (
    <article
      className="sticky mb-10 last:mb-0"
      style={{ top: `calc(96px + ${index * 26}px)` }}
    >
      <div className={`overflow-hidden rounded-[28px] border border-ink/10 ${p.tint} bg-shell/90 backdrop-blur-md shadow-[0_26px_70px_rgba(13,59,64,0.16)]`}>
        <div className={`grid lg:grid-cols-2 ${flip ? "lg:[direction:rtl]" : ""}`}>
          {/* image side */}
          <div className="relative overflow-hidden min-h-[260px] lg:min-h-[420px] [direction:ltr]">
            <img
              src={p.image}
              alt={`${p.name} — ${p.tagline}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.2,0.6,0.2,1)] hover:scale-[1.07]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/45 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-deep/10" />
            <span className="absolute left-5 top-5 rounded-full bg-shell/85 backdrop-blur px-4 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-teal border border-teal/20">
              {p.year} · case study
            </span>
            <span className="absolute bottom-5 left-5 font-display font-extrabold text-6xl text-shell/90 drop-shadow-[0_4px_18px_rgba(10,46,51,0.4)]">
              {p.index}
            </span>
          </div>
          {/* text side */}
          <div className="p-7 sm:p-10 lg:p-12 flex flex-col [direction:ltr]">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-coral">{p.tagline}</p>
            <h3 className="mt-3 font-display font-bold text-3xl sm:text-4xl tracking-tight text-ink leading-tight">
              {p.name}
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink/72 max-w-xl">{p.description}</p>

            <div className="mt-7 grid grid-cols-3 gap-3">
              {p.kpis.map((k) => (
                <div
                  key={k.label}
                  className="rounded-2xl border border-ink/10 bg-shell px-3.5 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-coral/50 hover:shadow-[0_10px_26px_rgba(255,122,104,0.14)]"
                >
                  <div className="font-display font-bold text-lg sm:text-2xl text-teal tabular-nums">{k.value}</div>
                  <div className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink/55 leading-snug">{k.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-8 flex flex-wrap items-center justify-between gap-4">
              <ul className="flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-mist px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-teal transition-colors hover:bg-teal hover:text-shell cursor-default"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="group/link inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70 hover:text-coral transition-colors"
              >
                request the full dive
                <span className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                  <IconArrow />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function BigStat({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
  tone,
  delay,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  tone: string;
  delay: number;
}) {
  const { ref, text } = useCountUp(value, { decimals, duration: 2000 });
  return (
    <Reveal delay={delay} variant="pop">
      <div className="relative px-6 py-10 sm:py-12 text-center group">
        <svg viewBox="0 0 60 12" className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-3 text-seafoam/25" aria-hidden>
          <path d="M2 8c6-6 10-6 15 0s9 6 14 0 9-6 14 0 8 5 13 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <div className={`font-display font-extrabold tracking-tight text-[clamp(2.6rem,6vw,4.6rem)] leading-none tabular-nums ${tone} transition-transform duration-500 group-hover:-translate-y-1.5`}>
          {prefix}
          <span ref={ref}>{text}</span>
          {suffix}
        </div>
        <div className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-seafoam/70">{label}</div>
      </div>
    </Reveal>
  );
}

const WAVE_PATH =
  "M0,40 C80,10 160,70 240,40 C320,10 400,70 480,40 C560,10 640,70 720,40 C800,10 880,70 960,40 C1040,10 1120,70 1200,40 C1280,10 1360,70 1440,40 L1440,80 L0,80 Z";

export function Expeditions() {
  return (
    <section id="expeditions" className="relative z-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-16 sm:pb-24">
        <SectionHeading
          kicker="expeditions · 03"
          title={[
            <span key="a">Four dives,</span>,
            <span key="b">
              four treasures<span className="text-coral">.</span>
            </span>,
          ]}
          note="Selected case studies, 2024–25. Cards stack as you scroll — each one a deeper dive than the last. Ask for the confidential ones over coffee."
        />
        <div className="relative">
          {PROJECTS.map((_, i) => (
            <StackCard key={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function NumbersBand() {
  return (
    <section id="numbers" className="relative z-10 mt-8 sm:mt-16">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block w-full h-10 sm:h-14 text-deep" aria-hidden>
        <path d={WAVE_PATH} fill="currentColor" />
      </svg>
      <div className="bg-deep relative overflow-hidden">
        {/* faint sonar circles */}
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-seafoam/10" aria-hidden />
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-seafoam/10" aria-hidden />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-coral/15" aria-hidden />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="py-10 sm:py-14 flex flex-wrap items-center justify-between gap-4 border-b border-seafoam/10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-shell tracking-tight">
              By the numbers<span className="text-coral">,</span> since 2019
            </h2>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-seafoam/60">
              audited · quarterly · no rounding up
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-seafoam/10">
            <BigStat value={4.2} decimals={1} suffix="M" label="rows processed daily" tone="text-aqua" delay={0} />
            <BigStat value={2.4} decimals={1} prefix="€" suffix="M" label="revenue influenced" tone="text-coral" delay={120} />
            <BigStat value={38} suffix="" label="dashboards in production" tone="text-gold" delay={240} />
            <BigStat value={99.8} decimals={1} suffix="%" label="pipeline uptime" tone="text-seafoam" delay={360} />
          </div>
          <div className="py-6 text-center font-mono text-[10.5px] uppercase tracking-[0.22em] text-seafoam/50">
            ≈ the tide rewards those who measure it ≈
          </div>
        </div>
      </div>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block w-full h-10 sm:h-14 text-deep rotate-180" aria-hidden>
        <path d={WAVE_PATH} fill="currentColor" />
      </svg>
    </section>
  );
}
