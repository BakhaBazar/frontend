import React from "react"
import { ChevronLeft } from "lucide-react"
import { LoginState, Step } from "@/types/login-types"
import PasswordStep from "./password-step"

interface StepManagerProps {
  step: Step
  prevStep: () => void
  nextStep: () => void

  // Username step
  username: LoginState["username"]
  setUsername: (username: LoginState["username"]) => void

  // Password step
  password: LoginState["password"]
  setPassword: (password: LoginState["password"]) => void
}

const totalSteps = 1

const stepMapping: Record<string, number> = {
  "password": 1,
};

const stepLabels: { [key in Step]: string } = {
  username: "",
  password: "Create a password",
};


function StepManager({
  step,
  password,
  setPassword,
  prevStep,
  nextStep,
}: StepManagerProps) {
  const stepIndex = stepMapping[step] || 0;

  return (
    <div className="flex flex-col items-center w-full mx-auto h-full max-h-screen">
      {/* Fixed Header + Progress */}
      <div className="w-full max-w-md flex-shrink-0">
        {/* Progress Bar */}
        <div className="w-full h-[3px] bg-highlight rounded-full overflow-hidden mb-4">
          <div
            className="h-[3px] bg-primary rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${(stepIndex / totalSteps) * 100}%` }}
          />
        </div>

        {/* Header: Back button + Step info */}
        <div className="flex gap-3 items-center mb-6">
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="text-secondary hover:text-primary"
            >
              <ChevronLeft className="h-8 w-8 text-highlight-semilight hover:text-highlight-light cursor-pointer" />
            </button>
          )}
          <div className="flex flex-col text-left">
            <span className="text-md font-bold text-highlight-semilight">
              Step {stepIndex} of {totalSteps}
            </span>
            <h1 className="text-lg font-bold text-secondary font-ubuntu">
              {stepLabels[step] || ""}
            </h1>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="w-full max-w-md flex-1 overflow-y-auto pb-6">
        {step === "password" && (
          <PasswordStep
            password={password}
            setPassword={setPassword}
            onBack={prevStep}
            onNext={nextStep}
          />
        )}
      </div>
    </div>
  )
}

export default StepManager
