"use client";

import { useState } from "react";
import { Dumbbell, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { todayWorkout } from "@/lib/constants";

export default function TodayWorkoutCard() {
  const [exercises, setExercises] = useState(todayWorkout.exercises);

  const completedCount = exercises.filter((e) => e.completed).length;
  const progress = (completedCount / exercises.length) * 100;

  const toggleExercise = (id: number) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === id ? { ...ex, completed: !ex.completed } : ex
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" as const }}
    >
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Dumbbell className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold">
                  {todayWorkout.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {completedCount}/{exercises.length} exercises done
                </p>
              </div>
            </div>
            <Button size="sm" className="gap-1.5">
              <Play className="h-3.5 w-3.5 fill-current" />
              Start
            </Button>
          </div>

          <Progress value={progress} className="h-2 mb-4" />

          <div className="space-y-2">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <Checkbox
                  checked={exercise.completed}
                  onCheckedChange={() => toggleExercise(exercise.id)}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      exercise.completed
                        ? "line-through text-muted-foreground"
                        : ""
                    }`}
                  >
                    {exercise.name}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {exercise.sets}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
