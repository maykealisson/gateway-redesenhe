import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const error =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';
    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: error,
      message: message,
    });
  }
}
