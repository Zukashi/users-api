import { IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  country: string;

  @IsString()
  municipality: string;

  @IsString()
  postalCode: string;

  @IsString()
  street: string;

  @IsString()
  houseNumber: string;
}
