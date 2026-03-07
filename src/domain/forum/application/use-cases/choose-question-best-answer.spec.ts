/* eslint-disable @typescript-eslint/no-explicit-any */
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer.js'
import { makeAnswer } from 'test/factories/make-answer.js'
import { makeQuestion } from 'test/factories/make-question.js'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id as any,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    const storedQuestion = inMemoryQuestionsRepository.items[0]

    expect(storedQuestion).toBeDefined()
    expect(storedQuestion!.bestAnswerId).toBeDefined()
    expect(storedQuestion!.bestAnswerId!.value).toEqual(answer.id)
  })

  it('should not be able to to choose another user question best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })

    const answer = makeAnswer({
      questionId: question.id as any,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    expect(() => {
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
