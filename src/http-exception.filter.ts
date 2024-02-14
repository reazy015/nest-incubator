import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
export interface HttpExceptionResponse {
  statusCode: number;
  message: any;
  error: string;
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    const errorMessage =
      (errorResponse as HttpExceptionResponse).message || errorResponse;

    if (typeof errorMessage === 'string') {
      response.status(status).json({
        errorsMessages: [errorResponse],
      });
    } else {
      response.status(status).json({
        errorsMessages: [...errorMessage],
      });
    }
  }
}
