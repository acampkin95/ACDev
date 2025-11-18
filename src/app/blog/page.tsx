import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { format } from "date-fns";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "Blog",
  description: "Insights on AI workflows, MCP, software, and delivery.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <section className="rounded-[2.5rem] border border-[var(--border-soft)] bg-[var(--panel)]/70 px-6 py-12 sm:px-10 md:px-16">
        <SectionHeading
          eyebrow="Journal"
          title="Dispatches on AI delivery, MCP patterns, and operations."
          description="Notes from the field—what’s working, what to avoid, and templates to reuse."
        />
      </section>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.05}>
            <Link
              href={`/blog/${post.slug}`}
              className="flex h-full flex-col justify-between rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 transition hover:-translate-y-1"
            >
              <div>
                <p className="eyebrow text-xs">
                  {format(new Date(post.date), "dd MMM yyyy")}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">{post.title}</h3>
                {post.summary && <p className="mt-3 text-sm text-[var(--text-muted)]">{post.summary}</p>}
              </div>
              <span className="mt-6 text-sm font-medium text-[var(--accent)]">Read article →</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
