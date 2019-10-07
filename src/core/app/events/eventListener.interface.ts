import IEvent from './event.interface';

export default interface IEventListener<T extends IEvent> {
  process(event: T): Promise<any>;
}
