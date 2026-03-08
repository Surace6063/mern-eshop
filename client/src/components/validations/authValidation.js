import * as yup from "yup"

export const registerValidationSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name is too long")
    .matches(/^[A-Za-z\s]+$/, "Full name should not contain numbers"),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email address")
    .matches(/@gmail\.com$/, "Only gmail addresses are allowed"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain one special character"),

  cpassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
})


// login schema
export const loginValidationSchema = yup.object({
    email: yup.string().required("Email is required."),
    password: yup.string().required("Password is required.")
})