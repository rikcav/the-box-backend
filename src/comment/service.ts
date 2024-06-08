import * as commentRepository from "./repository";

export const deleteById = async (id: number) => {
  try {
    const comment = await commentRepository.deleteById(id);
    return comment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
