import { Dob } from "@/types/models/helper";

export function parseDob({ day, month, year } : Dob): string {
    return `${year}-${month}-${day}`
}