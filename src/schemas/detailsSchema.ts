import { z } from "zod"

export const detailSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be less than 50 characters" }),

  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less than 50 characters" }),

  dob: z.object({
    day: z
      .string()
      .regex(/^\d{1,2}$/, { message: "Day must be a number (1–31)" })
      .refine((val) => {
        const num = parseInt(val, 10)
        return num >= 1 && num <= 31
      }, { message: "Day must be between 1 and 31" }),

    month: z
      .string()
      .regex(/^(0?[1-9]|1[0-2])$/, { message: "Month must be between 1 and 12" }),

    year: z
      .string()
      .regex(/^\d{4}$/, { message: "Year must be a 4-digit number" })
      .refine((val) => {
        const year = parseInt(val, 10)
        const currentYear = new Date().getFullYear()
        return year >= 1900 && year <= currentYear
      }, { message: "Enter a valid year" }),
  }),
})

export type DetailFormValues = z.infer<typeof detailSchema>
