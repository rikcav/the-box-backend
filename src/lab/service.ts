import * as repository from "./repository";
import { CreateLab } from "./repository";
import { validation } from "./validation";

export const getAll = async () => {
  try {
    const labs = await repository.getAll();
    return labs;
  } catch (error) {
    throw error;
  }
};

export const get = async (id: number) => {
  try {
    const lab = await repository.get(id);
    return lab;
  } catch (error) {
    throw error;
  }
};

export const create = async (labData: CreateLab) => {
  try {
    const data = validation.parse(labData);
    const lab = repository.create(data);
    return lab;
  } catch (error) {
    throw error;
  }
};

export const update = async (id: number, labData: CreateLab) => {
  try {
    const data = validation.parse(labData);
    const lab = await repository.update(id, data);
    return lab;
  } catch (error) {
    throw error;
  }
};

export const deleteById = async (id: number) => {
  try {
    const lab = await repository.deleteById(id);
    console.log("Deleted: ", lab);
  } catch (error) {
    throw error;
  }
};
