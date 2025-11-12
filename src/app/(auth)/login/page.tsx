"use client"

import { RenderLoginStep } from "@/components/auth/login/render-step"
import { useLoginFlow } from "@/hooks/use-login-flow"

export default function LoginPage() {

  const login = useLoginFlow()

  return (
    <div className="bg-primary-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center gap-6 text-center">

          <RenderLoginStep {...login} />

          <p className="mt-6 max-w-sm text-xs text-secondary-text">
            By signing up, you agree to our{" "}
            <a
              href="#"
              className="underline underline-offset-4 text-secondary-text"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline underline-offset-4 text-secondary-text"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
