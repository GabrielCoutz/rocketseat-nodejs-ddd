import type { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import type { Answer } from '@/domain/forum/enterprise/entities/answer.js'

interface IEditAnswerUseCaseProps extends Pick<Answer, 'content'> {
  answerId: string
  authorId: string
}

interface IEditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async execute({
    content,
    authorId,
    answerId,
  }: IEditAnswerUseCaseProps): Promise<IEditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) throw new Error('Answer not found')
    if (answer.authorId.toString() !== authorId)
      throw new Error('You are not the author of this answer')

    answer.content = content

    await this.answersRepository.save(answer)

    return { answer }
  }
}
