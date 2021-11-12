import { Injectable } from '@nestjs/common';
import { CreateRequest } from 'firebase-admin/lib/auth/auth-config';
import { FirebaseService } from '../firebase/firebase.service';
import { UserRegisterDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(userRegisterDto: UserRegisterDto) {
    const unhashedPassword = userRegisterDto.password;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userRegisterDto.password, salt);

    const user = await this.userRepository.create({
      ...userRegisterDto,
      password: hashedPassword,
    });
    console.log('user created', user);
    // Create user in firebase auth
    const { id, name, email, phone } = user;
    const response = await this.firebaseService.getAuth().createUser({
      email,
      password: unhashedPassword,
      displayName: name,
      id
    } as CreateRequest);
    console.log('firebase response', response);

    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
