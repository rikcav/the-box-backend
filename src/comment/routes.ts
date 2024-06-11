import express from "express";
import * as commentController from "./controller";
import { authentication } from "../middleware/authentication";

export const commentRoutes = (app: express.Application) => {
  app.get("/comment", authentication, commentController.listComments);
  app.post("/comment", commentController.createNewComment);
  app.delete("/comment/:id", commentController.deleteById);
};
