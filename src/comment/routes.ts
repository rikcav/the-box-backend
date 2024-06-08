import express from "express";
import * as commentController from "./controller";

export const commentRoutes = (app: express.Application) => {
  app.delete("/comment/:id", commentController.deleteById);
};
