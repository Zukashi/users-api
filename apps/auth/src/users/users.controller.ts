import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ValidateUUIDPipe } from '../pipes/validate-uuid.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser, User } from '@app/common';

@Controller({
  version: '1',
})
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('user')
  @ApiBearerAuth('Authentication')
  findOne(@CurrentUser() user: User) {
    return this.usersService.getUser({ id: user.id });
  }
  @UseGuards(JwtAuthGuard)
  @Patch('user')
  update(@CurrentUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user')
  remove(@CurrentUser() user: User) {
    return this.usersService.remove(user.id);
  }
}
