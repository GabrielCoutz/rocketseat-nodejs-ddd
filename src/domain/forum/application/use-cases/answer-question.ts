import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import { Answer } from '@/domain/forum/enterprise/entities/answer.js'

interface IAnswerQuestionUseCaseProps {
  instructorId: string
  questionId: string
  content: string
}

interface IAnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: IAnswerQuestionUseCaseProps): Promise<IAnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}
