"use client";

import { Flame, Dumbbell, Zap, Target, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { dashboardStats } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Flame,
  Dumbbell,
  Zap,
  Target,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function StatsCards() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {dashboardStats.map((stat) => {
        const Icon = iconMap[stat.icon];
        return (
          <motion.div key={stat.label} variants={itemVariants}>
            <Card className="border bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center ${stat.iconColor}`}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>
                  {stat.trend.value > 0 && (
                    <div
                      className={`flex items-center gap-1 text-xs font-medium ${
                        stat.trend.positive
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {stat.trend.positive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      +{stat.trend.value}
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold font-heading">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stat.label}
                  </p>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">
                  {stat.trend.label}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
