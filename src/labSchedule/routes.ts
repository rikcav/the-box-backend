import express from "express";
import * as controller from "./controller";

export const labSheduleRoutes = (app: express.Application) => {
  app.post("/labshedule", controller.createLabSchedule);
};
