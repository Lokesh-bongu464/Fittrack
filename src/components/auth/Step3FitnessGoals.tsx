"use client";

import { useState } from "react";
import {
  Flame,
  Dumbbell,
  Activity,
  StretchHorizontal,
  Apple,
  Brain,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { fitnessGoals } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Flame,
  Dumbbell,
  Activity,
  StretchHorizontal,
  Apple,
  Brain,
};

export default function Step3FitnessGoals() {
  const { step3, setStep3, nextStep, prevStep } = useAuthStore();
  const [selected, setSelected] = useState<string[]>(step3.goals);
  const [error, setError] = useState("");

  const toggleGoal = (id: string) => {
    setError("");
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((g) => g !== id);
      }
      if (prev.length >= 3) {
        setError("Maximum 3 goals allowed");
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      setError("Select at least 1 goal");
      return;
    }
    setStep3({ goals: selected });
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
        <h2 className="font-heading text-2xl font-bold">
          What Are Your Goals?
        </h2>
        <p className="text-muted-foreground mt-1">
          Select up to 3 fitness goals. We&apos;ll tailor your experience.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {fitnessGoals.map((goal) => {
          const Icon = iconMap[goal.icon];
          const isSelected = selected.includes(goal.id);
          return (
            <motion.button
              key={goal.id}
              type="button"
              onClick={() => toggleGoal(goal.id)}
              className={cn(
                "relative flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/30 hover:bg-muted/50"
              )}
              whileTap={{ scale: 0.97 }}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
              <div
                className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {Icon && <Icon className="h-5 w-5" />}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  isSelected ? "text-primary" : "text-foreground"
                )}
              >
                {goal.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {error && <p className="text-sm text-destructive mb-4">{error}</p>}

      <p className="text-xs text-muted-foreground mb-6 text-center">
        {selected.length}/3 goals selected
      </p>

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
