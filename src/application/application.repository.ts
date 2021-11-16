import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplyToReceiveRequest } from './dto/apply-to-receive-request.dto';

@Injectable()
export class ApplicationRepository {
    constructor(private readonly prisma: PrismaService) {}
    
    async getByUserId(userId: number) {
        return await this.prisma.application.findMany({
            where: {
                userId: userId
            },
            include: {
                book: {
                    include: {
                        category: true
                    }
                }
            }
        })
    }

    async applyToReceive(applyToReceiveDto: ApplyToReceiveRequest) {
        return await this.prisma.application.create({
            data: applyToReceiveDto,
            include: {
                user: true,
                book: true
            }
        })
    }

    async setEmailSended(isSended: boolean, applicationId: number) {
        return await this.prisma.application.update({
            where: {
                id: applicationId
            },
            data: {
                isEmailSended: isSended
            }
        })
    }
}
