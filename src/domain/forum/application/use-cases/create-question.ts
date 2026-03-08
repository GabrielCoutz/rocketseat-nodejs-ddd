import { right, type Either } from '@/core/either.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository.js'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment.js'
import { Question } from '@/domain/forum/enterprise/entities/question.js'

interface ICreateQuestionUseCaseProps {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
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
    attachmentsIds,
  }: ICreateQuestionUseCaseProps): Promise<ICreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    const attachments = attachmentsIds.map((attachmentId) =>
      QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      }),
    )

    question.attachments = attachments

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
