import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from './users.service';
import { UseReturnObject } from './user.interface';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign-up')
  async create(
    @Body() createUserData: CreateUserDto,
  ): Promise<UseReturnObject> {
    return this.usersService.createUser(createUserData);
  }

  @Post('/login')
  async login(@Body() loginUserData: UserLoginDto): Promise<UserModel> {
    return await this.usersService.login(loginUserData);
  }

  @Get()
  findAll(): Promise<UseReturnObject[]> {
    return this.usersService.findUsers({});
  }

  @Get('/me')
  async findMe(@Req() request: Request) {
    const { headers } = request;
    const token = headers.authorization.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.SECRET);
    return await this.usersService.findUser({ id: decoded.id });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UseReturnObject> {
    return await this.usersService.findUser({ id: Number(id) });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserData: UpdateUserDto,
  ): Promise<UseReturnObject> {
    return this.usersService.updateUser({
      where: { id: Number(id) },
      data: updateUserData,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UseReturnObject> {
    return this.usersService.deleteUser({ id: Number(id) });
  }
}
