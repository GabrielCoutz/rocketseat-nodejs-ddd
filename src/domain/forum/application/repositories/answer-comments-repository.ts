import type { IPaginationParams } from '@/core/repositories/pagination-params.js'
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.js'

export interface IAnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
  findManyByAnswerId(
    answerId: string,
    params: IPaginationParams,
  ): Promise<AnswerComment[]>
}
