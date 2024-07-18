import express from "express";
import { authRoutes } from "./auth/routes";
import { postRoutes } from "./post/routes";
import { commentRoutes } from "./comment/routes";
import { userRoutes } from "./user/routes";
import { labRoutes } from "./lab/routes";
import { labSchedulesRoutes } from "./labSchedule/routes";
import { scheduleRoutes } from "./schedule/routes";
import { pushNotificationRoutes } from "./pushNotification/routes"

module.exports = (app: express.Application) => {
  authRoutes(app);
  postRoutes(app);
  commentRoutes(app);
  userRoutes(app);
  labRoutes(app);
  labSchedulesRoutes(app);
  scheduleRoutes(app);
  pushNotificationRoutes(app);
};
