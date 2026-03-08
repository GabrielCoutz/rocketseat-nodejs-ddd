import { left, right, type Either } from '@/core/either.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import type { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository.js'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error.js'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error.js'
import { Question } from '@/domain/forum/enterprise/entities/question.js'

interface IChooseQuestionBestAnswerUseCaseProps {
  authorId: string
  answerId: string
}

type IChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private answersRepository: IAnswersRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: IChooseQuestionBestAnswerUseCaseProps): Promise<IChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) return left(new ResourceNotFoundError())

    if (authorId !== question.authorId.toString())
      return left(new NotAllowedError())

    question.bestAnswerId = new UniqueEntityId(answerId)

    await this.questionsRepository.save(question)

    return right({
      question,
    })
  }
}
