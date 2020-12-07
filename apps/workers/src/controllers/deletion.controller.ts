import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  EventPattern,
  Payload,
} from '@nestjs/microservices';

import { DeletionService } from '../services/deletion.service';

@Controller()
export class DeletionController {
  constructor(private readonly deletionService: DeletionService) {}

  @EventPattern('sheduledUsersForDelete')
  deleteUser(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ): Promise<boolean> {
    console.log(typeof message.value);
    console.log(message.value);
    return this.deletionService.deleteUser(message.value);
  }
}
