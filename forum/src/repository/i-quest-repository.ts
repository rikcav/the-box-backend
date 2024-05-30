import { QuestDTO } from "../model/dto/quest-dto";
import { Quest } from "../model/quest";

export abstract class IQuestRepository {

    abstract findQuestByid(id: string): Promise<Quest | null>;
    abstract createQuest(questDTO: QuestDTO): Promise<Quest>;
    abstract deleteQuest(id: string): Promise<void>;
}