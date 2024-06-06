import { prisma } from "../prisma/service";
import { PostCategoryEnum } from "@prisma/client";

export const getPosts = async (skip: number, take: number) => {
  const posts = await prisma.post.findMany({
    skip,
    take,
    orderBy: [
      {
        created_at: "desc",
      },
    ],
  });
  return posts;
};

export const getPostsByCategory = async (
  category: PostCategoryEnum,
  skip: number,
  take: number,
) => {
  const posts = await prisma.post.findMany({
    skip,
    take,
    orderBy: [
      {
        created_at: "desc",
      },
    ],
    where: {
      category,
    },
  });

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
