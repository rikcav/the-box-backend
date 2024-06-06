import express from "express";
import * as postController from "./controller";

export const postRoutes = (app: express.Application) => {
  app.get("/post", postController.getPosts);
  app.get("/post/:category", postController.getPostsByCategory);
  app.get("/post/:id", postController.getPost);
  app.post("/post", postController.createPost);
};
