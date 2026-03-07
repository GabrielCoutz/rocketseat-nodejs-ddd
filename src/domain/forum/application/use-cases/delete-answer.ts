import type { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository.js'

interface IDeleteAnswerUseCaseProps {
  answerId: string
  authorId: string
}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: IAnswersRepository) {}

  async execute({ answerId, authorId }: IDeleteAnswerUseCaseProps) {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) throw new Error('Answer not found')
    if (answer.authorId.toString() !== authorId) throw new Error('Not allowed')

    await this.answerRepository.delete(answer)
  }
}
