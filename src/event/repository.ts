import { prisma } from "../prisma/service";

export const findBetweenDates = async (startDate: Date, endDate: Date) => {
  return await prisma.event.findMany({
    where: {
      OR: [
        {
          start_date: { gte: startDate, lte: endDate },
          end_date: { gte: startDate, lte: endDate },
        },
        { AND: { start_date: { lte: startDate }, end_date: { lte: endDate } } },
      ],
    },
  });
};

export interface NewEvent {
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  start_time: Date;
  end_time: Date;
  speakers: string;
}

export const getAll = async () => {
  const events = await prisma.event.findMany();

  if (events) {
    return events;
  }

  throw `Could not get events`;
};

export const get = async (id: number) => {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (event) {
    return event;
  }

  throw `Could not find event with id: ${id}`;
};

export const create = async (data: NewEvent) => {
  const event = await prisma.event.create({
    data,
  });

  if (event) {
    return event;
  }

  throw `Could not create new event`;
};

export const update = async (id: number, data: NewEvent) => {
  const event = await prisma.event.update({
    where: { id },
    data,
  });

  if (event) {
    return event;
  }

  throw `Could not update event with id: ${id}`;
};

export const remove = async (id: number) => {
  const event = await prisma.event.delete({
    where: { id },
  });

  if (event) {
    return event;
  }

  throw `Could not delete event with id: ${id}`;
};
