import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import {
  Question,
  type IQuestionProps,
} from '@/domain/forum/enterprise/entities/question.js'

import { faker } from '@faker-js/faker'

export function makeQuestion(
  override: Partial<IQuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
