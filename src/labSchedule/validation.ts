import { z } from "zod";

export const validation = z.object({
  title: z.string().max(100),
  start_time: z.date(),
  end_time: z.date(),
  date: z.date(),
  user_id: z.number(),
  lab_id: z.number(),
});
