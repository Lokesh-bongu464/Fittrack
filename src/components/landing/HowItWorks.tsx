"use client";

import { UserPlus, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { steps } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  UserPlus,
  Target,
  TrendingUp,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-24 bg-muted/30"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
            How It{" "}
            <span className="text-primary">Works</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Get started in three simple steps and begin your transformation
            today.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          {steps.map((step) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number badge */}
                <div className="relative z-10 mb-6">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border-2 border-primary/20">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                      {Icon && (
                        <Icon className="h-8 w-8 text-primary" />
                      )}
                    </div>
                  </div>
                  {/* Step number */}
                  <div className="absolute -top-1 -right-1 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md">
                    {step.number}
                  </div>
                </div>

                <h3 className="font-heading text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground max-w-xs leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
