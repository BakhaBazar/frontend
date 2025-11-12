import { z } from "zod"

export const emailVerifySchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export type EmailFormValues = z.infer<typeof emailVerifySchema>
