import { Module } from '@nestjs/common';

import { UserModule } from './users/user.module';
// import { BlogModule } from './blog/blog.module';
// import { BlogModule } from './blog/blog.module';
// import { BlogModule } from './blog/blog.module';

@Module({
  imports: [UserModule, ],
  controllers: [],
  providers: [],
})
export class AppModule {}
