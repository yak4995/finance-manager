import { Injectable } from '@nestjs/common';
import IEventListener from '../../../../core/app/events/eventListener.interface';
import AuthService from '../services/auth.service';
import UserShouldBeDeletedEvent from '../../../../core/app/users/events/userShouldBeDeleted.event';

@Injectable()
export default class UserShouldBeDeletedEventListener
  implements IEventListener<UserShouldBeDeletedEvent> {
  constructor(private readonly authService: AuthService) {}

  async process(event: UserShouldBeDeletedEvent): Promise<boolean> {
    return this.authService.deleteAccount(event.userForDeleting);
  }
}
