import express from "express";
import * as commentService from "./service";

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
