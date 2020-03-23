import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (_data: unknown, request) => request.user,
);
