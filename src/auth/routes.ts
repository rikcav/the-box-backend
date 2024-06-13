import express from "express";
import { authenticateController, register, logout } from "./controller";
import { authentication } from "../middleware/authentication";

export const authRoutes = (app: express.Application) => {
  app.post("/auth/register", register);
  app.post("/auth/login", authenticateController);
  app.post("/auth/logout", authentication, logout);
};
