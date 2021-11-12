import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDtoRequest } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginDtoRequest, @Res() res: Response) {
    try { 
        const response = await this.authService.login(body);

        return res.status(HttpStatus.OK).json(response);
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}
