import { MailerService } from '@nestjs-modules/mailer';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { SentMessageInfo } from 'nodemailer';
import IEventListener from '../../../../core/app/events/eventListener.interface';
import UserHasBeenCreatedEvent from '../../../../core/app/users/events/userHasBeenCreated.event';

// TODO: to transport?
@Processor('mailing')
export default class UserHasBeenCreatedEventListener
  implements IEventListener<UserHasBeenCreatedEvent> {
  constructor(private readonly mailService: MailerService) {}

  @Process()
  processQueueJob(job: Job<UserHasBeenCreatedEvent>): Promise<SentMessageInfo> {
    return this.process(job.data);
  }

  // TODO: magic literals to configs/enum with templates
  async process(event: UserHasBeenCreatedEvent): Promise<SentMessageInfo> {
    return this.mailService.sendMail({
      to: (event as any).user.email,
      subject: 'Finance Manager Registration',
      template: 'userHasBeenRegistered',
    });
  }
}
