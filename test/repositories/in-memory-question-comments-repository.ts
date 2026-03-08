import type { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository.js'
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.js'

export class InMemoryQuestionCommentsRepository implements IQuestionCommentsRepository {
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }
}
