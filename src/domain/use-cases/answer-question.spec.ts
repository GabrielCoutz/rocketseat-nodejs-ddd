import {expect, test} from 'vitest'
import { AnswerQuestionUseCase } from './answer-question.js';


test('answer question', () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const answer = answerQuestion.execute({
    instructorId: 'instructor-1',
    questionId: 'question-1',
    content: 'This is the answer to the question.'
  });

  expect(answer.content).toBe('This is the answer to the question.');
})