import type { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import type { Answer } from '@/domain/forum/enterprise/entities/answer.js'

interface IFetchQuestionAnswersCaseProps {
  page: number
  questionId: string
}

interface IFetchQuestionAnswersCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    page,
    questionId,
  }: IFetchQuestionAnswersCaseProps): Promise<IFetchQuestionAnswersCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      {
        page,
      },
    )

    return {
      answers,
    }
  }
}
