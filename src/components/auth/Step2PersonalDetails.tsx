"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { step2Schema, type Step2FormData } from "@/lib/schemas";

export default function Step2PersonalDetails() {
  const { step2, setStep2, nextStep, prevStep } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      ...step2,
      gender: step2.gender || undefined,
    } as Step2FormData,
    mode: "onChange",
  });

  const heightUnit = watch("heightUnit");
  const weightUnit = watch("weightUnit");

  const onSubmit = (data: Step2FormData) => {
    setStep2(data);
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" as const }}
    >
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-bold">Personal Details</h2>
        <p className="text-muted-foreground mt-1">
          Help us personalize your fitness experience.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Date of Birth */}
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Select
                defaultValue={step2.dateOfBirth ? step2.dateOfBirth.split("-")[1] : undefined}
                onValueChange={(val) => {
                  const current = watch("dateOfBirth") || "--";
                  const parts = current.split("-");
                  setValue("dateOfBirth", `${parts[0] || "2000"}-${val}-${parts[2] || "01"}`, { shouldValidate: true });
                }}
              >
                <SelectTrigger className={errors.dateOfBirth ? "border-destructive" : ""}>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {["January","February","March","April","May","June","July","August","September","October","November","December"].map((m, i) => (
                    <SelectItem key={m} value={String(i + 1).padStart(2, "0")}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                defaultValue={step2.dateOfBirth ? step2.dateOfBirth.split("-")[2] : undefined}
                onValueChange={(val) => {
                  const current = watch("dateOfBirth") || "--";
                  const parts = current.split("-");
                  setValue("dateOfBirth", `${parts[0] || "2000"}-${parts[1] || "01"}-${val}`, { shouldValidate: true });
                }}
              >
                <SelectTrigger className={errors.dateOfBirth ? "border-destructive" : ""}>
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>{i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                defaultValue={step2.dateOfBirth ? step2.dateOfBirth.split("-")[0] : undefined}
                onValueChange={(val) => {
                  const current = watch("dateOfBirth") || "--";
                  const parts = current.split("-");
                  setValue("dateOfBirth", `${val}-${parts[1] || "01"}-${parts[2] || "01"}`, { shouldValidate: true });
                }}
              >
                <SelectTrigger className={errors.dateOfBirth ? "border-destructive" : ""}>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 80 }, (_, i) => {
                    const year = new Date().getFullYear() - 10 - i;
                    return <SelectItem key={year} value={String(year)}>{year}</SelectItem>;
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          {errors.dateOfBirth && (
            <p className="text-sm text-destructive">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label>Gender</Label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
              { value: "prefer-not-to-say", label: "Skip" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  setValue("gender", option.value as Step2FormData["gender"], {
                    shouldValidate: true,
                  })
                }
                className={cn(
                  "rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all duration-200",
                  watch("gender") === option.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.gender && (
            <p className="text-sm text-destructive">{errors.gender.message}</p>
          )}
        </div>

        {/* Height */}
        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <div className="flex gap-2">
            <Input
              id="height"
              type="number"
              step="0.1"
              {...register("height", { valueAsNumber: true })}
              className={
                errors.height ? "border-destructive flex-1" : "flex-1"
              }
            />
            <Select
              defaultValue={heightUnit}
              onValueChange={(val) =>
                setValue("heightUnit", val as "cm" | "ft")
              }
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cm">cm</SelectItem>
                <SelectItem value="ft">ft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {errors.height && (
            <p className="text-sm text-destructive">{errors.height.message}</p>
          )}
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <Label htmlFor="weight">Weight</Label>
          <div className="flex gap-2">
            <Input
              id="weight"
              type="number"
              step="0.1"
              {...register("weight", { valueAsNumber: true })}
              className={
                errors.weight ? "border-destructive flex-1" : "flex-1"
              }
            />
            <Select
              defaultValue={weightUnit}
              onValueChange={(val) =>
                setValue("weightUnit", val as "kg" | "lbs")
              }
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="lbs">lbs</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {errors.weight && (
            <p className="text-sm text-destructive">{errors.weight.message}</p>
          )}
        </div>

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
          <Button type="submit" className="flex-1 gap-2" size="lg" disabled={!isValid}>
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
