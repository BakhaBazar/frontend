import type { Dob } from "@/types/models/helper"

// Possible steps in the signup flow
export type Step = "email" | "password" | "details" | "terms" | "username"

// Signup state
export interface SignupState {
  email: string
  firstName: string
  lastName: string
  username: string
  dob: Dob
  password: string
}