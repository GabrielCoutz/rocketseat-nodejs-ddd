import type { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository.js'
import type { Question } from '@/domain/forum/enterprise/entities/question.js'

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public items: Question[] = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) return null

    return question
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) return null

    return question
  }

  async delete(question: Question): Promise<void> {
    const index = this.items.findIndex((item) => item.id === question.id)

    if (index !== -1) this.items.splice(index, 1)
  }

  async save(question: Question): Promise<void> {
    const index = this.items.findIndex((item) => item.id === question.id)

    if (index !== -1) this.items[index] = question
  }

  async findManyRecent({ page }: { page: number }): Promise<Question[]> {
    const items = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return items
  }
}
