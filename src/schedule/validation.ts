import { z } from "zod";

export const validation = z.object({
  year: z.string(),
  period: z.string(),
});
