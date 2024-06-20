import express from "express";
import { ZodError } from "zod";
import * as postService from "./service";
import { PostCategoryEnum } from "@prisma/client";

export const getPosts = async (req: express.Request, res: express.Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 10;

    if (req.query.order === "asc") {
      const order = "asc";
      const posts = await postService.getPosts(page, size, order);
      res.status(200).send(posts);
    }

    const order = "desc";
    const posts = await postService.getPosts(page, size, order);
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
};

export const getPostsByCategory = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const category = req.params.category as keyof typeof PostCategoryEnum;
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 10;

    if (req.query.order === "asc") {
      const order = "asc";
      const posts = await postService.getPostsByCategory(
        category,
        page,
        size,
        order,
      );
      res.status(200).send(posts);
    }

    const order = "desc";
    const posts = await postService.getPostsByCategory(
      category,
      page,
      size,
      order,
    );
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      res.status(400).send({ message: "Validation failed", errors: error });
    }

    res.status(404).send({ message: "Could not get posts", errors: error });
  }
};

export const getPost = async (req: express.Request, res: express.Response) => {
  try {
    const post = await postService.getPost(Number(req.params.id));
    if (post) {
      res.status(200).send(post);
    }

    res.status(404).send({ message: "Post not found" });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({ message: "Validation failed", errors: error });
    } else {
      console.log(error);
      res.status(400).send({ message: "Could get post", error });
    }
  }
};

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
