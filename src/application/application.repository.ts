import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplyToReceiveRequest } from './dto/apply-to-receive-request.dto';

@Injectable()
export class ApplicationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getByUserId(userId: number) {
    return await this.prisma.application.findMany({
      where: {
        userId: userId,
      },
      include: {
        book: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async applyToReceive(applyToReceiveDto: ApplyToReceiveRequest) {
    const persistedApplication = await this.prisma.application.create({
      data: applyToReceiveDto,
      include: {
        user: true,
        book: {
          include: {
            user: true,
          },
        },
      },
    });

    await this.prisma.donatedBook.update({
      where: {
        id: applyToReceiveDto.bookId,
      },
      data: {
        applicationsQty: {
          increment: 1,
        },
      },
    });

    return persistedApplication;
  }

  async setEmailSended(isSended: boolean, applicationId: number) {
    return await this.prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        isEmailSended: isSended,
      },
    });
  }
}
