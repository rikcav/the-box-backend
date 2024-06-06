import express from "express";
import { createNewPost } from "./controller";

export const postRoutes = (app: express.Application) => {
  app.post("/post", createNewPost);
};
