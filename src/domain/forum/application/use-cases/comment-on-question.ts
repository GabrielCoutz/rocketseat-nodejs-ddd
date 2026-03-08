import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository.js'
import type { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository.js'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.js'

interface ICommentOnQuestionUseCaseProps {
  authorId: string
  questionId: string
  content: string
}

interface ICommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: ICommentOnQuestionUseCaseProps): Promise<ICommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) throw new Error('Question not found')

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return {
      questionComment,
    }
  }
}
