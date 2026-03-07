import type { Question } from '@/domain/forum/enterprise/entities/question.js'

export interface IQuestionsRepository {
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
}
