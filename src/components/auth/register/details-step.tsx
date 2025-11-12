"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { detailSchema, DetailFormValues } from "@/schemas/detailsSchema"

interface DetailStepProps {
  firstName: string
  setFirstName: (val: string) => void
  lastName: string
  setLastName: (val: string) => void
  dob: { day: string; month: string; year: string }
  setDob: (val: { day: string; month: string; year: string }) => void
  onNext: () => void
  onBack?: () => void
  stepIndex: number
  totalSteps: number
}

export default function DetailStep({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  dob,
  setDob,
  onNext,
}: DetailStepProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DetailFormValues>({
    resolver: zodResolver(detailSchema),
    defaultValues: {
      firstName,
      lastName,
      dob,
    },
  })

  const submitHandler = (data: DetailFormValues) => {
    setFirstName(data.firstName)
    setLastName(data.lastName)
    setDob(data.dob)
    onNext()
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex w-full max-w-sm flex-col gap-6 text-left mx-auto"
    >
      <div className="flex flex-col w-[80%] gap-4 mx-auto">
        {/* First Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName" className="text-secondary font-semibold">
            First Name
          </Label>
          <Input
            id="firstName"
            type="text"
            {...register("firstName")}
            className="text-secondary p-4 font-semibold border-highlight"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName" className="text-secondary font-semibold">
            Last Name
          </Label>
          <Input
            id="lastName"
            type="text"
            {...register("lastName")}
            className="text-secondary p-4 font-semibold border-highlight"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-2">
          <Label className="text-secondary font-semibold">Date of birth</Label>
          <span className="text-xs text-highlight-semilight">
            Why do we need your date of birth?{" "}
            <a href="#" className="underline">
              Learn more.
            </a>
          </span>

          <div className="flex gap-2 mt-2">
            {/* Day */}
            <Input
              type="text"
              placeholder="DD"
              maxLength={2}
              {...register("dob.day")}
              className="text-secondary p-4 font-semibold border-highlight w-16"
            />

            {/* Month */}
            <Controller
              control={control}
              name="dob.month"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-32 text-secondary font-semibold border-highlight bg-sidebar">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent className="bg-sidebar text-secondary border border-highlight rounded-md">
                    <SelectItem value="1">January</SelectItem>
                    <SelectItem value="2">February</SelectItem>
                    <SelectItem value="3">March</SelectItem>
                    <SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">May</SelectItem>
                    <SelectItem value="6">June</SelectItem>
                    <SelectItem value="7">July</SelectItem>
                    <SelectItem value="8">August</SelectItem>
                    <SelectItem value="9">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {/* Year */}
            <Input
              type="text"
              placeholder="YYYY"
              maxLength={4}
              {...register("dob.year")}
              className="text-secondary p-4 font-semibold border-highlight w-24"
            />
          </div>

          {/* Errors for DOB */}
          {errors.dob?.day && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dob.day.message}
            </p>
          )}
          {errors.dob?.month && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dob.month.message}
            </p>
          )}
          {errors.dob?.year && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dob.year.message}
            </p>
          )}
        </div>

        {/* Next Button */}
        <Button
          type="submit"
          className="bg-primary font-bold text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-full py-6 w-full mt-5"
        >
          Next
        </Button>
      </div>
    </form>
  )
}
