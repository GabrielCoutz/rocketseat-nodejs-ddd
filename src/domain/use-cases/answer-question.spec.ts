import { AnswerQuestionUseCase } from './answer-question.js'
import type { IAnswersRepository } from '../repositories/answers-repository.js'

const mockAnswersRepository: IAnswersRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (answer) => {},
}

test('answer question', async () => {
  const answerQuestion = new AnswerQuestionUseCase(mockAnswersRepository)

  const answer = await answerQuestion.execute({
    instructorId: 'instructor-1',
    questionId: 'question-1',
    content: 'This is the answer to the question.',
  })

  expect(answer.content).toBe('This is the answer to the question.')
})
