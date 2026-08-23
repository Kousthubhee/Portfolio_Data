export const PORTRAIT =
  "https://image.qwenlm.ai/generated-images/8b75459b-c9d3-4de9-902f-690a1957ece5/_result.png";

export interface Project {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  kpis: { value: string; label: string }[];
  stack: string[];
  image: string;
  tint: string;
  year: string;
}

export const PROJECTS: Project[] = [
  {
    id: "coral",
    index: "01",
    name: "Coral Commerce",
    tagline: "Churn-tide forecasting",
    description:
      "A survival-analysis model that reads early warning signals in 18 months of subscription data — flagging at-risk customers three weeks before they drift away, and telling retention teams exactly which current to swim against.",
    kpis: [
      { value: "−23%", label: "monthly churn" },
      { value: "+€410K", label: "CLV recovered" },
      { value: "3 wks", label: "early warning" },
    ],
    stack: ["Python", "scikit-learn", "BigQuery", "dbt"],
    image:
      "https://image.qwenlm.ai/generated-images/6e85c962-bcf6-4413-9ba7-0318e52497de/_result.png",
    tint: "bg-blush/60",
    year: "2025",
  },
  {
    id: "glacier",
    index: "02",
    name: "Glacier Metrics",
    tagline: "Real-time revenue iceberg",
    description:
      "A streaming executive dashboard that surfaces the 10% of metrics driving 90% of the movement — so leadership stopped drowning in 400-tab workbooks and started reading one warm, honest iceberg.",
    kpis: [
      { value: "400→12", label: "reports consolidated" },
      { value: "5 s", label: "data latency" },
      { value: "6", label: "exec teams onboard" },
    ],
    stack: ["Looker", "BigQuery", "Kafka", "SQL"],
    image:
      "https://image.qwenlm.ai/generated-images/197a284e-cbff-4af8-8a86-91fdadedefb3/_result.png",
    tint: "bg-mist/70",
    year: "2025",
  },
  {
    id: "pearl",
    index: "03",
    name: "Pearl Search",
    tagline: "Marketplace funnel dive",
    description:
      "Funnel analysis across 2.1M sessions found one leaky step: a search filter that buried the pearls on page three. One shipped fix — and the conversion gains kept compounding like interest on a good catch.",
    kpis: [
      { value: "+18%", label: "search conversion" },
      { value: "2.1M", label: "sessions analysed" },
      { value: "1", label: "fix, shipped in a sprint" },
    ],
    stack: ["SQL", "Amplitude", "A/B testing", "Figma"],
    image:
      "https://image.qwenlm.ai/generated-images/68cefeee-09fe-4dff-b7d7-9f81b98e2577/_result.png",
    tint: "bg-seafoam/40",
    year: "2024",
  },
  {
    id: "kelp",
    index: "04",
    name: "Kelp Forecast",
    tagline: "Demand planning that breathes",
    description:
      "Prophet models fed with weather, tides and event features to forecast demand across 340 SKUs — restocking shelves before the tide turns instead of apologising after it does.",
    kpis: [
      { value: "−31%", label: "waste & stockouts" },
      { value: "340", label: "SKUs forecast" },
      { value: "94%", label: "WAPE accuracy" },
    ],
    stack: ["Python", "Prophet", "Airflow", "Tableau"],
    image:
      "https://image.qwenlm.ai/generated-images/2267c647-049e-4b5f-af95-ee338e9a65b5/_result.png",
    tint: "bg-blush/50",
    year: "2024",
  },
];

export interface SkillGroup {
  title: string;
  icon: "current" | "compass" | "anchor" | "sextant";
  note: string;
  skills: { name: string; pct: number }[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Query & Code",
    icon: "current",
    note: "the engine room",
    skills: [
      { name: "SQL — window functions, CTEs, tuning", pct: 95 },
      { name: "Python — pandas, scikit-learn", pct: 88 },
      { name: "R — tidyverse, ggplot", pct: 70 },
      { name: "Git & reproducible notebooks", pct: 84 },
    ],
  },
  {
    title: "Visualization & BI",
    icon: "compass",
    note: "the chart room",
    skills: [
      { name: "Tableau — LODs, dashboards", pct: 93 },
      { name: "Looker — LookML modelling", pct: 86 },
      { name: "Power BI — DAX, dataflows", pct: 80 },
      { name: "Figma — chart & report design", pct: 72 },
    ],
  },
  {
    title: "Pipelines & Warehousing",
    icon: "anchor",
    note: "the anchorage",
    skills: [
      { name: "dbt — modelling & tests", pct: 87 },
      { name: "BigQuery — slots, partitioning", pct: 91 },
      { name: "Airflow — orchestration", pct: 78 },
      { name: "Kafka — streaming sources", pct: 64 },
    ],
  },
  {
    title: "Statistics & Experiments",
    icon: "sextant",
    note: "the navigation deck",
    skills: [
      { name: "A/B testing — design & inference", pct: 90 },
      { name: "Regression & causal inference", pct: 83 },
      { name: "Forecasting — Prophet, ARIMA", pct: 86 },
      { name: "Bayesian methods", pct: 61 },
    ],
  },
];

export interface FieldNote {
  quote: string;
  author: string;
  role: string;
  place: string;
  rotate: string;
}

export const FIELD_NOTES: FieldNote[] = [
  {
    quote:
      "Marina doesn't hand you a chart — she hands you a decision. Our retention strategy finally has a compass, and the whole team reads from the same tide table.",
    author: "Sofia Reinholt",
    role: "VP Product, Coral Commerce",
    place: "Amsterdam",
    rotate: "-rotate-2",
  },
  {
    quote:
      "She translated two years of messy events data into a story the board understood in ten minutes. Ten minutes. I've seen agencies take ten weeks.",
    author: "Daniel Okafor",
    role: "Head of Data, Glacier Group",
    place: "Oslo",
    rotate: "rotate-1",
  },
  {
    quote:
      "The rare analyst who sweats the data model AND the pixels. Her dashboards are the ones people actually open on Monday morning — with coffee, voluntarily.",
    author: "Yuki Tanaka",
    role: "Design Lead, Pearl Search",
    place: "Lisbon",
    rotate: "rotate-2",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Dive",
    text: "Stakeholder interviews and question-framing. Every project starts underwater: listening for the question behind the question.",
  },
  {
    step: "02",
    title: "Filter",
    text: "Collection, cleaning, modelling. Pipelines scrubbed, schemas mapped, nulls accounted for — the 80% of the work nobody sees.",
  },
  {
    step: "03",
    title: "Chart",
    text: "Exploration and statistics. Hypotheses tested against the current, not the wish. Confidence intervals always included.",
  },
  {
    step: "04",
    title: "Surface",
    text: "Visualization and narrative. Dashboards and decks that read like a tide chart: glanceable, honest, actionable.",
  },
  {
    step: "05",
    title: "Navigate",
    text: "Decision and iteration. Insight only counts when it changes course — so we track the decision, then re-measure.",
  },
];

export const MARQUEE_ITEMS = [
  "SQL",
  "PYTHON",
  "TABLEAU",
  "DBT",
  "BIGQUERY",
  "LOOKER",
  "A/B TESTING",
  "STORYTELLING",
  "AIRFLOW",
  "FORECASTING",
  "FUNNEL ANALYSIS",
  "SEGMENTATION",
];

export const SIGNAL_LOG = [
  { t: "06:12", k: "pipeline_check", v: "412 models green", ok: true },
  { t: "08:47", k: "churn_signal", v: "cohort Q2 drifting +1.8%", ok: false },
  { t: "11:03", k: "experiment", v: "pearl-search-04 → significant", ok: true },
  { t: "14:26", k: "forecast", v: "kelp SKUs restocked ahead", ok: true },
  { t: "17:58", k: "dashboard", v: "glacier board read 41×", ok: true },
];
