import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import IEventListener from '@app/events/eventListener.interface';
import UserShouldBeDeletedEvent from '@app/users/events/userShouldBeDeleted.event';

// import AuthService from '@common/services/auth.service';
// import PasswordlessAuthService from '@common/services/passwordlessAuth.sevice';

import { FileLoggerService } from '@transport/logger/fileLogger.service';

@Injectable()
export default class UserShouldBeDeletedEventListener
  implements IEventListener<UserShouldBeDeletedEvent> {
  // constructor(private readonly authService: AuthService) {}
  // constructor(private readonly authService: PasswordlessAuthService) {}

  constructor(@Inject('WORKERS') private client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('sheduledUsersForDelete');
    await this.client.connect();
  }

  async process(event: UserShouldBeDeletedEvent): Promise<boolean> {
    // return this.authService.deleteAccount(event.user);
    this.client
      .emit('sheduledUsersForDelete', JSON.stringify(event))
      .toPromise()
      .then(result => FileLoggerService.log(result))
      .catch(e => FileLoggerService.error(e));
    return true;
  }
}
