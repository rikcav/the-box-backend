import { z } from "zod";

export const validation = z.object({
  event_id: z.number(),
  schedule_id: z.number(),
});
