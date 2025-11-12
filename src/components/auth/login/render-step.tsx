"use client"

import { UsernameStep } from "@/components/auth/login/login-username"
import PasswordStep from "./password-step"
import { Step, LoginState } from "@/types/login-types"
// Props for rendering login steps
interface RenderLoginStepProps {
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

export function RenderLoginStep({
  step,
  username,
  setUsername,
  password,
  setPassword,
  nextStep,
  prevStep,
}: RenderLoginStepProps) {
  if (step === "username") {
    return <UsernameStep storeUsername={username} setUsername={setUsername} onNext={nextStep} />
  }

  if (step === "password") {
    return (
      <PasswordStep
        password={password}
        setPassword={setPassword}
        onNext={nextStep}
        onBack={prevStep}
      />
    )
  }

  return null
}
