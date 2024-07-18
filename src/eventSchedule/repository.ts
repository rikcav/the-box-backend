import { prisma } from "../prisma/service";

export interface EventSchedule {
  event_id: number;
  schedule_id: number;
}

export const getAll = async () => {
  const eventSchedules = await prisma.eventSchedule.findMany();

  if (eventSchedules) {
    return eventSchedules;
  }

  throw `Could not find event schedules`;
};

export const getByScheduleId = async (scheduleId: number) => {
  const eventSchedules = await prisma.eventSchedule.findMany({
    where: { schedule_id: scheduleId },
  });

  if (eventSchedules) {
    return eventSchedules;
  }

  throw `Could not find event schedules for schedule with id: ${scheduleId}`;
};

export const get = async (id: number) => {
  const eventSchedule = await prisma.eventSchedule.findUnique({
    where: { id },
  });

  if (eventSchedule) {
    return eventSchedule;
  }

  throw `Could not find event schedule with id: ${id}`;
};

export const create = async (data: EventSchedule) => {
  const eventSchedule = await prisma.eventSchedule.create({
    data,
  });

  if (eventSchedule) {
    return eventSchedule;
  }

  throw `Could not create new event schedule`;
};

export const update = async (id: number, data: EventSchedule) => {
  const eventSchedule = await prisma.eventSchedule.update({
    where: { id },
    data,
  });

  if (eventSchedule) {
    return eventSchedule;
  }

  throw `Could not update event schedule with id: ${id}`;
};

export const remove = async (id: number) => {
  const eventSchedule = await prisma.eventSchedule.delete({
    where: { id },
  });

  if (eventSchedule) {
    return eventSchedule;
  }

  throw `Could not delete event schedule with id: ${id}`;
};
