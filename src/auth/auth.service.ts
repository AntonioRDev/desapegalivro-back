import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user/user.service';
import { LoginDtoRequest } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDtoRequest) {
    const user = await this.userService.findByEmail(loginDto.email);
    console.log("raw pass", loginDto.password);
    console.log("hash pass", user.password)
    if(user) {
      const isValidPassword = await bcrypt.compare(loginDto.password, user.password);

      if(isValidPassword) {
          const token = await this.firebaseService.getAuth().createCustomToken(loginDto.email);

          return { user, token};
      }
    }
  }
}