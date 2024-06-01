import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[a-zA-Z ]*$/, "Name can only contain letters and spaces")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name can be at most 15 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export default validationSchema;

export const registerValidation = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[a-zA-Z ]*$/, "Name can only contain letters and spaces")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name can be at most 50 characters"),

  email: yup.string().required("Email is required").email("Email is not valid"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*()_+\[\]{}|?]/,
      "Password must contain at least one special character"
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginValidation = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is not valid"),

  password: yup.string().required("Password is required"),
});
