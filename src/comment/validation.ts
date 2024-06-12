import { z } from "zod";

export const commentValidation = z.object({
  body: z.string().min(1),
  user_id: z.number(),
  post_id: z.number(),
});

export const commentUpdateValidation = z.object({
  id: z.number(),
  body: z.string().min(1, "Body cannot be empty."),
});