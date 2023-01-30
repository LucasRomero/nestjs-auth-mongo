import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Strategies } from '../models/enum/strategies.model';

@Injectable()
export class LocalAuthGuard extends AuthGuard(Strategies.local) {}
