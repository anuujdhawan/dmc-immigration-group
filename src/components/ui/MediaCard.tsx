import { cn } from "@/lib/utils/cn";

/**
 * Reusable image-card components — the single image-card surface used across
 * the site (every internal page's gallery, the Express Entry blog grid and the
 * success-story carousel).
 *
 * The card follows the DMC template card language used across the site:
 * organic asymmetric corners (25px / 72px, mirrored on alternating cards),
 * a soft brand-tinted border, a deep green lift shadow on hover and a slow
 * image zoom. Three variants:
 *
 *   - `"gallery"` — image-top with an overlaid label pill, title + body (default)
 *   - `"blog"`    — image-top link, uppercase meta line, title + body + "Read article →"
 *   - `"story"`   — portrait image with a bottom "Client success" caption bar
 *
 * `MediaCardGrid` arranges cards in a responsive 1/2/3-column grid.
 */

export type MediaCardItem = {
  src: string;
  alt: string;
  /** Small uppercase pill overlaid on the image (gallery variant). */
  label?: string;
  title: string;
  body?: string;
  href?: string;
  /** Opens in a new tab when the href is external. */
  external?: boolean;
  /** Uppercase meta line above the title (blog variant). */
  meta?: string;
  /** Link label for the card/body link. Defaults per variant. */
  cta?: string;
  /** Right-hand caption text (story variant), e.g. "01 / 08". */
  count?: string;
};

export type MediaCardVariant = "gallery" | "blog" | "story";

/**
 * Shared template card shell for MediaCard and VideoEmbedCard: soft brand
 * border, white surface, deep green lift shadow, hover translate, and the
 * template's organic asymmetric corners (25px/72px, mirrored on alternating
 * cards via index). Kept in one place so every card family stays in sync.
 */
export function cardShellClass(index = 0, opts: { fill?: boolean } = {}) {
  const organic = index % 2 === 0 ? "rounded-[25px_72px_25px_25px]" : "rounded-[68px_25px_25px_25px]";
  return cn(
    "group flex flex-col overflow-hidden border border-brand-600/10 bg-white/85 shadow-[0_20px_52px_rgba(16,41,10,0.055)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/25 hover:shadow-[0_30px_72px_rgba(16,41,10,0.11)]",
    organic,
    opts.fill ? "h-full" : "",
  );
}

const IMAGE_CLASSES =
  "h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.035]";

export function MediaCard({
  item,
  index = 0,
  variant = "gallery",
}: {
  item: MediaCardItem;
  index?: number;
  variant?: MediaCardVariant;
}) {
  const imageContent = (
    <div
      className={cn(
        "relative overflow-hidden",
        variant === "story" ? "aspect-[410/440] bg-white" : "aspect-[1.36/1] bg-slate-100",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className={cn(IMAGE_CLASSES, variant === "story" ? "object-contain" : "object-cover")}
      />
      {variant === "gallery" && item.label ? (
        <span className="absolute left-3 top-3 inline-flex rounded-full bg-brand-600/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          {item.label}
        </span>
      ) : null}
    </div>
  );

  const linkProps = item.href
    ? {
        href: item.href,
        target: item.external ? "_blank" : undefined,
        rel: item.external ? "noopener noreferrer" : undefined,
      }
    : {};

  const image = variant === "blog" && item.href ? (
    <a {...linkProps} aria-label={item.title}>
      {imageContent}
    </a>
  ) : (
    imageContent
  );

  const body = (
    <div className="flex flex-1 flex-col gap-2 p-5">
      {variant === "blog" && item.meta ? (
        <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand-600">
          {item.meta}
        </span>
      ) : null}
      <h3 className="font-display text-lg font-bold leading-snug text-charcoal transition-colors group-hover:text-brand-700">
        {item.title}
      </h3>
      {item.body ? <p className="text-sm leading-relaxed text-muted">{item.body}</p> : null}
      {variant === "blog" && item.href ? (
        <a
          {...linkProps}
          className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-extrabold text-brand-700 transition-colors hover:text-brand-800"
        >
          {item.cta ?? "Read article →"}
          <span aria-hidden="true" className="text-[10px] transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      ) : item.href ? (
        <span className="mt-auto pt-2 text-xs font-bold uppercase tracking-wide text-brand-600 transition-transform duration-300 group-hover:translate-x-1">
          {item.cta ?? "Explore"} → <span className="sr-only">{item.title}</span>
        </span>
      ) : null}
    </div>
  );

  const caption = variant === "story" ? (
    <div className="flex items-center justify-between gap-3 border-t border-brand-600/10 px-4 py-3.5">
      <b className="font-display text-sm font-bold text-ink">{item.title}</b>
      {item.count ? <span className="font-mono text-xs font-semibold text-slate-500">{item.count}</span> : null}
    </div>
  ) : null;

  const shell = cardShellClass(index, { fill: variant !== "story" });

  if (variant === "gallery" && item.href) {
    return (
      <li>
        <a {...linkProps} className={shell}>
          {image}
          {body}
        </a>
      </li>
    );
  }

  return (
    <li className={shell}>
      {image}
      {caption ?? body}
    </li>
  );
}

export function MediaCardGrid({
  items,
  variant = "gallery",
  className,
}: {
  items: MediaCardItem[];
  variant?: MediaCardVariant;
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2 xl:grid-cols-3", className)}>
      {items.map((item, index) => (
        <MediaCard key={`${item.title}-${item.src}`} item={item} index={index} variant={variant} />
      ))}
    </ul>
  );
}
