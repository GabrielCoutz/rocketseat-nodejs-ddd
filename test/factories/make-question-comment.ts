import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import {
  QuestionComment,
  type IQuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comment.js'
import { faker } from '@faker-js/faker'

export function makeQuestionComment(
  override: Partial<IQuestionCommentProps> = {},
  id?: UniqueEntityId,
) {
  const question = QuestionComment.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
