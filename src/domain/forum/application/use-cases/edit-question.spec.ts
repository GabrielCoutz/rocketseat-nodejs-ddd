import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question.js'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error.js'

import { makeQuestion } from 'test/factories/make-question.js'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository.js'

let mockQuestionRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Delete question', () => {
  beforeEach(() => {
    mockQuestionRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(mockQuestionRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityId('question-1'))

    await mockQuestionRepository.create(newQuestion)

    await sut.execute({
      questionId: 'question-1',
      authorId: newQuestion.authorId.toString(),
      content: 'New content',
      title: 'New title',
    })

    expect(mockQuestionRepository.items[0]).toMatchObject({
      title: 'New title',
      content: 'New content',
    })
  })

  it('should not be able to delete a question if the author is different', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await mockQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-2',
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
