import { prisma } from "../prisma/service";
import { PostCategoryEnum } from "@prisma/client";

export type SortingOrder = "desc" | "asc";

export const getPosts = async (
  skip: number,
  take: number,
  order: SortingOrder,
) => {
  const posts = await prisma.post.findMany({
    skip,
    take,
    orderBy: [
      {
        created_at: order,
      },
    ],
  });
  return posts;
};

export const getPostsByCategory = async (
  category: PostCategoryEnum,
  skip: number,
  take: number,
  order: SortingOrder,
) => {
  const posts = await prisma.post.findMany({
    skip,
    take,
    orderBy: [
      {
        created_at: order,
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
