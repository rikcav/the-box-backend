import * as repository from "./repository";
import { validation } from "./validation";

export const getAll = async () => {
  try {
    const schedules = await repository.getAll();
    return schedules;
  } catch (error) {
    throw error;
  }
};

export const get = async (id: number) => {
  try {
    const schedule = await repository.get(id);
    return schedule;
  } catch (error) {
    throw error;
  }
};

export const create = async (data: repository.Schedule) => {
  try {
    const parsedData = validation.parse(data);
    const schedule = await repository.create(parsedData);
    return schedule;
  } catch (error) {
    throw error;
  }
};

export const update = async (id: number, data: repository.Schedule) => {
  try {
    const parsedData = validation.parse(data);
    const schedule = await repository.update(id, parsedData);
    return schedule;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id: number) => {
  try {
    const schedule = await repository.remove(id);
    console.log(schedule);
  } catch (error) {
    throw error;
  }
};
