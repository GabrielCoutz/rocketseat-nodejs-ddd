import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug.js'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug.js'
import { makeQuestion } from 'test/factories/make-question.js'

import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository.js'

let mockAnswerQuestionRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    mockAnswerQuestionRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(mockAnswerQuestionRepository)
  })

  it('should be able to get question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    await mockAnswerQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.question.content).toBe(newQuestion.content)
      expect(result.value.question.id).toBe(newQuestion.id)
    }
  })
})
