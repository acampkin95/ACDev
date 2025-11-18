import Link from "next/link";
import { hasPage, getPage } from "@/lib/pages";
import SafeMDX from "@/components/SafeMDX";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getSiteContent, getIconComponent } from "@/lib/site";

export const metadata = {
  title: "AI Solutions",
  description:
    "Productised AI solutions: MCP providers, workflow automation, assistants, integrations and support.",
};

export default function SolutionsPage() {
  if (hasPage("solutions")) {
    const page = getPage("solutions");
    return (
      <div className="mx-auto max-w-4xl px-4 py-20">
        {page?.title && (
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">{page.title}</h1>
        )}
        {page?.description && <p className="mt-4 text-lg text-[var(--text-muted)]">{page.description}</p>}
        <article className="prose prose-invert mt-8 max-w-none text-[var(--text-primary)]">
          <SafeMDX source={page?.content || ""} />
        </article>
      </div>
    );
  }

  const { solutionThemes, guardrails, processSteps } = getSiteContent();

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading
        eyebrow="Solutions"
        title="Composable AI systems tuned for measurable outcomes."
        description="Pick a starting point or mix modules. Each solution ships with governance, observability, and enablement so your teams can operate it confidently."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {solutionThemes.map((solution, index) => {
          const Icon = getIconComponent(solution.icon);
          return (
            <Reveal key={solution.name} delay={index * 0.05} className="card p-6">
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-[var(--accent)]" />
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{solution.name}</h3>
              </div>
              <p className="mt-3 text-sm text-[var(--text-muted)]">{solution.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--text-muted)]">
                {solution.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-full border border-[var(--border-soft)] px-3 py-1">
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>

      <section className="mt-20 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--panel)] p-8">
        <SectionHeading
          eyebrow="Guardrails"
          title="Safety, governance, and measurable performance are baked in."
          description="Solutions ship with the playbooks leadership expects—observability, policies, and fallbacks."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {guardrails.map((guardrail) => (
            <div key={guardrail} className="flex items-start gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-4">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">●</span>
              <p className="text-sm text-[var(--text-muted)]">{guardrail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 space-y-10">
        <SectionHeading
          eyebrow="Engagement rhythm"
          title="From problem framing to scale up."
          description="Each solution follows our 6–8 week cadence with transparent milestones and enablement."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {processSteps.map((step, index) => {
            const Icon = getIconComponent(step.icon);
            return (
              <Reveal key={step.title} delay={index * 0.05} className="card p-6">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-[var(--accent)]" />
                  <p className="eyebrow text-xs">{step.duration}</p>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{step.description}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mt-20 rounded-[2rem] border border-[var(--border-strong)] bg-[var(--panel-strong)] px-6 py-12 text-center shadow-lg shadow-[var(--glow)] sm:px-12">
        <p className="eyebrow text-sm">Next step</p>
        <h2 className="mt-4 text-3xl font-semibold text-[var(--text-primary)]">Curate a solution plan.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-[var(--text-muted)]">
          We&apos;ll review goals, systems, and metrics, then propose a tailored mix of solution modules with investment
          levels and timelines.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="btn-primary"
          >
            Talk to us
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-[var(--border-soft)] px-6 py-3 font-semibold text-[var(--text-primary)]"
          >
            See services
          </Link>
        </div>
      </section>
    </div>
  );
}
