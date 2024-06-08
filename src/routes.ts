import express from "express";
import { authRoutes } from "./auth/routes";
import { postRoutes } from "./post/routes";
import { commentRoutes } from "./comment/routes";

module.exports = (app: express.Application) => {
  authRoutes(app);
  postRoutes(app);
  commentRoutes(app);
};
