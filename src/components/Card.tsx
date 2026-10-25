import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, tags } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className:
      "mt-3 font-display text-xl font-bold leading-snug text-white transition group-hover:text-star",
  };

  return (
    <li className="list-none">
      <a
        href={href}
        className="card-glass group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-star/40"
      >
        <span className="eyebrow !text-xs !tracking-[0.2em] text-aurora">
          {tags[0] ?? "News"}
        </span>
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/70">
          {description}
        </p>
        <div className="mt-auto pt-5 text-white/60">
          <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
        </div>
      </a>
    </li>
  );
}
