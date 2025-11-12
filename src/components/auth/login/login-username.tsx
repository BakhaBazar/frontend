"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { FaApple } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { usernameSchema, UsernameFormValues } from "@/schemas/usernameSchema"
import { useState } from "react"

interface UsernameStepProps {
  storeUsername: string
  setUsername: (Username: string) => void
  onNext: () => void
}

export function UsernameStep({ storeUsername, setUsername, onNext }: UsernameStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameSchema),
    defaultValues: { username: storeUsername },
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: UsernameFormValues) => {
    setLoading(true)
    try {
      // Save Username in parent state
      setUsername(data.username)

      // If you want to check Username exists on server, add fetch here
      // Example:
      // const res = await fetch("api/check-Username", { method: "POST", body: JSON.stringify({ Username: data.Username }) })

      // Move to password step
      onNext()
    } catch (err) {
      console.error("Username validation failed", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-2"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-5xl font-extrabold text-secondary font-ubuntu">
          Log In to start playing
        </h1>
      </div>

      <div className="flex flex-col w-[90%] mx-auto">
        {/* Username Input */}
        <div className="grid gap-2 text-left mt-5 bg-primary-background">

          <Input
            id="username"
            type="username"
            placeholder="Enter your username"
            {...register("username")}
            className="text-secondary p-6 border-highlight mt-2 font-semibold"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Next Button */}
        <Button
          type="submit"
          disabled={loading}
          className="bg-secondary-button-background font-bold text-primary-foreground hover:bg-secondary-button-background/90 cursor-pointer rounded-full py-6 w-[90%] mx-auto mt-5"
        >
          {loading ? "Checking..." : "Next"}
        </Button>

        {/* Divider */}
        <div className="relative my-2 text-sm text-muted-foreground text-center">
          <span className="relative text-secondary px-2 text-lg">or</span>
        </div>

        {/* Social Buttons */}
        <div className="grid gap-4">
          <Button
            variant="outline"
            type="button"
            className="w-full flex items-center gap-2 bg-primary-button-background text-primary-button-foreground cursor-pointer py-5 border-highlight rounded-full"
          >
            <Image
              src="/icons/google.svg"
              alt="Google Logo"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            Log In with Google
          </Button>

          <Button
            variant="outline"
            type="button"
            className="w-full flex items-center gap-2 bg-primary-button-background text-primary-button-foreground cursor-pointer py-5 border-highlight rounded-full"
          >
            <FaApple className="h-8 w-8 text-rimary-button-foreground" />
            Log In with Apple
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-secondary-text mt-1 text-center">
        Don’t have an account?{" "}
        <a href="/register" className="underline underline-offset-4 text-secondary-text">
          Sign up here.
        </a>
      </div>
    </form>
  )
}
