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

    res.status(200).send({ message: "Commented!", comment });
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
  res: express.Response
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

export const updateById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = Number(req.params.id);
    const body = req.body.body;

    if (!body || typeof body !== 'string' || body.trim().length === 0) {
      return res.status(400).send({ message: "Body is required and cannot be empty." });
    }

    const updateCommentDto = { id, body: String(body).trim() };
    const comment = await commentService.updateById(updateCommentDto);

    res.status(200).send({ message: "Updated comment!", comment });
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError){
      res.status(400).send({ mensage: "Validation failed.", errors: error});
    } else {
      res.status(400).send({ mensage: "Could not update a comment.", errors: error});
    }
  }
};

export const likeCommentController = async (
  request: express.Request,
  response: express.Response
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