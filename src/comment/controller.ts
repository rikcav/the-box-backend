import express from "express";
import * as commentService from "./service";
import { ZodError, z } from "zod";
import { HttpException } from "../errors/http-exception";

export const createNewComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const createCommentDTO = req.body;
    const comment = await commentService.createComment(createCommentDTO);

    res.status(200).send({ message: "Commented!", comment })
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      res.status(400).send({ mensage: "Validation failed.", errors: error});
    } else {
      res.status(400).send({ message: "Could not create a comment.", errors: error});
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
  response: express.Response
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
  try {
    const { page, sizePage, order } = listCommentsSchema.parse(request.query);

    const comments = await commentService.listComments(page, sizePage, order);

    const content = comments.map(
      ({ _count, created_at, post_id, user_id, ...rest }) => ({
        likes: _count,
        createdAt: created_at,
        postId: post_id,
        userId: user_id,
        ...rest,
      })
    );

    return response.status(200).send({
      content,
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
