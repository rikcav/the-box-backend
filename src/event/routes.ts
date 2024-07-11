import express from "express";
import * as controller from "./controller";

export const eventRoutes = (app: express.Application) => {
  app.get("/event", controller.getAll);
  app.get("/event/:id", controller.get);
  app.post("/event", controller.create);
  app.put("/event/:id", controller.update);
  app.delete("/event/:id", controller.remove);
};
