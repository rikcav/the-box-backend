import { NotFoundException } from "../errors/not-found-exception";
import { prisma } from "../prisma/service";
import * as commentRepository from "./repository";
import { commentUpdateValidation, commentValidation } from "./validation";

interface CreateCommentDto {
  body: string;
  user_id: number;
  post_id: number;
};

interface UpdateCommentDto {
  id: number;
  body: string;
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

export const updateById = async (dataUpdateCommnent: UpdateCommentDto) => {
  try {
    const data = commentUpdateValidation.parse(dataUpdateCommnent)
    const comment = await commentRepository.updateById(data.id, {body: data.body});

    return comment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface LikeCommentDTO {
  commentId: number;
  userId: number;
}

export const likeCommentService = async ({
  commentId,
  userId,
}: LikeCommentDTO) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new NotFoundException("User not found!");
  }

  const comment = await prisma.comment.findUnique({ where: { id: commentId } });

  if (!comment) {
    throw new NotFoundException("Comment not found!");
  }

  const like = await prisma.like.findFirst({
    where: { comment_id: commentId, user_id: userId },
  });

  if (like) {
    await prisma.like.delete({ where: { id: like.id } });
    return false;
  }

  await prisma.like.create({
    data: { comment_id: commentId, user_id: userId },
  });

  return true;
};