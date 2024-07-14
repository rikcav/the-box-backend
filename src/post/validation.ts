import { z } from "zod";
import { PostCategoryEnum } from "@prisma/client";

export const postValidation = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(500),
  category: z.nativeEnum(PostCategoryEnum),
  user_id: z.number(),
});
