"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative rounded-3xl bg-gradient-to-br from-primary to-primary/80 px-6 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24 text-center overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative z-10">
            <motion.h2
              className="font-heading text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ready to Transform Your Life?
            </motion.h2>
            <motion.p
              className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join 10,000+ users who are already achieving their fitness goals.
              Start your free account today — no credit card required.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
              />
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 text-base font-semibold shrink-0"
                asChild
              >
                <Link href="/auth">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
