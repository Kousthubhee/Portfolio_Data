import { FIELD_NOTES, PROCESS } from "../lib/data";
import { useClock } from "../lib/hooks";
import { IconSignal, IconWaveMark, Reveal, SectionHeading } from "../components/Chrome";

export function Process() {
  return (
    <section id="process" className="relative z-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
        <SectionHeading
          kicker="method · 04"
          title={[
            <span key="a">From raw tide</span>,
            <span key="b">
              to insight<span className="text-coral">.</span>
            </span>,
          ]}
          note="The same five movements on every project — only the depth changes. It's how messy questions become confident decisions."
        />
        <div className="relative ml-3 sm:ml-6">
          {/* growing line */}
          <span className="absolute left-0 top-2 bottom-2 w-[2.5px] rounded-full bg-gradient-to-b from-aqua via-teal to-coral" aria-hidden />
          <ol className="space-y-10 sm:space-y-12">
            {PROCESS.map((step, i) => (
              <li key={step.step} className="relative pl-10 sm:pl-16">
                <span
                  className="absolute -left-[9px] top-1.5 w-5 h-5 rounded-full border-[3px] border-shell bg-teal shadow-[0_0_0_3px_rgba(15,125,124,0.25)]"
                  aria-hidden
                />
                <Reveal variant="left" delay={i * 90}>
                  <div className="group grid sm:grid-cols-[110px_1fr] gap-2 sm:gap-8 items-baseline rounded-2xl border border-transparent px-2 py-1 transition-all duration-300 hover:border-ink/10 hover:bg-shell/70">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-coral">{step.step}</span>
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight transition-colors group-hover:text-teal">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[15.5px] leading-relaxed text-ink/70 max-w-2xl">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function FieldNotes() {
  return (
    <section id="notes" className="relative z-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-24 sm:pb-32">
        <SectionHeading
          kicker="field notes · 05"
          title={[
            <span key="a">Postcards from</span>,
            <span key="b">
              the crews I've sailed with<span className="text-coral">.</span>
            </span>,
          ]}
          note="Unedited, except where legal asked nicely. Hover to straighten a card — the words stay exactly as written."
        />
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 items-start">
          {FIELD_NOTES.map((n, i) => (
            <Reveal key={n.author} delay={i * 140} variant="pop">
              <figure
                className={`relative rounded-lg border border-ink/10 bg-shell px-7 pt-9 pb-7 shadow-[0_18px_50px_rgba(13,59,64,0.14)] transition-all duration-500 hover:rotate-0 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(13,59,64,0.2)] ${n.rotate} ${i === 1 ? "md:mt-10" : ""}`}
              >
                <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" aria-hidden />
                {/* stamp */}
                <span className="absolute top-4 right-4 flex w-12 h-12 items-center justify-center rounded-sm border-2 border-dashed border-coral/60 text-coral rotate-6" aria-hidden>
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M3 15c2.5-3.8 4.5-3.8 6.8 0s4.3 3.8 6.6 0 3.6-3.4 4.6-.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <circle cx="17.5" cy="7" r="2" fill="#f2b544" />
                  </svg>
                </span>
                <blockquote className="font-display font-medium text-[17px] leading-snug text-ink pr-10">
                  “{n.quote}”
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-dashed border-ink/15">
                  <div className="font-semibold text-ink text-[15px]">{n.author}</div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-teal mt-1">{n.role}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40 mt-2">
                    postmarked · {n.place}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const clock = useClock();
  return (
    <section id="contact" className="relative z-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-16">
        <div className="relative overflow-hidden rounded-[36px] bg-deep px-7 sm:px-14 py-16 sm:py-24 shadow-[0_30px_90px_rgba(10,46,51,0.4)]">
          {/* ambient rings */}
          <div className="absolute -right-28 -top-28 w-[420px] h-[420px] rounded-full border border-aqua/15" aria-hidden />
          <div className="absolute -right-10 -top-10 w-[280px] h-[280px] rounded-full border border-coral/20" aria-hidden />
          <div className="absolute right-24 top-24 w-24 h-24 rounded-full border border-gold/25" aria-hidden />
          <svg viewBox="0 0 400 60" className="absolute bottom-0 left-0 w-full h-16 text-teal/20" preserveAspectRatio="none" aria-hidden>
            <path d="M0 35 C40 10 80 55 120 32 S200 12 240 34 320 52 360 28 400 20 400 20 V60 H0 Z" fill="currentColor" />
          </svg>

          <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
            <div>
              <Reveal>
                <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-aqua">
                  <IconSignal className="w-5 h-5 text-coral" />
                  transmission · 06
                </p>
              </Reveal>
              <h2 className="mt-5 font-display font-extrabold tracking-tight text-shell text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.95]">
                <Reveal>
                  <span className="block">Let's make</span>
                </Reveal>
                <Reveal delay={130}>
                  <span className="block text-coral">
                    waves<span className="text-gold">.</span>
                  </span>
                </Reveal>
              </h2>
              <Reveal delay={220}>
                <p className="mt-6 max-w-lg text-seafoam/80 text-lg leading-relaxed">
                  Booking one deep-dive project and two dashboard rescues for{" "}
                  <span className="text-gold font-medium">Q3 2026</span>. Bring a messy question — I'll bring the
                  compass, the SQL, and an unreasonable amount of enthusiasm.
                </p>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:hello@marinavela.data"
                    className="btn-wave inline-flex items-center gap-3 rounded-full bg-shell px-8 py-4 font-display font-bold text-deep text-lg transition-colors"
                  >
                    hello@marinavela.data
                    <svg viewBox="0 0 20 20" className="w-4 h-4" aria-hidden>
                      <path d="M4.5 15.5l11-11M7 4.5h8.5V13" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <div className="flex gap-2.5">
                    {["LinkedIn", "Dribbble", "GitHub"].map((s) => (
                      <a
                        key={s}
                        href="#contact"
                        aria-label={s}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-seafoam/25 text-seafoam/80 transition-all duration-300 hover:border-coral hover:text-coral hover:-translate-y-1"
                      >
                        {s === "LinkedIn" && (
                          <svg viewBox="0 0 20 20" className="w-4.5 h-4.5" fill="currentColor" aria-hidden>
                            <path d="M4.6 6.6H1.9V18h2.7V6.6zM3.2 5.4a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2zM18 11.4c0-3-1.6-4.9-4.2-4.9-1.5 0-2.4.8-2.9 1.6V6.6H8.2V18h2.7v-6c0-1.6.7-2.6 2.1-2.6s1.9 1 1.9 2.7V18H18v-6.6z" />
                          </svg>
                        )}
                        {s === "Dribbble" && (
                          <svg viewBox="0 0 20 20" className="w-4.5 h-4.5" aria-hidden>
                            <circle cx="10" cy="10" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M3 7.5c4.5.8 9 .4 12.8-2.6M17.4 12.7c-3.6-1.3-8-.7-11.6 3.4M8.3 2.2c2.8 3.3 4.4 7.2 4.9 13.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                        )}
                        {s === "GitHub" && (
                          <svg viewBox="0 0 20 20" className="w-4.5 h-4.5" fill="currentColor" aria-hidden>
                            <path d="M10 1.5a8.5 8.5 0 0 0-2.7 16.6c.4.1.6-.2.6-.4v-1.5c-2.4.5-2.9-1-2.9-1-.4-1-1-1.3-1-1.3-.8-.5.1-.5.1-.5.9.1 1.3.9 1.3.9.8 1.3 2 1 2.5.7.1-.6.3-1 .5-1.2-1.9-.2-3.9-1-3.9-4.2 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.2 0 0 .7-.2 2.3.9a8 8 0 0 1 4.2 0c1.6-1.1 2.3-.9 2.3-.9.5 1.1.2 2 .1 2.2.6.6.9 1.4.9 2.3 0 3.3-2 4-3.9 4.2.3.3.6.8.6 1.6v2.3c0 .2.2.5.6.4A8.5 8.5 0 0 0 10 1.5z" />
                          </svg>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* tide table + clock */}
            <Reveal delay={260} variant="pop">
              <div className="rounded-3xl border border-seafoam/15 bg-abyss/60 p-7 sm:p-8">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-seafoam/60">Lisbon station</span>
                  <span className="font-mono text-2xl text-gold tabular-nums">{clock}</span>
                </div>
                <div className="tide-rule my-5 text-seafoam/40" />
                <dl className="space-y-3.5 font-mono text-[12.5px]">
                  {[
                    ["high tide", "07:42 · 3.6 m", "text-aqua"],
                    ["low tide", "13:58 · 0.8 m", "text-coral"],
                    ["high tide", "20:15 · 3.4 m", "text-aqua"],
                    ["moon", "waxing gibbous", "text-gold"],
                    ["swell", "1.2 m @ 9 s", "text-seafoam/80"],
                  ].map(([k, v, tone]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 group">
                      <dt className="uppercase tracking-[0.16em] text-[10.5px] text-seafoam/50">{k}</dt>
                      <dd className={`${tone} transition-transform duration-300 group-hover:translate-x-1`}>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="tide-rule my-5 text-seafoam/40" />
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-seafoam/45 leading-relaxed">
                  replies arrive with the next tide — usually faster
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-ink/10 bg-shell/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-8 flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-2.5 text-ink/70">
          <IconWaveMark className="w-7 h-7 text-teal" />
          <p className="font-mono text-[11px] uppercase tracking-[0.16em]">
            © 2026 marina vela — built with salt & SQL
          </p>
        </div>
        <div className="flex items-center gap-6">
          <p className="hidden sm:block font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/40">
            38.72° N · data never sleeps, analysts occasionally do
          </p>
          <a
            href="#top"
            aria-label="Back to surface"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-teal/30 text-teal transition-all duration-300 hover:bg-teal hover:text-shell hover:-translate-y-1"
          >
            <svg viewBox="0 0 20 20" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden>
              <path d="M10 16V4M4.5 9.5L10 4l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
