interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left" | "right";
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignmentClasses = {
    center: "text-center items-center",
    left: "text-left items-start",
    right: "text-right items-end",
  };

  return (
    <div className={`flex flex-col ${alignmentClasses[align]} mb-10 md:mb-14`}>
      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight ${
          light ? "text-cream" : "text-charcoal"
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-3 max-w-2xl text-base sm:text-lg leading-relaxed ${
            light ? "text-cream/80" : "text-softBrown"
          }`}
        >
          {subtitle}
        </p>
      )}

      {/* Decorative gold line */}
      <div className="mt-4 flex items-center gap-2">
        <span className="block w-8 h-[2px] rounded-full bg-goldLight" />
        <span className="block w-16 h-[3px] rounded-full bg-gold" />
        <span className="block w-8 h-[2px] rounded-full bg-goldLight" />
      </div>
    </div>
  );
}
