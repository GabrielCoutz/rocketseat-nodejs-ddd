import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question.js'
import { makeQuestion } from 'test/factories/make-question.js'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository.js'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository.js'

let mockQuestionsRepository: InMemoryQuestionsRepository
let mockQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Create Question comment', () => {
  beforeEach(() => {
    mockQuestionsRepository = new InMemoryQuestionsRepository()
    mockQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      mockQuestionsRepository,
      mockQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await mockQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(mockQuestionCommentsRepository.items).toHaveLength(1)
    expect(mockQuestionCommentsRepository.items[0]!.content).toEqual(
      'Comentário teste',
    )
  })
})
