import clsx from "clsx"
import { twMerge } from "tailwind-merge"

// clsx -> conditionally joins classes
// tw-merge -> removes conflicting tailwind classes

export const cn = (...inputs) => {
    return twMerge(clsx(...inputs))
}