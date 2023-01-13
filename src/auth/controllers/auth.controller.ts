import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
// import { loginDTO } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  // login(@Body() login: loginDTO) {
  //   return login;
  // }
  login(@Req() req: Request) {
    return req.user;
  }
}
