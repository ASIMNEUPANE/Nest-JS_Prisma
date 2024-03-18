import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { BcryptPass } from 'src/utils/Bcrypt';
import { generateOTP } from 'src/utils/otp';
import { mailer } from 'src/utils/mailer';
@Injectable()
export class AuthsService {
  constructor(
    private prisma: PrismaService,
    private  bcrypt: BcryptPass,
  ) {}

  async register(createAuthDto: Prisma.UserCreateInput) {
    let { isActive, isEmailVerified, roles, password, ...rest } = createAuthDto as {
      password: string;
      [key: string]: any;
    };
    rest.password = await this.bcrypt.hashPassword(password);
    const user = await this.prisma.user.create({
      data: rest as Prisma.UserUncheckedCreateInput,
    });
    const token = generateOTP();
    const authUSer = { email: user.email, otp: token }; 
    await this.prisma.auth.create({ data: authUSer });
    await mailer(user?.email, token);
    return user;
  }

  findAll() {
    return `This action returns all auths`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
