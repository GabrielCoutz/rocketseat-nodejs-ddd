import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer.js'

import { makeAnswer } from 'test/factories/make-answer.js'

import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'

let mockAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit answer', () => {
  beforeEach(() => {
    mockAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(mockAnswersRepository)
  })

  it('should be able to edit an answer', async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityId('answer-1'))

    await mockAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: 'answer-1',
      authorId: newAnswer.authorId.toString(),
      content: 'New content',
    })

    expect(mockAnswersRepository.items[0]).toMatchObject({
      content: 'New content',
    })
  })

  it('should not be able to edit an answer if the author is different', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await mockAnswersRepository.create(newAnswer)

    await expect(() =>
      sut.execute({
        answerId: 'answer-1',
        authorId: 'author-2',
        content: 'New content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
