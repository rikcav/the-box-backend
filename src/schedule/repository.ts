import { prisma } from "../prisma/service";

export interface Schedule {
  year: string;
  period: string;
}

export const getAll = async () => {
  const schedules = await prisma.schedule.findMany();
  return schedules;
};

export const get = async (id: number) => {
  const schedule = await prisma.schedule.findUnique({
    where: {
      id,
    },
  });

  if (schedule) {
    return schedule;
  }

  throw `Could not find schedule with id ${id}.`;
};

export const create = async (data: Schedule) => {
  const schedule = await prisma.schedule.create({
    data,
  });

  return schedule;
};

export const update = async (id: number, data: Schedule) => {
  const schedule = await prisma.schedule.update({
    where: { id },
    data,
  });

  if (schedule) {
    return schedule;
  }

  throw `Could not find schedule with id ${id} or update it.`;
};

export const remove = async (id: number) => {
  const schedule = await prisma.schedule.delete({
    where: {
      id,
    },
  });

  if (schedule) {
    return schedule;
  }

  throw `Could not remove schedule with id ${id}.`;
};
