import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDtoRequest } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDtoRequest) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (user) {
      const isValidPassword = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (isValidPassword) {
        const token = uuid();

        return { user, token };
      }
    }
  }
}
