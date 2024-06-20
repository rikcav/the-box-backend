import { prisma } from "../prisma/service";

export const getById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (user) {
    return user;
  }

  throw "Could not find user with ID: " + id;
};

export const createUser = async (data: any) => {
  const user = await prisma.user.create({
    data,
  });

  return user;
};

export const updateUser = async (id: number, data: any) => {
  const user = await prisma.user.update({
    where: { id },
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
