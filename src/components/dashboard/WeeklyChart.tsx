"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { weeklyActivity } from "@/lib/constants";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border bg-card px-4 py-3 shadow-lg">
        <p className="text-xs font-medium text-muted-foreground mb-1">
          {label}
        </p>
        <p className="text-lg font-bold">
          {payload[0].value}{" "}
          <span className="text-xs font-normal text-muted-foreground">
            min
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function WeeklyChart() {
  const maxMinutes = Math.max(...weeklyActivity.map((d) => d.minutes));
  const totalMinutes = weeklyActivity.reduce((sum, d) => sum + d.minutes, 0);
  const avgMinutes = Math.round(totalMinutes / weeklyActivity.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" as const }}
    >
      <Card className="border bg-card hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-base">
                  Weekly Activity
                </h3>
                <p className="text-xs text-muted-foreground">
                  Minutes of exercise per day
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-right">
              <div>
                <p className="text-2xl font-bold font-heading">{totalMinutes}</p>
                <p className="text-[10px] text-muted-foreground">Total min</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold font-heading">{avgMinutes}</p>
                <p className="text-[10px] text-muted-foreground">Avg / day</p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyActivity}
                barCategoryGap="25%"
                margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  </linearGradient>
                  <linearGradient id="barGradientDim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                  strokeOpacity={0.5}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 13,
                    fontWeight: 500,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                  width={35}
                  tickFormatter={(v) => `${v}`}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "hsl(var(--muted))", radius: 6, opacity: 0.4 }}
                />
                <Bar
                  dataKey="minutes"
                  radius={[8, 8, 4, 4]}
                  maxBarSize={48}
                >
                  {weeklyActivity.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.minutes === maxMinutes
                          ? "url(#barGradient)"
                          : entry.minutes === 0
                            ? "hsl(var(--muted))"
                            : "url(#barGradientDim)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
