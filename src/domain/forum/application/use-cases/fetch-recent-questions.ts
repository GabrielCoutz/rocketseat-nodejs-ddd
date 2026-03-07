import type { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository.js'
import type { Question } from '@/domain/forum/enterprise/entities/question.js'

interface IFetchRecentQuestionsUseCaseProps {
  page: number
}

interface IFetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute({
    page,
  }: IFetchRecentQuestionsUseCaseProps): Promise<IFetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return {
      questions,
    }
  }
}
