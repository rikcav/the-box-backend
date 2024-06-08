import * as commentRepository from "./repository";
interface CreateCommentDto {
  body: string;
  user_id: number;
  post_id: number;
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
