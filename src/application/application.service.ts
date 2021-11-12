import { Injectable } from '@nestjs/common';
import { MailerService } from '../mailer/mailer.service';
import { ApplicationRepository } from './application.repository';
import { ApplyToReceiveRequest } from './dto/apply-to-receive-request.dto';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly mailerService: MailerService,
  ) {}

  async applyToReceive(applyToReceiveDto: ApplyToReceiveRequest) {
    await this.mailerService.send();
  }
}
