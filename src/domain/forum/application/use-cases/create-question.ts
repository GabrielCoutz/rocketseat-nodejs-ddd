import { right, type Either } from '@/core/either.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository.js'
import { Question } from '@/domain/forum/enterprise/entities/question.js'

interface ICreateQuestionUseCaseProps {
  authorId: string
  title: string
  content: string
}

type ICreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: ICreateQuestionUseCaseProps): Promise<ICreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
