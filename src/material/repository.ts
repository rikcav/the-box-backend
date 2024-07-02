import { prisma } from "../prisma/service";

interface CreateMaterial {
  title: string;
  url: string;
  description: string;
  type: "DIDATICO" | "FORMAL";
  userId: number;
}

export const createMaterial = async ({
  description,
  title,
  type,
  url,
  userId,
}: CreateMaterial) => {
  return await prisma.material.create({
    data: {
      title,
      description,
      type,
      url,
      user_id: userId,
    },
  });
};
