import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async getById(id: number) {
    return await this.userRepository.getById(id);
  }

  async create(userRegisterDto: UserRegisterDto) {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userRegisterDto.password, salt);

    const user = await this.userRepository.create({
      ...userRegisterDto,
      password: hashedPassword,
    });

    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
