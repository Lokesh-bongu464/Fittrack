"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-primary/8 blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-secondary/5 blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-6">
                #1 Fitness Platform for 2024
              </span>
            </motion.div>

            <motion.h1
              className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              Transform Your{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Fitness Journey
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              Track workouts, plan nutrition, and achieve your goals with the
              most intuitive fitness platform. Join 10,000+ users already
              transforming their lives.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <Button size="lg" className="gap-2 text-base" asChild>
                <Link href="/auth">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-base">
                <Play className="h-4 w-4 fill-current" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            >
              {/* Avatar stack */}
              <div className="flex -space-x-2">
                {["bg-primary", "bg-chart-2", "bg-chart-3", "bg-chart-4"].map(
                  (bg, i) => (
                    <div
                      key={i}
                      className={`h-8 w-8 rounded-full border-2 border-background ${bg} flex items-center justify-center text-[10px] font-bold text-white`}
                    >
                      {["A", "B", "C", "D"][i]}
                    </div>
                  )
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">10,000+</span>{" "}
                active users
              </div>
            </motion.div>
          </div>

          {/* Visual - Animated Dashboard Preview */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative rounded-2xl border bg-card/50 backdrop-blur-sm p-6 shadow-2xl">
              {/* Mock dashboard card */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-lg">
                    Weekly Progress
                  </h3>
                  <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">
                    +12%
                  </span>
                </div>
                {/* Mock chart bars */}
                <div className="flex items-end gap-2 h-32">
                  {[40, 65, 45, 80, 55, 90, 60].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-primary/60"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.6 + i * 0.08,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <span key={i} className="flex-1 text-center">
                      {d}
                    </span>
                  ))}
                </div>
                {/* Mock stats row */}
                <div className="grid grid-cols-3 gap-3 pt-2 border-t">
                  {[
                    { label: "Calories", value: "1,248" },
                    { label: "Workouts", value: "4" },
                    { label: "Streak", value: "12 days" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-lg font-bold font-heading">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Decorative floating elements */}
            <div className="absolute -top-4 -right-4 h-20 w-20 rounded-xl border bg-card shadow-lg flex items-center justify-center animate-bounce [animation-duration:3s]">
              <div className="text-center">
                <p className="text-2xl font-bold font-heading text-primary">
                  68%
                </p>
                <p className="text-[9px] text-muted-foreground">Goal</p>
              </div>
            </div>
            <div className="absolute -bottom-3 -left-3 h-16 w-32 rounded-xl border bg-card shadow-lg flex items-center gap-2 px-3 animate-bounce [animation-duration:4s] [animation-delay:1s]">
              <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                <span className="text-success text-sm font-bold">✓</span>
              </div>
              <div>
                <p className="text-xs font-semibold">Workout Done!</p>
                <p className="text-[10px] text-muted-foreground">Just now</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
