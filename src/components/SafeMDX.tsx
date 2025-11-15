import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

type SafeMDXProps = {
  source: string;
};

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [
      ...(defaultSchema.attributes?.a ?? []),
      ["className"],
      ["target"],
      ["rel"],
    ],
    code: [...(defaultSchema.attributes?.code ?? []), ["className"]],
  },
};

export default function SafeMDX({ source }: SafeMDXProps) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypeSanitize, schema]],
        },
      }}
    />
  );
}

