import * as lSRepository from "./repository";
import { CreateLabSchedule } from "./repository";
import * as userService from "../user/service";
import { validation } from "./validation";

export const getAll = async () => {
  try {
    const labSchedules = await lSRepository.getAll();
    return labSchedules;
  } catch (error) {
    throw error;
  }
};

export const get = async (id: number) => {
  try {
    const labSchedule = await lSRepository.get(id);
    return labSchedule;
  } catch (error) {
    throw error;
  }
};

export const create = async (labScheduleData: CreateLabSchedule) => {
  try {
    const user = await userService.getUserById(labScheduleData.user_id);
    if (user?.profile === "SUPER_USER") {
      const data = validation.parse(labScheduleData);
      const labSchedule = await lSRepository.create(data);
      return labSchedule;
    } else {
      throw new Error(`Only a SUPER_USER can create a lab schedule`);
    }
  } catch (error) {
    throw error;
  }
};

export const update = async (id: number, lSData: CreateLabSchedule) => {
  try {
    lSData.start_time = new Date(lSData.start_time);
    lSData.end_time = new Date(lSData.end_time);
    lSData.date = new Date(lSData.date);

    const user = await userService.getUserById(lSData.user_id);
    if (user?.profile === "SUPER_USER") {
      const data = validation.parse(lSData);
      const labSchedule = await lSRepository.update(id, data);
      return labSchedule;
    } else {
      throw new Error(`Only a SUPER_USER can update a lab schedule`);
    }
  } catch (error) {
    throw error;
  }
};

export const deleteById = async (id: number, userId: number) => {
  try {
    const user = await userService.getUserById(userId);
    if (user?.profile === "SUPER_USER") {
      const labSchedule = await lSRepository.deleteById(id);
      console.log("Deleted lab schedule: ", labSchedule);
    } else {
      throw new Error(`Only a SUPER_USER can delete a lab schedule`);
    }
  } catch (error) {
    throw error;
  }
};
