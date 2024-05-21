import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { ZodError } from "zod";
import { HttpException } from "./http-exception";

export function handlerException(
  errorRequestHandler: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
    
  if (errorRequestHandler instanceof ZodError) {
    return response
      .status(422)
      .send({
        message: "Validation error.",
        issues: errorRequestHandler.format(),
      });
  }

  if (errorRequestHandler instanceof HttpException) {
    return response
      .status(errorRequestHandler.status)
      .send({ message: errorRequestHandler.message });
  }

  return response.status(500).send({ message: "Internal server error." });
}
