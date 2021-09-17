import { CanActivate } from '@nestjs/common';

export const RefreshTokenAuthGuardMock: CanActivate = {
  canActivate: jest.fn().mockResolvedValue(true),
};
