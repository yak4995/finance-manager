import { Injectable } from '@nestjs/common';

import IEventListener from '@app/events/eventListener.interface';
import UserShouldBeDeletedEvent from '@app/users/events/userShouldBeDeleted.event';

import AuthService from '../services/auth.service';

@Injectable()
export default class UserShouldBeDeletedEventListener
  implements IEventListener<UserShouldBeDeletedEvent> {
  constructor(private readonly authService: AuthService) {}

  async process(event: UserShouldBeDeletedEvent): Promise<boolean> {
    return this.authService.deleteAccount(event.user);
  }
}
