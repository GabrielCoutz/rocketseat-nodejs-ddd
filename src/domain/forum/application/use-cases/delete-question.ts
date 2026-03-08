import { left, right, type Either } from '@/core/either.js'
import type { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository.js'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error.js'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error.js'

interface IDeleteQuestionUseCaseProps {
  questionId: string
  authorId: string
}

type IDeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: IDeleteQuestionUseCaseProps): Promise<IDeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) return left(new ResourceNotFoundError())
    if (question.authorId.toString() !== authorId)
      return left(new NotAllowedError())

    await this.questionRepository.delete(question)

    return right(null)
  }
}
