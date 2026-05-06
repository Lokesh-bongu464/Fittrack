"use client";

import Link from "next/link";
import { ArrowRight, Activity, Flame, Trophy, Heart } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

/* ------------------------------------------------------------------ */
/*  Interactive Particle Network Canvas (adapted from AetherFlowHero)  */
/* ------------------------------------------------------------------ */
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  const getColors = useCallback(() => {
    const isDark = themeRef.current === "dark";
    return {
      particle: isDark
        ? "rgba(129, 112, 255, 0.6)"
        : "rgba(99, 82, 230, 0.35)",
      line: isDark
        ? (opacity: number) => `rgba(129, 112, 255, ${opacity * 0.5})`
        : (opacity: number) => `rgba(99, 82, 230, ${opacity * 0.25})`,
      lineHover: isDark
        ? (opacity: number) => `rgba(200, 180, 255, ${opacity * 0.7})`
        : (opacity: number) => `rgba(99, 82, 230, ${opacity * 0.45})`,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: null as number | null, y: null as number | null, radius: 180 };

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;

      constructor(
        x: number,
        y: number,
        directionX: number,
        directionY: number,
        size: number
      ) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
      }

      draw() {
        const colors = getColors();
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx!.fillStyle = colors.particle;
        ctx!.fill();
      }

      update() {
        if (this.x > canvas!.width || this.x < 0)
          this.directionX = -this.directionX;
        if (this.y > canvas!.height || this.y < 0)
          this.directionY = -this.directionY;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 4;
            this.y -= forceDirectionY * force * 4;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    let particles: Particle[] = [];

    function init() {
      particles = [];
      // Fewer particles for subtle effect — fitness app, not a tech demo
      const numberOfParticles = Math.min(
        (canvas!.height * canvas!.width) / 18000,
        80
      );
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 1.8 + 0.8;
        const x = Math.random() * canvas!.width;
        const y = Math.random() * canvas!.height;
        const directionX = (Math.random() - 0.5) * 0.3;
        const directionY = (Math.random() - 0.5) * 0.3;
        particles.push(new Particle(x, y, directionX, directionY, size));
      }
    }

    const connect = () => {
      const colors = getColors();
      const maxDist = (canvas!.width / 8) * (canvas!.height / 8);
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = dx * dx + dy * dy;

          if (distance < maxDist) {
            const opacity = 1 - distance / maxDist;

            // Highlight connections near cursor
            let isNearMouse = false;
            if (mouse.x !== null && mouse.y !== null) {
              const mdx = particles[a].x - mouse.x;
              const mdy = particles[a].y - mouse.y;
              const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
              if (mDist < mouse.radius) isNearMouse = true;
            }

            ctx!.strokeStyle = isNearMouse
              ? colors.lineHover(opacity)
              : colors.line(opacity);
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
      }
    };

    const resizeCanvas = () => {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      init();
    };

    const animateCanvas = () => {
      animationFrameId = requestAnimationFrame(animateCanvas);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connect();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseOut);

    resizeCanvas();
    animateCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [getColors]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Animated counter component                                         */
/* ------------------------------------------------------------------ */
function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
  delay = 0.8,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) =>
    Math.round(v).toLocaleString()
  );

  useEffect(() => {
    const controls = animate(motionVal, target, {
      duration,
      delay,
      ease: "easeOut",
    });
    const unsub = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v + suffix;
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [motionVal, rounded, target, suffix, duration, delay]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ------------------------------------------------------------------ */
/*  Animated SVG progress ring                                         */
/* ------------------------------------------------------------------ */
function ProgressRing({
  percent,
  size = 120,
  stroke = 8,
  delay = 1,
}: {
  percent: number;
  size?: number;
  stroke?: number;
  delay?: number;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--muted))"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference * (1 - percent / 100) }}
        transition={{ duration: 1.8, delay, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Heartbeat pulse line                                               */
/* ------------------------------------------------------------------ */
function HeartbeatLine() {
  return (
    <svg
      viewBox="0 0 200 40"
      className="w-full h-8 opacity-30"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0,20 L30,20 L40,20 L50,8 L55,32 L60,4 L65,36 L70,20 L80,20 L200,20"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 1.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Hero                                                          */
/* ------------------------------------------------------------------ */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ---- Background layers ---- */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-background to-background" />

        {/* Radial glow -- top left */}
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary/[0.08] blur-[100px]" />

        {/* Radial glow -- bottom right */}
        <div className="absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full bg-primary/[0.06] blur-[120px]" />
      </div>

      {/* ---- Interactive particle network (from AetherFlowHero) ---- */}
      <div className="absolute inset-0 -z-[5]">
        <ParticleNetwork />
      </div>

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ======================== TEXT COLUMN ======================== */}
          <div className="text-center lg:text-left relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] pl-2 pr-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  <Activity className="h-3 w-3" />
                </span>
                Trusted by 10,000+ Athletes
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="mt-7 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[3.75rem] lg:leading-[1.08]"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              Elevate Every{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-chart-4 bg-clip-text text-transparent">
                  Rep, Every Mile,
                </span>
              </span>
              <br />
              Every Goal.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="mt-6 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              The intelligent fitness platform that adapts to you. Track
              workouts, optimize nutrition, and watch your transformation unfold
              with precision analytics.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="mt-9 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <Button
                size="lg"
                className="gap-2 text-base px-7 shadow-glow hover:shadow-glow-lg transition-shadow duration-300"
                asChild
              >
                <Link href="/auth">
                  Start Your Journey
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base px-7 border-primary/20 hover:border-primary/40 hover:bg-primary/[0.04] backdrop-blur-sm transition-all duration-300"
                asChild
              >
                <Link href="/auth?mode=login">Sign In</Link>
              </Button>
            </motion.div>

            {/* Trust stats row */}
            <motion.div
              className="mt-12 flex items-center gap-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            >
              {[
                { value: 10, suffix: "K+", label: "Active Users" },
                { value: 2, suffix: "M+", label: "Workouts Logged" },
                { value: 98, suffix: "%", label: "Satisfaction" },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-xl sm:text-2xl font-bold font-heading">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      delay={0.8 + i * 0.2}
                    />
                  </p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ====================== VISUAL COLUMN ====================== */}
          <motion.div
            className="hidden lg:block relative z-10"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
          >
            {/* Main dashboard card -- glassmorphism */}
            <div className="relative rounded-2xl border border-primary/10 bg-card/80 backdrop-blur-xl p-7 shadow-[0_8px_60px_-12px_hsl(var(--primary)/0.15)]">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    This Week
                  </p>
                  <h3 className="font-heading font-bold text-xl mt-0.5">
                    Your Progress
                  </h3>
                </div>
                <motion.div
                  className="flex items-center gap-1.5 rounded-full bg-success/10 text-success px-3 py-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 1.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <Trophy className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">On Track</span>
                </motion.div>
              </div>

              {/* Progress ring + stats row */}
              <div className="flex items-center gap-6 mb-6">
                <div className="relative flex-shrink-0">
                  <ProgressRing percent={72} size={110} stroke={8} delay={0.8} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold font-heading">72%</span>
                    <span className="text-[10px] text-muted-foreground">
                      Weekly Goal
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  {[
                    {
                      icon: Flame,
                      label: "Calories Burned",
                      value: "1,847",
                      color: "text-chart-3",
                      bg: "bg-chart-3/10",
                    },
                    {
                      icon: Activity,
                      label: "Active Minutes",
                      value: "312",
                      color: "text-primary",
                      bg: "bg-primary/10",
                    },
                    {
                      icon: Heart,
                      label: "Avg Heart Rate",
                      value: "142 bpm",
                      color: "text-chart-5",
                      bg: "bg-chart-5/10",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 1 + i * 0.15,
                        ease: "easeOut",
                      }}
                    >
                      <div
                        className={`h-8 w-8 rounded-lg ${item.bg} flex items-center justify-center`}
                      >
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-muted-foreground truncate">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold font-heading">
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Animated bar chart */}
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-muted-foreground font-medium">
                    Daily Activity
                  </p>
                  <p className="text-xs font-semibold text-primary">
                    +18% vs last week
                  </p>
                </div>
                <div className="flex items-end gap-1.5 h-20">
                  {[35, 58, 42, 75, 52, 88, 65].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-md bg-gradient-to-t from-primary to-primary/50 relative group cursor-default"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{
                        duration: 0.7,
                        delay: 0.7 + i * 0.07,
                        ease: "easeOut",
                      }}
                    >
                      {h >= 80 && (
                        <div className="absolute inset-0 rounded-md overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%]" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <span
                      key={i}
                      className="flex-1 text-center text-[10px] text-muted-foreground"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Heartbeat line accent */}
              <div className="mt-4">
                <HeartbeatLine />
              </div>
            </div>

            {/* ---- Floating accent cards ---- */}

            {/* Top-right: Streak card */}
            <motion.div
              className="absolute -top-6 -right-6 rounded-xl border border-primary/15 bg-card/90 backdrop-blur-md shadow-lg px-4 py-3"
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 1.4,
                type: "spring",
                stiffness: 150,
              }}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-lg bg-chart-3/15 flex items-center justify-center">
                    <Flame className="h-5 w-5 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-lg font-bold font-heading leading-none">
                      12 Days
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      Current Streak
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Bottom-left: Workout complete card */}
            <motion.div
              className="absolute -bottom-5 -left-5 rounded-xl border border-success/20 bg-card/90 backdrop-blur-md shadow-lg px-4 py-2.5"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 1.6,
                type: "spring",
                stiffness: 150,
              }}
            >
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-success/15 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 2,
                        type: "spring",
                        stiffness: 300,
                      }}
                    >
                      <span className="text-success text-sm font-bold">
                        &#10003;
                      </span>
                    </motion.div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Workout Complete</p>
                    <p className="text-[10px] text-muted-foreground">
                      Upper Body - 48 min
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
