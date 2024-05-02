import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { BcryptPass } from 'src/utils/Bcrypt';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, BcryptPass],
})
export class UserModule {}
