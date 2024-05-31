import express from "express";
import { authenticateController, register } from "./controller";

export const authRoutes = (app: express.Application) => {
  app.get("/auth/register", register);
  app.get("/auth/login", authenticateController);
};
