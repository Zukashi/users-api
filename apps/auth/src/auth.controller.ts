import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser, User } from '@app/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LogInDto } from './dto/LogIn.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller({
  version: '1',
  path: 'auth',
})
@ApiTags('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    description:
      'Login using email and password. Credentials are processed by LocalAuthGuard.',
    type: LogInDto, // Using the pseudo-DTO for documentation
  })
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.login(user, response);
    response.send(jwt);
  }

  @Delete('logout')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Authentication');

    response.send();
  }

  @Get('check')
  @UseGuards(JwtAuthGuard)
  async checkIfAuthenticated() {
    return;
  }
}
