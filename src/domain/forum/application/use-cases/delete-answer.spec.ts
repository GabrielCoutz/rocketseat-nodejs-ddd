import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer.js'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error.js'
import { makeAnswer } from 'test/factories/make-answer.js'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'

let mockAnswerRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete answer', () => {
  beforeEach(() => {
    mockAnswerRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(mockAnswerRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({}, new UniqueEntityId('answer-1'))

    await mockAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: 'answer-1',
      authorId: newAnswer.authorId.toString(),
    })

    expect(mockAnswerRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer if the author is different', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await mockAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
