import { Module } from '@nestjs/common';

import { UserModule } from './users/user.module';
// import { BlogModule } from './blog/blog.module';
import { AuthsModule } from './auths/auths.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './auths/guards/role.guard';
import { PrismaService } from './prisma/prisma.service';
// import { BlogModule } from './blog/blog.module';
// import { BlogModule } from './blog/blog.module';

@Module({
  imports: [UserModule, AuthsModule, ],
  controllers: [],
  providers: [{provide:APP_GUARD, useClass: RoleGuard}, PrismaService],
})
export class AppModule {}
