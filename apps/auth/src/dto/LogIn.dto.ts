import { ApiProperty } from '@nestjs/swagger';

export class LogInDto {
  @ApiProperty({
    example: 'user@example.com',
    description: "The user's email address",
  })
  email: string;

  @ApiProperty({
    example: 'yourpassword',
    description: "The user's password",
  })
  password: string;
}
