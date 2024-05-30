import express from "express";

export const authRoutes = (app: express.Application) => {
  app.get("/auth/register", () => {});
  app.get("/auth/login", () => {});
};
