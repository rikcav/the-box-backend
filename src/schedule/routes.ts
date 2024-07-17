import express from "express";
import * as controller from "./controller";
import { authentication } from "../middleware/authentication";

export const scheduleRoutes = (app: express.Application) => {
  app.get("/schedule", controller.getAll);
  app.get("/schedule/:id", controller.get);
  app.post("/schedule", authentication, controller.create);
  app.put("/schedule/:id", authentication, controller.update);
  app.delete("/schedule/:id", authentication, controller.remove);
};
