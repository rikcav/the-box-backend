import express from "express";
import { authRoutes } from "./auth/routes";
import { postRoutes } from "./post/routes";
import { commentRoutes } from "./comment/routes";
import { userRoutes } from "./user/routes";
import { labRoutes } from "./lab/routes";
import { labSchedulesRoutes } from "./labSchedule/routes";
import { scheduleRoutes } from "./schedule/routes";
import { eventRoutes } from "./event/routes";
import { eventScheduleRoutes } from "./eventSchedule/routes";
import { establishmentRoutes } from "./establishment/routes";

module.exports = (app: express.Application) => {
  authRoutes(app);
  postRoutes(app);
  commentRoutes(app);
  userRoutes(app);
  labRoutes(app);
  labSchedulesRoutes(app);
  scheduleRoutes(app);
  eventRoutes(app);
  eventScheduleRoutes(app);
  establishmentRoutes(app);
};
