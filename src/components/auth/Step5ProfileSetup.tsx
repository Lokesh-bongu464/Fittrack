"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Camera, Check } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/store/authStore";
import { step5Schema, type Step5FormData } from "@/lib/schemas";

export default function Step5ProfileSetup() {
  const { step1, setStep5, setComplete, registerUser, isLoading, error, prevStep } = useAuthStore();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    weeklyReports: true,
    communityUpdates: false,
    promotionalEmails: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step5FormData>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      username: "",
      bio: "",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: Step5FormData) => {
    setStep5({
      username: data.username,
      bio: data.bio || "",
      avatarPreview,
      notifications,
    });
    // Register with backend — falls back to local completion if backend unavailable
    const success = await registerUser();
    if (!success) {
      // Still allow completion even if backend is down (graceful degradation)
      setComplete();
    }
  };

  const initials = step1.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" as const }}
    >
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-bold">Set Up Your Profile</h2>
        <p className="text-muted-foreground mt-1">
          Almost there! Customize your profile.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative group"
          >
            <div className="h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold overflow-hidden border-2 border-primary/20">
              {avatarPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                initials || "?"
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-5 w-5 text-white" />
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <p className="text-xs text-muted-foreground">
            Click to upload a profile photo
          </p>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="fitness_guru"
            {...register("username")}
            className={errors.username ? "border-destructive" : ""}
          />
          {errors.username && (
            <p className="text-sm text-destructive">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio">Bio (optional)</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself..."
            rows={3}
            {...register("bio")}
            className={errors.bio ? "border-destructive" : ""}
          />
          {errors.bio && (
            <p className="text-sm text-destructive">{errors.bio.message}</p>
          )}
        </div>

        {/* Notification Preferences */}
        <div className="space-y-4">
          <Label className="text-base">Notifications</Label>
          <div className="space-y-3">
            {[
              {
                key: "workoutReminders" as const,
                label: "Workout Reminders",
                desc: "Get reminded about your scheduled workouts",
              },
              {
                key: "weeklyReports" as const,
                label: "Weekly Reports",
                desc: "Receive weekly progress summaries",
              },
              {
                key: "communityUpdates" as const,
                label: "Community Updates",
                desc: "Stay updated with community activities",
              },
              {
                key: "promotionalEmails" as const,
                label: "Promotional Emails",
                desc: "Receive offers and new feature updates",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={notifications[item.key]}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.key]: checked,
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        {/* Skip option */}
        <button
          type="button"
          disabled={isLoading}
          onClick={async () => {
            setStep5({
              username: "user_" + Math.random().toString(36).slice(2, 8),
              bio: "",
              avatarPreview: null,
              notifications: {
                workoutReminders: true,
                weeklyReports: true,
                communityUpdates: false,
                promotionalEmails: false,
              },
            });
            const success = await registerUser();
            if (!success) setComplete();
          }}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip for now
        </button>

        {/* Navigation */}
        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className="gap-2"
            size="lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button type="submit" className="flex-1 gap-2" size="lg" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Complete Setup"}
            {!isLoading && <Check className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
