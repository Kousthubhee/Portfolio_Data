import type { CSSProperties } from "react";
import { PORTRAIT, SIGNAL_LOG, SKILL_GROUPS } from "../lib/data";
import { Reveal, SectionHeading, SKILL_ICONS } from "../components/Chrome";

function SignalLog() {
  return (
    <div className="rounded-2xl border border-ink/10 bg-deep text-seafoam shadow-[0_18px_50px_rgba(10,46,51,0.35)] overflow-hidden">
      <div className="flex items-center gap-2 border-b border-seafoam/10 px-5 py-3">
        <span className="w-2.5 h-2.5 rounded-full bg-coral" />
        <span className="w-2.5 h-2.5 rounded-full bg-gold" />
        <span className="w-2.5 h-2.5 rounded-full bg-aqua" />
        <span className="ml-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-seafoam/60">
          signal.log — today's readings
        </span>
        <span className="blink ml-auto font-mono text-[10px] text-aqua">▍live</span>
      </div>
      <ul className="px-5 py-4 font-mono text-[12px] leading-loose">
        {SIGNAL_LOG.map((row) => (
          <li key={row.t} className="group flex items-baseline gap-3 rounded px-1 py-0.5 transition-colors hover:bg-seafoam/5">
            <span className="text-seafoam/45">{row.t}</span>
            <span className="text-gold">{row.k}</span>
            <span className="truncate text-seafoam/85 transition-transform duration-300 group-hover:translate-x-1">{row.v}</span>
            <span className={`ml-auto text-[10px] ${row.ok ? "text-aqua" : "text-coral"}`}>{row.ok ? "OK" : "WATCH"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative z-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
        <SectionHeading
          kicker="the analyst · 01"
          title={[
            <span key="a">Reading the water,</span>,
            <span key="b" className="text-teal">
              not just the waves<span className="text-coral">.</span>
            </span>,
          ]}
          note="Six years of turning ambiguous business questions into measurable answers — from Lisbon, for teams across four time zones."
        />

        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-start">
          {/* sticky portrait card */}
          <div className="lg:sticky lg:top-28">
            <Reveal variant="pop">
              <div className="relative">
                <div className="absolute -inset-3 rounded-t-[999px] rounded-b-3xl border-2 border-dashed border-teal/30" aria-hidden />
                <div className="relative overflow-hidden rounded-t-[999px] rounded-b-3xl border border-ink/10 bg-shell shadow-[0_24px_70px_rgba(13,59,64,0.18)]">
                  <img
                    src={PORTRAIT}
                    alt="Illustrated portrait of Marina Vela"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/85 via-deep/35 to-transparent px-6 pt-16 pb-5">
                    <p className="font-display font-bold text-xl text-shell">Marina Vela</p>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-seafoam/80">
                      data analyst · lisbon, pt
                    </p>
                  </div>
                </div>
                {/* facts strip */}
                <dl className="mt-6 grid grid-cols-2 gap-3 font-mono text-[11px] uppercase tracking-[0.1em]">
                  {[
                    ["focus", "product & revenue"],
                    ["languages", "EN · ES · PT"],
                    ["habitat", "dashboards, reefs"],
                    ["fuel", "matcha, 09:00"],
                  ].map(([k, v], i) => (
                    <div
                      key={k}
                      className={`rounded-xl border border-ink/10 bg-shell/80 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua/60 ${i % 2 ? "translate-y-2" : ""}`}
                    >
                      <dt className="text-teal">{k}</dt>
                      <dd className="mt-1 normal-case tracking-normal font-body text-[13px] text-ink/80">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

          {/* story column */}
          <div className="space-y-10">
            <Reveal>
              <div className="space-y-5 text-[17px] leading-[1.75] text-ink/80">
                <p>
                  I became a data analyst the way most people become swimmers: <span className="mark-aqua">thrown in early,
                  and learned to love the cold</span>. My first job was cleaning six years of tide-gauge records for an
                  oceanography lab — 40 million rows of salt, storms and sensor glitches. It taught me the habit that still
                  runs everything I do: <strong className="font-semibold text-ink">trust the measurement before you trust the story.</strong>
                </p>
                <p>
                  Since then I've worked across e-commerce, travel and SaaS, sitting between the engineers who build the
                  pipes and the humans who steer the ship. My favourite place in any company is the{" "}
                  <span className="mark-coral">awkward meeting where nobody agrees on the numbers</span> — that's where an
                  analyst earns her keep.
                </p>
                <p>
                  What I bring to the surface: <span className="mark-gold">models that forecast instead of merely report</span>,
                  experiments designed before the hype, and dashboards warm enough that people open them without being chased.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <SignalLog />
            </Reveal>

            <Reveal delay={250}>
              <blockquote className="relative rounded-2xl border border-coral/30 bg-blush/50 px-7 py-6">
                <svg viewBox="0 0 24 24" className="absolute -top-3 left-6 w-7 h-7 text-coral" aria-hidden>
                  <path d="M4 14c0-5 3-8.5 8-10l1 2.2c-3 1.2-4.6 3-5 5.3.4-.2.9-.3 1.5-.3 2.4 0 4 1.7 4 4.1 0 2.5-1.9 4.2-4.4 4.2C6 19.5 4 17.4 4 14zm11.5 0c0-5 3-8.5 8-10l1 2.2c-3 1.2-4.6 3-5 5.3.4-.2.9-.3 1.5-.3 2.4 0 4 1.7 4 4.1 0 2.5-1.9 4.2-4.4 4.2-3.1 0-5.1-2.1-5.1-5.5z" transform="scale(0.85)" fill="currentColor" />
                </svg>
                <p className="font-display font-medium text-lg sm:text-xl leading-snug text-ink">
                  Good analysis is hospitality — you prepare the room, warm the light, and let the decision feel at home.
                </p>
                <footer className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-teal">
                  — pinned above my desk, next to the tide table
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="currents" className="relative z-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-24 sm:pb-32">
        <SectionHeading
          kicker="currents & instruments · 02"
          title={[
            <span key="a">The currents</span>,
            <span key="b">
              I swim in<span className="text-coral">.</span>
            </span>,
          ]}
          note="Proficiency is measured the honest way — projects shipped, not tutorials watched. Bars fill as you watch, like a tide coming in."
        />
        <div className="grid sm:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group, gi) => {
            const Icon = SKILL_ICONS[group.icon];
            return (
              <Reveal key={group.title} delay={gi * 120}>
                <div className="group/card h-full rounded-3xl border border-ink/10 bg-shell/85 backdrop-blur-sm p-7 sm:p-8 shadow-[0_14px_44px_rgba(13,59,64,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(13,59,64,0.14)] hover:border-aqua/50">
                  <div className="flex items-center gap-4">
                    <span className="flex w-14 h-14 items-center justify-center rounded-2xl bg-mist text-teal border border-teal/20 transition-all duration-500 group-hover/card:bg-teal group-hover/card:text-shell group-hover/card:rotate-6">
                      <Icon />
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-xl text-ink leading-tight">{group.title}</h3>
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-coral mt-1">{group.note}</p>
                    </div>
                  </div>
                  <ul className="mt-7 space-y-5">
                    {group.skills.map((s) => (
                      <li key={s.name}>
                        <div className="flex items-baseline justify-between gap-3 mb-1.5">
                          <span className="text-[13.5px] font-medium text-ink/80">{s.name}</span>
                          <span className="font-mono text-[11px] text-teal tabular-nums">{s.pct}%</span>
                        </div>
                        <div className="relative h-2.5 rounded-full bg-mist overflow-hidden">
                          <div
                            className="bar-fill bar-shimmer relative h-full rounded-full bg-gradient-to-r from-aqua via-teal to-coral"
                            style={{ "--w": `${s.pct}%` } as CSSProperties}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={200}>
          <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
            ≈ also fluent in: stakeholder-whispering, naming things, and saying “the data doesn't support that” kindly ≈
          </p>
        </Reveal>
      </div>
    </section>
  );
}


