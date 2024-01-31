import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { AddressDto } from './address.dto';

export class CreateUserDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @ValidateNested()
  @Type(() => AddressDto)
  homeAddress: AddressDto;
}
