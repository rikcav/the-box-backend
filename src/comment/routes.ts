import express from "express";
import * as commentController from "./controller";
import { authentication } from "../middleware/authentication";

export const commentRoutes = (app: express.Application) => {
  app.get("/comment", authentication, commentController.listComments);
  app.get(
    "/comment/post",
    authentication,
    commentController.listCommentsByPostId,
  );
  app.post("/comment", commentController.createNewComment);
  app.delete("/comment/:id", commentController.deleteById);
  app.put("/comment/:id", commentController.updateById);
  app.patch(
    "/comment/:id/like",
    authentication,
    commentController.likeCommentController,
  );
};
