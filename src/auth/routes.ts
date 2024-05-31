import express from "express";
import { authenticateController } from "./controller";

export const authRoutes = (app: express.Application) => {
  app.get("/auth/register", () => {});
  app.get("/auth/login", authenticateController);
};
