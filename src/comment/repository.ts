import { prisma } from "../prisma/service";

export const createComment = async (data: any) => {
  const comment = await prisma.comment.create({
    data,
  });

  return comment;
};

export const deleteById = async (id: number) => {
  const comment = await prisma.comment.delete({
    where: {
      id,
    },
  });

  return comment;
};
