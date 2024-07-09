import { MaterialCategoryEnum } from "@prisma/client";
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

interface ParamsList {
  categories:
  MaterialCategoryEnum[];
  type: "DIDATICO" | "FORMAL";
  order: "asc" | "desc";
  search?: string;
}

export const listMaterial = async ({
  order,
  type,
  categories,
  search,
}: ParamsList) => {
  return prisma.material.findMany({
    where: {
      type,
      category: {in: categories},
      title: { contains: search },
      description: { contains: search },
    },
    include: { user: true },
    orderBy: { id: order },
  });
};

export const findMaterialById = async (id: number) => {
  return prisma.material.findUnique({where: {id}, include: {user: true}})
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
