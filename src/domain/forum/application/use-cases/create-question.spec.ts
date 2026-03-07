import type { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository.js'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question.js'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository.js'

let mockCreatesRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    mockCreatesRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(mockCreatesRepository)
  })

  it('should be able to create question', async () => {
    const { question } = await sut.execute({
      authorId: 'author-1',
      title: 'This is the question title.',
      content: 'This is the create to the question.',
    })

    expect(question.content).toBe('This is the create to the question.')
    expect(mockCreatesRepository.items[0]?.id).toBe(question.id)
  })
})
