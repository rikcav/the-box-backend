import { z } from "zod";

export const userValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
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