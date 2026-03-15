import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created-event'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sentNotifications: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification(event: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(
      event.answer.questionId.toString(),
    )

    if (!question) throw new ResourceNotFoundError()

    await this.sentNotifications.execute({
      recipientId: question?.authorId.toString(),
      title: `Nova resposta em "${question.title.substring(0, 50).concat('...')}"`,
      content: event.answer.excerpt,
    })
  }
}
