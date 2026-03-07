import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import {
  Question,
  type IQuestionProps,
} from '@/domain/forum/enterprise/entities/question.js'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug.js'
import { faker } from '@faker-js/faker'

export const makeQuestion = (
  override: Partial<IQuestionProps> = {},
  id?: UniqueEntityId,
): Question =>
  Question.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      slug: Slug.create(faker.lorem.slug()),
      ...override,
    },
    id,
  )
