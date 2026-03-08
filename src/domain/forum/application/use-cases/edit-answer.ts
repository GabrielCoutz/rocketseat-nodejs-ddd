import { left, right, type Either } from '@/core/either.js'
import type { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error.js'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error.js'
import type { Answer } from '@/domain/forum/enterprise/entities/answer.js'

interface IEditAnswerUseCaseProps extends Pick<Answer, 'content'> {
  answerId: string
  authorId: string
}

type IEditAnswerUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    content,
    authorId,
    answerId,
  }: IEditAnswerUseCaseProps): Promise<IEditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())
    if (answer.authorId.toString() !== authorId)
      return left(new NotAllowedError())

    answer.content = content

    await this.answersRepository.save(answer)

    return right({ answer })
  }
}
