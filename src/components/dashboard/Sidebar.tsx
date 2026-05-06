"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  TrendingUp,
  Users,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/components/shared/Logo";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";
import { sidebarNavItems } from "@/lib/constants";
import { removeToken } from "@/lib/api";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  TrendingUp,
  Users,
  Settings,
};

function NavItem({
  icon: Icon,
  label,
  href,
  active,
  collapsed,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex h-11 w-full items-center rounded-lg transition-all duration-200",
        active
          ? "bg-primary/10 text-primary border-l-2 border-primary shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        collapsed ? "justify-center px-2" : "px-3"
      )}
    >
      <div className={cn("grid place-content-center", collapsed ? "w-full" : "w-8")}>
        <Icon className="h-[18px] w-[18px]" />
      </div>
      {!collapsed && (
        <span className="text-sm font-medium">{label}</span>
      )}
    </Link>
  );
}

function SidebarContent({
  collapsed,
  onToggle,
  onLogout,
}: {
  collapsed: boolean;
  onToggle?: () => void;
  onLogout?: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header — Logo + Collapse Toggle */}
      <div className="flex items-center justify-between border-b border-border px-3 h-16 shrink-0">
        {!collapsed && <Logo size="sm" />}
        {onToggle && (
          <button
            onClick={onToggle}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
              collapsed && "mx-auto"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-[18px] w-[18px]" />
            ) : (
              <PanelLeftClose className="h-[18px] w-[18px]" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {sidebarNavItems.map((item) => {
          const Icon = iconMap[item.icon];
          if (!Icon) return null;
          return (
            <NavItem
              key={item.label}
              icon={Icon}
              label={item.label}
              href={item.href}
              active={item.active}
              collapsed={collapsed}
            />
          );
        })}
      </nav>

      {/* Footer — Log Out */}
      <div className="border-t border-border px-3 py-3">
        <button
          onClick={onLogout}
          className={cn(
            "flex h-11 w-full items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
            collapsed ? "justify-center px-2" : "px-3 gap-3"
          )}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Log Out</span>}
        </button>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/");
  };

  return (
    <>
      {/* Desktop Sidebar — sticky, only content scrolls */}
      <nav
        className={cn(
          "hidden lg:flex sticky top-0 h-screen shrink-0 flex-col border-r bg-card/50 transition-all duration-300 ease-in-out",
          collapsed ? "w-[68px]" : "w-64"
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          onLogout={handleLogout}
        />
      </nav>

      {/* Mobile Header + Drawer */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-14 border-b bg-background/80 backdrop-blur-sm px-4">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <SidebarContent collapsed={false} onLogout={handleLogout} />
          </SheetContent>
        </Sheet>
        <Logo size="sm" />
        <ThemeToggle />
      </div>
    </>
  );
}
