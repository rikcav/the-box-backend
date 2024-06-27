import { z } from "zod";

export const validation = z.object({
  name: z.string(),
  description: z.string(),
  start_date: z.date(),
  end_date: z.date(),
  start_time: z.date(),
  end_time: z.date(),
  speakers: z.string(),
});
