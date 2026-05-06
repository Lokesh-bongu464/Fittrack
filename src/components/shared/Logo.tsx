import Link from "next/link";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white";
  className?: string;
}

export default function Logo({
  size = "md",
  variant = "default",
  className,
}: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-7 w-7",
  };

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-heading font-bold transition-colors",
        sizeClasses[size],
        variant === "white"
          ? "text-white"
          : "text-foreground",
        className
      )}
    >
      <Activity
        className={cn(
          iconSizes[size],
          variant === "white" ? "text-white" : "text-primary"
        )}
      />
      <span>FitTrack</span>
    </Link>
  );
}
