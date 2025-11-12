"use client"

import { useSignupFlow } from "@/hooks/use-signup-flow"
import { RenderStep } from "@/components/auth/register/render-step"

export default function LoginPage() {

  const signup = useSignupFlow()
  
  return (
    <div className="bg-primary-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          
          <RenderStep {...signup} />

          {signup.step !== "terms" && (
            <p className="mt-6 max-w-sm text-xs text-secondary">
              By signing up, you agree to our{" "}
              <a
                href="#"
                className="underline underline-offset-4 text-secondary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline underline-offset-4 text-secondary"
              >
                Privacy Policy
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
