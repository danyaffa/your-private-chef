interface TestimonialCardProps {
  name: string;
  quote: string;
  rating: number;
  transformation?: string;
}

export default function TestimonialCard({
  name,
  quote,
  rating,
  transformation,
}: TestimonialCardProps) {
  return (
    <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-md shadow-goldLight/20 hover:shadow-xl hover:shadow-gold/15 transition-shadow duration-300 border border-goldLight/20 flex flex-col">
      {/* Decorative quote mark */}
      <span className="absolute top-4 right-6 text-5xl leading-none font-serif text-goldLight/30 select-none pointer-events-none">
        &rdquo;
      </span>

      {/* Star Rating */}
      <div className="flex gap-1 mb-4" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < rating ? "text-gold" : "text-goldLight/40"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <div className="flex-1 mb-6">
        <span className="text-gold text-4xl font-serif leading-none block -mb-2 select-none">
          &ldquo;
        </span>
        <blockquote className="text-softBrown leading-relaxed text-sm md:text-base italic">
          {quote}
        </blockquote>
      </div>

      {/* Divider */}
      <div className="border-t border-goldLight/30 pt-4">
        <p className="font-serif text-charcoal font-semibold text-lg">
          {name}
        </p>
        {transformation && (
          <p className="text-sage text-sm mt-1 font-medium">
            {transformation}
          </p>
        )}
      </div>
    </div>
  );
}
