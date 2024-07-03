import express from "express";
import * as service from "./service";
import { ZodError, z } from "zod";
import { HttpException } from "../errors/http-exception";
import { env } from "../env";


export const createMaterialFormal = async (
  request: express.Request,
  response: express.Response
) => {
  const createMaterialSchema = z.object({
    title: z.string({ message: "Title required!" }),
    url: z.string().url("URL invalid!"),
    description: z.string({ message: "Description required!" }),
    userId: z.coerce.number({ message: "user invalid!" }),
    category: z.string({ message: "category required!" }),
  });
  try {
    const material = createMaterialSchema.parse(request.body);

    const token = await service.createMaterial({ ...material, type: "FORMAL" });

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

export const createMaterialDidatico = async (
  request: express.Request,
  response: express.Response
) => {
  const createMaterialSchema = z.object({
    title: z.string({ message: "Title required!" }),
    url: z.string().url("URL invalid!"),
    description: z.string({ message: "Description required!" }),
    userId: z.coerce.number({ message: "user invalid!" }),
    category: z.string({ message: "category required!" }),
  });
  try {
    const material = createMaterialSchema.parse(request.body);

    const token = await service.createMaterial({
      ...material,
      type: "DIDATICO",
    });

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

export const createSignedUrl = async (
  request: express.Request,
  response: express.Response
) => {
  const { AWS_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET, AWS_SECRET_KEY } = env;
  if (!(AWS_ACCESS_KEY && AWS_REGION && AWS_S3_BUCKET && AWS_SECRET_KEY)) {
    return response
      .status(423)
      .send({ message: "resource not configured on the server!" });
  }

  const SignedUrlSchema = z.object({
    fileType: z.enum(["pdf", "webp", "png", "jpeg", "docx", "epub"], {
      message: "Unsupported format!",
    }),
  });

  try {
    const { fileType } = SignedUrlSchema.parse(request.query);

    const url = await service.createSignedUrl(fileType);

    return response.status(200).send({ url });
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
