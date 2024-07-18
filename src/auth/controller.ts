import express from "express";
import { ZodError, z } from "zod";
import { authenticateService, logoutUser, registerUser } from "./service";
import { HttpException } from "../errors/http-exception";
import { sendEmail } from "../email/emailService";
import { loadTemplate } from "../email/utils/emailTemplate";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const registerDto = req.body;
    const user = await registerUser(registerDto);

    // Email notification

    const to = user.email;
    const subject = "The Box - Confirmação de Registro!";
    const text = `Olá ${user.name}, \n\nSeu registro foi bem-sucedido!`;
    const html = loadTemplate("../templates/registrationTemplate.html", { name: user.name });

    await sendEmail(to, subject, text, html);

    res.status(201).send({ message: "Registered", user });
  } catch (e) {
    console.log(e);

    if (e instanceof ZodError) {
      res.status(400).send({ message: "Validation failed", errors: e });
    } else {
      res.status(400).send({ message: "Could not register user", error: e });
    }
  }
};

export const authenticateController = async (
  request: express.Request,
  response: express.Response,
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

export const logout = async (req: express.Request, res: express.Response) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  const userId = req.body.userId;
  try {
    await logoutUser(userId, token);
    res.status(200).send("Logged out successfully");
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
};