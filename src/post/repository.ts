import { prisma } from "../prisma/service";

export const getPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

export const getPost = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  return post;
};

export const createPost = async (data: any) => {
  const post = await prisma.post.create({
    data,
  });

  return post;
};
