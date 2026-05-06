"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, PartyPopper } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import confetti from "canvas-confetti";

export default function WelcomeScreen() {
  const { step1 } = useAuthStore();
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
      });

      if (Date.now() < end) {
        rafRef.current = requestAnimationFrame(frame);
      }
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const firstName = step1.fullName.split(" ")[0] || "there";

  return (
    <motion.div
      className="text-center py-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
        className="mb-6"
      >
        <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
          <PartyPopper className="h-10 w-10 text-primary" />
        </div>
      </motion.div>

      <motion.h2
        className="font-heading text-3xl font-bold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        Welcome, {firstName}!
      </motion.h2>

      <motion.p
        className="text-muted-foreground text-lg mb-8 max-w-sm mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        Your account is all set up. Let&apos;s start crushing your fitness
        goals!
      </motion.p>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Button size="lg" className="gap-2 w-full max-w-xs mx-auto" asChild>
          <Link href="/dashboard">
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
