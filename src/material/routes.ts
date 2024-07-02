import express from "express";
import * as controller from "./controller";
import { authentication } from "../middleware/authentication";

//TODO: add permissão quando junta as branches
export const materialRoutes = (app: express.Application) => {
  app.post("/materialFormal", authentication, controller.createMaterialFormal);
  app.post(
    "/materialDidatico",
    authentication,
    controller.createMaterialDidatico
  );
};
