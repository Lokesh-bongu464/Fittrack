"use client";

import { Plus, Utensils, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const actions = [
  {
    icon: Plus,
    label: "Log Workout",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
  {
    icon: Utensils,
    label: "Log Meal",
    color:
      "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
  },
  {
    icon: TrendingUp,
    label: "View Progress",
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  },
  {
    icon: Users,
    label: "Community",
    color:
      "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" as const }}
    >
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <h3 className="font-heading font-semibold mb-4">Quick Actions</h3>
          <motion.div
            className="grid grid-cols-2 gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors hover:bg-muted/50 cursor-pointer"
                  )}
                >
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center ${action.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium">{action.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
