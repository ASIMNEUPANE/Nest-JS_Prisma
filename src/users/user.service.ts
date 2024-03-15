import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { triggerAsyncId } from 'async_hooks';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptPass } from 'utils/Bcrypt';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private bcrpt: BcryptPass,
  ) {}

  async createUser(
    payload: Prisma.UserCreateInput,
  ): Promise<Prisma.UserCreateInput | null> {
    let { password, ...rest } = payload as {
      password: string;
      roles?: string;
      [key: string]: any;
    };
    rest.password = await this.bcrpt.hashPassword(password);
    rest.isEmailVerified = true;
    rest.isActive = true;

    const result = await this.prisma.user.create({
      data: rest as Prisma.UserUncheckedCreateInput,
    });
    return result;
  }
  getUser() {
    return this.prisma.user.findMany({
      where: { isActive: true, isArchive: false },
    });
  }
  getById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  updateById(id:number, payload:Prisma.UserCreateInput){

  }
}
