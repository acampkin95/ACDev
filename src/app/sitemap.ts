import { getAllPosts } from "@/lib/posts";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

  const staticPages = ["/", "/services", "/solutions", "/contact", "/blog"].map((p) => ({
    url: `${baseUrl}${p}`,
    lastModified: new Date(),
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticPages, ...posts];
}

