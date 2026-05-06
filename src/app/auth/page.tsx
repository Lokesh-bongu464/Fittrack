"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import ThemeToggle from "@/components/shared/ThemeToggle";
import StepIndicator from "@/components/auth/StepIndicator";
import Step1CreateAccount from "@/components/auth/Step1CreateAccount";
import Step2PersonalDetails from "@/components/auth/Step2PersonalDetails";
import Step3FitnessGoals from "@/components/auth/Step3FitnessGoals";
import Step4ActivityLevel from "@/components/auth/Step4ActivityLevel";
import Step5ProfileSetup from "@/components/auth/Step5ProfileSetup";
import WelcomeScreen from "@/components/auth/WelcomeScreen";
import LoginForm from "@/components/auth/LoginForm";
import { useAuthStore } from "@/store/authStore";

const stepComponents = [
  Step1CreateAccount,
  Step2PersonalDetails,
  Step3FitnessGoals,
  Step4ActivityLevel,
  Step5ProfileSetup,
];

export default function AuthPage() {
  const { currentStep, isComplete } = useAuthStore();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "register">(
    searchParams.get("mode") === "login" ? "login" : "register"
  );

  const StepComponent = stepComponents[currentStep - 1];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 border-b">
        <Link href="/">
          <Logo size="sm" />
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {isComplete ? (
              <WelcomeScreen key="welcome" />
            ) : mode === "login" ? (
              <LoginForm key="login" onSwitchToRegister={() => setMode("register")} />
            ) : (
              <div key="register">
                <div className="mb-8">
                  <StepIndicator currentStep={currentStep} totalSteps={5} />
                </div>
                <StepComponent />
                {currentStep === 1 && (
                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Already have an account?{" "}
                    <button
                      onClick={() => setMode("login")}
                      className="text-primary font-medium hover:underline"
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
