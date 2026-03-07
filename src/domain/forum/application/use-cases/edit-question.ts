import type { IQuestionsRepository } from '@/domain/forum/application/repositories/question-repository.js'
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

interface IEditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: IQuestionsRepository) {}

  async execute({
    title,
    content,
    authorId,
    questionId,
  }: IEditQuestionUseCaseProps): Promise<IEditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) throw new Error('Question not found')
    if (question.authorId.toString() !== authorId)
      throw new Error('You are not the author of this question')

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return { question }
  }
}
