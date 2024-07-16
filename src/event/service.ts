import * as repository from "./repository";
import { validation } from "./validation";
import dayjs from "dayjs";

export const listEvents = async (
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
) => {
  if (startDate.isAfter(endDate)) {
    throw "endDate cannot be before startDate!";
  }

  return await repository.findBetweenDates(
    startDate.toDate(),
    endDate.toDate(),
  );
};

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

export const create = async (eventData: repository.NewEvent) => {
  try {
    const { start_date, end_date, start_time, end_time } = eventData;

    eventData.start_date = new Date(start_date);
    eventData.end_date = new Date(end_date);
    eventData.start_time = new Date(start_time);
    eventData.end_time = new Date(end_time);

    const validatedData = validation.parse(eventData);
    const event = await repository.create(validatedData);
    return event;
  } catch (error) {
    throw error;
  }
};

export const update = async (id: number, eventData: repository.NewEvent) => {
  try {
    const existingEvent = await repository.get(id);

    if (!existingEvent) {
      throw `Cannot find event with id: ${id}`;
    }

    const { start_date, end_date, start_time, end_time } = eventData;

    eventData.start_date = new Date(start_date);
    eventData.end_date = new Date(end_date);
    eventData.start_time = new Date(start_time);
    eventData.end_time = new Date(end_time);

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
