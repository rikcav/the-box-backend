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
