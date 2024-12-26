import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  remmemberMe: z.boolean(),
});

export const signupFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/\d/, {
      message: "Password must contain at least one number",
    }),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/\d/, {
      message: "Password must contain at least one number",
    })
    .refine((data) => data === data, {
      message: "Passwords do not match",
    }),
});

export const verifyAccountFormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 digits.",
  }),
});

export const feedbackFormSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    email: z
        .string()
        .min(1, {
            message: "Email is required",
        })
        .email({
            message: "Invalid email address",
        }),
    subject: z.string().min(1, {
        message: "Subject is required",
    }),
    message: z.string().min(1, {
        message: "Message is required",
    }),
    phoneNumber: z.string().min(1, {
        message: "Phone number is required",
    }),
});

