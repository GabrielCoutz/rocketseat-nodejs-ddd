import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question.js'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'

let mockAnswerQuestionRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    mockAnswerQuestionRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(mockAnswerQuestionRepository)
  })

  it('should be able tocreate answer', async () => {
    const result = await sut.execute({
      instructorId: 'instructor-1',
      questionId: 'question-1',
      content: 'This is the create to the answer.',
    })

    expect(result.isRight()).toBe(true)
    expect(mockAnswerQuestionRepository.items[0]).toEqual(result.value?.answer)
  })
})
