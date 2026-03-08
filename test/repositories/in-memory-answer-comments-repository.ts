import type { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository.js'
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.js'

export class InMemoryAnswerCommentsRepository implements IAnswerCommentsRepository {
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find((item) => item.id.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const answerCommentIndex = this.items.findIndex(
      (item) => item.id.toString() === answerComment.id.toString(),
    )

    if (answerCommentIndex) {
      this.items.splice(answerCommentIndex, 1)
    }
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: { page: number },
  ): Promise<AnswerComment[]> {
    const answerComments = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    const startIndex = (page - 1) * 20
    const endIndex = page * 20

    return answerComments.slice(startIndex, endIndex)
  }
}
