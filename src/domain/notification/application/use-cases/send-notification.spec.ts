import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'

let inMemoryNotificationRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('Send notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Nova notificação',
      content: 'Conteúdo da notificação',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryNotificationRepository.notifications).toHaveLength(1)
    expect(inMemoryNotificationRepository.notifications[0]).toEqual(
      expect.objectContaining({
        recipientId: new UniqueEntityID('1'),
        title: 'Nova notificação',
        content: 'Conteúdo da notificação',
      }),
    )
  })
})
