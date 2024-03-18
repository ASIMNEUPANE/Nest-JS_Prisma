import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BcryptPass } from 'utils/Bcrypt';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private bcrpt: BcryptPass,
  ) {}

  async createUser(
    payload: CreateUserDto,
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
  async getUser() {
    return await this.prisma.user.findMany({
      where: { isActive: true, isArchive: false },
    });
  }
  async getById(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }
  async updateById(id:number, payload:Prisma.UserUpdateInput) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: payload?.name,
        images: payload?.images,
      },
    });
  }

  async changePassword(id: number, oldPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    const isValidOldPass = await this.bcrpt.comparePasswords(
      oldPassword,
      user?.password,
    );
    if (!isValidOldPass)
      throw new HttpException(
        'oldPassword is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    const newPass = await this.bcrpt.hashPassword(newPassword);

    return await this.prisma.user.update({
      where: { id },
      data: { password: newPass },
    });
  }

  async resetPassword(id: number, password: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const newPass = await this.bcrpt.hashPassword(password);

    return await this.prisma.user.update({
      where: { id },
      data: { password: newPass },
    });
  }
  async block(id: number, payload: { isActive: boolean }) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return await this.prisma.user.update({
      where: { id },
      data: { isActive: payload?.isActive },
    });
  }
  async archive(id: number, payload: { isArchive: boolean }) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return await this.prisma.user.update({
      where: { id },
      data: { isArchive: payload?.isArchive },
    });
  }
}
