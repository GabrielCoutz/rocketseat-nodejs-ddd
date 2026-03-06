import { Answer } from "../entities/answer.js";

interface IAnswerQuestionUseCaseProps {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  execute({instructorId,  questionId, content}: IAnswerQuestionUseCaseProps){
    const answer  = new Answer( content );

    return answer;
  }
}
