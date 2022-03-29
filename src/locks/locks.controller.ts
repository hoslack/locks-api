import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Lock as LocksModel } from '@prisma/client';
import { LockService } from './locks.service';
import { CreateLockDto } from './dto/create-lock.dto';
import { UpdateLockDto } from './dto/update-lock.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('locks')
@Controller('locks')
export class LocksController {
  constructor(private readonly lockService: LockService) {}

  @Post()
  create(@Body() createLockData: CreateLockDto): Promise<LocksModel> {
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
  findAll(): Promise<LocksModel[]> {
    return this.lockService.locks({});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<LocksModel> {
    return this.lockService.lock({ id: Number(id) });
  }

  @Patch(':id')
  update(
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
  remove(@Param('id') id: string): Promise<LocksModel> {
    return this.lockService.deleteLock({ id: Number(id) });
  }
}
