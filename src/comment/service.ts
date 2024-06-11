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

export const listComments = async (
  page: number,
  sizePage: number,
  order: "asc" | "desc",
  userId: number
) => {
  const skip = (page - 1) * sizePage;

  const comments = await commentRepository.listComment(
    skip,
    sizePage,
    order,
    userId
  );

  return comments.map(
    ({ _count, created_at, post_id, user_id, user, like, ...rest }) => ({
      likes: _count.like,
      createdAt: created_at,
      postId: post_id,
      user: user.name,
      userId: user_id,
      liked: !!like.length,
      ...rest,
    })
  );
};
