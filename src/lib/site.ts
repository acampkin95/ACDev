import {
  BrainCircuit,
  Workflow,
  Bot,
  Cable,
  Sparkles,
  Shield,
  Timer,
  CircuitBoard,
  LineChart,
} from "lucide-react";

export const heroHighlights = [
  { label: "Practice areas", value: "AI systems · Agentic workflows · Automation" },
  { label: "Engagements", value: "Product, platform & enablement roadmaps" },
  { label: "Remote friendly", value: "Perth, Western Australia · Working globally" },
];

export const heroMetrics = [
  { value: "6–8 weeks", label: "Average rollout from discovery to launch" },
  { value: "40%+", label: "Ticket deflection after MCP knowledge providers" },
  { value: "3x faster", label: "Decision cycles with observability + automation" },
];

export const solutionThemes = [
  {
    name: "Knowledge MCP Providers",
    icon: BrainCircuit,
    summary: "Ground assistants and copilots in your own data with governance baked in.",
    bullets: ["Vector pipelines", "Access controls", "Living documentation"],
  },
  {
    name: "Workflow Automation",
    icon: Workflow,
    summary: "Agentic workflows orchestrating approvals, escalations and notifications.",
    bullets: ["Human-in-loop", "Observability", "Audit ready"],
  },
  {
    name: "Customer Assistants",
    icon: Bot,
    summary: "On-brand assistants spanning chat, voice, and in-product embeds.",
    bullets: ["Escalations", "Analytics", "Omni-channel"],
  },
  {
    name: "Systems Integration",
    icon: Cable,
    summary: "Connect CRMs, ERPs, billing, and data warehouses for insight loops.",
    bullets: ["Connectors", "Webhooks", "ETL pipelines"],
  },
  {
    name: "Enablement & Training",
    icon: Sparkles,
    summary: "Bring teams along with playbooks, co-building and office hours.",
    bullets: ["Workshops", "Playbooks", "Guardrails"],
  },
  {
    name: "Safety & Governance",
    icon: Shield,
    summary: "Risk reviews, policy, and monitoring to keep leadership confident.",
    bullets: ["Policy kits", "Monitoring", "Red-teaming"],
  },
];

export const featuredProjects = [
  {
    title: "Support knowledge MCP",
    summary: "Centralised technical knowledge, policies, and runbooks for support teams.",
    stack: ["MCP", "RAG", "Azure"],
    result: "40% ticket deflection, avg response down to 45 seconds.",
  },
  {
    title: "Agentic ops automations",
    summary: "Ops team co-pilot for triaging alerts, gathering context, and proposing fixes.",
    stack: ["Workflows", "Approvals", "Observability"],
    result: "60% reduction in manual triage and escalations.",
  },
  {
    title: "Insights assistant",
    summary: "Natural language layer over analytics warehouse with scheduled digests.",
    stack: ["LLM", "Warehouses", "Connectors"],
    result: "Exec dashboards in minutes, adoption across 5 teams.",
  },
];

export const processSteps = [
  {
    title: "Discovery & roadmapping",
    duration: "Week 1–2",
    icon: Timer,
    description:
      "Immersive workshops mapping systems, goals, risks, and success metrics with your teams.",
  },
  {
    title: "Pilot build",
    duration: "Week 3–6",
    icon: CircuitBoard,
    description:
      "Rapid build cycles with weekly showcases, pairing with internal engineers and SMEs.",
  },
  {
    title: "Launch & enablement",
    duration: "Week 7–8",
    icon: LineChart,
    description:
      "Rollout support, measurement, training, and operational readiness playbooks.",
  },
];

export const testimonials = [
  {
    quote:
      "ACDev took ambiguous goals and turned them into a shipped MCP provider our support org uses every day. Thoughtful patterns, great collaboration.",
    author: "Elise Navarro",
    role: "Director of Support, SaaS scale-up",
  },
  {
    quote:
      "The automation playbooks accelerated our ops transformation. The team pairs deeply with internal engineers and leaves us with maintainable systems.",
    author: "Noah Reyes",
    role: "COO, Enterprise services",
  },
];
