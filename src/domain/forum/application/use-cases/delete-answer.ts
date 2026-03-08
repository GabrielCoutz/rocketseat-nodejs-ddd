import { left, right, type Either } from '@/core/either.js'
import type { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error.js'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error.js'

interface IDeleteAnswerUseCaseProps {
  answerId: string
  authorId: string
}

type IDeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteAnswerUseCase {
  constructor(private answerRepository: IAnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: IDeleteAnswerUseCaseProps): Promise<IDeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())
    if (answer.authorId.toString() !== authorId)
      return left(new NotAllowedError())

    await this.answerRepository.delete(answer)

    return right(null)
  }
}
