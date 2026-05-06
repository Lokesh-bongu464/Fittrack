import { z } from "zod";

export const step1Schema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const step2Schema = z.object({
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"], {
    error: "Please select your gender",
  }),
  height: z.number().positive("Height must be a positive number"),
  heightUnit: z.enum(["cm", "ft"]),
  weight: z.number().positive("Weight must be a positive number"),
  weightUnit: z.enum(["kg", "lbs"]),
});

export const step3Schema = z.object({
  goals: z
    .array(z.string())
    .min(1, "Select at least 1 goal")
    .max(3, "Maximum 3 goals"),
});

export const step4Schema = z.object({
  activityLevel: z
    .enum([
      "sedentary",
      "lightly-active",
      "moderately-active",
      "very-active",
      "athlete",
    ])
    .nullable(),
});

export const step5Schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  bio: z.string().max(160, "Bio must be 160 characters or less").optional(),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type Step4FormData = z.infer<typeof step4Schema>;
export type Step5FormData = z.infer<typeof step5Schema>;
