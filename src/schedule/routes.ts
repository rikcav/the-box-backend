import express from "express";
import * as controller from "./controller";

export const scheduleRoutes = (app: express.Application) => {
  app.get("/schedule", controller.getAll);
  app.get("/schedule/:id", controller.get);
  app.post("/schedule", controller.create);
  app.put("/schedule/:id", controller.update);
  app.delete("/schedule/:id", controller.remove);
};
