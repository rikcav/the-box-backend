import express from "express";
import * as controller from "./controller";

export const labSchedulesRoutes = (app: express.Application) => {
  app.get("/labschedules", controller.getAllLabs);
  app.get("/labschedules/:id", controller.getLabScheduleById);
  app.post("/labschedules", controller.create);
  app.put("/labschedules/:id", controller.update);
  app.delete("/labschedules", controller.update);
};
