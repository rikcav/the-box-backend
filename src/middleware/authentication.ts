import express from "express";
import { verify } from "jsonwebtoken";
import { env } from "../env";
import { prisma } from "../prisma/service";
import { compare } from "bcrypt";
import { HttpException } from "../errors/http-exception";
import { accessControl } from "./access-control";

export const authentication = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  const autorToken = request.headers.authorization;

  if (!autorToken) {
    return response.status(401).json({
      message: "Missing token!",
    });
  }

  const [, token] = autorToken.split(" ");

  try {
    const decoded = verify(token, env.SECRET_KEY);
    const userId = (decoded as any).sub;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { blacklistTokens: true, profile: true },
    });

    if (!user) {
      return response.status(401).json({
        message: "Invalid token!",
      });
    }

    for (const blacklistedToken of user.blacklistTokens) {
      const match = await compare(token, blacklistedToken);
      if (match) {
        return response.status(401).json({
          message: "Token is invalid!",
        });
      }
    }

    accessControl(request, user);

    request.body.userId = userId;
    return next();
  } catch (err) {
    if (err instanceof HttpException) {
      return response.status(err.status).send({ message: err.message });
    }
    return response.status(403).json({
      message: "Invalid token!",
    });
  }
};
