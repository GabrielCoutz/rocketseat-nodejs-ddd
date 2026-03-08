import type { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository.js'
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.js'

export class InMemoryQuestionCommentsRepository implements IQuestionCommentsRepository {
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === questionComment.id)

    if (index) {
      this.items.splice(index, 1)
    }
  }

  async findManyByQuestionId(
    questionId: string,
    params: { page: number },
  ): Promise<QuestionComment[]> {
    const start = (params.page - 1) * 20
    const end = params.page * 20

    return this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice(start, end)
  }
}
