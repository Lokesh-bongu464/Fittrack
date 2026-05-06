import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { signToken } from "../lib/jwt";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// Validation schemas
const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  profile: z
    .object({
      dateOfBirth: z.string().nullable().optional(),
      gender: z.string().nullable().optional(),
      height: z.number().positive().nullable().optional(),
      heightUnit: z.enum(["cm", "ft"]).optional(),
      weight: z.number().positive().nullable().optional(),
      weightUnit: z.enum(["kg", "lbs"]).optional(),
      goals: z.array(z.string()).optional(),
      activityLevel: z.string().nullable().optional(),
      username: z.string().min(3).regex(/^[a-zA-Z0-9_]+$/).nullable().optional(),
      bio: z.string().max(160).nullable().optional(),
      notifications: z
        .object({
          workoutReminders: z.boolean().optional(),
          weeklyReports: z.boolean().optional(),
          communityUpdates: z.boolean().optional(),
          promotionalEmails: z.boolean().optional(),
        })
        .optional(),
    })
    .optional(),
});

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

// POST /api/auth/register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: parsed.error.issues[0]?.message || "Invalid input",
      });
      return;
    }

    const { fullName, email, password, profile } = parsed.data;
    const trimmedEmail = email.trim().toLowerCase();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    });
    if (existingUser) {
      res.status(409).json({ error: "An account with this email already exists" });
      return;
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        fullName: fullName.trim(),
        email: trimmedEmail,
        password: hashedPassword,
        profile: profile
          ? {
              create: {
                dateOfBirth: profile.dateOfBirth || null,
                gender: profile.gender || null,
                height: profile.height || null,
                heightUnit: profile.heightUnit || "cm",
                weight: profile.weight || null,
                weightUnit: profile.weightUnit || "kg",
                goals: profile.goals || [],
                activityLevel: profile.activityLevel || null,
                username: profile.username || null,
                bio: profile.bio || null,
                workoutReminders: profile.notifications?.workoutReminders ?? true,
                weeklyReports: profile.notifications?.weeklyReports ?? true,
                communityUpdates: profile.notifications?.communityUpdates ?? false,
                promotionalEmails:
                  profile.notifications?.promotionalEmails ?? false,
              },
            }
          : undefined,
      },
      select: { id: true, fullName: true, email: true, createdAt: true },
    });

    const token = await signToken({ userId: user.id, email: user.email });

    res
      .status(201)
      .json({ user, token, message: "Account created successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
});

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: parsed.error.issues[0]?.message || "Invalid input",
      });
      return;
    }

    const { email, password } = parsed.data;
    const trimmedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: trimmedEmail },
      include: { profile: true },
    });

    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = await signToken({ userId: user.id, email: user.email });

    res.json({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        profile: user.profile,
      },
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
});

// GET /api/auth/me — get current user
router.get("/me", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        profile: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ user });
  } catch (error) {
    console.error("Auth check error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
