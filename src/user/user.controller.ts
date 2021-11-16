import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserRegisterDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {} 

    @Get('/:id') 
    async getById(@Param('id') id: string, @Res() response: Response) {
        const user = await this.userService.getById(Number(id));

        return response.status(HttpStatus.OK).json(user);
    }

    @Post()
    async create(@Body() body: UserRegisterDto, @Res() response: Response) {
        const user = await this.userService.create(body);

        return response.status(HttpStatus.CREATED).json(user);
    }
}