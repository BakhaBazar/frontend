import React from "react"
import { ChevronLeft } from "lucide-react"
import PasswordStep from "./password-step"
import DetailStep from "./details-step"
import UsernameStep from "./username-step"
import TermsStep from "./agree-step"
import type { Step } from "@/types/signup-types"
import { SignupState } from "@/types/signup-types"

interface StepManagerProps {
  step: Step
  prevStep: () => void
  nextStep: () => void

  // Password step
  password: SignupState["password"]
  setPassword: (password: SignupState["password"]) => void

  // Details step
  firstName: SignupState["firstName"]
  setFirstName: (firstName: SignupState["firstName"]) => void
  lastName: SignupState["lastName"]
  setLastName: (lastName: SignupState["lastName"]) => void
  dob: SignupState["dob"]
  setDob: (dob: SignupState["dob"]) => void

  // Username step
  username: SignupState["username"]
  setUsername: (username: SignupState["username"]) => void
}

const totalSteps = 4

const stepMapping: Record<string, number> = {
  "password": 1,
  "details": 2,
  "username": 3,
  "terms": 4
};

const stepLabels: { [key in Step]: string } = {
  email: "",
  password: "Create a password",
  details: "Enter your details",
  username: "Choose a username",
  terms: "Terms & Conditions",
};

function StepManager({
  step,
  password,
  firstName,
  lastName,
  dob,
  username,

  setPassword,
  setFirstName,
  setLastName,
  setDob,
  setUsername,

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
            stepIndex={1}
            totalSteps={totalSteps}
          />
        )}

        {step === "details" && (
          <DetailStep
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            dob={dob}
            setDob={setDob}
            onBack={prevStep}
            onNext={nextStep}
            stepIndex={2}
            totalSteps={totalSteps}
          />
        )}

        {step === "username" && (
          <UsernameStep
            username={username}
            setUsername={setUsername}
            onBack={prevStep}
            onNext={nextStep}
            stepIndex={3}
            totalSteps={totalSteps}
          />
        )}

        {step === "terms" && (
          <TermsStep
            onBack={prevStep}
            onNext={nextStep}
            stepIndex={4}
            totalSteps={totalSteps}
          />
        )}
      </div>
    </div>
  )
}

export default StepManager
