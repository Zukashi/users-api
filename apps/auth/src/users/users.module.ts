import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Address, DatabaseModule, User } from '@app/common';
import { UsersRepository } from './users.repository';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([User, Address])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
