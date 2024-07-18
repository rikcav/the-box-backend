import express, { request } from "express";
import * as service from "./service";
import { ZodError, z } from "zod";
import { HttpException } from "../errors/http-exception";
import { env } from "../env";

export const listMaterialFormal = async (
  request: express.Request,
  response: express.Response
) => {
  const listMaterialFormalSchema = z.object({
    category: z
      .enum(["BAREMA", "REQUERIMENTO", "UNICO", "EDITAIS", "EDITAIS_DE_BOLSAS"])
      .optional(),
    order: z
      .enum(["asc", "desc"], { message: "Order must be asc or des!" })
      .optional()
      .default("desc"),
    search: z.coerce.string().optional(),
  });

  try {
    const { order, category, search } = listMaterialFormalSchema.parse(
      request.query
    );

    const listMaterials = await service.listMaterialFormal({
      order,
      category,
      search,
    });
    const materials = listMaterials.map(({ user, user_id, ...rest }) => ({
      user: user.name,
      userId: user_id,
      ...rest,
    }));

    return response.status(200).send({ materials });
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

export const listMaterialDidatico = async (
  request: express.Request,
  response: express.Response
) => {
  const listMaterialDidaticoSchema = z.object({
    category: z.enum(["APOIO", "MANUAL_DOS_CALOUROS"]).optional(),
    order: z
      .enum(["asc", "desc"], { message: "Order must be asc or des!" })
      .optional()
      .default("desc"),
    search: z.coerce.string().optional(),
  });

  try {
    const { order, category, search } = listMaterialDidaticoSchema.parse(
      request.query
    );

    const listMaterials = await service.listMaterialDidatico({
      order,
      category,
      search,
    });
    const materials = listMaterials.map(({ user, user_id, ...rest }) => ({
      user: user.name,
      userId: user_id,
      ...rest,
    }));

    return response.status(200).send({ materials });
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

export const findMaterialById = async (
  request: express.Request,
  response: express.Response
) => {
  const getMaterialSchema = z.object({
    id: z.coerce.number({ message: "id invalid!" }),
  });

  try {
    const { id } = getMaterialSchema.parse(request.params);

    const { user, user_id, ...rest } = await service.findMaterialById(id);
    const material = { user: user.name, userId: user_id, ...rest };

    return response.status(200).send(material);
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

export const createMaterialFormal = async (
  request: express.Request,
  response: express.Response
) => {
  const createMaterialSchema = z.object({
    title: z.string({ message: "Title required!" }),
    url: z.string().url("URL invalid!"),
    description: z.string({ message: "Description required!" }),
    userId: z.coerce.number({ message: "user invalid!" }),
    category: z.enum(
      ["BAREMA", "REQUERIMENTO", "UNICO", "EDITAIS", "EDITAIS_DE_BOLSAS"],
      {
        message:
          "category required, accepted categories BAREMA, REQUERIMENTO, UNICO, EDITAIS e EDITAIS_DE_BOLSAS!",
      }
    ),
  });
  try {
    const material = createMaterialSchema.parse(request.body);

    const materialFormal = await service.createMaterial({
      ...material,
      type: "FORMAL",
    });

    return response.status(200).send({ material: materialFormal });
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
    category: z.enum(["APOIO", "MANUAL_DOS_CALOUROS"], {
      message:
        "category required, accepted categories APOIO e MANUAL_DOS_CALOUROS!",
    }),
  });
  try {
    const material = createMaterialSchema.parse(request.body);

    const materialDidatico = await service.createMaterial({
      ...material,
      type: "DIDATICO",
    });

    return response.status(200).send({ material: materialDidatico });
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
