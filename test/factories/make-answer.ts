import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import {
  Answer,
  type IAnswerProps,
} from '@/domain/forum/enterprise/entities/answer.js'
import { faker } from '@faker-js/faker'

export const makeAnswer = (
  override: Partial<IAnswerProps> = {},
  id?: UniqueEntityId,
): Answer =>
  Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.paragraphs(),
      ...override,
    },
    id,
  )
