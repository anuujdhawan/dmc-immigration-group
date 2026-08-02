import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 md:mb-14",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p
        className={cn(
          "text-xs font-bold uppercase tracking-mega text-brand-600",
          dark && "text-leaf-soft",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "max-w-3xl text-balance text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-[2.75rem]",
          align === "center" && "mx-auto",
          dark && "text-aurora-text",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg",
            align === "center" && "mx-auto",
            dark && "text-aurora-muted",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
