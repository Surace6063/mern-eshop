import { z } from "zod";

// Regex: letters and spaces only for name
const nameRegex = /^[A-Za-z\s]+$/;

// Regex to validate MongoDB ObjectId
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Base schema for Product
const productBaseSchema = z.object({
  name: z
    .string({ required_error: "Product name is required" })
    .nonempty("Product name is required")
    .min(3, "Product name must be at least 3 characters")
    .max(50, "Product name cannot exceed 50 characters")
    .regex(nameRegex, "Product name can only contain letters and spaces"),

  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  price: z
    .number({ required_error: "Price is required" })
    .min(0, "Price must be at least 0"),

  discountPrice: z
    .number()
    .min(0, "Discount price must be at least 0")
    .optional()
    .default(0),

  stock: z
    .number({ required_error: "Stock is required" })
    .min(0, "Stock cannot be negative"),

  category: z
    .string({ required_error: "Category is required" })
    .regex(objectIdRegex, "Category must be a valid ObjectId"),

  images: z
    .array(
      z.object({
        url: z.string({ required_error: "Image URL is required" }),
        public_id: z.string({ required_error: "Image public_id is required" })
      })
    )
    .min(1, "At least one image is required"),

  isActive: z.boolean().optional()
});

// Create schema: all required
export const createProductSchema = productBaseSchema;

// Update schema: all optional
export const updateProductSchema = productBaseSchema.partial();