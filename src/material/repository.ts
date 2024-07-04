import { prisma } from "../prisma/service";

interface CreateMaterial {
  title: string;
  url: string;
  description: string;
  type: "DIDATICO" | "FORMAL";
  userId: number;
  category:
    | "BAREMA"
    | "REQUERIMENTO"
    | "UNICO"
    | "EDITAIS"
    | "EDITAIS_DE_BOLSAS"
    | "APOIO"
    | "MANUAL_DOS_CALOUROS";
}

export const createMaterial = async ({
  description,
  title,
  type,
  url,
  category,
  userId,
}: CreateMaterial) => {
  return await prisma.material.create({
    data: {
      title,
      description,
      type,
      url,
      category,
      user_id: userId,
    },
  });
};
