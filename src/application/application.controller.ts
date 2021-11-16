import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApplicationService } from './application.service';
import { ApplyToReceiveRequest } from './dto/apply-to-receive-request.dto';

@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @Get('/:userId')
    async getByUserId(@Param('userId') userId: string, @Res() res: Response) {
        const userApplications = await this.applicationService.getByUserId(Number(userId));

        return res.status(HttpStatus.OK).json(userApplications);
    }

    @Post()
    async applyToReceive(@Body() body: ApplyToReceiveRequest, @Res() res: Response) {
        const application = await this.applicationService.applyToReceive(body);

        return res.status(HttpStatus.CREATED).json(application);
    }
}