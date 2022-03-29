import { Module } from '@nestjs/common';
import { LockService } from './locks.service';
import { LocksController } from './locks.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [LocksController],
  imports: [PrismaModule],
  exports: [LockService],
  providers: [LockService, PrismaService],
})
export class LocksModule {}
