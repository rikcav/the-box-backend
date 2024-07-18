import express from "express";
import * as controller from "./controller";
import { authentication } from "../middleware/authentication";

export const eventRoutes = (app: express.Application) => {
  app.get("/event", controller.getAll);
  app.get("/event/:id", controller.get);
  app.post("/event", authentication, controller.create);
  app.put("/event/:id", authentication, controller.update);
  app.delete("/event/:id", authentication, controller.remove);
};
