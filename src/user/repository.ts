import { prisma } from "../prisma/service";

export const getById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export const createUser = async (data: any) => {
  const user = await prisma.user.create({
    data,
  });

  return user;
};

export const deleteById = async (id: number) => {
  const deleteUser = await prisma.user.delete({
    where: {
      id,
    },
  });

  return deleteUser;
};
