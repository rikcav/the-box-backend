import express from "express";
import * as controller from "./controller";

export const userRoutes = (app: express.Application) => {
  app.get("/user/:id", controller.get);
  app.put("/user/:id", controller.update);
  app.delete("/user/:id", controller.deleteById);
};
