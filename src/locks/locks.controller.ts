import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LockService } from './locks.service';
import { CreateLockDto } from './dto/create-lock.dto';
import { UpdateLockDto } from './dto/update-lock.dto';

@Controller('locks')
export class LocksController {
  constructor(private readonly lockService: LockService) {}

  @Post()
  create(@Body() createLockData: CreateLockDto) {
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
  findAll() {
    return this.lockService.locks({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lockService.lock({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLockData: UpdateLockDto) {
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
  remove(@Param('id') id: string) {
    return this.lockService.deleteLock({ id: Number(id) });
  }
}
