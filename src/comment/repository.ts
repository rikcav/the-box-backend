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

export const listComment = async (
  skip: number,
  take: number,
  order: "asc" | "desc",
  userId: number
) => {
  return await prisma.comment.findMany({
    skip,
    take,
    include: {
      like: {
        where: {
          user_id: userId,
        },
      },
      user: { select: { name: true } },
      _count: { select: { like: true } },
    },
    orderBy: { like: { _count: order } },
  });
};
