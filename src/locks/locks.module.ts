import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LockService } from './locks.service';
import { LocksController } from './locks.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthMiddleware } from '../users/auth.middleware';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [LocksController],
  imports: [PrismaModule, UsersModule],
  exports: [LockService],
  providers: [LockService, PrismaService],
})
export class LocksModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'locks',
        method: RequestMethod.POST,
      },
      {
        path: 'locks',
        method: RequestMethod.GET,
      },
      {
        path: 'locks/:id',
        method: RequestMethod.GET,
      },
      {
        path: 'locks/:id',
        method: RequestMethod.PATCH,
      },
      {
        path: 'locks/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}
