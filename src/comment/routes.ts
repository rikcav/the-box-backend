import express from "express";
import * as commentController from "./controller";
import { authentication } from "../middleware/authentication";

export const commentRoutes = (app: express.Application) => {
  app.get("/comment", authentication, commentController.listComments);
  app.get("/comment/post/:postid", commentController.listCommentsByPostId);
  app.post("/comment", authentication, commentController.createNewComment);
  app.delete("/comment/:id", authentication, commentController.deleteById);
  app.put("/comment/:id", authentication, commentController.updateById);
  app.patch(
    "/comment/:id/like",
    authentication,
    commentController.likeCommentController,
  );
};
