import express from "express";
import * as controller from "./controller";

export const establishmentRoutes = (app: express.Application) => {
  app.get("/establishment", controller.getAll);
  app.get("/establishment/:id", controller.get);
};
