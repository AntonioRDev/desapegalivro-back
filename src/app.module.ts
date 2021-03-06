import { MailerModule } from './mailer/mailer.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ApplicationModule } from './application/application.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MailerModule,
    FirebaseModule,
    ApplicationModule,
    AuthModule,
    BookModule,
    CategoryModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
