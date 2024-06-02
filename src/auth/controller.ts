import express from "express";
import { ZodError, z } from "zod";
import { authenticateService } from "./service";
import { HttpException } from "../errors/http-exception";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    res.status(200).send("Registered");
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

export const authenticateController = async (
  request: express.Request,
  response: express.Response
) => {
  const loginSchema = z.object({
    email: z.string().email("Invalid email!"),
    password: z.string({ message: "Password required!" }),
  });
  try {
    const { email, password } = loginSchema.parse(request.body);

    const token = await authenticateService({ email, password });

    return response.status(200).send({ token });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.status(422).send({
        message: "Validation error.",
        issues: error.format(),
      });
    }

    if (error instanceof HttpException) {
      return response.status(error.status).send({ message: error.message });
    }

    console.error(error);
    return response.status(500).send({ message: "Internal server error." });
  }
};
