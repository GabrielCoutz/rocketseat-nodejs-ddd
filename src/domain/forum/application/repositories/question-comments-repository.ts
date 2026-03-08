import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.js'

export interface IQuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
}
