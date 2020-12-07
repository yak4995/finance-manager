// import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import IEventListener from '@app/events/eventListener.interface';
import UserHasBeenCreatedEvent from '@app/users/events/userHasBeenCreated.event';

import { FileLoggerService } from '@transport/logger/fileLogger.service';

@Injectable()
export default class UserHasBeenCreatedEventListener
  implements IEventListener<UserHasBeenCreatedEvent> {
  constructor(
    // private readonly mailService: MailerService,
    @Inject('WORKERS') private client: ClientKafka,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('mailing');
    await this.client.connect();
  }

  async process(event: UserHasBeenCreatedEvent): Promise<SentMessageInfo> {
    /*return this.mailService.sendMail({
      to: (event as any).user.email,
      subject: 'Finance Manager Registration',
      template: 'userHasBeenRegistered',
    });*/
    this.client
      .emit('mailing', JSON.stringify(event))
      .toPromise()
      .then(result => FileLoggerService.log(result))
      .catch(e => FileLoggerService.error(e));
    return null;
  }
}
