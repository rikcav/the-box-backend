import express from "express";
import { verify } from "jsonwebtoken";
import { env } from "../env";
import { prisma } from "../prisma/service";
import { compare } from "bcrypt";

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
        const decoded = verify(token, env.SECRET_KEY);
        const userId = (decoded as any).sub;

        const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { blacklistTokens: true },
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

        request.body.userId = userId;
        return next();
    } catch (err) {
        return response.status(403).json({
            message: "Invalid token!"
        });
    }
  }
