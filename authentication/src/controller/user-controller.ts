import { z } from "zod";
import { UserService } from "../service/user-service";
import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository/prisma/user-repository";

export async function createUser(request: Request, response: Response, next: NextFunction) {
  try {
  const userValidationSchema = z.object({
    email: z.string().email({ message: "invalid email!" }),
    password: z
      .string()
      .regex(/.*[0-9].*/, "missing digit")
      .regex(/.*[a-z].*/, "missing lowercase letter")
      .regex(/.*[A-Z].*/, "missing uppercase letter")
      .regex(/.*[^0-9, a-z, A-Z].*/, "missing special character")
      .min(8, "the password must be at least 8 characters long"),
  });

  const { email, password } = userValidationSchema.parse(request.body);

  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  await userService.createUser({ email, password });

  return response.status(204).json();
} catch (err) {
  next(err);
}
}

export async function myProfile(request: Request, response: Response, next: NextFunction) {
  try {
  const myProfileSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = myProfileSchema.parse(request.body);

  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const { password, ...user } = await userService.findUserById(userId);

  return response.status(200).send(user);
} catch (err) {
  next(err);
}
}
