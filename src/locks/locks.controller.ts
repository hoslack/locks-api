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
import * as jwt from 'jsonwebtoken';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Lock as LocksModel } from '@prisma/client';
import { LockService } from './locks.service';
import { CreateLockDto } from './dto/create-lock.dto';
import { UpdateLockDto } from './dto/update-lock.dto';

@ApiBearerAuth()
@ApiTags('locks')
@Controller('locks')
export class LocksController {
  constructor(private readonly lockService: LockService) {}

  @Post()
  async create(@Body() createLockData: CreateLockDto): Promise<LocksModel> {
    const { macId, name, userId } = createLockData;
    return this.lockService.createLock({
      macId,
      name,
      user: {
        connect: { id: Number(userId) },
      },
    });
  }

  @Get()
  async findMyLocks(@Req() request: Request): Promise<LocksModel[]> {
    const { headers } = request;
    const token = headers.authorization.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.SECRET);
    return await this.lockService.findLocks({ where: { userId: decoded.id } });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LocksModel> {
    return this.lockService.findLock({ id: Number(id) });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLockData: UpdateLockDto,
  ): Promise<LocksModel> {
    const { macId, name } = updateLockData;
    return this.lockService.updateLock({
      data: {
        macId,
        name,
        user: {
          connect: {
            id: Number(id),
          },
        },
      },
      where: { id: Number(id) },
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<LocksModel> {
    return this.lockService.deleteLock({ id: Number(id) });
  }
}
