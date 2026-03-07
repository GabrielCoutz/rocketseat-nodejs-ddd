import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions.js'
import { makeQuestion } from 'test/factories/make-question.js'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository.js'

let mockCreatesRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    mockCreatesRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(mockCreatesRepository)
  })

  it('should be able to fetch recent questions', async () => {
    for (let i = 1; i <= 3; i++)
      await mockCreatesRepository.create(
        makeQuestion({
          createdAt: new Date(2020, 0, i),
        }),
      )

    const { questions } = await sut.execute({ page: 1 })

    expect(questions[0]!.createdAt).toEqual(new Date(2020, 0, 3))
    expect(questions[1]!.createdAt).toEqual(new Date(2020, 0, 2))
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++)
      await mockCreatesRepository.create(
        makeQuestion({
          createdAt: new Date(2020, 0, i),
        }),
      )

    const { questions } = await sut.execute({ page: 2 })

    expect(questions).toHaveLength(2)
  })
})
