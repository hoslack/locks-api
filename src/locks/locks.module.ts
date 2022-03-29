import { Module } from '@nestjs/common';
import { LockService } from './locks.service';
import { LocksController } from './locks.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LocksController],
  providers: [LockService, PrismaService],
})
export class LocksModule {}
