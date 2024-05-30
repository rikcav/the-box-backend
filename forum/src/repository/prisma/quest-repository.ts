import { QuestDTO } from "../../model/dto/quest-dto";
import { Quest } from "../../model/quest";
import { IQuestRepository } from "../i-quest-repository";
import { prisma } from "./prisma";

export class QuestRepository implements IQuestRepository {
  public async findQuestByid(id: string): Promise<Quest | null> {
    return await prisma.question.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });
  }
  public async createQuest({
    tags: listTags,
    ...questDTO
  }: QuestDTO): Promise<Quest> {
    const tags = listTags.map((tag) => ({ id: tag }));
    return await prisma.question.create({
      data: { ...questDTO, tags: { connect: tags } },
      include: { tags: true },
    });
  }
  public async deleteQuest(id: string): Promise<void> {
    await prisma.question.delete({ where: { id } });
  }
}
