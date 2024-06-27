import express from "express";
import * as controller from "./controller";

export const eventScheduleRoutes = (app: express.Application) => {
  app.get("/eventSchedule", controller.getAll);
  app.get("/eventSchedule/schedule/:id", controller.getByScheduleId);
  app.get("/eventSchedule/:id", controller.get);
  app.post("/eventSchedule", controller.create);
  app.put("/eventSchedule/:id", controller.update);
  app.delete("/eventSchedule/:id", controller.remove);
};
