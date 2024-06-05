import { PostCategoryEnum } from "@prisma/client";
import * as postRepository from "./repository";
import { postValidation } from "./validation";

interface CreatePostDto {
  title: string;
  content: string;
  category: PostCategoryEnum;
  user_id: number;
}

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
