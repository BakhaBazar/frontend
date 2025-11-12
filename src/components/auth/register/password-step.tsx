"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { setPasswordSchema } from "@/schemas/setPasswordSchema"

type PasswordFormValues = z.infer<typeof setPasswordSchema>

interface PasswordStepProps {
  password: string
  setPassword: (val: string) => void
  onNext: () => void
  onBack: () => void
  stepIndex: number
  totalSteps: number
}

export default function PasswordStep({
  password,
  setPassword,
  onNext,
}: PasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: { password, confirm_password: "" },
  })

  const currentPassword = watch("password")

  const onSubmit = (data: PasswordFormValues) => {
    setPassword(data.password)
    onNext()
  }

  // Checklist logic
  const hasLetter = /[a-zA-Z]/.test(currentPassword || "")
  const hasNumberOrSpecial = /[\d\W]/.test(currentPassword || "")
  const hasMinLength = (currentPassword || "").length >= 6

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-6 mx-auto"
    >
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col gap-4 text-left">
          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-secondary font-semibold">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="text-secondary p-6 pr-12 font-semibold border-highlight"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="confirm_password"
              className="text-secondary font-semibold"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirm_password"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter your password"
                {...register("confirm_password")}
                className="text-secondary p-6 pr-12 font-semibold border-highlight"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          {/* Checklist */}
          <div className="flex flex-col gap-2 text-sm text-secondary">
            <p className="font-bold">Your password must contain at least</p>
            <div className="flex items-center gap-2">
              <Check
                className={cn(
                  "h-4 w-4 rounded-full p-1",
                  hasLetter ? "bg-green-500" : "bg-muted-foreground"
                )}
              />
              <span>1 letter</span>
            </div>
            <div className="flex items-center gap-2">
              <Check
                className={cn(
                  "h-4 w-4 rounded-full p-1",
                  hasNumberOrSpecial ? "bg-green-500" : "bg-muted-foreground"
                )}
              />
              <span>1 number or special character (example: # ? ! &amp;)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check
                className={cn(
                  "h-4 w-4 rounded-full p-1",
                  hasMinLength ? "bg-green-500" : "bg-muted-foreground"
                )}
              />
              <span>6 characters</span>
            </div>
          </div>

          {/* Next Button */}
          <Button
            type="submit"
            className="bg-primary font-bold text-primary-foreground hover:bg-secondary/90 cursor-pointer rounded-full py-6 w-full mt-5"
          >
            Next
          </Button>
        </div>
      </div>
    </form>
  )
}
