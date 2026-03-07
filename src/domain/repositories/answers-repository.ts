import type { Answer } from '../entities/answer.js'

export interface IAnswersRepository {
  create(answer: Answer): Promise<void>
}
