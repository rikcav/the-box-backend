import * as repository from "./repository";

interface MaterialDto {
    title: string;
    url: string;
    description: string;
    category: string;
    type: "DIDATICO" | "FORMAL";
    userId: number;
}

export const createMaterial = async (materialDto: MaterialDto) => {
    return repository.createMaterial(materialDto);
}