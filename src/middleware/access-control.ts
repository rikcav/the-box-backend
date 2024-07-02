import express from "express";
import { RequestInfo } from "./permission";
import { User } from "@prisma/client";

export function accessControl(
  request: express.Request,
  user: Pick<User, "profile">
) {
  const permission = RequestInfo(request, user);

  permission("/labShedule", ["SUPER_USER"], ["POST"]);
  permission("/lab", ["SUPER_USER"], ["CONNECT"])
}
