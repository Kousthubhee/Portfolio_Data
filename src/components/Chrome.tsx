import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import { useInView } from "../lib/hooks";
import { MARQUEE_ITEMS } from "../lib/data";

/* ============ Reveal wrapper ============ */
export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "pop";
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const v = variant === "left" ? "rv rv-left" : variant === "pop" ? "rv rv-pop" : "rv";
  return (
    <div
      ref={ref}
      style={{ "--rv-delay": `${delay}ms` } as CSSProperties}
      className={`${v} ${inView ? "is-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* line-mask heading: each line slides up from under a mask */
export function MaskLines({
  lines,
  className = "",
  stagger = 110,
}: {
  lines: ReactNode[];
  className?: string;
  stagger?: number;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  return (
    <span ref={ref} className={`${inView ? "is-in" : ""} block ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="lm">
          <span style={{ "--lm-delay": `${i * stagger}ms` } as CSSProperties}>{l}</span>
        </span>
      ))}
    </span>
  );
}

/* ============ custom inline icons ============ */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconWaveMark = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <circle cx="16" cy="16" r="14.5" {...stroke} />
    <path d="M7 18c2.5-3 4.5-3 6.5 0s4 3 6.5 0 3.5-2.5 5 0" {...stroke} />
    <path d="M10 12.5c1.6-2 3-2 4.4 0" {...stroke} opacity="0.6" />
    <circle cx="22.5" cy="10.5" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const IconCurrent = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <path d="M4 10c3-3.4 5.6-3.4 8.4 0s5.4 3.4 8.2 0 5-3.2 7.4-.6" {...stroke} />
    <path d="M4 17c3-3.4 5.6-3.4 8.4 0s5.4 3.4 8.2 0 5-3.2 7.4-.6" {...stroke} opacity="0.75" />
    <path d="M4 24c3-3.4 5.6-3.4 8.4 0s5.4 3.4 8.2 0 5-3.2 7.4-.6" {...stroke} opacity="0.5" />
  </svg>
);

export const IconCompass = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <circle cx="16" cy="16" r="12.5" {...stroke} />
    <path d="M21.5 10.5l-3.2 7.8-7.8 3.2 3.2-7.8z" {...stroke} />
    <circle cx="16" cy="16" r="1.3" fill="currentColor" stroke="none" />
    <path d="M16 3.5v2.6M16 25.9v2.6M3.5 16h2.6M25.9 16h2.6" {...stroke} opacity="0.6" />
  </svg>
);

export const IconAnchor = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <circle cx="16" cy="7" r="3" {...stroke} />
    <path d="M16 10v16" {...stroke} />
    <path d="M9 14h14" {...stroke} />
    <path d="M5.5 18c.6 6 5 9.5 10.5 9.5S25.9 24 26.5 18" {...stroke} />
    <path d="M5.5 18l-2.3 1.6M5.5 18l2.6 1M26.5 18l2.3 1.6M26.5 18l-2.6 1" {...stroke} opacity="0.7" />
  </svg>
);

export const IconSextant = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <path d="M16 4a13 13 0 0 1 11.2 6.4L16 26 4.8 10.4A13 13 0 0 1 16 4z" {...stroke} />
    <path d="M16 26V12" {...stroke} opacity="0.7" />
    <circle cx="16" cy="11" r="1.6" {...stroke} />
    <path d="M9 22l3.4-2.2M23 22l-3.4-2.2" {...stroke} opacity="0.6" />
  </svg>
);

export const IconArrow = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 20 20" className={className} aria-hidden>
    <path d="M4.5 15.5l11-11M7 4.5h8.5V13" {...stroke} strokeWidth={1.9} />
  </svg>
);

export const IconShell = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M12 3.5c5 0 8.5 4 8.5 9.5 0 4.5-3.5 7.5-8.5 7.5S3.5 17.5 3.5 13C3.5 7.5 7 3.5 12 3.5z" {...stroke} />
    <path d="M12 20.5V9M12 9c0-2 1-4 2.5-5M12 9c0-2-1-4-2.5-5M12 13l6.8-4.4M12 13l-6.8-4.4" {...stroke} opacity="0.7" />
  </svg>
);

export const IconSignal = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    <path d="M7.5 16.5a6.4 6.4 0 0 1 0-9M16.5 7.5a6.4 6.4 0 0 1 0 9" {...stroke} />
    <path d="M4.6 19.4a10.5 10.5 0 0 1 0-14.8M19.4 4.6a10.5 10.5 0 0 1 0 14.8" {...stroke} opacity="0.55" />
  </svg>
);

export const IconCloud = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <path d="M9 22a5.5 5.5 0 0 1-.6-10.97A7 7 0 0 1 22 9.5 5.75 5.75 0 0 1 23 21v1H9z" {...stroke} />
    <path d="M11 26.5h10M14 30h4" {...stroke} opacity="0.55" />
  </svg>
);

export const IconChart = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <path d="M5 5v22h22" {...stroke} />
    <path d="M10 21l5-6 4 3 6-8" {...stroke} />
    <circle cx="25" cy="10" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);

export const IconSpark = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <path d="M16 4l2.6 7.6L26 14l-7.4 2.4L16 24l-2.6-7.6L6 14l7.4-2.4z" {...stroke} />
    <path d="M25 22l1.1 3 3 1.1-3 1.1L25 30l-1.1-2.8-3-1.1 3-1.1z" {...stroke} opacity="0.7" />
  </svg>
);

export const IconBranch = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <circle cx="9" cy="7" r="3" {...stroke} />
    <circle cx="9" cy="25" r="3" {...stroke} />
    <circle cx="23" cy="9" r="3" {...stroke} />
    <path d="M9 10v12" {...stroke} />
    <path d="M23 12c0 5-6 5-10.5 7.5" {...stroke} />
  </svg>
);

export const SKILL_ICONS = {
  current: IconCurrent,
  compass: IconCompass,
  anchor: IconAnchor,
  sextant: IconSextant,
  cloud: IconCloud,
  chart: IconChart,
  spark: IconSpark,
  branch: IconBranch,
};

/* ============ Nav ============ */
const NAV_LINKS = [
  { href: "#about", label: "Journey" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#next", label: "What’s Next" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-shell/85 backdrop-blur-md shadow-[0_2px_24px_rgba(13,59,64,0.08)] py-2.5" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-2.5 text-ink">
          <span className="text-teal transition-transform duration-500 group-hover:rotate-[18deg]">
            <IconWaveMark className="w-9 h-9" />
          </span>
          <span className="font-display font-bold text-lg tracking-tight leading-none">
            kousthubhee
            <span className="text-coral">.</span>k
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink/70 hover:text-teal transition-colors"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-coral transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="flex items-center gap-2 rounded-full border border-teal/30 bg-shell/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-teal hover:border-coral hover:text-coral transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-aqua pulse-dot" />
          open to relocation
        </a>
      </div>
    </header>
  );
}

/* ============ Marquee ============ */
export function SkillMarquee() {
  const row = (key: string, rev = false) => (
    <div key={key} className={`marquee-track flex shrink-0 items-center ${rev ? "rev" : ""}`}>
      {[0, 1].map((dup) => (
        <div key={dup} className="flex items-center">
          {MARQUEE_ITEMS.map((item) => (
            <span key={`${dup}-${item}`} className="flex items-center">
              <span className="px-6 font-display font-bold text-xl sm:text-2xl tracking-tight text-shell/95 whitespace-nowrap">
                {item}
              </span>
              <svg viewBox="0 0 26 12" className="w-6 h-3 text-coral" aria-hidden>
                <path d="M1 8c3-4.6 5-4.6 7.6 0s4.6 4.6 7.2 0 4.4-4.2 6.8-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
  return (
    <div className="marquee-paused relative z-10 bg-deep py-4 sm:py-5 overflow-hidden -rotate-[0.6deg] scale-[1.02] shadow-[0_10px_40px_rgba(10,46,51,0.25)]">
      <div className="flex whitespace-nowrap">{row("a")}</div>
    </div>
  );
}

/* ============ Section heading ============ */
export function SectionHeading({
  kicker,
  title,
  note,
  light = false,
}: {
  kicker: string;
  title: ReactNode[];
  note?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-12 sm:mb-16">
      <Reveal>
        <div className={`flex items-center gap-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] ${light ? "text-seafoam/80" : "text-teal"}`}>
          <svg viewBox="0 0 40 10" className="w-9 h-2.5 text-coral" aria-hidden>
            <path d="M1 6.5c4-5.5 6.5-5.5 10 0s6 5.5 9.5 0 6-5 9.5-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          {kicker}
        </div>
      </Reveal>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <h2 className={`font-display font-bold tracking-tight leading-[0.98] text-[clamp(2.2rem,5.5vw,4.2rem)] ${light ? "text-shell" : "text-ink"}`}>
          <MaskLines lines={title} />
        </h2>
        {note && (
          <Reveal delay={200} className="max-w-xs">
            <p className={`text-sm leading-relaxed border-l-2 border-coral pl-4 ${light ? "text-seafoam/75" : "text-ink/60"}`}>{note}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

/* ============ Noise overlay ============ */
export function NoiseOverlay() {
  return <div className="noise-layer" aria-hidden />;
}
