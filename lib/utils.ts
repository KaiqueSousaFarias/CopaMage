import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { EVENT_INFO } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isRegistrationStillOpen() {
  const now = new Date()
  const deadline = new Date(EVENT_INFO.deadline)
  return now <= deadline
}
