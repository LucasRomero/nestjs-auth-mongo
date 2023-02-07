import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { loginDTO } from '../dtos/login.dto';

import { AuthService } from './../services/auth.service';
import { User } from '../../users/entities/user.entity';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // login(@Body() login: loginDTO) {
  //   return this.authService.generateJWT1(login);
  // }
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }
}
