import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/entities/user.entity';
import { PayloadToken } from '../models/token.model';
import { loginDTO } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    let isMatch = false;
    const user = await this.userService.findByEmail(email);

    if (user) {
      isMatch = await bcrypt.compare(password, user.password);
    }

    if (isMatch) {
      const { password, ...rta } = user.toJSON();
      return rta;
    }
    return null;
  }

  // generateJWT1(user: loginDTO) {
  //   const payload: PayloadToken = { username: user.email, sub: 1 };
  //   return {
  //     acces_token: this.jwtService.sign(payload),
  //     user,
  //   };
  // }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      acces_token: this.jwtService.sign(payload),
      user,
    };
  }
}
