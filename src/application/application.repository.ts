import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplyToReceiveRequest } from './dto/apply-to-receive-request.dto';

@Injectable()
export class ApplicationRepository {
    constructor(private readonly prisma: PrismaService) {}
    
    async applyToReceive(applyToReceiveDto: ApplyToReceiveRequest) {
        return await this.prisma.application.create({
            data: applyToReceiveDto
        })
    }

    async setEmailSended(isSended: boolean) {
        
    }
}
