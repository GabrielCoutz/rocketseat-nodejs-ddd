import type { Optional } from '@/core/@types/optional.js'

import type { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import {
  Comment,
  type ICommentProps,
} from '@/domain/forum/enterprise/entities/comment.js'

export interface IQuestionCommentProps extends ICommentProps {
  questionId: UniqueEntityId
}

export class QuestionComment extends Comment<IQuestionCommentProps> {
  static create(
    props: Optional<IQuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      {
        createdAt: new Date(),
        ...props,
      },
      id,
    )
    return questionComment
  }

  get questionId() {
    return this.props.questionId
  }
}
