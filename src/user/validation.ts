import { z } from "zod";

export const userValidation = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(11).max(11),
  profile: z.enum(["USER", "SUPER_USER"]),
  password: z
    .string()
    .min(8)
    .refine((value) => {
      return (
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(value)
      );
    }),
});

export const updateUserValidation = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(11).max(11),
});
