import type { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import type { Answer } from '@/domain/forum/enterprise/entities/answer.js'

export class InMemoryAnswersRepository implements IAnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) return null

    return answer
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answer.id)

    if (index !== -1) this.items.splice(index, 1)
  }

  async save(answer: Answer): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answer.id)

    if (index !== -1) this.items[index] = answer
  }
}
