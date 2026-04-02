import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { TableOfContents, type TocItem } from "@/components/table-of-contents";
import styles from "./page.module.css";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function extractHeadings(source: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;
  while ((match = headingRegex.exec(source)) !== null) {
    items.push({
      id: slugify(match[2]),
      text: match[2],
      level: match[1].length,
    });
  }
  return items;
}

function HeadingWithId({ level, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { level: number }) {
  const text =
    typeof props.children === "string"
      ? props.children
      : String(props.children ?? "");
  const id = slugify(text);
  if (level === 3) return <h3 id={id} className="scroll-mt-20" {...props} />;
  return <h2 id={id} className="scroll-mt-20" {...props} />;
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <HeadingWithId level={2} {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <HeadingWithId level={3} {...props} />,
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  let post = await getPost(slug);

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const tocItems = extractHeadings(post.source);

  return (
    <section id="blog">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${post.metadata.title}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </Suspense>
      </div>
      <TableOfContents items={tocItems} />
      <article
        id="target-content"
        className={`prose ${styles.article}`}
      >
        <MDXRemote source={post.source} components={mdxComponents} />
      </article>
    </section>
  );
}

