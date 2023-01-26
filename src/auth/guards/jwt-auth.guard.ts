import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  //sobreescribimos CanActivate
  CanActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    // si en el endpoint tiene este decorado, entonces debe retornar true, para poder accederlo
    if (isPublic) {
      return true;
    }

    // si no es publico, entonces haz lo que debes hacer, que es validar el token
    return super.canActivate(context);
  }
}
