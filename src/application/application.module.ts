import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { Module } from '@nestjs/common';
import { MailerModule } from '../mailer/mailer.module';
import { ApplicationRepository } from './application.repository';

@Module({
  imports: [MailerModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationRepository],
})
export class ApplicationModule {}
