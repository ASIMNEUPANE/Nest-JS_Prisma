import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BcryptPass } from 'src/utils/Bcrypt';

@Module({
  imports: [PrismaModule],

  controllers: [AuthsController],
  providers: [AuthsService,BcryptPass],
})
export class AuthsModule {}
