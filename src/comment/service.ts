import { z } from "zod";
import * as commentRepository from "./repository";
import { commentValidation } from "./validation";

interface CreateCommentDto {
  body: string;
  user_id: number;
  post_id: number;
};

export const createComment = async (dataCommnent: CreateCommentDto) => {
  try {
    const data = commentValidation.parse(dataCommnent);
    const post = await commentRepository.createComment(data);

    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteById = async (id: number) => {
  try {
    const comment = await commentRepository.deleteById(id);
    return comment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const listComments = async (page: number, sizePage: number, order: "asc" | "desc") => {
  const skip = (page - 1) * sizePage;

  const comments = await commentRepository.listComment(skip, sizePage, order);

  const commentsSchema = z.array(
    z.object({
      id: z.number(),
      body: z.string(),
      created_at: z.date(),
      user_id: z.number(),
      post_id: z.number(),
      user: z.object({ name: z.string() }).transform((obj) => obj.name),
      _count: z
        .object({
          like: z.number(),
        })
        .transform((count) => count.like),
    })
  );

  return  commentsSchema.parse(comments);
};
