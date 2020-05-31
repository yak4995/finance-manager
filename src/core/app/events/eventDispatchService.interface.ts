import IEventListener from './eventListener.interface';
import IEvent from './event.interface';

// use event queue service from infrastructure:
// RabbitMQ, Kafka, Redis, DB etc
// TODO: CQRS architecture in future (based on event driven architecture)
export default abstract class IEventDispatchService<T extends IEvent> {
  constructor(protected readonly eventListeners: IEventListener<T>[]) {}
  public abstract emit(event: T): Promise<boolean>;
  protected abstract processEvent(...args: any[]): Promise<void>;
}
