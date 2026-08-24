import { useEffect, useMemo, useRef, useState } from "react";
import OceanScene from "./OceanScene";
import { NoiseOverlay } from "./Chrome";
import { Vignette } from "./Cinematic";

interface ORModel {
  id: string;
  name: string;
  description?: string;
  context_length?: number;
  pricing?: { prompt?: string; completion?: string };
  created?: number;
}

const FREE_HINTS = [
  {
    title: "The API has no “free” flag",
    body: "GET /api/v1/models returns everything. Filter client-side: pricing.prompt === \"0\" && pricing.completion === \"0\" — or pick ids ending in :free.",
  },
  {
    title: "The model browser buries them",
    body: "The default page sorts by popularity. Use the official zero-price filter: openrouter.ai/models?max_price=0 — that is the live free list.",
  },
  {
    title: "App dropdowns are snapshots",
    body: "n8n, SillyTavern, Open WebUI etc. cache the model list, so free models go missing. Type the id manually: openrouter/free (auto-router) or any-model:free.",
  },
  {
    title: "Limits are credit-gated",
    body: "0 credits → 50 free requests/day total. Buy ≥ $10 of credits once → 1,000 free requests/day. Hitting the wall can look like the model vanished.",
  },
  {
    title: "Free models appear & disappear",
    body: "They exist only while an upstream provider hosts them for free. Never hardcode a list — query the API, exactly like this radar does.",
  },
];

function fmtCtx(n?: number) {
  if (!n) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}

function CopyBtn({ value, small = false }: { value: string; small?: boolean }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1400);
  };
  return (
    <button
      onClick={copy}
      className={`group/copy shrink-0 rounded-full border font-mono uppercase tracking-[0.14em] transition-all duration-300 ${
        small ? "px-3 py-1.5 text-[9.5px]" : "px-4 py-2 text-[10.5px]"
      } ${
        copied
          ? "border-aqua/60 bg-teal text-shell"
          : "border-ink/15 bg-shell/70 text-ink/60 hover:border-coral hover:text-coral hover:-translate-y-0.5"
      }`}
    >
      {copied ? "✓ copied" : "copy id"}
    </button>
  );
}

function SonarLoader() {
  return (
    <div className="flex flex-col items-center gap-6 py-20">
      <div className="relative w-28 h-28" aria-hidden>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-teal/40">
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" opacity="0.7" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
        </svg>
        <span className="sonar-ring absolute inset-2 rounded-full border-2 border-coral/70" />
        <span className="sonar-ring r2 absolute inset-2 rounded-full border-2 border-aqua/70" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-coral" />
      </div>
      <p className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-ink/60 animate-blink">
        pinging openrouter.ai/api/v1/models …
      </p>
    </div>
  );
}

export default function FreeModelsRadar({ reduced }: { reduced: boolean }) {
  const [models, setModels] = useState<ORModel[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"ctx" | "name">("ctx");

  useEffect(() => {
    let alive = true;
    fetch("https://openrouter.ai/api/v1/models")
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((j) => {
        if (!alive) return;
        const all: ORModel[] = j?.data ?? [];
        const free = all.filter((m) => {
          if (m.id.endsWith(":free")) return true;
          const p = parseFloat(m.pricing?.prompt ?? "1");
          const c = parseFloat(m.pricing?.completion ?? "1");
          return p === 0 && c === 0;
        });
        setModels(free);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  const shown = useMemo(() => {
    if (!models) return [];
    const q = query.trim().toLowerCase();
    let list = q ? models.filter((m) => (m.id + " " + (m.name ?? "")).toLowerCase().includes(q)) : models;
    list = [...list].sort((a, b) =>
      sort === "ctx" ? (b.context_length ?? 0) - (a.context_length ?? 0) : a.id.localeCompare(b.id)
    );
    return list;
  }, [models, query, sort]);

  const maxCtx = useMemo(() => Math.max(1, ...(shown.map((m) => m.context_length ?? 0) || [1])), [shown]);

  return (
    <div className="relative min-h-screen font-body text-ink antialiased">
      <OceanScene reduced={reduced} />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-[1] bg-gradient-to-b from-mist/82 via-mist/90 to-mist/[0.985]"
        aria-hidden
      />
      <Vignette />
      <NoiseOverlay />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 pt-14 pb-24">
        {/* header */}
        <a
          href="?"
          className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55 hover:text-coral transition-colors"
        >
          <svg viewBox="0 0 20 20" className="w-4 h-4" aria-hidden>
            <path d="M13 4l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          back to the portfolio
        </a>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-teal">
              openrouter · live sonar sweep
            </p>
            <h1 className="mt-2 font-display font-extrabold tracking-tight leading-[0.95] text-[clamp(2.2rem,5.5vw,4rem)]">
              Free Models <span className="text-coral">Radar</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-display font-extrabold text-4xl text-teal tabular-nums leading-none">
                {models ? shown.length : "··"}
              </p>
              <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/50">
                free models live now
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-coral animate-blink" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45 rotate-90 origin-center translate-y-2">
                live
              </span>
            </div>
          </div>
        </div>

        {/* router pill */}
        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-teal/25 bg-shell/85 backdrop-blur-md px-5 py-4">
          <div className="min-w-0">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink/50">
              The lazy fix — one id, OpenRouter picks a free model for you
            </p>
            <code className="mt-1 block font-mono text-lg sm:text-xl font-semibold text-teal">openrouter/free</code>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <CopyBtn value="openrouter/free" />
            <a
              href="https://openrouter.ai/openrouter/free"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50 hover:text-coral transition-colors"
            >
              docs ↗
            </a>
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1fr_340px] gap-10 items-start">
          {/* results */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[220px]">
                <svg viewBox="0 0 20 20" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" aria-hidden>
                  <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="filter slugs — e.g. llama, gemini, deepseek…"
                  className="w-full rounded-full border border-ink/15 bg-shell/85 backdrop-blur-md py-3 pl-10 pr-4 font-mono text-[13px] text-ink placeholder:text-ink/35 outline-none focus:border-coral focus:shadow-[0_0_0_4px_rgba(255,122,104,0.12)] transition-all"
                />
              </div>
              <div className="flex rounded-full border border-ink/15 bg-shell/85 p-1 font-mono text-[10px] uppercase tracking-[0.14em]">
                {(["ctx", "name"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className={`rounded-full px-4 py-2 transition-all duration-300 ${
                      sort === s ? "bg-teal text-shell shadow" : "text-ink/55 hover:text-teal"
                    }`}
                  >
                    {s === "ctx" ? "context ↓" : "a–z"}
                  </button>
                ))}
              </div>
            </div>

            {failed && (
              <div className="mt-6 rounded-2xl border border-coral/40 bg-blush/50 px-6 py-5">
                <p className="font-display font-bold text-lg">Sonar jammed — couldn&rsquo;t reach OpenRouter from here.</p>
                <p className="mt-1.5 text-sm text-ink/70">
                  No problem: the authoritative live list is one click away, and this one-liner gets you every free id
                  from any terminal:
                </p>
                <pre className="mt-3 overflow-x-auto rounded-xl bg-abyss text-seafoam px-4 py-3 font-mono text-[11.5px] leading-relaxed">
{`curl -s https://openrouter.ai/api/v1/models \\
  | jq -r '.data[] | select(.pricing.prompt=="0") | .id'`}
                </pre>
                <a
                  href="https://openrouter.ai/models?max_price=0"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-coral hover:underline"
                >
                  open the official free list ↗
                </a>
              </div>
            )}

            {!failed && !models && <SonarLoader />}

            {models && (
              <ul className="mt-6 space-y-3">
                {shown.map((m, i) => (
                  <li
                    key={m.id}
                    className="group rv is-in rounded-2xl border border-ink/10 bg-shell/88 backdrop-blur-md px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-[0_14px_36px_rgba(13,59,64,0.12)]"
                    style={{ transitionDelay: `${Math.min(i, 10) * 30}ms` }}
                  >
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <code className="font-mono text-[13.5px] font-semibold text-ink group-hover:text-teal transition-colors break-all">
                        {m.id}
                      </code>
                      <span className="rounded-full bg-mist border border-aqua/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-teal">
                        $0.00
                      </span>
                      <CopyBtn value={m.id} small />
                    </div>
                    {m.description && (
                      <p className="mt-1.5 text-[13px] leading-relaxed text-ink/65 line-clamp-2">{m.description}</p>
                    )}
                    <div className="mt-2.5 flex items-center gap-3">
                      <div className="h-1.5 flex-1 rounded-full bg-mist overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-aqua to-gold transition-[width] duration-700"
                          style={{ width: `${Math.max(6, ((m.context_length ?? 0) / maxCtx) * 100)}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/55 tabular-nums shrink-0">
                        {fmtCtx(m.context_length)} ctx
                      </span>
                    </div>
                  </li>
                ))}
                {shown.length === 0 && (
                  <li className="rounded-2xl border border-dashed border-ink/20 px-6 py-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
                    no blips match “{query}”
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* why-free-is-not-showing */}
          <aside className="lg:sticky lg:top-10 space-y-5">
            <div className="rounded-[24px] border border-ink/10 bg-ink text-mist p-6 sm:p-7 shadow-[0_26px_70px_rgba(13,59,64,0.3)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-coral">Field manual</p>
              <h2 className="mt-2 font-display font-bold text-2xl tracking-tight">
                Why &ldquo;free&rdquo; isn&rsquo;t showing for you
              </h2>
              <ol className="mt-5 space-y-4">
                {FREE_HINTS.map((h, i) => (
                  <li key={h.title} className="flex gap-3.5">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mist/10 border border-mist/20 font-mono text-[10px] text-gold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-display font-semibold text-[14.5px] text-shell">{h.title}</p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-seafoam/80">{h.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[24px] border border-ink/10 bg-shell/88 backdrop-blur-md p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50">Free-tier rate limits</p>
              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex justify-between font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/60">
                    <span>0 credits</span>
                    <span className="text-coral font-semibold">50 req / day</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-mist overflow-hidden">
                    <div className="h-full rounded-full bg-coral" style={{ width: "9%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/60">
                    <span>≥ $10 credits bought once</span>
                    <span className="text-teal font-semibold">1,000 req / day</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-mist overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-aqua to-teal" style={{ width: "100%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-ink/10 bg-shell/88 backdrop-blur-md p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50">Python — same filter this page uses</p>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-abyss text-seafoam px-4 py-3 font-mono text-[11px] leading-relaxed">
{`import requests
d = requests.get(
  "https://openrouter.ai/api/v1/models"
).json()["data"]
free = [m["id"] for m in d
  if float(m["pricing"]["prompt"]) == 0]
print(free)`}
              </pre>
            </div>

            <a
              href="https://openrouter.ai/models?max_price=0"
              target="_blank"
              rel="noreferrer"
              className="btn-wave flex items-center justify-between rounded-2xl bg-ink px-6 py-4 font-display font-semibold text-shell"
            >
              Official free list on OpenRouter
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-seafoam/80">↗</span>
            </a>
          </aside>
        </div>

        <p className="mt-14 text-center font-mono text-[9.5px] uppercase tracking-[0.24em] text-ink/40">
          live data · openrouter.ai/api/v1/models · refreshed on every visit
        </p>
      </div>
    </div>
  );
}
