import { z } from "zod";

export const validation = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
});
