import express from "express";
import { authenticateController, register } from "./controller";

export const authRoutes = (app: express.Application) => {
  app.post("/auth/register", register);
  app.post("/auth/login", authenticateController);
};
