import express from "express";
import { createPost } from "./controller";

export const postRoutes = (app: express.Application) => {
  app.post("/post", createPost);
};
