import type { CSSProperties } from "react";
import { JOURNEY, LANGUAGES, ROUTE_LEGS, SKILL_GROUPS, CERTIFICATIONS } from "../lib/data";
import { IconShell, Reveal, SectionHeading, SKILL_ICONS } from "../components/Chrome";

/* ---------- route / boarding card ---------- */
function RouteCard() {
  return (
    <div className="relative rounded-[26px] border border-ink/10 bg-shell/90 backdrop-blur-md shadow-[0_26px_70px_rgba(13,59,64,0.18)] overflow-hidden">
      <div className="flex items-center justify-between bg-ink px-6 py-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-shell/90">Route card · KK/2026</p>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-coral">
          <span className="w-1.5 h-1.5 rounded-full bg-coral animate-blink" /> in transit
        </span>
      </div>

      <div className="p-6 sm:p-7">
        <ul className="space-y-1">
          {ROUTE_LEGS.map((leg, i) => (
            <li key={`${leg.code}-${i}`} className="group relative flex items-start gap-4">
              {i < ROUTE_LEGS.length - 1 && (
                <span className="absolute left-[27px] top-11 bottom-[-4px] w-px border-l border-dashed border-teal/35" aria-hidden />
              )}
              <span
                className={`mt-0.5 grid h-[54px] w-[54px] shrink-0 place-items-center rounded-xl font-display font-bold text-sm tracking-tight transition-colors duration-300 ${
                  leg.open
                    ? "border-2 border-dashed border-coral text-coral group-hover:bg-coral group-hover:text-shell"
                    : "bg-mist text-teal border border-teal/25 group-hover:bg-teal group-hover:text-shell"
                }`}
              >
                {leg.code === "ROUEN" ? "RNE" : leg.code === "OPEN" ? "→?" : leg.code}
              </span>
              <div className="pb-5">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-display font-bold text-ink leading-tight">{leg.place}</span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-coral">{leg.years}</span>
                </div>
                <p className="mt-1 text-[13.5px] leading-snug text-ink/65">{leg.note}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* perforation */}
        <div className="relative my-2 border-t-2 border-dashed border-ink/15">
          <span className="absolute -left-9 -top-3 h-6 w-6 rounded-full bg-mist border-r border-ink/10" aria-hidden />
          <span className="absolute -right-9 -top-3 h-6 w-6 rounded-full bg-mist border-l border-ink/10" aria-hidden />
        </div>

        <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink/50">Languages on board</p>
        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3">
          {LANGUAGES.map((l) => (
            <li key={l.name}>
              <div className="flex items-baseline justify-between">
                <span className="font-display font-semibold text-[15px] text-ink">{l.name}</span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-teal">{l.level}</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-mist overflow-hidden">
                <div
                  className="bar-fill h-full rounded-full bg-gradient-to-r from-aqua to-teal"
                  style={{ "--w": `${l.pct}%` } as CSSProperties}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-coral/35 bg-blush/50 px-4 py-3">
          <span className="text-coral">
            <IconShell className="w-6 h-6" />
          </span>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] leading-relaxed text-ink/70">
            Open to relocation · remote · hybrid · international
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- the journey ---------- */
export function About() {
  return (
    <section id="about" className="relative z-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeading
          kicker="the story so far · 02"
          title={[
            <span key="a">A non-linear</span>,
            <span key="b">
              journey<span className="text-coral">.</span>
            </span>,
          ]}
          note="Computer science → enterprise systems → business analytics → product → AI. Each stage added another perspective."
        />

        <div className="grid lg:grid-cols-[400px_1fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <Reveal variant="pop">
              <RouteCard />
            </Reveal>
          </div>

          <div className="space-y-5">
            <Reveal>
              <p className="text-lg sm:text-xl leading-relaxed text-ink/78 max-w-2xl">
                My career has never followed a completely straight line. I started with{" "}
                <span className="mark-aqua font-medium">computer science and enterprise technology</span>, moved into{" "}
                <span className="mark-coral font-medium">business analytics</span>, explored product and data analytics,
                and became increasingly interested in artificial intelligence and automation. I moved from India to
                France for my M.Sc. at NEOMA — and that transition changed the way I approach technology: not only how
                systems work, but <span className="mark-gold font-medium">what the data means</span>, what business
                problem it represents, and how technology can improve the outcome.
              </p>
            </Reveal>

            {JOURNEY.map((j, i) => (
              <Reveal key={j.index} delay={i * 90}>
                <article className="group relative overflow-hidden rounded-[24px] border border-ink/10 bg-shell/85 backdrop-blur-md p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(13,59,64,0.14)] hover:border-teal/30">
                  <span className="absolute -right-3 -top-7 font-display font-extrabold text-[92px] leading-none text-teal/[0.07] select-none">
                    {j.index}
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-coral">{j.org}</span>
                  </div>
                  <h3 className="mt-2.5 font-display font-bold text-[22px] sm:text-2xl text-ink tracking-tight leading-snug">
                    {j.title}
                  </h3>
                  <div className="mt-3 space-y-3 max-w-2xl">
                    {j.body.map((p, k) => (
                      <p key={k} className="text-[15px] leading-relaxed text-ink/72">
                        {p}
                      </p>
                    ))}
                  </div>
                  {j.highlight && (
                    <p className="mt-4 border-l-[3px] border-coral pl-4 font-display font-semibold text-lg sm:text-xl text-teal leading-snug">
                      “{j.highlight}”
                    </p>
                  )}
                </article>
              </Reveal>
            ))}

            <Reveal>
              <p className="pt-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink/50">
                Today I work at the intersection of{" "}
                <span className="text-coral">Data · Business · Technology · AI · Automation</span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- skills (8 groups) ---------- */
export function Skills() {
  return (
    <section id="skills" className="relative z-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeading
          kicker="instruments · 06"
          title={[
            <span key="a">The technical</span>,
            <span key="b">
              toolbox<span className="text-coral">.</span>
            </span>,
          ]}
          note="Eight instrument groups — from raw data wrangling to enterprise middleware to LLM-powered automations."
        />

        <div className="grid sm:grid-cols-2 gap-5">
          {SKILL_GROUPS.map((g, i) => {
            const Icon = SKILL_ICONS[g.icon as keyof typeof SKILL_ICONS];
            return (
              <Reveal key={g.name} delay={(i % 2) * 110}>
                <article className="group h-full rounded-[24px] border border-ink/10 bg-shell/85 backdrop-blur-md p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1 hover:border-teal/35 hover:shadow-[0_18px_48px_rgba(13,59,64,0.13)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mist text-teal border border-teal/20 transition-all duration-500 group-hover:bg-teal group-hover:text-shell group-hover:rotate-6">
                        <Icon className="w-6 h-6" />
                      </span>
                      <div>
                        <h3 className="font-display font-bold text-lg text-ink tracking-tight leading-tight">{g.name}</h3>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                          {g.items.length} instruments
                        </p>
                      </div>
                    </div>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className="rounded-full bg-mist border border-transparent px-3 py-1.5 text-[12.5px] font-medium text-ink/70 transition-all duration-300 hover:bg-teal hover:text-shell hover:-translate-y-0.5 cursor-default"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* certifications */}
        <div className="mt-16">
          <Reveal>
            <div className="flex items-center gap-4">
              <h3 className="font-display font-bold text-2xl text-ink tracking-tight">Certifications &amp; courses</h3>
              <span className="tide-rule flex-1 text-teal" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/45">2020 → 2026</span>
            </div>
          </Reveal>
          <div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {CERTIFICATIONS.map((c, i) => (
              <Reveal key={c.name} delay={(i % 3) * 90}>
                <div className="group flex items-start gap-3.5 rounded-2xl border border-ink/10 bg-shell/80 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_12px_30px_rgba(242,181,68,0.16)]">
                  <svg viewBox="0 0 24 24" className="mt-0.5 w-5 h-5 shrink-0 text-gold" aria-hidden>
                    <circle cx="12" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M8.5 13.5L7 21l5-2.6L17 21l-1.5-7.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    <path d="M10 8.6l1.4 1.3 2.6-2.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <p className="font-display font-semibold text-[14.5px] leading-snug text-ink">{c.name}</p>
                    <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/50">
                      {c.issuer} · <span className="text-coral">{c.date}</span>
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
