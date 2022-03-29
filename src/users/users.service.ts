import { HttpException, Injectable } from '@nestjs/common';
import { User as UserModel, Prisma } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserRO } from './dto/create-user.ro';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserModel | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<CreateUserRO> {
    const { username, name, password, birthDate } = data;
    const hashPass = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { username, name, birthDate, password: hashPass },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateUserDto;
  }): Promise<UserModel> {
    const { where, data } = params;
    const { username, name, password, birthDate } = data;
    const hashPass = await bcrypt.hash(password, 10);
    return this.prisma.user.update({
      data: { username, name, password: hashPass, birthDate },
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<UserModel> {
    return this.prisma.user.delete({
      where,
    });
  }

  public createToken(user: Partial<UserModel>) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        exp: exp.getTime() / 1000,
      },
      process.env.SECRET,
    );
  }

  async login(payload: UserLoginDto): Promise<any> {
    const loginUser = await this.prisma.user.findUnique({
      where: { username: payload.username },
    });
    console.log('USER BOOLEAN:', { loginUser });

    const errors = { User: 'username or password wrong' };

    if (!loginUser) {
      throw new HttpException({ errors }, 401);
    }

    const authenticated = await bcrypt.compare(
      loginUser.password,
      payload.password,
    );

    if (!authenticated) {
      throw new HttpException({ errors }, 401);
    }

    const token = this.createToken(loginUser);
    const { password, ...user } = loginUser;
    return {
      user: { token, ...user },
    };
  }
}
