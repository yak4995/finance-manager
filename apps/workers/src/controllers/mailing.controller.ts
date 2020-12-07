import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import { SentMessageInfo } from 'nodemailer';

import { MailingService } from '../services/mailing.service';

@Controller()
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @EventPattern('mailing')
  greetingsEmail(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<SentMessageInfo> {
    console.log(typeof message.value);
    console.log(message.value);
    return this.mailingService.greetingsEmail(message.value);
  }

  @EventPattern('metrics')
  sendReport(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<SentMessageInfo> {
    console.log(typeof message.value);
    console.log(message.value);
    return this.mailingService.sendReport(message.value);
  }
}
