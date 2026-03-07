import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug.js'
import { Question } from '@/domain/forum/enterprise/entities/question.js'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug.js'

import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository.js'

let mockAnswerQuestionRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    mockAnswerQuestionRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(mockAnswerQuestionRepository)
  })

  it('should be able to get question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId('author-1'),
      title: 'How to create a question?',
      content: 'This is the content of the question.',
      slug: Slug.create('how-to-create-a-question'),
    })

    await mockAnswerQuestionRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'how-to-create-a-question',
    })

    expect(question.content).toBe('This is the content of the question.')
    expect(newQuestion.id).toBe(question.id)
  })
})
