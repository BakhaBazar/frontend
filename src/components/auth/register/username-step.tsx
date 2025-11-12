"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { usernameSchema, UsernameFormValues } from "@/schemas/usernameSchema"
import { useState } from "react"

interface UsernameStepProps {
  username: string
  setUsername: (val: string) => void
  onNext: () => void
  onBack?: () => void
  stepIndex: number
  totalSteps: number
}


const API_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL

export default function UsernameStep({
  username,
  setUsername,
  onNext,
}: UsernameStepProps) {
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameSchema),
    defaultValues: { username },
  })

  const submitHandler = async (data: UsernameFormValues) => {
    setServerError(null)


    const res = await fetch(
      `${API_BASE_URL}/api/register/?username=${encodeURIComponent(data.username)}`
    );
    if (res.status === 400) {
      // Username exists
      setServerError("That username is already taken. Please choose another.")
      return
    } else if (res.status === 200) {
      // Username available
      setUsername(data.username)
      onNext()
    } else {
      setServerError("Unexpected error. Please try again.")
    }

  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex w-full max-w-sm flex-col gap-6 text-left mx-auto"
    >
      <div className="flex flex-col w-[80%] gap-4 mx-auto">
        {/* Username Input */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="username" className="text-secondary font-semibold">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            {...register("username")}
            className="text-secondary p-4 font-semibold border-highlight"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
          {serverError && (
            <p className="text-red-500 text-sm mt-1">{serverError}</p>
          )}
        </div>

        {/* Next Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary font-bold text-primary-foregrounds hover:bg-secondary/90 cursor-pointer rounded-full py-6 w-full mt-5"
        >
          {isSubmitting ? "Checking..." : "Next"}
        </Button>
      </div>
    </form>
  )
}
