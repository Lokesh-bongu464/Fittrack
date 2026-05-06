"use client";

import { useState } from "react";
import {
  Monitor,
  Footprints,
  Bike,
  Zap,
  Trophy,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { activityLevels } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Footprints,
  Bike,
  Zap,
  Trophy,
};

export default function Step4ActivityLevel() {
  const { step4, setStep4, nextStep, prevStep } = useAuthStore();
  const [selected, setSelected] = useState<string>(
    step4?.activityLevel || ""
  );

  const handleContinue = () => {
    setStep4(selected ? { activityLevel: selected } : null);
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" as const }}
    >
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-bold">Activity Level</h2>
        <p className="text-muted-foreground mt-1">
          How active are you currently? This helps us set realistic goals.
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {activityLevels.map((level) => {
          const Icon = iconMap[level.icon];
          const isSelected = selected === level.id;
          return (
            <motion.button
              key={level.id}
              type="button"
              onClick={() => setSelected(level.id)}
              className={cn(
                "w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/30 hover:bg-muted/50"
              )}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {Icon && <Icon className="h-5 w-5" />}
              </div>
              <div>
                <p
                  className={cn(
                    "font-semibold text-sm",
                    isSelected ? "text-primary" : "text-foreground"
                  )}
                >
                  {level.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {level.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Skip option */}
      <button
        type="button"
        onClick={() => {
          setStep4(null);
          nextStep();
        }}
        className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        Skip for now
      </button>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="gap-2"
          size="lg"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleContinue}
          className="flex-1 gap-2"
          size="lg"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
