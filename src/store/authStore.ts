import { create } from "zustand";
import { api, setToken, removeToken } from "@/lib/api";

interface Step1Data {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Step2Data {
  dateOfBirth: string;
  gender: "male" | "female" | "other" | "prefer-not-to-say" | "";
  height: number;
  heightUnit: "cm" | "ft";
  weight: number;
  weightUnit: "kg" | "lbs";
}

interface Step3Data {
  goals: string[];
}

interface Step4Data {
  activityLevel: string;
}

interface Step5Data {
  avatarPreview: string | null;
  username: string;
  bio: string;
  notifications: {
    workoutReminders: boolean;
    weeklyReports: boolean;
    communityUpdates: boolean;
    promotionalEmails: boolean;
  };
}

interface AuthStore {
  currentStep: number;
  direction: number;
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data | null;
  step5: Step5Data | null;
  isComplete: boolean;
  isLoading: boolean;
  error: string | null;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep1: (data: Partial<Step1Data>) => void;
  setStep2: (data: Partial<Step2Data>) => void;
  setStep3: (data: Partial<Step3Data>) => void;
  setStep4: (data: Step4Data | null) => void;
  setStep5: (data: Step5Data | null) => void;
  setComplete: () => void;
  registerUser: () => Promise<boolean>;
  reset: () => void;
}

const initialStep1: Step1Data = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialStep2: Step2Data = {
  dateOfBirth: "",
  gender: "",
  height: 170,
  heightUnit: "cm",
  weight: 70,
  weightUnit: "kg",
};

const initialStep3: Step3Data = {
  goals: [],
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  currentStep: 1,
  direction: 1,
  step1: initialStep1,
  step2: initialStep2,
  step3: initialStep3,
  step4: null,
  step5: null,
  isComplete: false,
  isLoading: false,
  error: null,

  setCurrentStep: (step) => set({ currentStep: step }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 5),
      direction: 1,
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
      direction: -1,
    })),

  setStep1: (data) =>
    set((state) => ({ step1: { ...state.step1, ...data } })),

  setStep2: (data) =>
    set((state) => ({ step2: { ...state.step2, ...data } })),

  setStep3: (data) =>
    set((state) => ({ step3: { ...state.step3, ...data } })),

  setStep4: (data) => set({ step4: data }),

  setStep5: (data) => set({ step5: data }),

  setComplete: () => set({ isComplete: true }),

  // Register user with backend API
  registerUser: async () => {
    const { step1, step2, step3, step4, step5 } = get();
    set({ isLoading: true, error: null });

    try {
      const res = await api.register({
        fullName: step1.fullName,
        email: step1.email,
        password: step1.password,
        profile: {
          dateOfBirth: step2.dateOfBirth,
          gender: step2.gender,
          height: step2.height,
          heightUnit: step2.heightUnit,
          weight: step2.weight,
          weightUnit: step2.weightUnit,
          goals: step3.goals,
          activityLevel: step4?.activityLevel || null,
          username: step5?.username || null,
          bio: step5?.bio || null,
          notifications: step5?.notifications || {
            workoutReminders: true,
            weeklyReports: true,
            communityUpdates: false,
            promotionalEmails: false,
          },
        },
      });

      setToken(res.token);
      // Clear sensitive data from memory
      set({
        isLoading: false,
        isComplete: true,
        step1: { ...get().step1, password: "", confirmPassword: "" },
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed";
      set({ isLoading: false, error: message });
      return false;
    }
  },

  reset: () => {
    removeToken();
    set({
      currentStep: 1,
      direction: 1,
      step1: initialStep1,
      step2: initialStep2,
      step3: initialStep3,
      step4: null,
      step5: null,
      isComplete: false,
      isLoading: false,
      error: null,
    });
  },
}));
