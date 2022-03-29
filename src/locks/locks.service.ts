import { Injectable } from '@nestjs/common';
import { Lock, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LockService {
  constructor(private prisma: PrismaService) {}

  async findLock(
    lockWhereUniqueInput: Prisma.LockWhereUniqueInput,
  ): Promise<Lock | null> {
    return this.prisma.lock.findUnique({
      where: lockWhereUniqueInput,
    });
  }

  async findLocks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LockWhereUniqueInput;
    where?: Prisma.LockWhereInput;
    orderBy?: Prisma.LockOrderByWithRelationInput;
  }): Promise<Lock[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.lock.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createLock(data: Prisma.LockCreateInput): Promise<Lock> {
    return this.prisma.lock.create({
      data,
    });
  }

  async updateLock(params: {
    where: Prisma.LockWhereUniqueInput;
    data: Prisma.LockUpdateInput;
  }): Promise<Lock> {
    const { data, where } = params;
    return this.prisma.lock.update({
      data,
      where,
    });
  }

  async deleteLock(where: Prisma.LockWhereUniqueInput): Promise<Lock> {
    return this.prisma.lock.delete({
      where,
    });
  }
}
