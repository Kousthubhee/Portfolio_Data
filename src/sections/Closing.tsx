import {
  CONTACT,
  EDUCATION,
  EXPERIENCE,
  LOCATIONS,
  TARGET_ROLES,
  TIMELINE,
  WORK_MODELS,
} from "../lib/data";
import { IconSignal, Reveal, SectionHeading } from "../components/Chrome";

/* ---------------- career timeline + education ---------------- */
export function Journey() {
  return (
    <section id="journey" className="relative z-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeading
          kicker="the route · 03"
          title={[
            <span key="a">India → France → India</span>,
            <span key="b">
              → what&rsquo;s next?<span className="text-coral">.</span>
            </span>,
          ]}
          note="A journey across countries and disciplines — increasingly toward the intersection of data and AI."
        />

        <div className="relative max-w-3xl">
          <span className="absolute left-[13px] sm:left-[17px] top-3 bottom-8 w-[2.5px] rounded-full bg-gradient-to-b from-teal via-coral to-gold opacity-45" aria-hidden />
          <div className="space-y-4">
            {TIMELINE.map((n, i) => (
              <Reveal key={n.period + n.title} delay={i * 80} variant={i % 2 ? "left" : "up"}>
                <article
                  className={`relative pl-12 sm:pl-16 ${n.future ? "opacity-100" : ""}`}
                >
                  <span
                    className={`absolute left-0 top-6 grid h-7 w-7 sm:h-9 sm:w-9 place-items-center rounded-full border-2 transition-all duration-300 ${
                      n.future
                        ? "border-dashed border-coral bg-shell text-coral animate-blink"
                        : "border-teal bg-shell text-teal shadow-[0_0_0_5px_rgba(15,125,124,0.12)]"
                    }`}
                  >
                    <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" aria-hidden>
                      {n.future ? (
                        <path d="M3 10h4l2-5 3 10 2-5h3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      ) : (
                        <path d="M2 13c2.5-4 4.5-4 6.5 0s4 4 6.5 0 3-3 4.5-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      )}
                    </svg>
                  </span>
                  <div className="group rounded-[22px] border border-ink/10 bg-shell/85 backdrop-blur-md p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:border-coral/40 hover:shadow-[0_18px_44px_rgba(13,59,64,0.13)]">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-coral font-semibold">{n.period}</span>
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/45">{n.place}</span>
                    </div>
                    <h3 className="mt-2 font-display font-bold text-xl sm:text-2xl text-ink tracking-tight">{n.title}</h3>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal mt-1">{n.org}</p>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-ink/70 max-w-xl">{n.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* education */}
        <div className="mt-20 grid md:grid-cols-2 gap-6">
          {EDUCATION.map((e, i) => (
            <Reveal key={e.school} delay={i * 120} variant="pop">
              <article className="group h-full relative overflow-hidden rounded-[24px] border border-ink/10 bg-gradient-to-br from-shell/95 to-mist/80 backdrop-blur-md p-7 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(13,59,64,0.15)]">
                <svg viewBox="0 0 60 60" className="absolute -right-4 -top-4 w-28 h-28 text-teal/[0.08] group-hover:text-teal/[0.14] transition-colors duration-500" aria-hidden>
                  <path d="M30 8L4 20l26 12 26-12L30 8z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M14 27v12c0 4 7 9 16 9s16-5 16-9V27" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M52 22v14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-coral">Education · {e.period}</p>
                <h3 className="mt-3 font-display font-bold text-2xl text-ink tracking-tight leading-tight">{e.degree}</h3>
                <p className="mt-1.5 font-display font-semibold text-teal">{e.school}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/45 mt-0.5">{e.place}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {e.areas.map((a) => (
                    <li key={a} className="rounded-full bg-mist border border-teal/15 px-3 py-1.5 text-[12px] font-medium text-ink/70 transition-colors hover:bg-teal hover:text-shell cursor-default">
                      {a}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- experience logbook ---------------- */
export function Experience() {
  return (
    <section id="experience" className="relative z-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeading
          kicker="the logbook · 04"
          title={[
            <span key="a">Where the work</span>,
            <span key="b">
              actually happened<span className="text-coral">.</span>
            </span>,
          ]}
          note="Three postings: a venture studio in Rouen, an enterprise engine room in Hyderabad, and a remote internship that started it all."
        />

        <div className="space-y-7">
          {EXPERIENCE.map((x, i) => (
            <Reveal key={x.org} delay={i * 100}>
              <article className="group relative overflow-hidden rounded-[26px] border border-ink/10 bg-shell/88 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_64px_rgba(13,59,64,0.16)]">
                <div className="grid lg:grid-cols-[340px_1fr]">
                  {/* rail */}
                  <div className="relative p-7 sm:p-8 bg-gradient-to-br from-ink to-deep text-mist flex flex-col justify-between overflow-hidden">
                    <svg viewBox="0 0 200 60" className="absolute bottom-0 left-0 w-full h-14 text-mist/[0.06]" preserveAspectRatio="none" aria-hidden>
                      <path d="M0 40c20-14 34-14 50 0s30 14 50 0 34-14 50 0 30 14 50 0v20H0z" fill="currentColor" />
                    </svg>
                    <div className="relative">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-coral">Entry 0{i + 1}</p>
                      <h3 className="mt-3 font-display font-bold text-[26px] sm:text-3xl leading-tight tracking-tight">{x.org}</h3>
                      <p className="mt-2 text-[14px] leading-snug text-seafoam/90">{x.role}</p>
                    </div>
                    <div className="relative mt-6 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-seafoam/70">
                      <span>{x.place}</span>
                      <span className="text-coral">{x.period}</span>
                    </div>
                  </div>
                  {/* record */}
                  <div className="p-7 sm:p-8">
                    <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                      {x.bullets.map((b, k) => (
                        <li key={k} className="flex gap-3 text-[13.5px] leading-relaxed text-ink/75">
                          <svg viewBox="0 0 26 12" className="mt-[7px] w-6 h-3 shrink-0 text-coral" aria-hidden>
                            <path d="M1 8c3-4.6 5-4.6 7.6 0s4.6 4.6 7.2 0 4.4-4.2 6.8-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-5 border-t border-ink/10 flex flex-wrap gap-2">
                      {x.focus.map((f) => (
                        <span key={f} className="rounded-full bg-mist px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-teal transition-colors hover:bg-coral hover:text-shell cursor-default">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- philosophy quote band ---------------- */
export function QuoteBand() {
  return (
    <section className="relative z-10 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-teal">Personal philosophy</p>
        </Reveal>
        <Reveal delay={120}>
          <blockquote className="mt-7 font-display font-extrabold tracking-tight leading-[1.05] text-[clamp(2rem,6vw,4.4rem)] text-ink">
            “Technology gives curiosity{" "}
            <span className="relative inline-block text-coral">
              somewhere to go.
              <svg viewBox="0 0 220 14" className="absolute -bottom-2 left-0 w-full h-3 text-gold/70" preserveAspectRatio="none" aria-hidden>
                <path d="M3 10c30-7 60-7 90-2s60 6 90-2 30-5 34-3" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
            ”
          </blockquote>
        </Reveal>
        <Reveal delay={260}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">
            {["Curiosity", "Build", "Learn", "Improve"].map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                {i > 0 && <span className="text-coral">→</span>}
                <span className="rounded-full border border-ink/15 bg-shell/70 px-4 py-2 hover:border-coral hover:text-coral transition-colors cursor-default">
                  {s}
                </span>
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={380}>
          <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-relaxed text-ink/65">
            I rarely want to learn something purely theoretically. If I want to understand a technology, I prefer to
            build something with it. I enjoy breaking complicated problems into smaller pieces, finding efficient ways
            to handle repetitive work, and turning an idea into something tangible.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- the next chapter ---------------- */
export function NextChapter() {
  return (
    <section id="next" className="relative z-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-24">
        <SectionHeading
          kicker="the next chapter · 07"
          title={[
            <span key="a">I have been moving from</span>,
            <span key="b">
              systems toward <span className="text-coral">possibilities</span>.
            </span>,
          ]}
          note="Not looking for a title — looking for an environment where data, technology, business thinking and AI solve meaningful problems."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <Reveal variant="pop">
            <div className="h-full rounded-[24px] border border-ink/10 bg-shell/88 backdrop-blur-md p-7 sm:p-8">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-coral">Target roles</p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {TARGET_ROLES.map((r) => (
                  <li key={r} className="rounded-full bg-mist border border-teal/20 px-4 py-2 font-display font-semibold text-[14px] text-ink transition-all duration-300 hover:bg-teal hover:text-shell hover:-translate-y-0.5 cursor-default">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal variant="pop" delay={120}>
            <div className="h-full rounded-[24px] border border-ink/10 bg-shell/88 backdrop-blur-md p-7 sm:p-8">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-coral">Working model</p>
              <ul className="mt-5 space-y-3">
                {WORK_MODELS.map((m) => (
                  <li key={m} className="flex items-center justify-between rounded-2xl border border-ink/10 bg-mist/70 px-5 py-3.5 transition-all duration-300 hover:border-coral/50 hover:translate-x-1">
                    <span className="font-display font-bold text-lg text-ink">{m}</span>
                    <svg viewBox="0 0 26 12" className="w-6 h-3 text-teal" aria-hidden>
                      <path d="M1 8c3-4.6 5-4.6 7.6 0s4.6 4.6 7.2 0 4.4-4.2 6.8-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal variant="pop" delay={240}>
            <div className="h-full rounded-[24px] border border-ink/10 bg-shell/88 backdrop-blur-md p-7 sm:p-8">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-coral">Location</p>
              <ul className="mt-5 space-y-3">
                {LOCATIONS.map((l) => (
                  <li key={l} className="flex items-center justify-between rounded-2xl border border-ink/10 bg-mist/70 px-5 py-3.5 transition-all duration-300 hover:border-coral/50 hover:translate-x-1">
                    <span className="font-display font-bold text-lg text-ink">{l}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-teal">open</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[13px] leading-relaxed text-ink/60">
                Moving from India to France and back has made me comfortable adapting to new environments and working
                across cultures. <span className="font-semibold text-coral">Open to relocation.</span>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <p className="mt-12 text-center font-mono text-[11px] uppercase tracking-[0.24em] text-ink/50">
            Perhaps deeper into analytics engineering · perhaps further into AI · perhaps another country —{" "}
            <span className="text-coral">the next chapter is still being written</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- contact ---------------- */
export function Contact() {
  return (
    <section id="contact" className="relative z-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
        <SectionHeading
          kicker="final scene · 08"
          title={[
            <span key="a">Let&rsquo;s build something</span>,
            <span key="b">
              useful<span className="text-coral">.</span>
            </span>,
          ]}
          note="Hiring for a data, analytics, BI, product analytics or AI-focused role? I would be interested in connecting."
        />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Reveal variant="pop">
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-teal to-deep p-9 sm:p-12 text-mist shadow-[0_30px_80px_rgba(10,46,51,0.35)]">
              <svg viewBox="0 0 400 120" className="absolute inset-x-0 bottom-0 w-full h-24 text-mist/[0.07]" preserveAspectRatio="none" aria-hidden>
                <path d="M0 70c40-30 70-30 100 0s60 30 100 0 70-30 100 0 60 30 100 0v50H0z" fill="currentColor" />
              </svg>
              <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-seafoam/80">Availability</p>
              <h3 className="mt-4 font-display font-bold text-3xl sm:text-4xl leading-tight tracking-tight">
                Open to relocation.
                <br />
                Remote · Hybrid · <span className="text-gold">Worldwide.</span>
              </h3>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-seafoam/85">
                I am looking for opportunities where I can keep learning, solve meaningful problems, and turn data and
                technology into practical business outcomes — in India, Europe, or anywhere the work is good.
              </p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {["Data", "Business", "Technology", "AI", "Automation"].map((t) => (
                  <span key={t} className="rounded-full border border-seafoam/30 px-4 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-seafoam/90">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="space-y-4">
            {[
              {
                label: "Email",
                value: CONTACT.email,
                href: `mailto:${CONTACT.email}`,
                hint: "fastest signal",
              },
              {
                label: "LinkedIn",
                value: "in/kousthubheekrishna",
                href: CONTACT.linkedin,
                hint: "the professional cut",
              },
              {
                label: "GitHub",
                value: "Kousthubhee / Projects",
                href: CONTACT.github,
                hint: "the raw footage",
              },
              {
                label: "WhatsApp",
                value: CONTACT.whatsappDisplay,
                href: CONTACT.whatsappUrl,
                hint: "+91 · direct line",
              },
            ].map((c, i) => (
              <Reveal key={c.label} delay={i * 100}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-shell/88 backdrop-blur-md px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-coral/60 hover:shadow-[0_16px_40px_rgba(255,122,104,0.16)]"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mist text-teal border border-teal/20 transition-colors duration-300 group-hover:bg-coral group-hover:text-shell group-hover:border-coral">
                      <IconSignal className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                        {c.label} · {c.hint}
                      </p>
                      <p className="mt-0.5 font-display font-bold text-lg text-ink truncate">{c.value}</p>
                    </div>
                  </div>
                  <svg viewBox="0 0 20 20" className="w-5 h-5 shrink-0 text-ink/35 transition-all duration-300 group-hover:text-coral group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden>
                    <path d="M4.5 15.5l11-11M7 4.5h8.5V13" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- footer / end credits ---------------- */
export function Footer() {
  return (
    <footer className="relative z-10 mt-6">
      <div className="film-strip h-7" aria-hidden />
      <div className="bg-abyss text-mist">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-16">
          <div className="text-center font-mono text-[10.5px] uppercase tracking-[0.3em] text-mist/45">
            — end credits —
          </div>
          <h2 className="mt-6 text-center font-display font-extrabold tracking-tight text-[clamp(1.8rem,5vw,3.4rem)] leading-tight">
            Kousthubhee Krishna Kotte
            <span className="text-coral">.</span>
          </h2>
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-seafoam/70">
            Data &amp; BI Analyst · Business Analytics · AI &amp; Automation
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-mist/50">
            <span>starring — Python, SQL, Tableau</span>
            <span>directed by — curiosity</span>
            <span>produced by — persistence</span>
            <span>location — HYD → ROUEN → HYD</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <a href={`mailto:${CONTACT.email}`} className="font-mono text-[11px] uppercase tracking-[0.16em] text-seafoam/80 hover:text-coral transition-colors">
              {CONTACT.email}
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="font-mono text-[11px] uppercase tracking-[0.16em] text-seafoam/80 hover:text-coral transition-colors">
              LinkedIn
            </a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer" className="font-mono text-[11px] uppercase tracking-[0.16em] text-seafoam/80 hover:text-coral transition-colors">
              GitHub
            </a>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer" className="font-mono text-[11px] uppercase tracking-[0.16em] text-seafoam/80 hover:text-coral transition-colors">
              WhatsApp
            </a>
          </div>
          <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-mist/35">
            © 2026 · India → France → India → looking forward to the next adventure
          </p>
        </div>
      </div>
    </footer>
  );
}
