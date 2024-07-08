import * as repository from "./repository";

export const getAll = async () => {
  try {
    const establishments = await repository.getAll();
    return establishments;
  } catch (error) {
    throw error;
  }
};

export const get = async (id: number) => {
  try {
    const establishment = await repository.get(id);
    return establishment;
  } catch (error) {
    throw error;
  }
};
