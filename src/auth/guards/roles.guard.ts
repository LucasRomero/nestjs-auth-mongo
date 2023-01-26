import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../models/token.model';
import { Role } from '../models/enum/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // obtengo los roles que estan permitidos para esa api
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      // si no tiene roles esa api, entonces dejamos que pase, ya que no se valida con los roles, y puede acceder cualquiera a este endpoint
      return true;
    }
    // obtengo el request y asi es como se hace desde un guard
    const request = context.switchToHttp().getRequest();
    // ya tenemos la informacion desencriptada, desde el request
    const user = request.user as PayloadToken;
    // verificamos si el usuario que esta en la api coincide con el usuario que viene en el request
    const isAuth = roles.some((role) => role === user.role);
    if (!isAuth) {
      throw new UnauthorizedException('your role is wrong');
    }
    return isAuth;
  }
}
