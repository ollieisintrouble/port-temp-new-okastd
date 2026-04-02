import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  target?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
  target
}: Props) {
  return (
    <Card
      className={
        "overflow-hidden hover:shadow-2xl hover:-translate-y-1 shadow-brand-neutral-300/40 transition-all duration-300 ease-out h-full bg-white/50 backdrop-blur-md rounded-3xl"
      }
    >
      <div className="flex flex-col h-full pb-2">
        <Link href={href || "#"} className="flex flex-col" target={target}>
          <div
            className={cn("block", className)}
          >
            {video && (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="pointer-events-none mx-auto h-40 w-full object-cover object-top" // needed because random black line at bottom of video
              />
            )}
            {image && (
              <Image
                src={image}
                alt={title}
                width={500}
                height={300}
                className="h-40 w-full overflow-hidden object-cover object-top"
              />
            )}
          </div>
          <CardHeader className="px-3 mt-2">
            <div className="space-y-1">
              <CardTitle className="mt-1 text-base text-brand-neutral-900">{title}</CardTitle>
              <time className="font-sans text-xs text-brand-neutral-600">{dates}</time>
              <div className="hidden font-sans text-xs underline print:visible">
                {link?.replace("https://", "").replace("www.", "").replace("/", "")}
              </div>
              <div className="prose max-w-full text-pretty font-sans text-xs text-brand-neutral-800">
                <MDXRemote source={description} />
              </div>
            </div>
          </CardHeader>
        </Link>
        <CardContent className="mt-auto flex flex-col px-3">
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags?.map((tag) => (
                <Badge
                  className="px-2 py-1 text-[10px]"
                  variant="secondary"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="px-3 pb-3">
          {links && links.length > 0 && (
            <div className="flex flex-row flex-wrap items-start gap-1">
              {links?.map((link, idx) => (
                <Link href={link?.href} key={idx} target="_blank">
                  <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                    {link.icon}
                    {link.type}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
