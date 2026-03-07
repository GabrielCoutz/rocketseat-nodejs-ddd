import type { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository.js'

interface IDeleteQuestionUseCaseProps {
  questionId: string
  authorId: string
}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async execute({ questionId, authorId }: IDeleteQuestionUseCaseProps) {
    const question = await this.questionRepository.findById(questionId)

    if (!question) throw new Error('Question not found')
    if (question.authorId.toString() !== authorId)
      throw new Error('Not allowed')

    await this.questionRepository.delete(question)
  }
}
