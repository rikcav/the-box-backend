import { prisma } from "../prisma/service";

export type CreateLabSchedule = {
  start_time: Date;
  end_time: Date;
  date: Date;
  user_id: number;
  lab_id: number;
};

export const getAll = async () => {
  const labSchedules = await prisma.labSchedule.findMany();
  return labSchedules;
};

export const get = async (id: number) => {
  const labSchedule = await prisma.labSchedule.findUnique({
    where: {
      id,
    },
  });

  if (!labSchedule) {
    throw new Error(`No record with ID ${id} found.`);
  }

  return labSchedule;
};

export const getByLabId = async (labId: number) => {
  const labSchedules = await prisma.labSchedule.findMany({
    where: {
      lab_id: labId,
    },
  });

  return labSchedules;
};

export const create = async (data: CreateLabSchedule) => {
  const labSchedule = await prisma.labSchedule.create({
    data,
  });

  return labSchedule;
};

export const update = async (id: number, data: CreateLabSchedule) => {
  const labSchedule = await prisma.labSchedule.update({
    where: {
      id,
    },
    data,
  });

  if (!labSchedule) {
    throw new Error(`Could not update lab schedule with ID ${id}`);
  }

  return labSchedule;
};

export const deleteById = async (id: number) => {
  const labSchedule = await prisma.labSchedule.delete({
    where: {
      id,
    },
  });

  if (!labSchedule) {
    throw new Error(`Could not update lab schedule with ID ${id}`);
  }

  return labSchedule;
};
