import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-envent'
import { DomainEvents } from '@/core/events/domain-events'

class CustomAggreateCreated implements DomainEvent {
  public ocurredAt: Date
  // eslint-disable-next-line no-use-before-define
  private aggredate: CustomAggregate

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggredate = aggregate
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggredate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggreateCreated(aggregate))

    return aggregate
  }
}

describe('DomainEvents', () => {
  it('should be able to dispatch a and listen to domain events', () => {
    DomainEvents.register(() => {}, CustomAggreateCreated.name)

    const aggregate = CustomAggregate.create()

    expect(aggregate.domainEvents.length).toHaveLength(1)

    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    expect(aggregate.domainEvents.length).toHaveLength(0)
  })
})
