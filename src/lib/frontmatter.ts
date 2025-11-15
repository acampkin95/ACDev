import yaml from "js-yaml";

type ParseResult<T> = {
  content: string;
  data: T;
};

export function parseFrontMatter<T extends Record<string, unknown>>(
  source: string
): ParseResult<T> {
  const frontMatterRegex = /^---\s*[\r\n]+([\s\S]*?)\r?\n---\s*/;
  const match = source.match(frontMatterRegex);
  if (!match) {
    return { content: source, data: {} as T };
  }
  const [matchText, rawData] = match;
  let data = {} as T;
  if (rawData.trim()) {
    data = yaml.load(rawData) as T;
  }
  const content = source.slice(matchText.length);
  return { content, data };
}

