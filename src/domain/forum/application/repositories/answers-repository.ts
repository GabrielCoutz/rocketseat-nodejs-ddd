import type { IPaginationParams } from '@/core/repositories/pagination-params.js'
import type { Answer } from '@/domain/forum/enterprise/entities/answer.js'

export interface IAnswersRepository {
  create(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  findManyByQuestionId(
    questionId: string,
    params: IPaginationParams,
  ): Promise<Answer[]>
}
