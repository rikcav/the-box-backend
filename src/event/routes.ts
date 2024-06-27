import express from "express";
import * as controller from "./controller";

export const eventsRoutes = (app: express.Application) => {
  app.get("/event", controller.listEvents);
};
