import express from "express";
import * as controller from "./controller";
import { authentication } from "../middleware/authentication";

export const labSchedulesRoutes = (app: express.Application) => {
  app.get("/labschedules", controller.getAllLabs);
  app.get("/labschedules/:id", controller.getLabScheduleById);
  app.get("/lab/:id/schedules", controller.getLabSchedulesByLabId);
  app.put("/labschedules/:id", authentication, controller.update);
  app.post("/labschedules", authentication, controller.createNewLabEvent);
};
