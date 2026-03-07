import type { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository.js'
import type { Question } from '@/domain/forum/enterprise/entities/question.js'

interface IGetQuestionBySlugUseCaseProps {
  slug: string
}

interface IGetQuestionBySlugUseCaseResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute({
    slug,
  }: IGetQuestionBySlugUseCaseProps): Promise<IGetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) throw new Error('Question not found')

    return { question }
  }
}
