import { QuestionDTO } from "../model/dto/question-dto";
import { IQuestionRepository } from "../repository/i-question-repository";

export class QuestionService {
    constructor(private questionRespository: IQuestionRepository, ) {}

    public async createQuestion(questionDTO: QuestionDTO) {
        
    }
}