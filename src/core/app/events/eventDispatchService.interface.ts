import IEventListener from './eventListener.interface';
import IEvent from './event.interface';
import { EventStatus } from './eventStatus.enum';

// use event queue service from infrastructure:
// RabbitMQ, Kafka, Redis, DB etc
export default abstract class IEventDispatchService<T extends IEvent> {
  constructor(protected readonly eventListeners: IEventListener<T>[]) {}
  async emit(event: T): Promise<boolean> {
    const results = [];
    this.eventListeners.forEach(listener => {
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
