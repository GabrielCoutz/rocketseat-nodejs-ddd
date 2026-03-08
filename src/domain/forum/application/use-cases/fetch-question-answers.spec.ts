/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchQuestionAnswersCase } from '@/domain/forum/application/use-cases/fetch-question-answers.js'
import { makeAnswer } from 'test/factories/make-answer.js'

import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'

let mockCreatesRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    mockCreatesRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersCase(mockCreatesRepository)
  })

  it('should be able to fetch question answers', async () => {
    for (let i = 1; i <= 3; i++)
      await mockCreatesRepository.create(
        makeAnswer({
          questionId: 'question-1' as any,
        }),
      )

    const result = await sut.execute({
      page: 1,
      questionId: 'question-1',
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++)
      await mockCreatesRepository.create(
        makeAnswer({
          questionId: 'question-1' as any,
        }),
      )

    const result = await sut.execute({ questionId: 'question-1', page: 2 })

    expect(result.value?.answers).toHaveLength(2)
  })
})
