"use client";

import { useEffect, useState } from "react";
import { Bell, User } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsCards from "@/components/dashboard/StatsCards";
import TodayWorkoutCard from "@/components/dashboard/TodayWorkoutCard";
import WeeklyChart from "@/components/dashboard/WeeklyChart";
import QuickActions from "@/components/dashboard/QuickActions";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { api } from "@/lib/api";

interface UserData {
  fullName: string;
  email: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    api
      .getMe()
      .then((res) => {
        const u = res.user as unknown as UserData;
        setUser(u);
      })
      .catch(() => {
        // Fallback if backend is unavailable
        setUser(null);
      });
  }, []);

  const firstName = user?.fullName?.split(" ")[0] || "there";
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile top padding for fixed header */}
        <div className="lg:hidden h-14 shrink-0" />

        {/* Fixed Top Bar */}
        <header
          className="fixed top-0 right-0 left-0 lg:left-[var(--sidebar-width)] z-30 hidden sm:flex items-center justify-between h-16 border-b bg-background/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 transition-all duration-300"
          style={{ "--sidebar-width": "256px" } as React.CSSProperties}
        >
          {/* Welcome */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
              {initials}
            </div>
            <div>
              <h1 className="font-heading text-lg font-bold">
                Welcome back, {firstName}!
              </h1>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border bg-card text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-destructive ring-2 ring-background" />
            </button>
            <ThemeToggle />
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border bg-card text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <User className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Top bar spacer */}
        <div className="hidden sm:block h-16 shrink-0" />

        {/* Scrollable Content */}
        <main className="flex-1">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
            {/* Page Title */}
            <div>
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                Dashboard
              </h2>
              <p className="text-muted-foreground mt-0.5 text-sm">
                Here&apos;s your fitness overview for today.
              </p>
            </div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Workout + Chart */}
              <div className="lg:col-span-2 space-y-6">
                <TodayWorkoutCard />
                <WeeklyChart />
              </div>

              {/* Right: Quick Actions */}
              <div>
                <QuickActions />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
