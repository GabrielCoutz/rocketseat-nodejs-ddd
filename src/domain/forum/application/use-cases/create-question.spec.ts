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
    const result = await sut.execute({
      authorId: 'author-1',
      title: 'This is the question title.',
      content: 'This is the create to the question.',
      attachmentsIds: ['attachment-1', 'attachment-2'],
    })

    expect(result.isRight()).toBe(true)
    expect(mockCreatesRepository.items[0]).toEqual(result.value?.question)
    expect(mockCreatesRepository.items[0].attachments).toEqual([
      expect.objectContaining({
        attachmentId: 'attachment-1',
        questionId: result.value?.question.id.toString(),
      }),
      expect.objectContaining({
        attachmentId: 'attachment-2',
        questionId: result.value?.question.id.toString(),
      }),
    ])
  })
})
