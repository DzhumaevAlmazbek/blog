import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto) {
    return await this.service.signIn(dto);
  }

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    return await this.service.signUp(dto);
  }

  @Get('check')
  async check(@Query('token') token: string) {
    return await this.service.isAuthed(token);
  }
}
