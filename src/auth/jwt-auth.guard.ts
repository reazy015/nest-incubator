import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('myJwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException(info);
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
