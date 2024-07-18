import express from "express";
import * as controller from "./controller";
import { authentication } from "../middleware/authentication";

//TODO: add permissão quando junta as branches
export const materialRoutes = (app: express.Application) => {
  app.get("/materialFormal", controller.listMaterialFormal);
  app.get("/materialDidatico", controller.listMaterialDidatico);
  app.get("/materialFormal/:id", controller.findMaterialById);
  app.get("/materialDidatico/:id", controller.findMaterialById);
  app.post("/materialFormal", authentication, controller.createMaterialFormal);
  app.post(
    "/materialDidatico",
    authentication,
    controller.createMaterialDidatico,
  );
  app.post("/materialUploadUrl", authentication, controller.createSignedUrl);
};
