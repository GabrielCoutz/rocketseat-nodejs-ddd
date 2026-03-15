import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  INotificationProps,
  Notification,
} from '@/domain/notification/enterprise/entities/notification'
import { faker } from '@faker-js/faker'

export const makeNotification = (
  props?: Partial<INotificationProps>,
  id?: UniqueEntityID,
): Notification =>
  Notification.create(
    {
      ...props,
      recipientId: new UniqueEntityID(),
      title: props?.title ?? faker.lorem.sentence(3),
      content: props?.content ?? faker.lorem.paragraph(),
    },
    id,
  )
