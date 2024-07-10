import { prisma } from "../prisma/service";

export const getAll = async () => {
  const establishments = await prisma.establishment.findMany();

  if (establishments) {
    return establishments;
  }

  throw "Could not get establishments";
};

export const get = async (id: number) => {
  const establishment = await prisma.establishment.findUnique({
    where: { id },
  });

  if (establishment) {
    return establishment;
  }

  throw `Could not get establishment with id: ${id}`;
};
