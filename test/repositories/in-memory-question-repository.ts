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
}
