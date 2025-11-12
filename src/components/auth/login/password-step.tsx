"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"

interface PasswordStepProps {
  password: string
  setPassword: (val: string) => void
  onNext: () => void
  onBack: () => void
}

export default function PasswordStep({
  password,
  setPassword,
  onNext,
  onBack,
}: PasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.trim()) onNext()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-6 mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="text-secondary hover:text-primary"
        >
          <ChevronLeft className="h-8 w-8 text-highlight-semilight hover:text-highlight-light cursor-pointer" />
        </button>
        <h1 className="text-lg font-bold text-secondary font-ubuntu">
          Enter your password
        </h1>
      </div>

      {/* Password Field */}
      <div className="w-[90%] mx-auto space-y-4">
        <div className="space-y-2 flex flex-col gap-4">
          <Label htmlFor="password" className="text-secondary font-semibold">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-secondary p-6 pr-12 font-semibold border-highlight"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="mt-5 py-5 bg-secondary-button-background font-bold text-secondary-button-foreground hover:bg-secondary-button-background/90 rounded-full px-8 w-full cursor-pointer"
        >
          Login
        </Button>
      </div>
    </form>
  )
}
