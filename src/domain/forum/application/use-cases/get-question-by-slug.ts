import { left, right, type Either } from '@/core/either.js'
import type { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository.js'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error.js'
import type { Question } from '@/domain/forum/enterprise/entities/question.js'

interface IGetQuestionBySlugUseCaseProps {
  slug: string
}

type IGetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute({
    slug,
  }: IGetQuestionBySlugUseCaseProps): Promise<IGetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) return left(new ResourceNotFoundError())

    return right({ question })
  }
}
