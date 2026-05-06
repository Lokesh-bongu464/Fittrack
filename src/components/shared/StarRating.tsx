import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`Rated ${rating} out of ${maxStars} stars`}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const fillLevel = Math.min(Math.max(rating - i, 0), 1);
        return (
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              fillLevel >= 1
                ? "fill-amber-400 text-amber-400"
                : fillLevel > 0
                  ? "fill-amber-400/50 text-amber-400"
                  : "fill-muted text-muted-foreground/30"
            )}
          />
        );
      })}
    </div>
  );
}
