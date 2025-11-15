import fs from "fs";
import path from "path";
import { parseFrontMatter } from "@/lib/frontmatter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
};

type PostFrontMatter = {
  title?: string;
  date?: string;
  summary?: string;
  [key: string]: unknown;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
let postsCache: { mtimeMs: number; posts: PostMeta[] } | null = null;
const postSourceCache = new Map<
  string,
  { mtimeMs: number; payload: { content: string; data: PostFrontMatter } }
>();

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const dirStat = fs.statSync(BLOG_DIR);
  if (postsCache && postsCache.mtimeMs === dirStat.mtimeMs) {
    return postsCache.posts;
  }
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.(md|mdx)$/i, "");
    const source = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data } = parseFrontMatter<PostFrontMatter>(source);
    const frontMatter = data ?? {};
    return {
      slug,
      title: frontMatter.title ?? slug,
      date: frontMatter.date ?? new Date().toISOString(),
      summary: frontMatter.summary ?? "",
    } as PostMeta;
  });
  const ordered = posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  postsCache = { mtimeMs: dirStat.mtimeMs, posts: ordered };
  return ordered;
}

export function getPostSource(slug: string) {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  const fallback = path.join(BLOG_DIR, `${slug}.md`);
  const filePath = fs.existsSync(file) ? file : fallback;
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing post source for slug "${slug}"`);
  }
  const { mtimeMs } = fs.statSync(filePath);
  const cached = postSourceCache.get(filePath);
  if (cached && cached.mtimeMs === mtimeMs) {
    return cached.payload;
  }
  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = parseFrontMatter<PostFrontMatter>(source);
  const frontMatter = data ?? {};
  const payload = { content, data: frontMatter };
  postSourceCache.set(filePath, { mtimeMs, payload });
  return payload;
}
