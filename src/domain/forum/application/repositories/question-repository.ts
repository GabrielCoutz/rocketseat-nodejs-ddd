import type { IPaginationParams } from '@/core/repositories/pagination-params.js'
import type { Question } from '@/domain/forum/enterprise/entities/question.js'

export interface IQuestionsRepository {
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  findById(id: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
  findManyRecent({ page }: IPaginationParams): Promise<Question[]>
}
