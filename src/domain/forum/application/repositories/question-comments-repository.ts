import type { IPaginationParams } from '@/core/repositories/pagination-params.js'
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.js'

export interface IQuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>
  create(questionComment: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
  findManyByQuestionId(
    questionId: string,
    params: IPaginationParams,
  ): Promise<QuestionComment[]>
}
