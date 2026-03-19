import * as yup from "yup"

export const productSchema = yup.object({

  name: yup
    .string()
    .required("Product name is required"),

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
    .required("Description is required"),

  images: yup
    .mixed()
    .test(
      "required",
      "At least one image is required",
      (value) => value && value.length > 0
    )
})