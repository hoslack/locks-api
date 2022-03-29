import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthMiddleware } from './auth.middleware';

@Module({
  controllers: [UsersController],
  imports: [PrismaModule],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'users',
        method: RequestMethod.GET,
      },
      {
        path: 'users/:id',
        method: RequestMethod.GET,
      },
      {
        path: 'users/:id',
        method: RequestMethod.PATCH,
      },
      {
        path: 'users/:id',
        method: RequestMethod.DELETE,
      },
      {
        path: 'users/me',
        method: RequestMethod.GET,
      },
    );
  }
}
