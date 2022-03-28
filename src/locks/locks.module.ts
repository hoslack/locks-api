import { Module } from '@nestjs/common';
import { LocksService } from './locks.service';
import { LocksController } from './locks.controller';

@Module({
  controllers: [LocksController],
  providers: [LocksService]
})
export class LocksModule {}
