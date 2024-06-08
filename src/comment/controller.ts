import express from "express";
import * as commentService from "./service";
import { ZodError } from "zod";

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
