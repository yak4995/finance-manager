import { Injectable } from '@nestjs/common';

import IEventListener from '@app/events/eventListener.interface';
import UserShouldBeDeletedEvent from '@app/users/events/userShouldBeDeleted.event';

// import AuthService from '@common/services/auth.service';
import PasswordlessAuthService from '@common/services/passwordlessAuth.sevice';

@Injectable()
export default class UserShouldBeDeletedEventListener
  implements IEventListener<UserShouldBeDeletedEvent> {
  // constructor(private readonly authService: AuthService) {}
  constructor(private readonly authService: PasswordlessAuthService) {}

  async process(event: UserShouldBeDeletedEvent): Promise<boolean> {
    return this.authService.deleteAccount(event.user);
  }
}
