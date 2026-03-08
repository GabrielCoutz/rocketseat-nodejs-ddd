import { left, right, type Either } from '@/core/either.js'
import type { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository.js'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error.js'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error.js'
import type {
  IQuestionProps,
  Question,
} from '@/domain/forum/enterprise/entities/question.js'

interface IEditQuestionUseCaseProps extends Pick<
  IQuestionProps,
  'title' | 'content'
> {
  questionId: string
  authorId: string
}

type IEditQuestionUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute({
    title,
    content,
    authorId,
    questionId,
  }: IEditQuestionUseCaseProps): Promise<IEditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) return left(new ResourceNotFoundError())
    if (question.authorId.toString() !== authorId)
      return left(new NotAllowedError())

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
