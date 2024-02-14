import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export interface HttpExceptionResponse {
    statusCode: number;
    message: any;
    error: string;
}
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
