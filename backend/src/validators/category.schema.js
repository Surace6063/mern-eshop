import { z } from "zod"

export const createCategorySchema = z.object({
  name: z
    .string({
      required_error: "Category name is required!"
    })
    .min(3, "Category name must be atleast 3 charcters.")
    .max(25, "Category name cannot exceed 25 charcters.")
})
