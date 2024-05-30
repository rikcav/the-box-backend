import { QuestionDTO } from "../../model/dto/question-dto";
import { Question } from "../../model/question";
import { IQuestionRepository } from "../i-question-repository";
import { prisma } from "./prisma";

export class QuestionRepository implements IQuestionRepository {
  public async findQuestionByid(id: string): Promise<Question | null> {
    return await prisma.question.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });
  }
  public async createQuestion({
    tags: listTags,
    ...questionDTO
  }: QuestionDTO): Promise<Question> {
    const tags = listTags.map((tag) => ({ id: tag }));
    return await prisma.question.create({
      data: { ...questionDTO, tags: { connect: tags } },
      include: { tags: true },
    });
  }
  public async deleteQuestion(id: string): Promise<void> {
    await prisma.question.delete({ where: { id } });
  }
}
