import type { Optional } from '@/core/@types/optional.js'
import { AggregateRoot } from '@/core/entities/aggregate-root.js'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment.js'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug.js'
import dayjs from 'dayjs'

export interface IQuestionProps {
  attachments?: QuestionAttachment[]
  title: string
  content: string
  slug: Slug
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  createdAt: Date
  updatedAt?: Date
}

export class Question extends AggregateRoot<IQuestionProps> {
  static create(
    props: Optional<IQuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityId,
  ) {
    const question = new Question(
      {
        createdAt: new Date(),
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? [],
        ...props,
      },
      id,
    )
    return question
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.props.createdAt, 'day') <= 3
  }

  get excerpt(): string {
    return this.props.content.substring(0, 120).trim().concat('...')
  }

  get attachments() {
    return this.props.attachments ?? []
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    if (bestAnswerId === undefined) delete this.props.bestAnswerId
    else this.props.bestAnswerId = bestAnswerId

    this.touch()
  }

  set attachments(attachments: QuestionAttachment[]) {
    this.props.attachments = attachments
    this.touch()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
