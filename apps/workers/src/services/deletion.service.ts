import { Injectable } from '@nestjs/common';

import PasswordlessAuthService from '@common/services/passwordlessAuth.sevice';

import UserShouldBeDeletedEvent from '@app/users/events/userShouldBeDeleted.event';

@Injectable()
export class DeletionService {
  constructor(private readonly authService: PasswordlessAuthService) {}

  deleteUser(event: UserShouldBeDeletedEvent): Promise<boolean> {
    return this.authService.deleteAccount(event.user);
  }
}
