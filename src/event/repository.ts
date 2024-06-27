import { prisma } from "../prisma/service";

export interface Event {
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

export const create = async (data: Event) => {
  const event = await prisma.event.create({
    data,
  });

  if (event) {
    return event;
  }

  throw `Could not create new event`;
};

export const update = async (id: number, data: Event) => {
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
