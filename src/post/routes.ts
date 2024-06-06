import express from "express";
import * as postController from "./controller";

export const postRoutes = (app: express.Application) => {
  app.post("/post", postController.createPost);
};
