import { prisma } from "../prisma/service";

export type CreateLab = {
  code: string;
  name: string;
};

export const getAll = async () => {
  const labs = await prisma.lab.findMany();
  return labs;
};

export const get = async (id: number) => {
  const lab = await prisma.lab.findUnique({
    where: {
      id,
    },
  });

  if (!lab) {
    throw new Error(`Record with ID: ${id} not found`);
  }

  return lab;
};

export const update = async (id: number, data: CreateLab) => {
  const lab = await prisma.lab.update({
    where: {
      id,
    },
    data,
  });

  if (!lab) {
    throw new Error(`Record with ID: ${id} not found`);
  }

  return data;
};

export const create = async (data: CreateLab) => {
  const lab = await prisma.lab.create({
    data,
  });

  return lab;
};

export const deleteById = async (id: number) => {
  const lab = await prisma.lab.delete({
    where: {
      id,
    },
  });

  return lab;
};
