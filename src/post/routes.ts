import express from "express";
import * as postController from "./controller";
import { authentication } from "../middleware/authentication";

export const postRoutes = (app: express.Application) => {
  app.get("/post", postController.getPosts);
  app.get("/post/category/:category", postController.getPostsByCategory);
  app.get("/post/:id", postController.getPost);
  app.post("/post", authentication, postController.createPost);
};
