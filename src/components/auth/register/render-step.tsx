"use client"

import { EmailStep } from "@/components/auth/register/signup-email"
import StepManager from "@/components/auth/register/step-manager"
import type { Step } from "@/types/signup-types"
import type { SignupState } from "@/types/signup-types"

interface RenderStepProps {
  step: Step
  prevStep: () => void
  nextStep: () => void

  // Email step
  email: SignupState["email"]
  setEmail: (email: SignupState["email"]) => void

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


export function RenderStep({
  step,
  email,
  setEmail,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  dob,
  setDob,
  nextStep,
  prevStep,
  username,
  setUsername,
}: RenderStepProps) {

  if (step === "email") {

    return <EmailStep
      storeEmail={email}
      setEmail={setEmail}
      onNext={nextStep}
    />
  }

  return (
    <StepManager
      step={step}

      password={password}
      username={username}
      firstName={firstName}
      lastName={lastName}
      dob={dob}

      setPassword={setPassword}
      setFirstName={setFirstName}
      setLastName={setLastName}
      setDob={setDob}
      setUsername={setUsername}

      prevStep={prevStep}
      nextStep={nextStep}
    />
  )
}
