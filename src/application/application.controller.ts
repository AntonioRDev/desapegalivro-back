import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApplicationService } from './application.service';
import { ApplyToReceiveRequest } from './dto/apply-to-receive-request.dto';

@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @Post()
    async applyToReceive(@Body() body: ApplyToReceiveRequest, @Res() res: Response) {
        this.applicationService.applyToReceive(body);

        return res.status(HttpStatus.CREATED).json({ ok: true });
    }
}
