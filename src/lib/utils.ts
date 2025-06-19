import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Tailwind-friendly `clsx` wrapper.
 * Joins class names and resolves Tailwind merge conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* Allow both
   import { cn } from "@/lib/utils"
   -and-
   import cn from "@/lib/utils"
*/
export default cn
