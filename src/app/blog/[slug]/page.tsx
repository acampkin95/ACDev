import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostSource } from "@/lib/posts";
import SafeMDX from "@/components/SafeMDX";
import { format } from "date-fns";
import type { Metadata } from "next";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const all = getAllPosts();
  const post = all.find((p) => p.slug === params.slug);
  if (!post) return {};
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: { url, title: post.title, description: post.summary, images: [`${siteUrl}/og`] },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary, images: [`${siteUrl}/og`] },
  };
}

export default function BlogPost({ params }: Params) {
  const all = getAllPosts();
  const post = all.find((p) => p.slug === params.slug);
  if (!post) return notFound();
  const { content, data } = getPostSource(params.slug);
  const words = content.trim().split(/\s+/).length;
  const readingMins = Math.max(1, Math.round(words / 200));

  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <Link href="/blog" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">
        ← Back to blog
      </Link>
      <div className="mt-6 rounded-[2.5rem] border border-[var(--border-soft)] bg-[var(--panel)] p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
          {format(new Date(data.date ?? post.date), "dd MMM yyyy")} · {readingMins} min read
        </p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
          {data.title ?? post.title}
        </h1>
        {data.summary && <p className="mt-4 text-lg text-[var(--text-muted)]">{data.summary}</p>}
      </div>
      <article className="prose prose-invert mt-10 max-w-none text-[var(--text-primary)]">
        <SafeMDX source={content} />
      </article>
    </div>
  );
}

