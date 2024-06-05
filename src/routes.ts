import express from "express";
import { authRoutes } from "./auth/routes";
import { postRoutes } from "./post/routes";

module.exports = (app: express.Application) => {
  authRoutes(app);
  postRoutes(app);
};
