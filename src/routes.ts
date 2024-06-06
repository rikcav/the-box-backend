import express from "express";
import { authRoutes } from "./auth/routes";

module.exports = (app: express.Application) => {
  authRoutes(app);
};
