import type { Optional } from '@/core/@types/optional.js'
import { Entity } from '@/core/entities/entity.js'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

export interface IAnswerCommentProps {
  authorId: UniqueEntityId
  answerId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class AnswerComment extends Entity<IAnswerCommentProps> {
  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get authorId() {
    return this.props.authorId
  }

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

  get excerpt(): string {
    return this.props.content.substring(0, 120).trim().concat('...')
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
