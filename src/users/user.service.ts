import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    payload: Prisma.UserCreateInput,
  ): Promise<Prisma.UserCreateInput | null> {
    let { password, ...rest } = payload as {
      password: string;
      roles?: string;
      [key: string]: any;
    };
    rest.password = await bcrypt.hash(password, +process.env.SALT_ROUND);
    rest.isEmailVerified = true;
    rest.isActive = true;

    const result = await this.prisma.user.create({
      data: rest as Prisma.UserUncheckedCreateInput,
    });
    return result;
  }
  getUser() {}
  getById() {}
}
