import { MailerService } from './mailer.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [MailerService],
  exports: [MailerService]
})
export class MailerModule {}
