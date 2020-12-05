import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';
import { Injectable } from '@nestjs/common';

import IEventListener from '@app/events/eventListener.interface';
import UserHasBeenCreatedEvent from '@app/users/events/userHasBeenCreated.event';

@Injectable()
export default class UserHasBeenCreatedEventListener
  implements IEventListener<UserHasBeenCreatedEvent> {
  constructor(private readonly mailService: MailerService) {}

  async process(event: UserHasBeenCreatedEvent): Promise<SentMessageInfo> {
    return this.mailService.sendMail({
      to: (event as any).user.email,
      subject: 'Finance Manager Registration',
      template: 'userHasBeenRegistered',
    });
  }
}
