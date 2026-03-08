import type { Optional } from '@/core/@types/optional.js'

import type { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import {
  Comment,
  type ICommentProps,
} from '@/domain/forum/enterprise/entities/comment.js'

export interface IAnswerCommentProps extends ICommentProps {
  answerId: UniqueEntityId
}

export class AnswerComment extends Comment<IAnswerCommentProps> {
  static create(
    props: Optional<IAnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answerComment = new AnswerComment(
      {
        createdAt: new Date(),
        ...props,
      },
      id,
    )
    return answerComment
  }

  get answerId() {
    return this.props.answerId
  }
}
