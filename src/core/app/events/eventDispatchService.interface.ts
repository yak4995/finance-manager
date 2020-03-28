import IEventListener from './eventListener.interface';
import IEvent from './event.interface';
import { EventStatus } from './eventStatus.enum';

// use event queue service from infrastructure:
// RabbitMQ, Kafka, Redis, DB etc
// TODO: CQRS architecture in future (based on event driven architecture)
export default abstract class IEventDispatchService<T extends IEvent> {
  constructor(protected readonly eventListeners: IEventListener<T>[]) {}
  async emit(event: T): Promise<boolean> {
    const results: Promise<any>[] = [];
    this.eventListeners.forEach((listener: IEventListener<T>): void => {
      results.push(listener.process(event));
    });
    event.state = EventStatus.WAITING;
    if (results.length > 0) {
      try {
        await Promise.all(results);
      } catch (e) {
        event.state = EventStatus.FAILED;
        return false;
      }
    }
    return true;
  }
}
