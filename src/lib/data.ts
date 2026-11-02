export const IMG_FINANCE =
  "https://image.qwenlm.ai/generated-images/cc39413d-dcc5-4c43-82d2-febea1bb94ce/_result.png";
export const IMG_AI_DASH =
  "https://image.qwenlm.ai/generated-images/b1bcc877-db89-45be-8998-3f2d0d242904/_result.png";
export const IMG_ONBOARD =
  "https://image.qwenlm.ai/generated-images/332ef360-8319-4285-904b-99b0addfa25d/_result.png";
export const IMG_CKD =
  "https://image.qwenlm.ai/generated-images/d862a4f8-ee70-486a-a850-306392c28b93/_result.png";
export const IMG_AUTOMATION =
  "https://image.qwenlm.ai/generated-images/be1d43da-1a03-477b-aa2e-58067a45ebb7/_result.png";

/* ---------------- marquee ---------------- */
export const MARQUEE_ITEMS = [
  "Python",
  "SQL",
  "Tableau",
  "Power BI",
  "n8n",
  "Scikit-learn",
  "BigQuery",
  "Pandas",
  "Plotly",
  "Oracle BI",
  "A/B Testing",
  "Generative AI",
  "Flask",
  "Prompt Engineering",
];

/* ---------------- journey (about) ---------------- */
export interface JourneyBlock {
  index: string;
  title: string;
  org: string;
  body: string[];
  highlight?: string;
}

export const JOURNEY: JourneyBlock[] = [
  {
    index: "01",
    title: "Technology taught me how systems work.",
    org: "Infosys · Hyderabad",
    body: [
      "At Infosys I worked with enterprise middleware environments, production systems, migrations, troubleshooting, SQL-based data operations and operational reporting.",
      "I learned that behind every application or business process is a network of systems, dependencies, data, people and decisions.",
    ],
  },
  {
    index: "02",
    title: "Analytics taught me to ask better questions.",
    org: "NEOMA Business School · Rouen",
    body: [
      "During my M.Sc. in Business Analytics I developed stronger capabilities in SQL, Python, statistics, visualization, predictive analytics, business intelligence, data modeling and machine learning.",
      "More importantly, I learned that analytics is not simply about producing a query or a dashboard. The real question is:",
    ],
    highlight: "What decision should this analysis help someone make?",
  },
  {
    index: "03",
    title: "Product work taught me to connect data with people.",
    org: "NEOMA Incubator · Venture Studio",
    body: [
      "At the NEOMA Business School Incubator I worked with international students, analyzed user feedback, translated problems into product requirements, developed analytics frameworks, and contributed to an AI-powered onboarding solution.",
    ],
  },
  {
    index: "04",
    title: "AI & automation are where I am exploring next.",
    org: "The lab · everywhere",
    body: [
      "I have been experimenting with workflows involving ChatGPT, Claude, n8n, LLM APIs, Ollama, Generative AI and Python automation.",
      "My interest is not AI for the sake of AI — it is finding practical ways to reduce repetitive work, improve decision-making, and build better products and workflows.",
    ],
    highlight: "Find repetitive work → understand the workflow → automate → measure the result.",
  },
  {
    index: "05",
    title: "The through-line — I am highly adaptable.",
    org: "India → France → India",
    body: [
      "Every jump — a new country, a new language, a new domain — taught me something important about myself: I am highly adaptable.",
      "New environment, unfamiliar tech stack, a role I have never done before — I find my footing fast, and I make it work.",
    ],
    highlight: "Give me a chance with any environment or technology, and I will figure it out.",
  },
];

/* ---------------- route card ---------------- */
export interface RouteLeg {
  code: string;
  place: string;
  years: string;
  note: string;
  open?: boolean;
}

export const ROUTE_LEGS: RouteLeg[] = [
  {
    code: "HYD",
    place: "Hyderabad, India",
    years: "2017 – 2023",
    note: "B.E. Computer Science · Systems Engineer @ Infosys",
  },
  {
    code: "ROUEN",
    place: "Rouen, France",
    years: "2024 – 2026",
    note: "M.Sc. Business Analytics · Incubator & Venture Studio",
  },
  {
    code: "HYD",
    place: "Hyderabad, India",
    years: "2026",
    note: "Projects · AI · Automation · Exploration",
  },
  {
    code: "OPEN",
    place: "India · Europe · Worldwide",
    years: "Next",
    note: "Open to relocation — remote, hybrid or on-site",
    open: true,
  },
];

export const LANGUAGES = [
  { name: "Telugu", level: "Native", pct: 100 },
  { name: "English", level: "C2", pct: 96 },
  { name: "Hindi", level: "C2", pct: 96 },
  { name: "French", level: "A2", pct: 36 },
];

/* ---------------- career timeline ---------------- */
export interface TimelineNode {
  period: string;
  place: string;
  title: string;
  org: string;
  desc: string;
  future?: boolean;
}

export const TIMELINE: TimelineNode[] = [
  {
    period: "2017 – 2021",
    place: "Hyderabad, India",
    title: "B.E. · Computer Science & Engineering",
    org: "Stanley College of Engineering & Technology",
    desc: "Foundations in data structures, algorithms, database management systems, AI, data mining and machine learning.",
  },
  {
    period: "2021",
    place: "Remote, India",
    title: "Data Analytics Intern",
    org: "ShapeAI",
    desc: "Python, Pandas, NumPy and Tableau — cleaning 10,000+ records and translating analytical observations into business recommendations.",
  },
  {
    period: "2021 – 2023",
    place: "Hyderabad, India",
    title: "Systems Engineer",
    org: "Infosys",
    desc: "Enterprise middleware, data operations, BI support, SQL-based reporting and OBIEE migrations across three production environments.",
  },
  {
    period: "2024 – 2025",
    place: "Rouen, France",
    title: "M.Sc. Business Analytics",
    org: "NEOMA Business School",
    desc: "Statistics, predictive analytics, business intelligence, machine learning, SQL, Python and data modeling.",
  },
  {
    period: "May 2025 – Jun 2026",
    place: "Rouen, France",
    title: "Data & Product Analytics Lead",
    org: "NEOMA Incubator · Venture Studio",
    desc: "User research with 240+ international students, product KPIs, experiments on user flows, and an AI-powered FAQ solution that cut repetitive support queries by ~30%.",
  },
  {
    period: "2026",
    place: "India",
    title: "Professional Development",
    org: "Career Exploration",
    desc: "Building projects across analytics, BI, cloud, AI and automation while exploring opportunities in India and internationally.",
  },
  {
    period: "Next",
    place: "Unknown — and open to possibilities",
    title: "What’s Next?",
    org: "The next chapter is still being written",
    desc: "Open to opportunities in India, Europe, and internationally.",
    future: true,
  },
];

/* ---------------- education ---------------- */
export interface EducationEntry {
  school: string;
  degree: string;
  place: string;
  period: string;
  areas: string[];
}

export const EDUCATION: EducationEntry[] = [
  {
    school: "NEOMA Business School",
    degree: "M.Sc. Business Analytics",
    place: "Rouen, France",
    period: "Sep 2024 – Dec 2025",
    areas: [
      "Business Analytics",
      "Data Visualization & Storytelling",
      "Python & R",
      "Enterprise Data Management",
      "Statistics",
      "Predictive Analytics",
      "Business Intelligence",
      "Data Modeling",
      "Machine Learning",
      "Business Problem Solving",
    ],
  },
  {
    school: "Stanley College of Engineering & Technology",
    degree: "B.E. · Computer Science & Engineering",
    place: "Hyderabad, India",
    period: "Aug 2017 – Jul 2021",
    areas: [
      "Data Structures",
      "Algorithms",
      "Database Management Systems",
      "Artificial Intelligence",
      "Data Mining",
      "Machine Learning",
    ],
  },
];

/* ---------------- experience ---------------- */
export interface ExperienceEntry {
  org: string;
  role: string;
  place: string;
  period: string;
  bullets: string[];
  focus: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    org: "NEOMA Business School Incubator",
    role: "Data & Product Analytics Lead · Venture Studio",
    place: "Rouen, France",
    period: "May 2025 – Jun 2026",
    bullets: [
      "Led user research involving 240+ international students, using structured analysis of survey responses to identify recurring onboarding friction points.",
      "Translated user insights into measurable product requirements and contributed to a centralized student onboarding platform.",
      "Defined product KPIs and developed a performance-tracking framework to support product and roadmap decisions.",
      "Designed and evaluated experiments around user flows to validate product hypotheses.",
      "Contributed to an AI-powered FAQ solution that reduced repetitive support queries by approximately 30%.",
      "Presented data-backed product concepts and analytical findings to university leadership.",
      "Secured selection into the competitive NEOMA Venture Studio and contributed to a comprehensive analytics report.",
    ],
    focus: [
      "Product Analytics",
      "User Research",
      "Business Analysis",
      "Requirements Gathering",
      "KPI Design",
      "A/B Testing",
      "AI",
      "UX",
      "Digital Transformation",
    ],
  },
  {
    org: "Infosys",
    role: "Systems Engineer · Data Operations & BI Support",
    place: "Hyderabad, India",
    period: "Sep 2021 – Aug 2023",
    bullets: [
      "Extracted and analyzed incident data using SQL to identify recurring system failure patterns and support root-cause analysis.",
      "Automated SLA compliance and ticket-volume reporting from ServiceNow data, reducing manual reporting effort by ~40% for Network and BI teams.",
      "Built and maintained Excel-based reporting and BI dashboards for operational KPIs and SLA monitoring.",
      "Managed database user permissions through SQL and supported role-based access controls within enterprise IT environments.",
      "Performed data validation and reconciliation during Oracle BI / OBIEE RPD migrations across three production environments.",
      "Investigated data integrity issues and supported accurate downstream reporting.",
      "Worked with Network, BI, and Operations teams within Agile/Scrum processes to prioritize reporting and operational requirements.",
      "Supported Oracle Fusion Middleware environments through system maintenance, migrations, troubleshooting and production operations.",
      "Worked with Linux environments, enterprise application dependencies, ServiceNow, Jira, and Confluence.",
    ],
    focus: [
      "SQL",
      "Data Operations",
      "BI Support",
      "Incident Analytics",
      "Data Validation",
      "Enterprise Systems",
      "Middleware",
      "Reporting",
      "Root Cause Analysis",
    ],
  },
  {
    org: "ShapeAI",
    role: "Data Analytics Intern",
    place: "Remote, India",
    period: "Mar 2021 – May 2021",
    bullets: [
      "Used Python, Pandas, and NumPy to clean, process, and analyze 10,000+ records.",
      "Identified behavioral patterns and anomalies within the data.",
      "Developed interactive Tableau dashboards to communicate KPIs and analytical findings.",
      "Translated analytical observations into business-oriented recommendations for non-technical stakeholders.",
    ],
    focus: ["Python", "Pandas", "NumPy", "Tableau", "Data Cleaning", "KPI Reporting"],
  },
];

/* ---------------- projects ---------------- */
export interface Project {
  index: string;
  name: string;
  tagline: string;
  field: string;
  image: string;
  tint: string;
  objective: string;
  points: string[];
  outcome: string;
  kpis: { value: string; label: string }[];
  stack: string[];
  skillsLabel: string;
}

export const PROJECTS: Project[] = [
  {
    index: "01",
    name: "Financial Transactions Analytics",
    tagline: "Turning 13.3M+ financial transactions into business insights",
    field: "end-to-end financial analytics",
    image: IMG_FINANCE,
    tint: "bg-seafoam/35",
    objective:
      "An end-to-end financial analytics solution for understanding customer spending behavior, transaction performance, credit utilization and operational risk.",
    points: [
      "Integrated transaction, customer, card and merchant datasets into a unified analytical model of 13.3M+ records.",
      "Engineered features including credit utilization and debt-to-income ratio; built SQL workflows via SQLAlchemy.",
      "Analyzed spending patterns, transaction failures and customer financial health across segments.",
    ],
    outcome:
      "A scalable workflow capable of transforming millions of raw banking transactions into business-relevant insights.",
    kpis: [
      { value: "13.3M+", label: "transactions" },
      { value: "4", label: "datasets unified" },
      { value: "E2E", label: "pipeline" },
    ],
    stack: ["Python", "SQL", "Pandas", "NumPy", "SQLAlchemy", "Matplotlib", "Seaborn", "Plotly"],
    skillsLabel:
      "Large-scale data processing · Feature engineering · EDA · Financial analytics · Business intelligence",
  },
  {
    index: "02",
    name: "Global AI Content Impact Dashboard",
    tagline: "Understanding the business impact of artificial intelligence",
    field: "business intelligence · tableau",
    image: IMG_AI_DASH,
    tint: "bg-blush/45",
    objective:
      "An interactive business intelligence dashboard analyzing the global impact of AI across countries and industries — adoption, business performance, workforce transformation and consumer sentiment.",
    points: [
      "Analyzed 200+ records and 20+ business metrics covering AI adoption trends from 2020–2025.",
      "Designed interactive dashboards with KPI cards, geographic visualizations and story-driven navigation.",
      "Compared adoption, revenue growth, consumer trust, job displacement and human–AI collaboration.",
    ],
    outcome:
      "An executive-ready dashboard that converts complex AI-related data into accessible, actionable business insights.",
    kpis: [
      { value: "200+", label: "records" },
      { value: "20+", label: "business metrics" },
      { value: "2020–25", label: "coverage" },
    ],
    stack: ["Tableau", "KPI Reporting", "Data Storytelling", "BI", "Exploratory Analysis"],
    skillsLabel:
      "Tableau · KPI reporting · Data storytelling · Dashboard design · Cross-country & cross-industry analysis",
  },
  {
    index: "03",
    name: "NEOMA Student Onboarding Platform",
    tagline: "Designing a better international student experience",
    field: "product analytics · AI",
    image: IMG_ONBOARD,
    tint: "bg-mist",
    objective:
      "A centralized digital onboarding platform bringing academic, administrative, accommodation, transportation and campus resources into one experience for incoming international students.",
    points: [
      "Analyzed feedback from 240+ international students to map onboarding friction points.",
      "Translated pain points into functional requirements and an intuitive, centralized interface.",
      "Explored AI-powered support through an FAQ chatbot and structured knowledge base (−30% repetitive queries).",
    ],
    outcome:
      "A platform concept that simplifies the student journey while demonstrating business analysis, product analytics, UX and applied AI.",
    kpis: [
      { value: "240+", label: "students researched" },
      { value: "−30%", label: "support queries" },
      { value: "1", label: "centralized platform" },
    ],
    stack: ["Product Analytics", "Business Analysis", "UX", "AI Chatbot", "KPI Framework"],
    skillsLabel:
      "Requirements gathering · Process mapping · Product analytics · Stakeholder-centric design · Digital transformation",
  },
  {
    index: "04",
    name: "Chronic Kidney Disease Prediction",
    tagline: "Machine learning for early risk prediction",
    field: "machine learning · healthcare",
    image: IMG_CKD,
    tint: "bg-seafoam/40",
    objective:
      "A machine-learning prediction system capable of classifying patients as CKD or non-CKD using clinical data — delivered as a user-facing web application.",
    points: [
      "Built a complete ML pipeline with a Decision Tree Classifier over 400 patient records × 25 clinical attributes.",
      "Handled missing values, label encoding, feature processing, heatmaps and ROC/confusion-matrix evaluation.",
      "Shipped a Flask web app where users enter patient parameters and receive a prediction.",
    ],
    outcome:
      "~93% classification accuracy — an end-to-end predictive analytics solution combining ML with a real interface.",
    kpis: [
      { value: "93%", label: "accuracy" },
      { value: "400×25", label: "records × attributes" },
      { value: "Flask", label: "web app" },
    ],
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Flask", "HTML/CSS"],
    skillsLabel:
      "Supervised learning · Preprocessing on incomplete data · Model evaluation · ROC analysis · Deployment",
  },
  {
    index: "05",
    name: "AI-Powered Automations",
    tagline: "Exploring practical AI for everyday work",
    field: "the lab · ongoing",
    image: IMG_AUTOMATION,
    tint: "bg-blush/40",
    objective:
      "Active experimentation with AI-powered workflows that turn repetitive tasks into automated processes — AI-assisted research, job-search automation, information extraction, LLM assistants and local model experiments.",
    points: [
      "Building with n8n, LLM APIs, ChatGPT, Claude, Ollama and Python automation.",
      "Automating data processing, resume & application workflows, and AI-assisted productivity tools.",
      "Every experiment ends the same way: measure the result, keep what works.",
    ],
    outcome:
      "The goal is simple: find repetitive work, understand the workflow, automate what can be automated, measure the result.",
    kpis: [
      { value: "FIND", label: "step 01 · repetitive work" },
      { value: "AUTOMATE", label: "step 02 · the workflow" },
      { value: "MEASURE", label: "step 03 · the result" },
    ],
    stack: ["n8n", "LLM APIs", "ChatGPT", "Claude", "Ollama", "Generative AI", "Python"],
    skillsLabel: "Prompt engineering · AI agents · API-based AI workflows · Local LLMs · Automation",
  },
];

/* ---------------- skills ---------------- */
export interface SkillGroup {
  icon: string;
  name: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    icon: "current",
    name: "Data & Analytics",
    items: [
      "Python",
      "SQL",
      "R",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "EDA",
      "Data Cleaning",
      "Data Wrangling",
      "Data Validation",
      "Preprocessing",
      "Statistical Analysis",
      "Feature Engineering",
      "ETL / ELT",
    ],
  },
  {
    icon: "sextant",
    name: "Machine Learning & Statistics",
    items: [
      "Predictive Modeling",
      "Classification",
      "Clustering",
      "K-Means",
      "Decision Trees",
      "Regression",
      "Time Series",
      "Hypothesis Testing",
      "A/B Testing",
      "Model Evaluation",
      "ROC Analysis",
      "Confusion Matrix",
    ],
  },
  {
    icon: "compass",
    name: "BI & Visualization",
    items: [
      "Power BI",
      "Tableau",
      "Looker Studio",
      "Advanced Excel",
      "Matplotlib",
      "Plotly",
      "Seaborn",
      "Dashboard Design",
      "KPI Reporting",
      "Data Storytelling",
    ],
  },
  {
    icon: "cloud",
    name: "Cloud & Data Platforms",
    items: [
      "Google Cloud Platform",
      "BigQuery",
      "Cloud Storage",
      "Data Modeling",
      "Data Transformation",
      "Data Quality",
    ],
  },
  {
    icon: "chart",
    name: "Business & Product Analytics",
    items: [
      "Requirements Gathering",
      "Functional Requirements",
      "Root Cause Analysis",
      "Incident Analysis",
      "KPI Design",
      "Business Process Analysis",
      "Product Analytics",
      "User Research",
      "Stakeholder Communication",
      "Process Improvement",
    ],
  },
  {
    icon: "spark",
    name: "AI & Automation",
    items: [
      "Generative AI",
      "ChatGPT",
      "Claude",
      "n8n",
      "LLM APIs",
      "Ollama",
      "Prompt Engineering",
      "AI Agents",
      "AI Workflows",
      "Python Automation",
      "Chatbots",
    ],
  },
  {
    icon: "anchor",
    name: "Enterprise Technology",
    items: [
      "Oracle Fusion Middleware",
      "Oracle BI / OBIEE",
      "Oracle",
      "Linux",
      "ServiceNow",
      "Jira",
      "Confluence",
    ],
  },
  {
    icon: "branch",
    name: "Development & Tools",
    items: [
      "Git",
      "GitHub",
      "APIs",
      "JavaScript",
      "HTML",
      "CSS",
      "Flask",
      "Jupyter",
      "Supabase",
      "Alteryx",
      "KNIME",
      "RapidMiner",
    ],
  },
];

/* ---------------- certifications ---------------- */
export const CERTIFICATIONS = [
  { name: "Data Analysis with Excel Pivot Tables", issuer: "365 Financial Analyst", date: "Mar 2026" },
  { name: "Alteryx Bootcamp", issuer: "Udemy", date: "Feb 2026" },
  { name: "Complete Agile & Scrum Project Management", issuer: "Udemy", date: "Jan 2026" },
  { name: "Introduction to Generative AI and Agents", issuer: "Microsoft", date: "Dec 2025" },
  { name: "Product Management for AI & Data Science", issuer: "Udemy", date: "Dec 2025" },
  { name: "Practical A/B Testing", issuer: "LinkedIn Learning", date: "Sep 2025" },
  { name: "R for Data Science: Analysis & Visualization", issuer: "LinkedIn Learning", date: "Jan 2025" },
  { name: "Data Analytics & Visualization Virtual Experience", issuer: "Accenture", date: "Jul 2023" },
  { name: "Machine Learning", issuer: "SmartBridge Educational Services", date: "Jun 2020" },
];

/* ---------------- looking for ---------------- */
export const TARGET_ROLES = [
  "Data Analyst",
  "Business Analyst",
  "Business Intelligence Analyst",
  "Product Analyst",
  "Analytics Engineer",
  "Junior Data Scientist",
  "Junior Data Engineer",
  "Junior AI Engineer",
];

export const WORK_MODELS = ["Remote", "Hybrid", "On-site"];
export const LOCATIONS = ["India", "Europe", "Worldwide"];

/* ---------------- contact ---------------- */
export const CONTACT = {
  email: "kousthubheekrishna@gmail.com",
  linkedin: "https://www.linkedin.com/in/kousthubheekrishna/",
  github: "https://github.com/Kousthubhee/Projects",
  whatsappDisplay: "+91 94417 24256",
  whatsappUrl: "https://wa.me/919441724256",
};
