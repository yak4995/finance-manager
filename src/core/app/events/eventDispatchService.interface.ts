import IEventListener from './eventListener.interface';
import IEvent from './event.interface';

// use event queue service from infrastructure:
// RabbitMQ, Kafka, Redis, DB etc
export default abstract class IEventDispatchService<T extends IEvent> {
  constructor(protected readonly eventListeners: IEventListener<T>[]) {}
  public abstract emit(event: T): Promise<boolean>;
  protected abstract processEvent(...args: any[]): Promise<void>;
}
