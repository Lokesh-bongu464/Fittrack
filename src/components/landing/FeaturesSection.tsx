"use client";

import { Dumbbell, Utensils, BarChart3, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { features } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Dumbbell,
  Utensils,
  BarChart3,
  Users,
};

const extendedFeatures = [
  ...features,
  {
    icon: "Dumbbell",
    title: "Smart Scheduling",
    description:
      "AI-powered workout scheduling that adapts to your routine, energy levels, and recovery needs.",
  },
  {
    icon: "BarChart3",
    title: "Body Metrics",
    description:
      "Track weight, body fat, measurements, and progress photos all in one beautiful timeline.",
  },
];

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  const Icon = iconMap[icon];
  return (
    <div className="group rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5 dark:hover:shadow-primary/15 dark:hover:bg-muted/50 dark:hover:border-primary/30">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {Icon && <Icon className="h-6 w-6" />}
      </div>
      <h3 className="font-heading text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function ScrollingColumn({
  items,
  duration,
  reverse,
  className,
}: {
  items: typeof features;
  duration: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: reverse ? "0%" : "-50%" }}
        initial={{ translateY: reverse ? "-50%" : "0%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5 pb-5"
      >
        {[0, 1].map((_, idx) => (
          <div key={idx} className="flex flex-col gap-5">
            {items.map((feature, i) => (
              <FeatureCard
                key={`${idx}-${i}`}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const col1 = extendedFeatures.slice(0, 3);
const col2 = extendedFeatures.slice(3, 6);

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="outline"
              className="px-4 py-1 text-xs font-medium mb-5"
            >
              <Sparkles className="h-3 w-3 mr-1.5" />
              Features
            </Badge>

            <h2 className="font-heading text-3xl font-bold sm:text-4xl lg:text-5xl leading-tight">
              Everything You Need to{" "}
              <span className="text-primary">Reach Your Goals</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-md">
              Powerful tools designed to help you build lasting healthy habits
              and achieve real results. All in one beautiful platform.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <p className="text-3xl font-bold font-heading text-primary">
                  50+
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Workout templates
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold font-heading text-primary">
                  98%
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  User satisfaction
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold font-heading text-primary">
                  24/7
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Progress tracking
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold font-heading text-primary">
                  10k+
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Active community
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Scrolling feature cards */}
          <div className="relative h-[500px] lg:h-[600px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-5">
              <ScrollingColumn items={col1} duration={20} />
              <ScrollingColumn
                items={col2}
                duration={24}
                reverse
                className="hidden sm:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
