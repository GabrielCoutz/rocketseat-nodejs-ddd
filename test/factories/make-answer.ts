import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import {
  Answer,
  type IAnswerProps,
} from '@/domain/forum/enterprise/entities/answer.js'
import { faker } from '@faker-js/faker'

export function makeAnswer(
  override: Partial<IAnswerProps> = {},
  id?: UniqueEntityId,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}
