import express from "express";
import { verify } from "jsonwebtoken";
import { env } from "../env";

export const authentication = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const autorToken = request.headers.authorization;

    if (!autorToken) {
        return response.status(401).json({
            message: "Missing token!"
        });
    }

    const [, token] = autorToken.split(" ");

    try {
        request.body.userId = verify(token, env.SECRET_KEY).sub;
        return next();
    } catch (err) {
        return response.status(403).json({
            message: "Invalid token!"
        });
    }
  }
