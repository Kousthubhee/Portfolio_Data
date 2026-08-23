import { useEffect, useRef, useState } from "react";

/** true when the user prefers reduced motion */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** observe an element; returns [ref, inView] (fires once) */
export function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/** animated counter that starts when scrolled into view */
export function useCountUp(target: number, opts?: { duration?: number; decimals?: number }) {
  const { duration = 1700, decimals = 0 } = opts ?? {};
  const [ref, inView] = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduced]);
  const text = val.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return { ref, text };
}

const GLYPHS = "≈~◦·∙:∙◦~≈abcdefgkmnprstuvz0123479";

/** scramble-decode text effect */
export function useScramble(text: string, opts?: { delay?: number; speed?: number }) {
  const { delay = 0, speed = 34 } = opts ?? {};
  const [out, setOut] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return text;
    }
    return Array.from(text)
      .map((ch) => (ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
      .join("");
  });
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    let frame = 0;
    let raf = 0;
    let timeout = 0;
    const chars = Array.from(text);
    const run = () => {
      frame += 1;
      const resolved = Math.floor(frame / 2.4);
      const next = chars
        .map((ch, i) => {
          if (ch === " " || ch === "\n") return ch;
          if (i < resolved) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setOut(next);
      if (resolved <= chars.length) {
        raf = window.setTimeout(run, speed) as unknown as number;
      } else {
        setOut(text);
      }
    };
    timeout = window.setTimeout(run, delay) as unknown as number;
    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(raf);
    };
  }, [text, delay, speed, reduced]);
  return out;
}

/** live clock string, updated every second */
export function useClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    setTime(fmt());
    const id = window.setInterval(() => setTime(fmt()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}
