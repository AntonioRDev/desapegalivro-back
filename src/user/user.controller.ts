import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserRegisterDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {} 

    @Post()
    async create(@Body() body: UserRegisterDto, @Res() response: Response) {
        const user = await this.userService.create(body);

        return response.status(HttpStatus.CREATED).json(user);
    }
}