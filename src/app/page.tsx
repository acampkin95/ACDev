import Link from "next/link";
import { getPage, hasPage } from "@/lib/pages";
import SafeMDX from "@/components/SafeMDX";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  featuredProjects,
  heroHighlights,
  heroMetrics,
  processSteps,
  solutionThemes,
  testimonials,
} from "@/lib/site";

export default function Home() {
  if (hasPage("home")) {
    const page = getPage("home");
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-[var(--border-soft)] bg-[var(--panel)]/60 px-6 py-16 shadow-xl shadow-[var(--glow)] sm:px-10 md:px-16">
        <span className="tag mb-6 inline-flex">
          <span className="dot" />
          Studio update · Q2
        </span>
        <Reveal>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] md:text-6xl">
            Build AI systems once reserved for enterprises.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-3xl text-lg text-[var(--text-muted)]">
            ACDev partners with product and operations leadership to ship MCP providers, automation, and AI workflows
            that are observable, governed, and loved by teams. Based in Perth · working globally.
          </p>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/solutions"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] px-6 py-3 font-medium text-white shadow-[0_20px_35px_var(--glow)] transition hover:scale-[1.01]"
          >
            Explore solutions
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center rounded-full border border-[var(--border-strong)] px-6 py-3 font-medium text-[var(--text-primary)] transition hover:border-[var(--accent)]"
          >
            View services
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {heroHighlights.map((item) => (
            <div key={item.label} className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 text-sm">
              <p className="text-[var(--text-muted)]">{item.label}</p>
              <p className="mt-1 text-[var(--text-primary)]">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-6 rounded-3xl border border-transparent bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] p-8 text-[var(--text-primary)] md:grid-cols-3">
        {heroMetrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.05}>
            <div className="space-y-2">
              <p className="text-3xl font-semibold">{metric.value}</p>
              <p className="text-sm text-[var(--text-muted)]">{metric.label}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mt-24 space-y-10">
        <SectionHeading
          eyebrow="Capabilities"
          title="Modular AI solutions with enterprise rigor."
          description="Every engagement is designed to be observable, adaptable and maintainable by your own teams."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {solutionThemes.map((solution, index) => (
            <Reveal key={solution.name} delay={index * 0.05} className="card relative overflow-hidden p-6 transition hover:-translate-y-1">
              <div className="absolute inset-0 opacity-0 transition hover:opacity-100" aria-hidden>
                <div className="h-full w-full bg-gradient-to-br from-[var(--accent)]/10 to-transparent" />
              </div>
              <div className="relative flex items-center gap-3">
                <solution.icon className="h-5 w-5 text-[var(--accent)]" />
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{solution.name}</h3>
              </div>
              <p className="relative mt-3 text-sm text-[var(--text-muted)]">{solution.summary}</p>
              <ul className="relative mt-4 flex flex-wrap gap-2 text-xs text-[var(--text-muted)]">
                {solution.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-full border border-[var(--border-soft)] px-3 py-1">
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-24 space-y-10">
        <SectionHeading
          eyebrow="Recent work"
          title="Case studies grounded in measurable outcomes."
          description="Outcome-focused engagements co-built with your product, support, and operations teams."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.05} className="card flex flex-col justify-between p-5">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">{project.stack.join(" · ")}</p>
                <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">{project.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{project.summary}</p>
              </div>
              <p className="mt-4 text-sm font-medium text-[var(--text-primary)]">{project.result}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-24 space-y-10">
        <SectionHeading
          eyebrow="Engagement model"
          title="A delivery rhythm tuned for momentum."
          description="Clear milestones, transparent burndown, pairing with your engineers, and a focus on change enablement."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05} className="card p-6">
              <div className="flex items-center gap-3">
                <step.icon className="h-5 w-5 text-[var(--accent)]" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">{step.duration}</p>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.author} delay={index * 0.05} className="card p-6">
            <p className="text-lg text-[var(--text-primary)]">“{testimonial.quote}”</p>
            <p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">{testimonial.author}</p>
            <p className="text-sm text-[var(--text-muted)]">{testimonial.role}</p>
          </Reveal>
        ))}
      </section>

      <section className="mt-24 rounded-[2rem] border border-[var(--border-strong)] bg-[var(--panel-strong)] px-6 py-12 text-center shadow-lg shadow-[var(--glow)] sm:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--text-muted)]">Next step</p>
        <h2 className="mt-4 text-3xl font-semibold text-[var(--text-primary)]">Ready to map your AI roadmap?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-[var(--text-muted)]">
          Book a 45-minute working session. We’ll review goals, systems, and success metrics, then share a tailored
          approach within a week.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] px-6 py-3 font-semibold text-white shadow-lg shadow-[var(--glow)]"
          >
            Book a discovery call
          </Link>
          <Link
            href="/work"
            className="rounded-full border border-[var(--border-soft)] px-6 py-3 font-semibold text-[var(--text-primary)]"
          >
            Browse case studies
          </Link>
        </div>
      </section>
    </div>
  );
}
