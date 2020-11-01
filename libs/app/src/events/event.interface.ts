import { EventStatus } from './eventStatus.enum';

export default interface IEvent {
  state: EventStatus;
}
