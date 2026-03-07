import type { Optional } from '@/core/@types/optional.js'
import { Entity } from '@/core/entities/entity.js'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

interface IAnswerProps {
  content: string
  createdAt: Date
  updatedAt?: Date
  authorId: UniqueEntityId
  questionId: UniqueEntityId
}

export class Answer extends Entity<IAnswerProps> {
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

  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<IAnswerProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
    return answer
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
