import { Entity } from '@/core/entities/entity.js'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

interface IAttachmentProps {
  title: string
  link: string
}

export class Attachment extends Entity<IAttachmentProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: IAttachmentProps, id?: UniqueEntityId) {
    const attachment = new Attachment(props, id)

    return attachment
  }
}
