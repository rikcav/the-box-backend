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

export const updateById = async (id: number, data: any) => {
  const comment = await prisma.comment.update({
    where: {
      id,
    },
    data,
  });

  return comment;
};
