import IEventDispatchService from '../../../../core/app/events/eventDispatchService.interface';
import UserHasBeenCreatedEvent from '../../../../core/app/users/events/userHasBeenCreated.event';

export default class AuthEventDispatcher extends IEventDispatchService<
  UserHasBeenCreatedEvent
> {
  async emit(_event: UserHasBeenCreatedEvent): Promise<boolean> {
    return true;
  }
}
