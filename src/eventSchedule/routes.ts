import express from "express";
import * as controller from "./controller";
import { authentication } from "../middleware/authentication";

export const eventScheduleRoutes = (app: express.Application) => {
  app.get("/eventSchedule", controller.getAll);
  app.get("/eventSchedule/schedule/:id", controller.getByScheduleId);
  app.get("/eventSchedule/:id", controller.get);
  app.post("/eventSchedule", authentication, controller.create);
  app.put("/eventSchedule/:id", authentication, controller.update);
  app.delete("/eventSchedule/:id", authentication, controller.remove);
};
