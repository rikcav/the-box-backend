import { prisma } from "../prisma/service";

export const createPost = async (data: any) => {
  const post = await prisma.post.create({
    data,
  });

  return post;
};
