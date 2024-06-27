import { User } from "@prisma/client";
import express from "express";
import { ForbiddenException } from "../errors/forbidden-exception";

type MethodHTTP =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE";

const METHODS: MethodHTTP[] = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "CONNECT",
  "OPTIONS",
  "TRACE",
];

type RoleEnum = "USER" | "SUPER_USER";

export function RequestInfo(
  request: express.Request,
  user: Pick<User, "profile">
) {
  return (
    route: string,
    roles: RoleEnum[],
    _methods: MethodHTTP[] = METHODS
  ) => {
    console.log(request.method);
    const routeRegExp = new RegExp(
      "^" + route.replace(/\/\*\*/, "(/w)?").concat("/w)?")
    );
    if (
      routeRegExp.test(request.path) &&
      _methods.includes(request.method as MethodHTTP) &&
      !roles.includes(user.profile)
    ) {
      throw new ForbiddenException();
    }
  };
}
