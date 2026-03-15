import { INotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository implements INotificationsRepository {
  public notifications: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }
}
