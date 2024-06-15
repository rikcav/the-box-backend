import { PostCategoryEnum } from "@prisma/client";
import * as postRepository from "./repository";
import { SortingOrder } from "./repository";
import { postValidation } from "./validation";

interface CreatePostDto {
  title: string;
  content: string;
  category: PostCategoryEnum;
  user_id: number;
}

export const getPosts = async (
  page: number,
  size: number,
  order: SortingOrder,
) => {
  try {
    const skip = (page - 1) * size;
    const take = size;

    const posts = await postRepository.getPosts(skip, take, order);

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPostsByCategory = async (
  category: PostCategoryEnum,
  page: number,
  size: number,
  order: SortingOrder,
) => {
  try {
    const skip = (page - 1) * size;
    const take = size;

    const posts = await postRepository.getPostsByCategory(
      category,
      skip,
      take,
      order,
    );

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPost = async (id: number) => {
  try {
    const post = await postRepository.getPost(id);
    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createPost = async (postData: CreatePostDto) => {
  try {
    const data = postValidation.parse(postData);
    const post = await postRepository.createPost(data);

    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
