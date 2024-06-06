import express from "express";
import { ZodError } from "zod";
import * as postService from "./service";

export const createPost = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const createPostDto = req.body;
    const post = await postService.createPost(createPostDto);
    res.status(200).send({ message: "Registered", post });
  } catch (e) {
    console.log(e);

    if (e instanceof ZodError) {
      res.status(400).send({ message: "Validation failed", errors: e });
    } else {
      res.status(400).send({ message: "Could not create post", error: e });
    }
  }
};
