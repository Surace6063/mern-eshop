import * as yup from "yup"

export const checkoutValidationSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),

  companyName: yup.string(),
  vatNumber: yup.string(),

  address: yup.string().required("Address is required"),
  zipCode: yup.string(),

  paymentMethod: yup.string().required("Select any one payment method"),
})