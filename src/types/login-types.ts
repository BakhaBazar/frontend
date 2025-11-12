// Possible steps in the login flow
export type Step = "username" | "password"

// Login state
export interface LoginState {
  username: string
  password: string
}

