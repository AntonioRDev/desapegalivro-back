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

  async getByUserId(userId: number) {
    return await this.applicationRepository.getByUserId(userId);
  }

  async applyToReceive(applyToReceiveDto: ApplyToReceiveRequest) {
    const applicationPersisted =
      await this.applicationRepository.applyToReceive(applyToReceiveDto);

    await this.mailerService.send(
      applicationPersisted.user,
      applicationPersisted.book.user,
      applicationPersisted.book,
      applicationPersisted.description,
      applicationPersisted.contact,
    );

    return await this.applicationRepository.setEmailSended(
      true,
      applicationPersisted.id,
    );
  }
}
