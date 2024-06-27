import * as repository from "./repository";
import { validation } from "./validation";

export const getAll = async () => {
  try {
    const events = await repository.getAll();
    return events;
  } catch (error) {
    throw error;
  }
};

export const get = async (id: number) => {
  try {
    const event = await repository.get(id);
    return event;
  } catch (error) {
    throw error;
  }
};

export const create = async (eventData: Event) => {
  try {
    const validatedData = validation.parse(eventData);
    const event = await repository.create(validatedData);
    return event;
  } catch (error) {
    throw error;
  }
};

export const update = async (id: number, eventData: Event) => {
  try {
    const existingEvent = await repository.get(id);

    if (!existingEvent) {
      throw `Cannot find event with id: ${id}`;
    }

    const validatedData = validation.parse(eventData);
    const event = await repository.update(id, validatedData);

    return event;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id: number) => {
  try {
    const event = await repository.remove(id);
    return event;
  } catch (error) {
    throw error;
  }
};
