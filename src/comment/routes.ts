import express from "express";
import * as commentController from "./controller";
import { authentication } from "../middleware/authentication";

export const commentRoutes = (app: express.Application) => {
  app.post("/comment", commentController.createNewComment);
  app.delete("/comment/:id", commentController.deleteById);
  app.patch("/comment/:id/like", authentication, commentController.likeCommentController)
};
