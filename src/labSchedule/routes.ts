import express from "express";
import * as controller from "./controller";

export const labSchedulesRoutes = (app: express.Application) => {
  app.get("/labschedules", controller.getAllLabs);
  app.get("/labschedules/:id", controller.getLabScheduleById);
};
