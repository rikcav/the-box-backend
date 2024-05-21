import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { AuthenticationService } from "../service/authentication-service";
import { UserRepository } from "../repository/prisma/user-repository";
import { JwtService } from "../service/jwt-service";

export async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authenticateSchema = z.object({
      email: z.string().email("Invalid email!"),
      password: z.string({ message: "Password required!" }),
    });

    const { email, password } = authenticateSchema.parse(request.body);
    const userRepository = new UserRepository();
    const jwtService = new JwtService();
    const authenticationService = new AuthenticationService(
      userRepository,
      jwtService
    );
    const token = await authenticationService.authenticate({
      email,
      password,
    });

    return response.status(200).send({ token });
  } catch (err) {
    next(err);
  }
}
