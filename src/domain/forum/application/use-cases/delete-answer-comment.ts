import { left, right, type Either } from '@/core/either.js'
import type { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository.js'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error.js'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error.js'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) return left(new ResourceNotFoundError())
    if (answerComment.authorId.toString() !== authorId)
      return left(new NotAllowedError())

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
