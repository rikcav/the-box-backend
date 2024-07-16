import express from "express";
import * as controller from "./controller";
import { authentication } from "../middleware/authentication";

export const userRoutes = (app: express.Application) => {
  app.get("/user/:id", controller.get);
  app.put("/user/:id", authentication, controller.update);
  app.delete("/user/:id", authentication, controller.deleteById);
};
