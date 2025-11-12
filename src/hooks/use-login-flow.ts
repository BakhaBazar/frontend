"use client"

import Cookies from "js-cookie"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Step } from "@/types/login-types"
import { toast } from "sonner"


const API_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL

export function useLoginFlow() {
  const [step, setStep] = useState<Step>("username")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const submitLogin = async () => {
    try {
      setLoading(true)

      const csrfToken = Cookies.get("csrftoken")
      const res = await fetch(`${API_BASE_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken || "",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        let errorMsg = "Login failed"
        try {
          const errorData = await res.json()
          if (errorData?.detail) {
            errorMsg = errorData.detail
          }
        } catch {
          // In case parsing errorData fails
        }
        throw new Error(errorMsg)
      }

      const data = await res.json()
      console.log("Login success:", data)

      // Save auth token if returned
      if (data.token) {
        Cookies.set("authToken", data.token)
      }

      toast.success("Login successful")

      // Redirect to dashboard or home
      router.push("/home")

    } catch (err: unknown) {
      // Cast to Error type for better handling
      if (err instanceof Error) {
        console.error("Error logging in:", err)
        toast.error(err.message || "Something went wrong. Please try again.")
      } else {
        console.error("Unexpected error:", err)
        toast.error("Something went wrong. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (step === "username") setStep("password")
    else if (step === "password") {
      submitLogin()
    }
  }

  const prevStep = () => {
    if (step === "password") setStep("username")
  }

  return {
    step,
    setStep,
    username,
    setUsername,
    password,
    setPassword,
    nextStep,
    prevStep,
    loading,
  }
}
