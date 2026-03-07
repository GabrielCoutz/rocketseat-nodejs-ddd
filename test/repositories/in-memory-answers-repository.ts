import type { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import type { Answer } from '@/domain/forum/enterprise/entities/answer.js'

export class InMemoryAnswersRepository implements IAnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }
}
