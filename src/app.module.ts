import { Module } from '@nestjs/common';

import { UserModule } from './users/user.module';
// import { BlogModule } from './blog/blog.module';
import { AuthsModule } from './auths/auths.module';
// import { BlogModule } from './blog/blog.module';
// import { BlogModule } from './blog/blog.module';

@Module({
  imports: [UserModule, AuthsModule, ],
  controllers: [],
  providers: [],
})
export class AppModule {}
