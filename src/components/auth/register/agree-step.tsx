"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface TermsStepProps {
    onNext: () => void
    onBack: () => void
    stepIndex: number
    totalSteps: number
}

export default function TermsStep({
    onNext,
}: TermsStepProps) {
    const [checked, setChecked] = useState({
        news: false,
        marketing: false,
        agree: false,
    })

    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!checked.agree) {
            setError("You must agree to the Terms & Conditions to continue.")
            return
        }
        setError("")
        onNext()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-sm flex-col gap-6 text-left mx-auto"
        >
            {/* Checkboxes */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 bg-highlight p-6 rounded-md borderhover:bg-highlight/80 transition-colors">
                    <Checkbox
                        id="news"
                        checked={checked.news}
                        onCheckedChange={(val) =>
                            setChecked((prev) => ({ ...prev, news: !!val }))
                        }
                        className="cursor-pointer border border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="news" className="text-secondary">
                        Please send me news and offers
                    </Label>
                </div>

                <div className="flex items-center gap-3 bg-highlight p-6 rounded-md hover:bg-highlight/80 transition-colors">
                    <Checkbox
                        id="marketing"
                        checked={checked.marketing}
                        onCheckedChange={(val) =>
                            setChecked((prev) => ({ ...prev, marketing: !!val }))
                        }
                        className="cursor-pointer border border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="marketing" className="text-secondary">
                        Share my registration data with content providers for marketing
                        purposes.
                    </Label>
                </div>

                <div className="flex items-center gap-3 bg-highlight p-6 rounded-md bordehover:bg-highlight/80 transition-colors">
                    <Checkbox
                        id="agree"
                        checked={checked.agree}
                        onCheckedChange={(val) =>
                            setChecked((prev) => ({ ...prev, agree: !!val }))
                        }
                        className="cursor-pointer border border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <div className="text-secondary text-sm">
                        I agree to the{" "}
                        <a href="#" className="underline hover:text-primary">
                            Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline hover:text-primary">
                            Privacy Policy
                        </a>
                        .
                    </div>
                </div>
            </div>

            {error && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1 mx-auto">
                    {error}
                </p>
            )}

            {/* Submit */}
            <Button
                type="submit"
                className="bg-primary font-bold text-primary-foreground hover:bg-secondary/90 cursor-pointer rounded-full py-6 w-full mt-5"
            >
                Sign up
            </Button>
        </form>
    )
}
