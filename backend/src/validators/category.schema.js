import { z } from "zod";

// Regex: letters and spaces only
const nameRegex = /^[A-Za-z\s]+$/;

// Base schema for category
const categoryBaseSchema = z.object({
  name: z
    .string({ required_error: "Category name is required!" })
    .nonempty("Category name is required!") // catches empty strings
    .min(3, "Category name must be at least 3 characters.")
    .max(25, "Category name cannot exceed 25 characters.")
    .regex(nameRegex, "Category name can only contain letters and spaces"),

  isActive: z.boolean().optional(),

  image: z.object({
    url: z.string({ required_error: "Image URL is required" }),
    public_id: z.string({ required_error: "Image public_id is required" })
  })
});

// Create schema: all required
export const createCategorySchema = categoryBaseSchema

// Update schema: all optional
export const updateCategorySchema = categoryBaseSchema.partial()
