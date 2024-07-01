import express from "express";
import * as commentService from "./service";
import { ZodError, z } from "zod";
import { HttpException } from "../errors/http-exception";

export const createNewComment = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const createCommentDTO = req.body;
    const comment = await commentService.createComment(createCommentDTO);

    res.status(200).send({ message: "Commented!", comment });
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      res.status(400).send({ mensage: "Validation failed.", errors: error });
    } else {
      res
        .status(400)
        .send({ message: "Could not create a comment.", errors: error });
    }
  }
};

export const deleteById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const comment = await commentService.deleteById(parseInt(req.params.id));
    console.log("Deleted comment: ", comment);
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "Comment not found.", errors: error });
  }
};

export const listComments = async (
  request: express.Request,
  response: express.Response,
) => {
  const listCommentsSchema = z.object({
    page: z.coerce.number().int("Page must be positive!").optional().default(1),
    sizePage: z.coerce
      .number()
      .int("SizePage must be positive!")
      .optional()
      .default(10),
    order: z
      .enum(["asc", "desc"], { message: "Order must be asc or des!" })
      .optional()
      .default("desc"),
  });

  const userIdSchema = z.object({
    userId: z.coerce.number().int(),
  });

  try {
    const { userId } = userIdSchema.parse(request.body);
    const { page, sizePage, order } = listCommentsSchema.parse(request.query);

    const comments = await commentService.listComments(
      page,
      sizePage,
      order,
      userId,
    );

    return response.status(200).send({
      comments,
    });
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

export const listCommentsByPostId = async (
  request: express.Request,
  response: express.Response,
) => {
  const listCommentsSchema = z.object({
    page: z.coerce.number().int("Page must be positive!").optional().default(1),
    sizePage: z.coerce
      .number()
      .int("SizePage must be positive!")
      .optional()
      .default(10),
    order: z
      .enum(["asc", "desc"], { message: "Order must be asc or des!" })
      .optional()
      .default("desc"),
  });

  const listCommentsByPostSchema = z.object({
    userId: z.coerce.number().int(),
    postId: z.coerce.number().int(),
  });

  try {
    const { userId, postId } = listCommentsByPostSchema.parse(request.body);
    const { page, sizePage, order } = listCommentsSchema.parse(request.query);

    const comments = await commentService.listCommentsByPostId(
      page,
      sizePage,
      order,
      userId,
      postId,
    );

    return response.status(200).send({
      comments,
    });
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

export const updateById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const id = Number(req.params.id);
    const body = req.body.body;

    if (!body || typeof body !== "string" || body.trim().length === 0) {
      return res
        .status(400)
        .send({ message: "Body is required and cannot be empty." });
    }

    const updateCommentDto = { id, body: String(body).trim() };
    const comment = await commentService.updateById(updateCommentDto);

    res.status(200).send({ message: "Updated comment!", comment });
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      res.status(400).send({ mensage: "Validation failed.", errors: error });
    } else {
      res
        .status(400)
        .send({ mensage: "Could not update a comment.", errors: error });
    }
  }
};

export const likeCommentController = async (
  request: express.Request,
  response: express.Response,
) => {
  const commentIdSchema = z.object({
    id: z.coerce.number().int("Invalid id!"),
  });

  const userIdSchema = z.object({
    userId: z.coerce.number().int("Invalid user!"),
  });
  try {
    const { id: commentId } = commentIdSchema.parse(request.params);
    const { userId } = userIdSchema.parse(request.body);
    const like = await commentService.likeCommentService({ commentId, userId });

    return response.status(200).send({ like });
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
