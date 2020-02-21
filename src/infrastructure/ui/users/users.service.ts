import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor() {}
  async findOne(username: string): Promise<any> {
    return { userId: '1', username, password: '123' };
  }
}
