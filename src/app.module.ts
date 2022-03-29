import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LocksModule } from './locks/locks.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, LocksModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
