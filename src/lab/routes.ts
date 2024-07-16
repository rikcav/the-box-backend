import express from "express";
import * as controller from "./controller";
import { authentication } from "../middleware/authentication";

export const labRoutes = (app: express.Application) => {
  app.get("/labs", controller.getAll);
  app.get("/labs/:id", controller.get);
  app.post("/labs", authentication, controller.create);
  app.put("/labs/:id", controller.update);
  app.delete("/labs/:id", controller.deleteById);
};
