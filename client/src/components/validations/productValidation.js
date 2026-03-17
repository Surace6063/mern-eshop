import * as yup from "yup"

export const productSchema = yup.object({

  name: yup
    .string()
    .required("Product name is required")
    .matches(
      /^[A-Za-z0-9\s\-]{3,100}$/,
      "Name must be 3-100 characters and can include letters, numbers, spaces and hyphen"
    ),

  category: yup
    .string()
    .required("Category is required"),

  stock: yup
    .string()
    .required("Stock is required")
    .matches(
      /^[0-9]+$/,
      "Stock must be a positive number"
    ),

  price: yup
    .string()
    .required("Price is required")
    .matches(
      /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/,
      "Price must be a valid number (example: 10 or 10.99)"
    ),

  description: yup
    .string()
    .required("Description is required")
    .matches(
      /^[A-Za-z0-9\s.,'-]{10,500}$/,
      "Description must be 10-500 characters and cannot contain special symbols"
    ),

  images: yup
    .mixed()
    .test(
      "required",
      "At least one image is required",
      (value) => value && value.length > 0
    )
})