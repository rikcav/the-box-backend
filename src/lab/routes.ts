import express from "express";
import * as controller from "./controller";

export const labRoutes = (app: express.Application) => {
  app.get("/labs", controller.getAll);
  app.get("/labs/:id", controller.get);
  app.post("/labs", controller.create);
  app.put("/labs/:id", controller.update);
  app.delete("/labs/:id", controller.deleteById);
};
