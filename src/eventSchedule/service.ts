import * as repository from "./repository";
import { validation } from "./validation";

export const getAll = async () => {
  try {
    const eventSchedules = await repository.getAll();
    return eventSchedules;
  } catch (error) {
    throw error;
  }
};

export const getByScheduleId = async (scheduleId: number) => {
  try {
    const eventSchedules = await repository.getByScheduleId(scheduleId);
    return eventSchedules;
  } catch (error) {
    throw error;
  }
};

export const get = async (id: number) => {
  try {
    const eventSchedule = await repository.get(id);
    return eventSchedule;
  } catch (error) {
    throw error;
  }
};

export const create = async (eSData: repository.EventSchedule) => {
  try {
    const validatedData = validation.parse(eSData);
    const eventSchedule = await repository.create(validatedData);
    return eventSchedule;
  } catch (error) {
    throw error;
  }
};

export const update = async (id: number, eSData: repository.EventSchedule) => {
  try {
    const existingEventSchedule = await repository.get(id);

    if (!existingEventSchedule) {
      throw `Could not find event schedule with id: ${id}`;
    }

    const validatedData = validation.parse(eSData);
    const eventSchedule = await repository.update(id, validatedData);

    return eventSchedule;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id: number) => {
  try {
    const eventSchedule = await repository.remove(id);
    return eventSchedule;
  } catch (error) {
    throw error;
  }
};
