import { INotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository implements INotificationsRepository {
  public notifications: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id.toString() === notificationId,
    )

    if (!notification) return null

    return notification
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    )

    if (notificationIndex >= 0)
      this.notifications[notificationIndex] = notification
  }
}
