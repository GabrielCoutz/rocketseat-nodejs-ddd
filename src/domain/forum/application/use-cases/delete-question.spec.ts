import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question.js'

import { makeQuestion } from 'test/factories/make-question.js'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository.js'

let mockQuestionRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete question', () => {
  beforeEach(() => {
    mockQuestionRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(mockQuestionRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId('question-1'))

    await mockQuestionRepository.create(newQuestion)

    await sut.execute({
      questionId: 'question-1',
      authorId: newQuestion.authorId.toString(),
    })

    expect(mockQuestionRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question if the author is different', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await mockQuestionRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        questionId: 'question-1',
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
