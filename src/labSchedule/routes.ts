import express from "express";
import * as LabScheduleController from "./controller";
import { authentication } from "../middleware/authentication";

export const labSheduleRoutes = (app: express.Application) => {
  app.post("/labShedule", LabScheduleController.createLabSchedule);
};
