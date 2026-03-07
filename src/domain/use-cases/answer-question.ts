import { UniqueEntityId } from '../../core/entities/unique-entity-id.js'
import { Answer } from '../entities/answer.js'
import type { IAnswersRepository } from '../repositories/answers-repository.js'

interface IAnswerQuestionUseCaseProps {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: IAnswerQuestionUseCaseProps) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.answersRepository.create(answer)

    return answer
  }
}
