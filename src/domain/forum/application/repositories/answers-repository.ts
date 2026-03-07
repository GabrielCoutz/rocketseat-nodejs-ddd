import type { Answer } from '@/domain/forum/enterprise/entities/answer.js'

export interface IAnswersRepository {
  create(answer: Answer): Promise<void>
}
