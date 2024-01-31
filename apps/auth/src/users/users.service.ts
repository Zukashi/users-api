import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { Address, User } from '@app/common';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);

    const user = new User({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      homeAddress: new Address(createUserDto.homeAddress),
    });
    return this.usersRepository.create(user);
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists.');
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }

  getAllUsers() {
    return this.usersRepository.find();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.findOneAndUpdate({ id }, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.findOneAndDelete({ id });
  }
}
