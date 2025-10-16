import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { MessageException } from 'src/provider/exception/message.exception';

@Injectable()
export class AuthorizationHeaderGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
      throw new HttpException(MessageException.UNAUTHORIZED, 403);
    }
    return true;
  }
}
