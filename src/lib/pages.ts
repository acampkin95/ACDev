import fs from "fs";
import path from "path";
import { parseFrontMatter } from "@/lib/frontmatter";

type PageFrontMatter = {
  title?: string;
  description?: string;
  [key: string]: unknown;
};

export type PageData = {
  slug: string;
  title?: string;
  description?: string;
  content: string;
  data: PageFrontMatter;
};

const PAGES_DIR = path.join(process.cwd(), "content", "pages");
const pageCache = new Map<string, { mtimeMs: number; data: PageData }>();

export function hasPage(slug: string) {
  const mdx = path.join(PAGES_DIR, `${slug}.mdx`);
  const md = path.join(PAGES_DIR, `${slug}.md`);
  return fs.existsSync(mdx) || fs.existsSync(md);
}

export function getPage(slug: string): PageData | null {
  const mdx = path.join(PAGES_DIR, `${slug}.mdx`);
  const md = path.join(PAGES_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null;
  if (!filePath) return null;
  const { mtimeMs } = fs.statSync(filePath);
  const cached = pageCache.get(filePath);
  if (cached && cached.mtimeMs === mtimeMs) {
    return cached.data;
  }
  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = parseFrontMatter<PageFrontMatter>(source);
  const frontMatter = data ?? {};
  const parsed: PageData = {
    slug,
    title: frontMatter.title,
    description: frontMatter.description,
    content,
    data: frontMatter,
  };
  pageCache.set(filePath, { mtimeMs, data: parsed });
  return parsed;
}
