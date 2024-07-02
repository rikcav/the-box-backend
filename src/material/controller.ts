import express from "express";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import * as service from "./service";
import { ZodError, z } from "zod";
import { HttpException } from "../errors/http-exception";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

export const createUrlPreSign = async () => {
//   const client = new S3Client();
// const command = new GetObjectCommand(getObjectParams);
// const url = await getSignedUrl(client, command, { expiresIn: 3600 });
};
